"use client";
import { handleRegistration } from "@/app/actions/register.TS";

// ... the rest of your imports follow below
import { useState } from "react";
import { Calendar, Clock, Users, Tag, X, CheckCircle, ChevronRight } from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */
interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  role: string;
  tags: string[];
  seats: number;
  registered: number;
  level: "Pemula" | "Menengah" | "Mahir";
}

interface FormData {
  nama: string;
  email: string;
  profesi: string;
}

/* ─── Data ──────────────────────────────────────────── */
const webinars: Webinar[] = [
  {
    id: "w1",
    title: "Statistik Dasar untuk Non-Teknis: Memahami Data Sehari-hari",
    date: "Sabtu, 22 Juni 2026",
    time: "10.00 – 12.00 WIB",
    speaker: "Budi Santoso, M.Stat",
    role: "Data Analyst — BPS Indonesia",
    tags: ["Statistik", "Pemula", "Gratis"],
    seats: 200,
    registered: 134,
    level: "Pemula",
  },
  {
    id: "w2",
    title: "Python Pandas untuk Analisis Data Bisnis UMKM",
    date: "Minggu, 29 Juni 2026",
    time: "13.00 – 15.30 WIB",
    speaker: "Rina Wulandari, S.Kom",
    role: "Senior Data Engineer — Tokopedia",
    tags: ["Python", "Pandas", "UMKM"],
    seats: 150,
    registered: 89,
    level: "Menengah",
  },
  {
    id: "w3",
    title: "Visualisasi Data Interaktif dengan Tableau Public",
    date: "Sabtu, 6 Juli 2026",
    time: "09.00 – 11.00 WIB",
    speaker: "Arif Hidayat",
    role: "BI Analyst — Gojek",
    tags: ["Visualisasi", "Tableau", "Dashboard"],
    seats: 100,
    registered: 72,
    level: "Menengah",
  },
  {
    id: "w4",
    title: "Pengantar Machine Learning: Dari Konsep ke Kode",
    date: "Minggu, 13 Juli 2026",
    time: "14.00 – 17.00 WIB",
    speaker: "Dr. Sari Dewi",
    role: "ML Researcher — UI",
    tags: ["Machine Learning", "Python", "Scikit-learn"],
    seats: 80,
    registered: 80,
    level: "Mahir",
  },
];

const levelColors: Record<Webinar["level"], string> = {
  Pemula:   "bg-sky-100 text-sky-700",
  Menengah: "bg-amber-100 text-amber-700",
  Mahir:    "bg-rose-100 text-rose-700",
};

/* ─── Modal ─────────────────────────────────────────── */
function RegistrationModal({
  webinar,
  onClose,
}: {
  webinar: Webinar;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({ nama: "", email: "", profesi: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.nama.trim())    e.nama    = "Nama wajib diisi";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                               e.email   = "Email tidak valid";
    if (!form.profesi.trim()) e.profesi = "Profesi wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">
              Daftar Webinar
            </p>
            <h3 className="font-display font-bold text-slate-900 text-base leading-tight max-w-xs">
              {webinar.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors ml-3 mt-0.5 flex-shrink-0">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-4 gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={36} className="text-emerald-500" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-lg">Pendaftaran Berhasil!</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Konfirmasi telah dikirim ke <strong>{form.email}</strong>. Kami akan mengirimkan
                tautan webinar sehari sebelum acara.
              </p>
              <button
                onClick={onClose}
                className="mt-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm"
              >
                Kembali ke Daftar Webinar
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Info badges */}
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {webinar.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {webinar.time}</span>
              </div>

              {/* Fields */}
              {(
                [
                  { key: "nama",    label: "Nama Lengkap",  placeholder: "Contoh: Budi Santoso",        type: "text" },
                  { key: "email",   label: "Alamat Email",  placeholder: "budi@email.com",              type: "email" },
                  { key: "profesi", label: "Profesi / Latar Belakang", placeholder: "Contoh: Mahasiswa, Guru, UMKM", type: "text" },
                ] as const
              ).map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-300 transition-all ${
                      errors[key] ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"
                    }`}
                  />
                  {errors[key] && (
                    <p className="mt-1 text-xs text-rose-600">{errors[key]}</p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-2"
              >
                Daftar Sekarang <ChevronRight size={16} />
              </button>
              <p className="text-center text-xs text-slate-400">
                Data kamu aman. Tidak ada spam, dijamin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Card ──────────────────────────────────────────── */
function WebinarCard({ webinar, onRegister }: { webinar: Webinar; onRegister: (w: Webinar) => void }) {
  const isFull = webinar.registered >= webinar.seats;
  const pct    = Math.round((webinar.registered / webinar.seats) * 100);

  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600" />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Level + tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${levelColors[webinar.level]}`}>
            {webinar.level}
          </span>
          {webinar.tags.slice(0, 2).map((t) => (
            <span key={t} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              <Tag size={10} /> {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-slate-900 text-base leading-snug text-balance flex-1">
          {webinar.title}
        </h3>

        {/* Speaker */}
        <div>
          <p className="text-sm font-semibold text-slate-800">{webinar.speaker}</p>
          <p className="text-xs text-slate-500">{webinar.role}</p>
        </div>

        {/* Date / time */}
        <div className="flex flex-col gap-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-emerald-500" /> {webinar.date}</span>
          <span className="flex items-center gap-1.5"><Clock    size={12} className="text-emerald-500" /> {webinar.time}</span>
        </div>

        {/* Seats progress */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="flex items-center gap-1"><Users size={11} /> {webinar.registered}/{webinar.seats} peserta</span>
            <span>{pct}% terisi</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isFull ? "bg-rose-400" : "bg-emerald-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={isFull}
          onClick={() => !isFull && onRegister(webinar)}
          className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
            isFull
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20"
          }`}
        >
          {isFull ? "Penuh — Pantau Webinar Berikutnya" : "Daftar Gratis"}
        </button>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────── */
export default function WebinarSection() {
  const [activeModal, setActiveModal] = useState<Webinar | null>(null);

  return (
    <section id="webinar" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">
              Webinar Mendatang
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Belajar Langsung dari Praktisi
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl">
              Sesi langsung dengan para profesional data dari perusahaan teknologi terkemuka
              Indonesia. Gratis, interaktif, dan bisa diikuti dari mana saja.
            </p>
          </div>
          <a
            href="#"
            className="flex-shrink-0 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
          >
            Lihat semua webinar →
          </a>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {webinars.map((w) => (
            <WebinarCard key={w.id} webinar={w} onRegister={setActiveModal} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <RegistrationModal webinar={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}