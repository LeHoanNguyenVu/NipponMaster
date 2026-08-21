import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardStudent from './screens/DashboardStudent';
import DashboardTeacher from './screens/DashboardTeacher';
import DashboardAdmin from './screens/DashboardAdmin';
import DashboardGuest from './screens/DashboardGuest';
import Vocabulary from './screens/Vocabulary';
import Exams from './screens/Exams';
import Flashcards from './screens/Flashcards';
import Auth from './screens/Auth';
import LandingPage from './screens/LandingPage';
import Kanji from './screens/Kanji';
import Grammar from './screens/Grammar';
import Translation from './screens/Translation';
import OnboardingScreen from './screens/OnboardingScreen';
import Pricing from './screens/Pricing';
import SpeakingStudio from './screens/SpeakingStudio';
import BeginnerCourseHub from './screens/BeginnerCourseHub';
import JLPTBattleArena from './screens/JLPTBattleArena';
import QuestsAndShop from './screens/QuestsAndShop';
import ListeningRoom from './screens/ListeningRoom';
import OAuthPopup from './screens/OAuthPopup';
import { useAuthStore } from './store/useAuthStore';
import gsap from 'gsap';

export type ScreenType = 'dashboard' | 'vocabulary' | 'kanji' | 'grammar' | 'flashcards' | 'exams' | 'translation' | 'pricing' | 'speaking' | 'listening' | 'beginner' | 'battle' | 'quests';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const { isAuthenticated, logout, user, fetchMe } = useAuthStore();

  // Configure GSAP globally for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(100);
      } else {
        gsap.globalTimeline.timeScale(1);
      }
    };
    
    handleMotionChange(mediaQuery);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
      return () => mediaQuery.removeListener(handleMotionChange);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // Support browser's back/forward buttons (hash navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/auth' || hash === '#auth') {
        setShowAuth(true);
      } else if (hash === '#/pricing' || hash === '#pricing') {
        setShowAuth(false);
        setCurrentScreen('pricing');
      } else {
        setShowAuth(false);
      }
    };

    // Run once on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [currentScreen]);

  // Helper function to decode JWT payload from Google id_token
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // Handle OAuth2 Redirect / Popup callback in App.tsx
  useEffect(() => {
    const hash = window.location.hash || window.location.href;
    if (hash.includes('access_token=') || hash.includes('id_token=')) {
      const fragment = hash.includes('#') ? hash.substring(hash.indexOf('#') + 1) : hash;
      const params = new URLSearchParams(fragment.replace(/^.*\?/, ''));
      const idToken = params.get('id_token') || '';
      const accessToken = params.get('access_token') || idToken;

      const isFacebook = accessToken.startsWith('EAA') || hash.includes('data_access_expiration_time') || hash.includes('facebook');

      if (isFacebook) {
        // Fetch real user profile from Facebook Graph API
        fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`)
          .then((res) => res.json())
          .then((fbUser) => {
            const email = fbUser.email || `fb.${fbUser.id}@facebook.com`;
            const fullName = fbUser.name || 'Facebook User';
            const avatarUrl = fbUser.picture?.data?.url;

            const payload = {
              provider: 'FACEBOOK' as const,
              idToken: accessToken,
              email,
              fullName,
              avatarUrl,
            };

            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'OAUTH_SUCCESS', payload }, '*');
              setTimeout(() => {
                window.close();
              }, 100);
            }
          })
          .catch(() => {
            const fallbackPayload = {
              provider: 'FACEBOOK' as const,
              idToken: accessToken,
              email: 'facebook.user@gmail.com',
              fullName: 'Facebook User',
            };
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'OAUTH_SUCCESS', payload: fallbackPayload }, '*');
              setTimeout(() => {
                window.close();
              }, 100);
            }
          });
      } else {
        // Google OAuth JWT id_token
        const decoded = idToken ? parseJwt(idToken) : (accessToken ? parseJwt(accessToken) : null);
        const email = decoded?.email || 'google.user@gmail.com';
        const fullName = decoded?.name || decoded?.given_name || email.split('@')[0];
        const avatarUrl = decoded?.picture || undefined;

        const payload = {
          provider: 'GOOGLE' as const,
          idToken: accessToken,
          email,
          fullName,
          avatarUrl,
        };

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage({ type: 'OAUTH_SUCCESS', payload }, '*');
          setTimeout(() => {
            window.close();
          }, 100);
        }
      }
    }
  }, []);

  // Standalone OAuth2 Popup Window (Google / Facebook)
  if (window.location.hash.includes('oauth/popup') || window.location.hash.includes('oauth-popup')) {
    return <OAuthPopup />;
  }

  // OAuth2 Token Redirect Loading State (inside popup)
  if (window.location.hash.includes('access_token=') || window.location.hash.includes('id_token=')) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="text-lg font-bold text-on-surface mb-1">Đang hoàn tất xác thực...</h3>
        <p className="text-xs text-on-surface-variant">Cửa sổ này sẽ tự động đóng trong giây lát.</p>
      </div>
    );
  }

  // Guest flow: Landing Page → Auth Screen → Onboarding (if new) → Dashboard
  if (!isAuthenticated) {
    if (showAuth) {
      return (
        <Auth 
          onAuthSuccess={() => {
            window.location.hash = '';
            setCurrentScreen('dashboard');
          }} 
          onBack={() => {
            window.location.hash = '';
          }}
        />
      );
    }
    return <LandingPage onNavigateAuth={() => { window.location.hash = '#/auth'; }} />;
  }

  // Onboarding flow: New student who hasn't completed onboarding yet
  if (isAuthenticated && user && user.onboardingCompleted === false) {
    return (
      <OnboardingScreen
        onDone={() => {
          fetchMe();
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  if (currentScreen === 'flashcards') {
    return <Flashcards onExit={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface font-sans">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={logout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {currentScreen === 'dashboard' && user?.role === 'teacher' && (
            <DashboardTeacher username={user?.username} />
          )}
          {currentScreen === 'dashboard' && (user?.role === 'system' || user?.role === 'admin') && (
            <DashboardAdmin username={user?.username} />
          )}
          {currentScreen === 'dashboard' && user?.role === 'guest' && (
            <DashboardGuest />
          )}
          {currentScreen === 'dashboard' && (!user?.role || user?.role === 'student') && (
            <DashboardStudent
              onStartStudy={() => setCurrentScreen('flashcards')}
              onOpenBeginnerCourse={() => setCurrentScreen('beginner')}
              username={user?.username}
            />
          )}
          {currentScreen === 'vocabulary' && <Vocabulary />}
          {currentScreen === 'exams' && <Exams />}
          {currentScreen === 'kanji' && <Kanji />}
          {currentScreen === 'grammar' && <Grammar />}
          {currentScreen === 'translation' && <Translation />}
          {currentScreen === 'pricing' && <Pricing />}
          {currentScreen === 'speaking' && <SpeakingStudio />}
          {currentScreen === 'listening' && <ListeningRoom />}
          {currentScreen === 'beginner' && <BeginnerCourseHub />}
          {currentScreen === 'battle' && <JLPTBattleArena />}
          {currentScreen === 'quests' && <QuestsAndShop />}
        </main>
      </div>
    </div>
  );
}
