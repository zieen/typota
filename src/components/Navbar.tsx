import React from 'react';
import { Download, Copy, Settings, Type } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar: React.FC = () => {
  const { markdown } = useStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <nav className="h-14 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Type size={18} className="font-bold" />
        </div>
        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
          Typota
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={handleCopy}
          className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2 text-sm"
          title="Copy Markdown"
        >
          <Copy size={16} />
          <span className="hidden sm:inline">Copy</span>
        </button>
        <button 
          onClick={handleDownload}
          className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2 text-sm"
          title="Download .md"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </button>
        <div className="w-px h-6 bg-neutral-800 mx-2" />
        <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
          <Settings size={18} />
        </button>
      </div>
    </nav>
  );
};
