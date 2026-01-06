
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group h-full">
      <button
        onClick={copyToClipboard}
        className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-slate-700"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="p-6 bg-slate-900 text-slate-100 rounded-xl font-mono text-sm overflow-auto h-full border border-slate-800 no-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
