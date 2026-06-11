import { Smartphone, Globe, GraduationCap, Heart } from "lucide-react";

const props = [
  {
    icon: Smartphone,
    title: "Ramah HP Low-Spec",
    desc: "Semua materi dioptimalkan untuk perangkat Android entry-level dan koneksi 3G. Belajar tanpa hambatan teknis.",
  },
  {
    icon: Globe,
    title: "100% Bahasa Indonesia",
    desc: "Tidak ada istilah asing yang membingungkan. Setiap konsep dijelaskan dalam bahasa yang mudah dipahami.",
  },
  {
    icon: GraduationCap,
    title: "Terstruktur & Bertahap",
    desc: "Kurikulum dari nol hingga mahir yang dirancang oleh praktisi industri dan akademisi Indonesia.",
  },
  {
    icon: Heart,
    title: "Selamanya Gratis",
    desc: "Materi inti tidak pernah berbayar. Kami percaya literasi data adalah hak, bukan privilese.",
  },
];

export default function ValuePropsSection() {
  return (
    <section id="tentang" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">
            Kenapa DataRakyat?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-balance">
            Dirancang untuk Kondisi Nyata Indonesia
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Kami tidak menyalin platform luar negeri. DataRakyat dibangun dari kebutuhan nyata
            pelajar dari Jayapura, Kupang, Pontianak, dan kota-kota kecil lainnya.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {props.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <Icon size={22} className="text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Nusantara map callout */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 sm:p-10 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-batik opacity-10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-200 mb-3">
              Visi Kami
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight mb-4">
              Pada 2030, setiap pelajar Indonesia bisa membaca data seperti membaca berita.
            </h3>
            <p className="text-emerald-100 text-base leading-relaxed">
              Sebanyak 17.000 pulau, 700+ bahasa daerah, satu tujuan: menjadi bangsa yang
              melek data dan berdaulat atas informasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}