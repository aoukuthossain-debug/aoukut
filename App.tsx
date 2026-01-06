
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Eye, 
  Code2, 
  History, 
  ChevronRight,
  Terminal,
  Loader2
} from 'lucide-react';
import Header from './components/Header';
import PreviewFrame from './components/PreviewFrame';
import CodeBlock from './components/CodeBlock';
import { generateHTML } from './geminiService';
import { GeneratedCode, ViewMode, HistoryItem } from './types';

const INITIAL_PROMPT = "Create a modern landing page hero section for a creative agency with a glassmorphism theme and a 'Get Started' button.";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GeneratedCode | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PREVIEW);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = prompt.trim() || INITIAL_PROMPT;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateHTML(query);
      setCurrentResult(result);
      setViewMode(ViewMode.PREVIEW);
      
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        prompt: query,
        code: result
      };
      setHistory(prev => [newItem, ...prev].slice(0, 10));
    } catch (err) {
      setError("Failed to generate component. Please check your API key and network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial generation
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFromHistory = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setCurrentResult(item.code);
    setViewMode(ViewMode.PREVIEW);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-200">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Controls */}
        <aside className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-white">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Generator
            </h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={INITIAL_PROMPT}
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-600 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/10"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Crafting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate Component
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">
              <History className="w-4 h-4" />
              Recent Builds
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
              {history.length === 0 && !isLoading && (
                <p className="text-sm text-slate-600 italic">No history yet.</p>
              )}
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group"
                >
                  <p className="text-sm font-medium text-slate-300 line-clamp-2 mb-1">
                    {item.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {new Date(item.code.timestamp).toLocaleTimeString()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode(ViewMode.PREVIEW)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                  viewMode === ViewMode.PREVIEW 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setViewMode(ViewMode.CODE)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                  viewMode === ViewMode.CODE 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Code
              </button>
            </div>
            
            <div className="px-4 text-xs font-mono text-slate-500 hidden sm:block">
              gemini-3-flash-preview
            </div>
          </div>

          <div className="flex-1 min-h-[500px] relative">
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div className="max-w-md">
                  <RotateCcw className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
                  <p className="text-slate-400 mb-6">{error}</p>
                  <button 
                    onClick={() => handleGenerate()}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : currentResult ? (
              <div className="h-full animate-in fade-in duration-500">
                {viewMode === ViewMode.PREVIEW ? (
                  <PreviewFrame html={currentResult.html} />
                ) : (
                  <CodeBlock code={currentResult.html} />
                )}
              </div>
            ) : isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/20 backdrop-blur-[2px] rounded-2xl border border-slate-800">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <Terminal className="absolute inset-0 m-auto w-6 h-6 text-indigo-400" />
                </div>
                <p className="text-slate-400 font-medium animate-pulse">Compiling your masterpiece...</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-600">Enter a prompt to begin</p>
              </div>
            )}
          </div>

          {currentResult && (
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                AI Insights
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {currentResult.explanation}
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="py-6 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} HTML Craft. Built with Gemini 3 Flash & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Feedback</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
