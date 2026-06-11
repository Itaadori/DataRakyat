import { BarChart2, Globe, Users, BookOpen } from 'lucide-react';

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Beranda", href: "#beranda" },
      { label: "Webinar", href: "#webinar" },
      { label: "Sumber Belajar", href: "#sumber-belajar" },
    ],
  },
  {
    heading: "Komunitas",
    links: [
      { label: "Forum Diskusi", href: "#" },
      { label: "Kontribusi Materi", href: "#" },
      { label: "Jadi Pembicara", href: "#" },
    ],
  },
  {
    heading: "Tentang",
    links: [
      { label: "Misi Kami", href: "#tentang" },
      { label: "Tim", href: "#" },
      { label: "Kebijakan Privasi", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white">
                <BarChart2 size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display font-extrabold text-white text-lg">
                Data<span className="text-emerald-400">Rakyat</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-5">
              Literasi data untuk semua warga Indonesia. Gratis, terbuka, dan berdaulat.
            </p>
            <div className="flex gap-3">
              {[Globe, Users, BookOpen].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-700 hover:text-white transition-colors">
                  {Icon && <Icon size={16} />}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm hover:text-emerald-400 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
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