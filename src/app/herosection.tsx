"use client";

import { ArrowRight, MapPin, Users, BookOpen, TrendingUp } from "lucide-react";

const stats = [
  { value: "34", label: "Provinsi Terjangkau", icon: MapPin },
  { value: "12.400+", label: "Pelajar Aktif", icon: Users },
  { value: "80+", label: "Modul Gratis", icon: BookOpen },
  { value: "93%", label: "Puas Belajar Mandiri", icon: TrendingUp },
];

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
    >
      {/* Batik dot background */}
      <div className="absolute inset-0 bg-batik opacity-60 pointer-events-none" />

      {/* Emerald gradient blob */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
              Dari Sabang sampai Merauke
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight text-balance mb-6">
            Data Bukan Milik{" "}
            <span className="relative">
              <span className="relative z-10 text-emerald-600">Elite</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-100 rounded -z-0" />
            </span>
            {" "}— Itu Milik Kita Semua
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
            DataRakyat hadir untuk memastikan setiap warga Indonesia — dari mahasiswa NTT hingga
            pengusaha Aceh — bisa membaca, memahami, dan menggunakan data untuk hidup yang
            lebih baik.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#sumber-belajar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
            >
              Mulai Belajar Gratis
              <ArrowRight size={18} />
            </a>
            <a
              href="#webinar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              Lihat Webinar Mendatang
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-50">
                  <Icon size={16} className="text-emerald-600" />
                </span>
              </div>
              <span className="font-display text-2xl font-extrabold text-slate-900">{value}</span>
              <span className="text-xs font-medium text-slate-500 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}