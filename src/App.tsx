import { useState, useEffect } from "react";

// --- Types ---
interface DocItem {
  id: string;
  title: string;
  filename: string;
}

// --- Data ---
const DOCS: DocItem[] = [
  { id: "packages", title: "Packages", filename: "Packages.html" },
  { id: "bundle-prices", title: "Bundle Prices", filename: "Bundel prices.html" },
  { id: "services-prices", title: "Services Prices", filename: "Services prices.html" },
  { id: "prod-arch", title: "Spikad Product Architecture – Production Stages", filename: "!-- Spikad Product Architecture – P.html" },
  { id: "accounting", title: "Accounting Packages", filename: "Accounting packages.html" },
  { id: "prod-line", title: "Production Line System", filename: "Production line system.html" },
  { id: "journey", title: "Package Journeys (Factory View)", filename: "Package Journeys (Factory View).html" },
  { id: "internal-process", title: "Internal Process Design (Visual)", filename: "Internal Process Design (Visual).html" },
  { id: "org-structure", title: "Org Structure", filename: "Org structure.html" },
  { id: "transition-snapshot", title: "Transition Snapshot", filename: "Transition Snapshot.html" },
  { id: "intake-system", title: "Intake System", filename: "Intake system.html" },
  { id: "build-system", title: "Build System", filename: "Build system.html" },
  { id: "operation-system", title: "Operation System", filename: "Operation system.html" },
  { id: "launch-offer", title: "Launch Offer", filename: "Launch Offer.html" },
];

function App() {
  // --- State ---
  const [activeDocId, setActiveDocId] = useState<string>(() => {
    return localStorage.getItem("spikad_active_doc") || DOCS[0].id;
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("spikad_active_doc", activeDocId);
  }, [activeDocId]);

  // --- Helpers ---
  const activeDoc = DOCS.find(d => d.id === activeDocId) || DOCS[0];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans">

      {/* Sidebar */}
      <aside
        className={`bg-gray-950 border-r border-gray-800 flex-shrink-0 transition-all duration-300 flex flex-col ${isSidebarOpen ? "w-72" : "w-0 -ml-0"
          } ${!isSidebarOpen && "hidden"}`} // hide completely when closed to prevent layout shifts if needed, but transition is nice
      >
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <img src="/logo.png" alt="Spikad Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold tracking-tight text-white">Spikad <span className="text-gray-500 text-sm font-normal block mt-1">Operating System</span></h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocId(doc.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${activeDocId === doc.id
                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                }`}
            >
              {doc.title}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
          <p>Internal Use Only</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">

        {/* Mobile / Toggle Header */}
        <header className="h-14 bg-gray-950/50 border-b border-gray-800 flex items-center px-4 justify-between flex-shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-md hover:bg-gray-800 text-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h2 className="font-semibold text-gray-200 truncate">{activeDoc.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/diagrams/${activeDoc.filename}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 bg-gray-900 border border-gray-700 px-2 py-1 rounded"
            >
              <span>Open raw</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </header>

        {/* Iframe Container */}
        <div className="flex-1 bg-white relative w-full h-full overflow-hidden">
          {/* We use a key on the iframe to force re-render when switching docs if needed, 
                 but actually we want to just change src. However, some diagrams might have internal state.
                 Since they are static HTMLs, changing src is fine. 
                 Using object or iframe. Iframe is best for isolation.
             */}
          <iframe
            key={activeDoc.filename}
            src={`/diagrams/${activeDoc.filename}`}
            className="w-full h-full border-none block"
            title={activeDoc.title}
          />
        </div>

      </main>
    </div>
  );
}

export default App;
