import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import { useStore } from '../store/useStore';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.render(id, chart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((e) => {
          console.error(e);
          if (ref.current) {
            // Provide visual feedback for mermaid syntax errors
            ref.current.innerHTML = `<pre class="text-red-400 bg-red-500/10 p-4 rounded-md text-sm overflow-auto w-full">${e.message}</pre>`;
          }
        });
    }
  }, [chart]);

  return <div ref={ref} className="mermaid flex justify-center w-full my-8" />;
};

export const PreviewPane: React.FC = () => {
  const { markdown } = useStore();

  return (
    <div className="h-full w-full overflow-y-auto bg-transparent p-8 lg:p-12 relative z-10">
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
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                // Note: The signature for 'code' in react-markdown includes 'inline' in some versions, 
                // but checking the match is sufficient for blocking mermaid rendering if it's a code block
                if (match && match[1] === 'mermaid') {
                  return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                }
                return (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
