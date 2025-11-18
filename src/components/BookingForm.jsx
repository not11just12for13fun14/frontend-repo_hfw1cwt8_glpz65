import { useState } from "react";

export default function BookingForm({ selectedService, onSuccess }) {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    service_id: selectedService?.id || "",
    service_name: selectedService?.name || "",
    preferred_date: "",
    preferred_time: "Morning",
    notes: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "", ok: false });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", ok: false });
    try {
      const res = await fetch(`${backend}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus({ loading: false, error: "", ok: true });
      onSuccess?.();
    } catch (e) {
      setStatus({ loading: false, error: "Something went wrong. Please try again.", ok: false });
    }
  }

  return (
    <section id="booking" className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Request a quote</h2>
          <p className="mt-1 text-slate-600 text-sm">Fill in your details and we'll reach out shortly.</p>

          {selectedService ? (
            <div className="mt-4 text-sm text-slate-700">
              Selected: <span className="font-medium">{selectedService.name}</span> — ₹{selectedService.price_inr} {selectedService.unit}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={form.customer_name} onChange={(e) => update("customer_name", e.target.value)} placeholder="Full name" className="rounded-lg border border-slate-200 px-4 py-2.5" required />
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone" className="rounded-lg border border-slate-200 px-4 py-2.5" required />
            <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email (optional)" className="rounded-lg border border-slate-200 px-4 py-2.5 sm:col-span-2" />
            <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Address" className="rounded-lg border border-slate-200 px-4 py-2.5 sm:col-span-2" required />

            <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className="rounded-lg border border-slate-200 px-4 py-2.5" required />
            <input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="PIN code" className="rounded-lg border border-slate-200 px-4 py-2.5" required />

            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input type="date" value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)} className="rounded-lg border border-slate-200 px-4 py-2.5" required />
              <select value={form.preferred_time} onChange={(e) => update("preferred_time", e.target.value)} className="rounded-lg border border-slate-200 px-4 py-2.5">
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              <input value={form.service_name} onChange={(e) => update("service_name", e.target.value)} placeholder="Service" className="rounded-lg border border-slate-200 px-4 py-2.5" required />
            </div>

            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Additional notes" className="rounded-lg border border-slate-200 px-4 py-2.5 sm:col-span-2" rows={3} />

            <div className="sm:col-span-2 flex items-center gap-3">
              <button disabled={status.loading} className="rounded-xl bg-sky-600 text-white px-6 py-3 font-medium hover:bg-sky-700 disabled:opacity-50">
                {status.loading ? "Submitting..." : "Submit request"}
              </button>
              {status.ok && <span className="text-sky-700">Thanks! We'll contact you soon.</span>}
              {status.error && <span className="text-red-600">{status.error}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
