import { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useStore } from '../store/useStore';

export const EditorPane: React.FC = () => {
  const { markdown, setMarkdown } = useStore();
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('typota-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword.md', foreground: 'C586C0', fontStyle: 'bold' },
          { token: 'strong.md', foreground: '569CD6', fontStyle: 'bold' },
          { token: 'emphasis.md', fontStyle: 'italic' },
          { token: 'string.link.md', foreground: 'CE9178' },
        ],
        colors: {
          'editor.background': '#171717', // Match neutral-900
          'editor.lineHighlightBackground': '#262626',
          'editorLineNumber.foreground': '#525252',
          'editorIndentGuide.background': '#262626',
        }
      });
      monaco.editor.setTheme('typota-dark');
    }
  }, [monaco]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setMarkdown(value);
    }
  };

  return (
    <div className="h-full w-full bg-neutral-900 border-r border-neutral-800 flex flex-col pt-4">
      <Editor
        height="100%"
        defaultLanguage="markdown"
        value={markdown}
        onChange={handleEditorChange}
        theme="typota-dark" // fallback until typota-dark is loaded
        options={{
          minimap: { enabled: false },
          wordWrap: 'on',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          fontSize: 14,
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'all',
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden'
          },
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true
        }}
      />
    </div>
  );
};
