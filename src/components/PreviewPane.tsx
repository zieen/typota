import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useStore } from '../store/useStore';

export const PreviewPane: React.FC = () => {
  const { markdown } = useStore();

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-950 p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-invert prose-neutral max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:to-neutral-400
          prose-h2:text-2xl prose-h2:border-b prose-h2:border-neutral-800 prose-h2:pb-2
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
          prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:font-normal prose-blockquote:not-italic
          prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-neutral-800
          transition-all duration-200 ease-in-out"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
