export default function ServiceCard({ service, onSelect }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {service.name}
          </h3>
          <p className="mt-1 text-slate-600 text-sm">
            {service.description}
          </p>
        </div>
        {service.popular ? (
          <span className="text-xs font-medium text-sky-700 bg-sky-50 border border-sky-100 px-2 py-1 rounded-full">Popular</span>
        ) : null}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">₹{service.price_inr}</div>
          <div className="text-xs text-slate-500">{service.unit}</div>
        </div>
        <button onClick={() => onSelect(service)} className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800">
          Book
        </button>
      </div>
    </div>
  );
}
