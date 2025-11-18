import { useRef, useState, useEffect } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingForm from "./components/BookingForm";

function App() {
  const servicesRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function seed() {
      try {
        await fetch(`${backend}/api/seed`, { method: "POST" });
      } catch (e) {
        // ignore
      }
    }
    if (backend) seed();
  }, [backend]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-slate-900">GharSeva</div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#booking" className="hover:text-slate-900">Get a quote</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onExplore={scrollToServices} />
        <Services onSelect={(s) => {
          setSelected(s);
          setTimeout(() => {
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }} />
        <BookingForm selectedService={selected} onSuccess={() => setSelected(null)} />
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} GharSeva — Housekeeping services across India</div>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-slate-900">Pricing</a>
            <a href="#booking" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
