import { create } from 'zustand';

interface EditorState {
  markdown: string;
  setMarkdown: (text: string) => void;
}

const defaultMarkdown = `# Welcome to Typota

This is a premium, web-based Markdown editor built with React and Vite.

## Features

- **Live Preview:** See your markdown rendered instantly.
- **Sleek Design:** A beautiful dark mode aesthetic.
- **Syntax Highlighting:** Write code with proper formatting.

### Example Code

\`\`\`javascript
function greet() {
  console.log("Hello, World!");
}
\`\`\`

Enjoy writing!
`;

export const useStore = create<EditorState>((set) => ({
  markdown: defaultMarkdown,
  setMarkdown: (text) => set({ markdown: text }),
}));
