import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  // If loading user state, show a clean, simple dark-themed skeleton loader
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c0c0e]">
        <div className="w-12 h-12 border-2 border-t-[#e63946] border-zinc-800 rounded-full animate-spin"></div>
        <p className="mt-4 text-zinc-500 font-mono text-xs tracking-widest uppercase">Đang tải...</p>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
