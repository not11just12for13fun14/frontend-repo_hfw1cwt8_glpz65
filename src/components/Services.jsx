import { useEffect, useState, useMemo } from "react";
import ServiceCard from "./ServiceCard";

export default function Services({ onSelect }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${backend}/api/services`);
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data);
      } catch (e) {
        setError("Could not load services. Try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [backend]);

  const filtered = useMemo(() => {
    if (!query) return services;
    const q = query.toLowerCase();
    return services.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [services, query]);

  return (
    <section id="services" className="relative bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Our Services</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cleaning, sofa, pest..."
            className="w-full sm:w-80 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>

        {loading ? (
          <div className="text-slate-500">Loading services...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <ServiceCard key={s.id} service={s} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
