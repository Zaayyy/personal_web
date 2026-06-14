"use client";

import { useEffect } from "react";
import Image from "next/image";
import { GraduationCap, Award, BookOpen, Target, CheckCircle, Clock, MapPin } from "lucide-react";
import { FaAws } from "react-icons/fa";

const education = [
  {
    institution: "Universitas Amikom Yogyakarta",
    degree: "S-1 Sistem Informasi",
    period: "2023 — Sekarang",
    status: "Aktif",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    description:
      "Menempuh pendidikan tinggi di bidang Sistem Informasi dengan fokus pada pengembangan perangkat lunak, manajemen data, dan keamanan sistem. Aktif terlibat dalam proyek riset dan komunitas teknologi kampus.",
    highlights: [
      "Fokus kurikulum: Web Development, Database Management, Software Engineering",
      "Proyek akademik: Data Mining, Pengembangan Aplikasi Web",
      "Aktif dalam organisasi mahasiswa teknologi",
    ],
    logo: "/logo_amikom2 (1).png",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Universitas+Amikom+Yogyakarta",
    icon: <GraduationCap size={24} className="text-cyan-400" />,
    color: "from-cyan-500/20 to-blue-600/5",
    border: "border-cyan-400/20",
  },
  {
    institution: "SMA Rex Mundi Manado",
    degree: "Sekolah Menengah Atas (MIPA)",
    period: "2020 — 2023",
    status: "Lulus",
    statusColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    description:
      "Menyelesaikan pendidikan menengah atas dengan fokus pada Matematika dan Ilmu Pengetahuan Alam. Membangun fondasi akademis yang kuat dan mulai mengenal dasar-dasar logika pemrograman komputer.",
    highlights: [
      "Fokus kurikulum: Matematika, Fisika, Kimia, Biologi",
      "Mengembangkan dasar-dasar logika komputasi",
      "Aktif dalam kegiatan OSIS dan ekstrakurikuler sekolah",
    ],
    logo: "/rex.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SMA+Rex+Mundi+Manado",
    icon: <BookOpen size={24} className="text-violet-400" />,
    color: "from-violet-500/20 to-purple-600/5",
    border: "border-violet-400/20",
  },
  {
    institution: "SMP Pax Christi Manado",
    degree: "Sekolah Menengah Pertama",
    period: "2017 — 2020",
    status: "Lulus",
    statusColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    description:
      "Menempuh pendidikan tingkat menengah pertama dengan fokus pada pengembangan karakter, disiplin belajar, dan pengenalan dasar-dasar teknologi informasi.",
    highlights: [
      "Pengenalan dasar komputer, perangkat keras, dan perangkat lunak",
      "Aktif berpartisipasi dalam organisasi sekolah dan kegiatan sosial",
      "Membangun landasan kerja sama tim dan komunikasi efektif",
    ],
    logo: "/pax.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SMP+Pax+Christi+Manado",
    icon: <Target size={24} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-600/5",
    border: "border-emerald-400/20",
  },
];

const certifications = [
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    status: "Persiapan",
    targetDate: "2025",
    icon: <FaAws size={24} className="text-orange-400" />,
    description: "Sertifikasi foundational AWS yang membuktikan pemahaman konsep cloud, layanan AWS inti, keamanan, arsitektur, dan model pricing.",
    tags: ["Cloud Computing", "AWS", "Security", "Architecture"],
    color: "from-orange-500/15 to-amber-600/5",
    border: "border-orange-400/20",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    progress: 55,
    progressColor: "from-orange-400 to-amber-500",
    icon2: <Clock size={14} className="text-amber-400" />,
  },
  {
    id: "web-security",
    name: "Web Application Security",
    issuer: "OWASP Foundation",
    status: "Dipelajari",
    targetDate: "Ongoing",
    icon: <Award size={24} className="text-violet-400" />,
    description: "Pemahaman mendalam tentang OWASP Top 10, penetration testing dasar, dan mitigasi kerentanan web seperti SQL Injection, XSS, dan CSRF.",
    tags: ["OWASP", "Penetration Testing", "SQL Injection", "XSS"],
    color: "from-violet-500/15 to-purple-600/5",
    border: "border-violet-400/20",
    statusColor: "text-violet-400 bg-violet-400/10 border-violet-400/30",
    progress: 72,
    progressColor: "from-violet-400 to-purple-500",
    icon2: <BookOpen size={14} className="text-violet-400" />,
  },
  {
    id: "data-science",
    name: "Data Science & Machine Learning",
    issuer: "Self-Learning / Projects",
    status: "Diterapkan",
    targetDate: "Ongoing",
    icon: <Target size={24} className="text-emerald-400" />,
    description: "Keterampilan analitik data yang diperoleh melalui proyek nyata: crawling, preprocessing, NLP, dan implementasi algoritma ML dasar.",
    tags: ["Python", "NLP", "Scikit-learn", "Data Analysis"],
    color: "from-emerald-500/15 to-teal-600/5",
    border: "border-emerald-400/20",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    progress: 70,
    progressColor: "from-emerald-400 to-teal-500",
    icon2: <CheckCircle size={14} className="text-emerald-400" />,
  },
];

