import { motion } from "framer-motion";

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,#e0f2ff_0%,#ffffff_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-10 sm:pt-28 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sky-700/80 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full text-sm">
            Housekeeping Services Across India
          </span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight text-slate-900">
            Professional home care, simple pricing
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            From deep cleaning to sofa shampooing and pest control — book trusted professionals at transparent rates.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={onExplore} className="inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-6 py-3 font-medium shadow-sm hover:bg-sky-700 transition-colors">
              Explore services
            </button>
            <a href="#booking" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-50">
              Get a quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
