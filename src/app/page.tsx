'use client';
import { handleRegistration } from "./actions/register";
import { useState, useMemo } from 'react';
import {
  BarChart2, Menu, X, ArrowRight, MapPin, Users, BookOpen, TrendingUp,
  Smartphone, Globe, GraduationCap, Heart, Calendar, Clock, Tag,
  CheckCircle, ChevronRight, Search, Download, FileText, Filter
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Level = 'Semua' | 'Pemula' | 'Menengah' | 'Mahir';
interface Webinar {
  id: string; title: string; date: string; time: string;
  speaker: string; role: string; tags: string[];
  seats: number; registered: number; level: Exclude<Level, 'Semua'>;
}
interface Resource {
  id: string; title: string; description: string;
  level: Exclude<Level, 'Semua'>; category: string;
  pages: number; downloads: number; href: string;
}
interface FormData { nama: string; email: string; profesi: string; }

// ─── Mock Data ────────────────────────────────────────────────────────────────
const WEBINARS: Webinar[] = [
  { id: 'w1', title: 'Statistik Dasar untuk Non-Teknis: Memahami Data Sehari-hari', date: 'Sabtu, 22 Juni 2026', time: '10.00–12.00 WIB', speaker: 'Budi Santoso, M.Stat', role: 'Data Analyst — BPS Indonesia', tags: ['Statistik', 'Gratis'], seats: 200, registered: 134, level: 'Pemula' },
  { id: 'w2', title: 'Python Pandas untuk Analisis Data Bisnis UMKM', date: 'Minggu, 29 Juni 2026', time: '13.00–15.30 WIB', speaker: 'Rina Wulandari, S.Kom', role: 'Senior Data Engineer — Tokopedia', tags: ['Python', 'Pandas'], seats: 150, registered: 89, level: 'Menengah' },
  { id: 'w3', title: 'Visualisasi Data Interaktif dengan Tableau Public', date: 'Sabtu, 6 Juli 2026', time: '09.00–11.00 WIB', speaker: 'Arif Hidayat', role: 'BI Analyst — Gojek', tags: ['Tableau', 'Dashboard'], seats: 100, registered: 72, level: 'Menengah' },
  { id: 'w4', title: 'Pengantar Machine Learning: Dari Konsep ke Kode', date: 'Minggu, 13 Juli 2026', time: '14.00–17.00 WIB', speaker: 'Dr. Sari Dewi', role: 'ML Researcher — Universitas Indonesia', tags: ['ML', 'Scikit-learn'], seats: 80, registered: 80, level: 'Mahir' },
];

const RESOURCES: Resource[] = [
  { id: 'r1', title: 'Panduan Statistik Deskriptif untuk Pemula', description: 'Memahami mean, median, modus, dan distribusi data dalam kehidupan nyata dengan contoh lokal.', level: 'Pemula', category: 'Statistik', pages: 24, downloads: 3420, href: '#' },
  { id: 'r2', title: 'Cheat Sheet Python Pandas', description: 'Referensi cepat fungsi-fungsi esensial Pandas untuk analisis data sehari-hari.', level: 'Menengah', category: 'Python', pages: 4, downloads: 5810, href: '#' },
  { id: 'r3', title: 'Pengantar SQL: Query dari Nol', description: 'Belajar SELECT, WHERE, JOIN, dan GROUP BY dengan contoh data bisnis Indonesia.', level: 'Pemula', category: 'SQL', pages: 30, downloads: 4120, href: '#' },
  { id: 'r4', title: 'Panduan Visualisasi Data yang Efektif', description: 'Prinsip desain visualisasi dan kapan harus menggunakan jenis grafik tertentu.', level: 'Menengah', category: 'Visualisasi', pages: 18, downloads: 2750, href: '#' },
  { id: 'r5', title: 'Machine Learning Glossary: 100 Istilah Penting', description: 'Kamus lengkap istilah ML dari A sampai Z dalam Bahasa Indonesia.', level: 'Mahir', category: 'Machine Learning', pages: 36, downloads: 1890, href: '#' },
  { id: 'r6', title: 'Analisis Data Bisnis UMKM: Studi Kasus Nyata', description: 'Contoh analisis penjualan toko retail kecil menggunakan spreadsheet sederhana.', level: 'Pemula', category: 'Bisnis', pages: 22, downloads: 2180, href: '#' },
  { id: 'r7', title: 'Eksplorasi Data dengan Python (EDA)', description: 'Teknik EDA lengkap: missing values, outlier detection, dan visualisasi distribusi.', level: 'Menengah', category: 'Python', pages: 28, downloads: 3310, href: '#' },
  { id: 'r8', title: 'Pengantar Deep Learning: Neural Network untuk Semua', description: 'Konsep dasar neural network dijelaskan tanpa rumus matematika yang menakutkan.', level: 'Mahir', category: 'Deep Learning', pages: 42, downloads: 1650, href: '#' },
  { id: 'r9', title: 'Excel untuk Analisis Data Bisnis', description: 'VLOOKUP, Pivot Table, dan chart dasar untuk analisis data tanpa coding.', level: 'Pemula', category: 'Excel', pages: 32, downloads: 6240, href: '#' },
];

const STATS = [
  { value: '34', label: 'Provinsi Terjangkau', icon: MapPin },
  { value: '12.400+', label: 'Pelajar Aktif', icon: Users },
  { value: '80+', label: 'Modul Gratis', icon: BookOpen },
  { value: '93%', label: 'Puas Belajar Mandiri', icon: TrendingUp },
];

const VALUE_PROPS = [
  { icon: Smartphone, title: 'Ramah HP Low-Spec', desc: 'Dioptimalkan untuk Android entry-level dan koneksi 3G. Belajar tanpa hambatan teknis.' },
  { icon: Globe, title: '100% Bahasa Indonesia', desc: 'Setiap konsep dijelaskan dalam bahasa yang mudah dipahami, tanpa istilah asing membingungkan.' },
  { icon: GraduationCap, title: 'Terstruktur & Bertahap', desc: 'Kurikulum dari nol hingga mahir dirancang oleh praktisi industri dan akademisi Indonesia.' },
  { icon: Heart, title: 'Selamanya Gratis', desc: 'Materi inti tidak pernah berbayar. Literasi data adalah hak, bukan privilese.' },
];

const LEVEL_FILTERS: Level[] = ['Semua', 'Pemula', 'Menengah', 'Mahir'];

const LEVEL_BADGE: Record<Exclude<Level, 'Semua'>, string> = {
  Pemula: 'bg-sky-100 text-sky-700',
  Menengah: 'bg-amber-100 text-amber-700',
  Mahir: 'bg-rose-100 text-rose-700',
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Webinar', href: '#webinar' },
    { label: 'Sumber Belajar', href: '#sumber-belajar' },
    { label: 'Tentang', href: '#tentang' },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#beranda" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white">
            <BarChart2 size={18} strokeWidth={2.5} />
          </span>
          <span className="font-bold text-slate-900 text-lg">Data<span className="text-emerald-600">Rakyat</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#sumber-belajar" className="hidden md:inline-flex text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
          Mulai Gratis
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100" aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4">
          <ul className="pt-2 space-y-1">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#sumber-belajar" className="mt-3 block text-center text-sm font-semibold px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            Mulai Gratis
          </a>
        </div>
      )}
    </header>
  );
}


