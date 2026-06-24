import { Timer, FileText, ArrowRight, Info, CheckCircle2, XCircle, PauseCircle } from 'lucide-react';

export default function Exams() {
  return (
    <div className="max-w-[1280px] mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-on-surface">Mock Exams Library</h2>
          <p className="text-lg text-on-surface-variant mt-2">Test your knowledge under real exam conditions to prepare for the JLPT.</p>
        </div>
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
            <button key={lvl} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-transform ${lvl === 'N3' ? 'bg-primary text-on-primary shadow-sm hover:-translate-y-0.5' : 'bg-surface-container text-on-surface-variant border border-outline-variant hover:bg-surface-container-highest'}`}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section>
            <h3 className="text-2xl font-bold text-on-surface mb-4">N3 Mock Exams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-on-surface">Đề thi thử N3 - 2023</h4>
                  <span className="bg-surface-container-highest text-on-surface-variant text-xs px-2 py-0.5 rounded font-medium">New</span>
                </div>
                <div className="flex space-x-4 mb-6 text-on-surface-variant">
                  <div className="flex items-center space-x-1"><Timer size={16}/><span className="text-sm font-medium">120 min</span></div>
                  <div className="flex items-center space-x-1"><FileText size={16}/><span className="text-sm font-medium">105 Questions</span></div>
                </div>
                <button className="w-full mt-auto bg-primary text-on-primary text-sm py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                  <span>Làm bài</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-on-surface">JLPT N3 Official Mock</h4>
                </div>
                <div className="flex space-x-4 mb-6 text-on-surface-variant">
                  <div className="flex items-center space-x-1"><Timer size={16}/><span className="text-sm font-medium">120 min</span></div>
                  <div className="flex items-center space-x-1"><FileText size={16}/><span className="text-sm font-medium">105 Questions</span></div>
                </div>
                <button className="w-full mt-auto border border-primary text-primary text-sm py-2.5 rounded-xl font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center space-x-2">
                  <span>Làm bài</span>
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-on-surface">Exam Experience Preview</h3>
              <span className="text-xs text-on-surface-variant flex items-center"><Info size={14} className="mr-1"/> Simulates real test</span>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="bg-surface-container px-4 py-3 border-b border-outline-variant flex justify-between items-center">
                <div className="flex items-center space-x-2 text-primary">
                  <Timer size={18} />
                  <span className="font-mono text-base font-bold">01:45:22</span>
                </div>
                <div className="text-sm font-medium text-on-surface-variant">Vocabulary / Kanji</div>
                <button className="text-sm text-error font-medium hover:bg-error-container px-2 py-1 rounded transition-colors">End Exam</button>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 p-6 border-r border-outline-variant bg-surface flex flex-col">
                  <div className="mb-4">
                    <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Question 12</span>
                  </div>
                  <div className="text-2xl font-jp text-on-surface mb-8 leading-relaxed font-medium">
                    この漢字の正しい読み方を選んでください。<br/>
                    <span className="text-primary font-bold">「約束」</span>
                  </div>
                  <div className="space-y-3 mt-auto">
                    <label className="flex items-center space-x-3 p-3.5 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                      <input type="radio" name="q" className="text-primary focus:ring-primary h-4 w-4 border-outline" />
                      <span className="text-base text-on-surface">やそく</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3.5 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer transition-colors">
                      <input type="radio" name="q" defaultChecked className="text-primary focus:ring-primary h-4 w-4 border-primary" />
                      <span className="text-base text-on-surface font-medium">やくそく</span>
                    </label>
                  </div>
                </div>
                <div className="w-56 bg-surface-container-lowest p-4 flex flex-col border-l border-outline-variant/50">
                  <div className="text-sm text-on-surface-variant mb-4 font-bold">Navigator</div>
                  <div className="grid grid-cols-4 gap-2 overflow-y-auto no-scrollbar pb-4">
                    {[1,2,3,4,5,6,7,8,9,10,11].map(n => (
                      <div key={n} className="h-9 w-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center text-sm font-medium border border-secondary-fixed">{n}</div>
                    ))}
                    <div className="h-9 w-9 rounded-lg bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-primary ring-offset-2">12</div>
                    {[13,14,15,16].map(n => (
                      <div key={n} className="h-9 w-9 rounded-lg bg-surface border border-outline-variant text-on-surface-variant flex items-center justify-center text-sm">{n}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-gradient-to-tr from-secondary to-primary pointer-events-none"></div>
            <h3 className="text-lg font-bold text-on-surface mb-4 relative z-10">Readiness Score</h3>
            <div className="flex items-end space-x-2 mb-2 relative z-10">
              <span className="text-5xl font-bold text-primary leading-none tracking-tight">78%</span>
              <span className="text-sm text-on-surface-variant pb-1 font-medium">Pass probability</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-2 mt-6 relative z-10">
              <div className="bg-secondary h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface">Recent History</h3>
              <button className="text-primary text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center mr-4">
                  <CheckCircle2 size={20} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Đề thi thử N3 - 2022</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Oct 12, 2023</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-secondary">115/180</p>
                  <p className="text-xs text-secondary mt-0.5">Passed</p>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="h-10 w-10 rounded-full bg-error-container flex items-center justify-center mr-4">
                  <XCircle size={20} className="text-error" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">JLPT N3 Official</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Sep 28, 2023</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-error">85/180</p>
                  <p className="text-xs text-error mt-0.5">Failed</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="h-10 w-10 rounded-full bg-surface-variant flex items-center justify-center mr-4">
                  <PauseCircle size={20} className="text-on-surface-variant" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Mock Test Alpha</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Sep 15, 2023</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-on-surface-variant">--/180</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Incomplete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
