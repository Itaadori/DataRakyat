"use client";

import { useState, useMemo } from "react";
import { Search, Download, FileText, Filter } from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */
type Level = "Semua" | "Pemula" | "Menengah" | "Mahir";

interface Resource {
  id: string;
  title: string;
  description: string;
  level: Exclude<Level, "Semua">;
  category: string;
  pages: number;
  downloads: number;
  href: string;
}

/* ─── Placeholder data (to be replaced with real schema) ─── */
const resources: Resource[] = [
  {
    id: "r1",
    title: "Panduan Statistik Deskriptif untuk Pemula",
    description: "Memahami mean, median, modus, dan distribusi data dalam kehidupan nyata.",
    level: "Pemula",
    category: "Statistik",
    pages: 24,
    downloads: 3420,
    href: "#",
  },
  {
    id: "r2",
    title: "Cheat Sheet Python Pandas",
    description: "Referensi cepat fungsi-fungsi esensial Pandas untuk analisis data sehari-hari.",
    level: "Menengah",
    category: "Python",
    pages: 4,
    downloads: 5810,
    href: "#",
  },
  {
    id: "r3",
    title: "Pengantar SQL: Query dari Nol",
    description: "Belajar SELECT, WHERE, JOIN, dan GROUP BY dengan contoh data bisnis Indonesia.",
    level: "Pemula",
    category: "SQL",
    pages: 30,
    downloads: 4120,
    href: "#",
  },
  {
    id: "r4",
    title: "Panduan Visualisasi Data yang Efektif",
    description: "Prinsip-prinsip desain visualisasi dan kapan harus menggunakan jenis grafik tertentu.",
    level: "Menengah",
    category: "Visualisasi",
    pages: 18,
    downloads: 2750,
    href: "#",
  },
  {
    id: "r5",
    title: "Machine Learning Glossary: 100 Istilah Penting",
    description: "Kamus lengkap istilah ML dari A sampai Z dalam Bahasa Indonesia.",
    level: "Mahir",
    category: "Machine Learning",
    pages: 36,
    downloads: 1890,
    href: "#",
  },
  {
    id: "r6",
    title: "Analisis Data Bisnis UMKM: Studi Kasus",
    description: "Contoh nyata analisis penjualan toko retail kecil menggunakan spreadsheet.",
    level: "Pemula",
    category: "Bisnis",
    pages: 22,
    downloads: 2180,
    href: "#",
  },
];

const levels: Level[] = ["Semua", "Pemula", "Menengah", "Mahir"];

const levelStyle: Record<Exclude<Level, "Semua">, string> = {
  Pemula:   "bg-sky-100 text-sky-700",
  Menengah: "bg-amber-100 text-amber-700",
  Mahir:    "bg-rose-100 text-rose-700",
};

const filterStyle = (active: boolean) =>
  active
    ? "bg-emerald-600 text-white border-emerald-600"
    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700";

/* ─── Card ──────────────────────────────────────────── */
ResourceCard({ r }: { r: Resource }) {
  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all">
      {/* Icon + level */}
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
          <FileText size={20} className="text-emerald-600" />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${levelStyle[r.level]}`}>
          {r.level}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-slate-900 text-sm leading-snug mb-1.5 flex-1">
        {r.title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{r.description}</p>

      {/* Meta + CTA */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>{r.pages} hal.</span>
          <span className="flex items-center gap-0.5">
            <Download size={11} /> {r.downloads.toLocaleString("id-ID")}
          </span>
        </div>
        <a
          href={r.href}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
        >
          <Download size={13} /> Unduh PDF
        </a>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────── */
export default ResourcesSection() {
  const [query,  setQuery]  = useState("");
  const [filter, setFilter] = useState<Level>("Semua");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchLevel = filter === "Semua" || r.level === filter;
      const q          = query.toLowerCase();
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchLevel && matchQuery;
    });
  }, [query, filter]);

  return (
    <section id="sumber-belajar" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">
            Perpustakaan DataRakyat
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            Unduh Gratis, Belajar Kapan Saja
          </h2>
          <p className="text-slate-600 max-w-xl">
            Semua panduan, cheat sheet, dan e-book ditulis dalam Bahasa Indonesia dan bisa
            diunduh tanpa akun. Cocok untuk koneksi lambat.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Cari panduan, topik, atau kata kunci..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
            />
          </div>

          {/* Level filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-400 flex-shrink-0" />
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${filterStyle(filter === l)}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-500 mb-5">
          Menampilkan <strong>{filtered.length}</strong> sumber belajar
          {filter !== "Semua" ? ` untuk level "${filter}"` : ""}
          {query ? ` yang cocok dengan "${query}"` : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <ResourceCard key={r.id} r={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h4 className="font-display font-bold text-slate-700 mb-1">Tidak ditemukan</h4>
            <p className="text-sm text-slate-500">
              Coba ubah kata kunci atau pilih level yang berbeda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}