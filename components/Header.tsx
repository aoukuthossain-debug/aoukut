
import React from 'react';
import { Code2, Github, Layout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            HTML Craft
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Components</a>
            <a href="#" className="hover:text-white transition-colors">Templates</a>
          </nav>
          <div className="h-6 w-px bg-slate-800 hidden md:block"></div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
