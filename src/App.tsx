import { Navbar } from './components/Navbar';
import { EditorPane } from './components/EditorPane';
import { PreviewPane } from './components/PreviewPane';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-900 overflow-hidden font-sans text-neutral-100">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 flex overflow-hidden">
        <section className="w-1/2 min-w-[300px] h-full flex flex-col relative z-10 shadow-2xl">
          <EditorPane />
        </section>
        <section className="w-1/2 min-w-[300px] h-full overflow-hidden bg-neutral-950 relative">
          <div className="absolute inset-0 bg-grid-neutral-800/[0.04] bg-[size:16px_16px]" />
          <PreviewPane />
        </section>
      </main>
    </div>
  );
}

export default App;