export default function Education() {
  useEffect(() => {
    const progressBars = document.querySelectorAll(".cert-progress-bar");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            const bar = entry.target.querySelector(".cert-bar-fill") as HTMLElement;
            if (bar) {
              const level = bar.dataset.level || "0";
              setTimeout(() => { bar.style.width = `${level}%`; }, 200);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    progressBars.forEach((bar) => observer.observe(bar));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// PENDIDIKAN</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pendidikan &{" "}
            <span className="gradient-text">Sertifikasi</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Membangun fondasi akademik yang kuat sambil terus mengembangkan keahlian profesional melalui sertifikasi dan pembelajaran mandiri.
          </p>
        </div>

        {/* Education card */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white/70 mb-6 flex items-center gap-2 animate-on-scroll">
            <GraduationCap size={20} className="text-cyan-400" />
            Pendidikan Formal
          </h3>

          <div className="flex flex-col gap-6">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="animate-on-scroll glass gradient-border rounded-2xl p-6 md:p-8
                  hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo / Icon */}
                  {edu.logo ? (
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border border-white/10 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">
                      <Image
                        src={edu.logo}
                        alt={edu.institution}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${edu.color} border ${edu.border} flex items-center justify-center`}>
                      {edu.icon}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                        <p className="text-cyan-400 font-medium">{edu.degree}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="font-mono text-sm text-white/40">{edu.period}</span>
                        <span className={`px-3 py-0.5 rounded-full text-xs font-medium border ${edu.statusColor}`}>
                          {edu.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-4">{edu.description}</p>

                    <ul className="space-y-2 mb-4">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                          <span className="text-cyan-400 flex-shrink-0 mt-0.5">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Google Maps Button */}
                    {edu.mapsUrl && (
                      <div className="mt-5">
                        <a
                          href={edu.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                            bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 
                            text-white/60 hover:text-cyan-400 shadow-sm transition-all duration-300 group"
                        >
                          <MapPin size={13} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                          <span>Lihat Lokasi di Google Maps</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold text-white/70 mb-6 flex items-center gap-2 animate-on-scroll">
            <Award size={20} className="text-violet-400" />
            Sertifikasi & Keahlian Profesional
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => (
              <div
                key={cert.id}
                id={`cert-${cert.id}`}
                className="cert-progress-bar animate-on-scroll glass gradient-border rounded-2xl p-6
                  hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]
                  transition-all duration-300"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} border ${cert.border} flex items-center justify-center`}>
                    {cert.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {cert.icon2}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${cert.statusColor}`}>
                      {cert.status}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <h4 className="font-bold text-white text-sm mb-1">{cert.name}</h4>
                <p className="text-white/40 text-xs font-mono mb-3">{cert.issuer}</p>
                <p className="text-white/50 text-xs leading-relaxed mb-4">{cert.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-white/40">Progress</span>
                    <span className="text-xs font-mono text-white/50">{cert.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`cert-bar-fill h-full rounded-full bg-gradient-to-r ${cert.progressColor} transition-all duration-1000 ease-out`}
                      data-level={cert.progress}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono glass border border-white/10 text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