function HeroSection() {
  return (
    <section id="beranda" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #1e9e6e18 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Dari Sabang sampai Merauke</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Data Bukan Milik{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-emerald-600">Elite</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-100 rounded -z-0" />
            </span>
            {' '}— Itu Milik Kita Semua
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
            DataRakyat hadir untuk memastikan setiap warga Indonesia — dari mahasiswa NTT hingga pengusaha Aceh — bisa membaca, memahami, dan menggunakan data untuk hidup yang lebih baik.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#sumber-belajar" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
              Mulai Belajar Gratis <ArrowRight size={18} />
            </a>
            <a href="#webinar" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 transition-colors">
              Lihat Webinar Mendatang
            </a>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <span className="p-1.5 rounded-lg bg-emerald-50 w-fit"><Icon size={16} className="text-emerald-600" /></span>
              <span className="text-2xl font-extrabold text-slate-900">{value}</span>
              <span className="text-xs font-medium text-slate-500 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePropsSection() {
  return (
    <section id="tentang" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">Kenapa DataRakyat?</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Dirancang untuk Kondisi Nyata Indonesia
          </h2>
          <p className="text-slate-600 text-lg">Kami tidak menyalin platform luar negeri. DataRakyat dibangun dari kebutuhan nyata pelajar dari Jayapura, Kupang, Pontianak, dan kota-kota kecil lainnya.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <Icon size={22} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 sm:p-10 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-200 mb-3">Visi Kami</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4">
              Pada 2030, setiap pelajar Indonesia bisa membaca data seperti membaca berita.
            </h3>
            <p className="text-emerald-100 text-base leading-relaxed">Sebanyak 17.000 pulau, 700+ bahasa daerah, satu tujuan: menjadi bangsa yang melek data dan berdaulat atas informasi.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrationModal({ webinar, onClose }: { webinar: Webinar; onClose: () => void }) {
  const [form, setForm] = useState<FormData>({ nama: '', email: '', profesi: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.nama.trim()) e.nama = 'Nama wajib diisi';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email tidak valid';
    if (!form.profesi.trim()) e.profesi = 'Profesi wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Daftar Webinar</p>
            <h3 className="font-bold text-slate-900 text-base leading-tight max-w-xs">{webinar.title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors ml-3 flex-shrink-0">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-4 gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={36} className="text-emerald-500" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Pendaftaran Berhasil!</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Konfirmasi telah dikirim ke <strong>{form.email}</strong>. Tautan webinar akan dikirimkan sehari sebelum acara.
              </p>
              <button onClick={onClose} className="mt-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm">
                Kembali ke Daftar Webinar
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {webinar.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {webinar.time}</span>
              </div>
              {([
                { key: 'nama' as const, label: 'Nama Lengkap', placeholder: 'Contoh: Budi Santoso', type: 'text' },
                { key: 'email' as const, label: 'Alamat Email', placeholder: 'budi@email.com', type: 'email' },
                { key: 'profesi' as const, label: 'Profesi / Latar Belakang', placeholder: 'Contoh: Mahasiswa, Guru, UMKM', type: 'text' },
              ]).map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-300 transition-all ${errors[key] ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white'}`}
                  />
                  {errors[key] && <p className="mt-1 text-xs text-rose-600">{errors[key]}</p>}
                </div>
              ))}
              <button
                onClick={() => { if (validate()) setSubmitted(true); }}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-2"
              >
                Daftar Sekarang <ChevronRight size={16} />
              </button>
              <p className="text-center text-xs text-slate-400">Data kamu aman. Tidak ada spam, dijamin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WebinarSection() {
  const [activeModal, setActiveModal] = useState<Webinar | null>(null);

  return (
    <section id="webinar" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">Webinar Mendatang</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">Belajar Langsung dari Praktisi</h2>
            <p className="mt-3 text-slate-600 max-w-xl">Sesi langsung dengan profesional data dari perusahaan teknologi terkemuka Indonesia. Gratis, interaktif, dari mana saja.</p>
          </div>
          <a href="#" className="flex-shrink-0 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2">Lihat semua webinar →</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WEBINARS.map(w => {
            const isFull = w.registered >= w.seats;
            const pct = Math.round((w.registered / w.seats) * 100);
            return (
              <div key={w.id} className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_BADGE[w.level]}`}>{w.level}</span>
                    {w.tags.slice(0, 2).map(t => (
                      <span key={t} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        <Tag size={10} /> {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug flex-1">{w.title}</h3>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{w.speaker}</p>
                    <p className="text-xs text-slate-500">{w.role}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-emerald-500" /> {w.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-emerald-500" /> {w.time}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1"><Users size={11} /> {w.registered}/{w.seats} peserta</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${isFull ? 'bg-rose-400' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <button
                    disabled={isFull}
                    onClick={() => !isFull && setActiveModal(w)}
                    className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${isFull ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20'}`}
                  >
                    {isFull ? 'Penuh — Pantau Berikutnya' : 'Daftar Gratis'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {activeModal && <RegistrationModal webinar={activeModal} onClose={() => setActiveModal(null)} />}
    </section>
  );
}

function ResourcesSection() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Level>('Semua');

  const filtered = useMemo(() => RESOURCES.filter(r => {
    const matchLevel = filter === 'Semua' || r.level === filter;
    const q = query.toLowerCase();
    const matchQuery = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
    return matchLevel && matchQuery;
  }), [query, filter]);

  return (
    <section id="sumber-belajar" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">Perpustakaan DataRakyat</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">Unduh Gratis, Belajar Kapan Saja</h2>
          <p className="text-slate-600 max-w-xl">Semua panduan, cheat sheet, dan e-book ditulis dalam Bahasa Indonesia. Bisa diunduh tanpa akun, cocok untuk koneksi lambat.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Cari panduan, topik, atau kata kunci..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-400 flex-shrink-0" />
            {LEVEL_FILTERS.map(l => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${filter === l ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Menampilkan <strong>{filtered.length}</strong> sumber belajar
          {filter !== 'Semua' ? ` untuk level "${filter}"` : ''}
          {query ? ` yang cocok dengan "${query}"` : ''}
        </p>
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(r => (
              <div key={r.id} className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                    <FileText size={20} className="text-emerald-600" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_BADGE[r.level]}`}>{r.level}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1.5 flex-1">{r.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{r.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{r.pages} hal.</span>
                    <span className="flex items-center gap-0.5"><Download size={11} /> {r.downloads.toLocaleString('id-ID')}</span>
                  </div>
                  <a href={r.href} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
                    <Download size={13} /> Unduh PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-700 mb-1">Tidak ditemukan</h4>
            <p className="text-sm text-slate-500">Coba ubah kata kunci atau pilih level yang berbeda.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { heading: 'Platform', links: ['Beranda', 'Webinar', 'Sumber Belajar'] },
    { heading: 'Komunitas', links: ['Forum Diskusi', 'Kontribusi Materi', 'Jadi Pembicara'] },
    { heading: 'Tentang', links: ['Misi Kami', 'Tim', 'Kebijakan Privasi'] },
  ];
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white">
                <BarChart2 size={18} strokeWidth={2.5} />
              </span>
              <span className="font-extrabold text-white text-lg">Data<span className="text-emerald-400">Rakyat</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-5">Literasi data untuk semua warga Indonesia. Gratis, terbuka, dan berdaulat.</p>
            <div className="flex gap-3">
              {[Globe, Users, BookOpen].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-700 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l}><a href="#" className="text-sm hover:text-emerald-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© 2026 DataRakyat. Dibuat dengan ♥ untuk Indonesia.</p>
          <p>Data Dari Nol Initiative — dari Sabang sampai Merauke</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Root Page ─────────────────────────────────────────────────────────────────
export default function DataRakyatPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ValuePropsSection />
        <WebinarSection />
        <ResourcesSection />
      </main>
      <Footer />
    </>
  );
}