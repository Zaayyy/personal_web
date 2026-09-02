"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Target, CheckCircle, Clock, MapPin, ExternalLink, BadgeCheck } from "lucide-react";
import { FaAws } from "react-icons/fa";
import AnimatedTimeline from "./AnimatedTimeline";
import GlowCard from "./GlowCard";

const education = [
  {
    institution: "Universitas Amikom Yogyakarta",
    degree: "S-1 Sistem Informasi",
    period: "2023 — Sekarang",
    status: "Aktif",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description:
      "Menempuh pendidikan tinggi di bidang Sistem Informasi dengan fokus pada pengembangan perangkat lunak modern, manajemen data relasional & analitik, serta arsitektur keamanan sistem informasi.",
    highlights: [
      "Fokus kurikulum: Web Engineering, Advanced Database Systems, Software Architecture",
      "Proyek akademik: Data Mining Sentiment Analysis, AI Learning Tool, Web Security",
      "Aktif berkolaborasi dalam organisasi & komunitas mahasiswa teknologi",
    ],
    logo: "/logo_amikom2 (1).png",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Universitas+Amikom+Yogyakarta",
    icon: <GraduationCap size={24} className="text-blue-400" />,
    color: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/20",
  },
  {
    institution: "SMA Rex Mundi Manado",
    degree: "Sekolah Menengah Atas (MIPA)",
    period: "2020 — 2023",
    status: "Lulus",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    description:
      "Menyelesaikan pendidikan menengah atas peminatan Matematika dan Ilmu Pengetahuan Alam dengan fokus pada pengembangan penalaran analitis, logika komputasi, dan pemecahan masalah.",
    highlights: [
      "Fokus kurikulum: Matematika Lanjut, Fisika, Kimia, Biologi",
      "Membangun dasar-dasar logika algoritma dan komputasi sains",
      "Aktif dalam kepengurusan kegiatan siswa dan tim ekstrakurikuler",
    ],
    logo: "/rex.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SMA+Rex+Mundi+Manado",
    icon: <BookOpen size={24} className="text-indigo-400" />,
    color: "from-indigo-500/15 to-purple-600/5",
    border: "border-indigo-500/20",
  },
  {
    institution: "SMP Pax Christi Manado",
    degree: "Sekolah Menengah Pertama",
    period: "2017 — 2020",
    status: "Lulus",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    description:
      "Menempuh pendidikan tingkat menengah pertama dengan fokus pada pembentukan karakter disiplin belajar, komunikasi efektif, dan eksplorasi awal teknologi informasi.",
    highlights: [
      "Pengenalan dasar komputer, literasi digital, dan logika berpikir terstruktur",
      "Aktif berpartisipasi dalam organisasi sekolah dan kegiatan sosial",
      "Membangun landasan kerja sama tim dan kepemimpinan",
    ],
    logo: "/pax.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SMP+Pax+Christi+Manado",
    icon: <Target size={24} className="text-blue-400" />,
    color: "from-blue-500/15 to-teal-600/5",
    border: "border-blue-500/20",
  },
];

const certifications = [
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    status: "Persiapan",
    icon: <FaAws size={24} className="text-orange-400" />,
    description: "Sertifikasi foundational AWS yang mencakup pemahaman komprehensif konsep cloud, core services (EC2, S3, RDS, Lambda), arsitektur keamanan, dan model pricing.",
    tags: ["Cloud Computing", "AWS Core", "Security & IAM", "Architecture"],
    color: "from-orange-500/15 to-amber-600/5",
    border: "border-orange-500/20",
    statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    progress: 70,
    progressColor: "from-orange-400 to-amber-500",
    icon2: <Clock size={14} className="text-amber-400" />,
  },
  {
    id: "web-security",
    name: "Web Application Security & OWASP",
    issuer: "OWASP & Cybersecurity Standards",
    status: "Dipelajari",
    icon: <Award size={24} className="text-indigo-400" />,
    description: "Pemahaman mendalam metodologi OWASP Top 10, simulasi audit kerentanan web, serta implementasi proteksi SQL Injection, XSS, CSRF, dan insecure direct object references.",
    tags: ["OWASP Top 10", "Penetration Testing", "SQLi & XSS", "Security Header"],
    color: "from-indigo-500/15 to-purple-600/5",
    border: "border-indigo-500/20",
    statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    progress: 80,
    progressColor: "from-indigo-400 to-purple-500",
    icon2: <BookOpen size={14} className="text-indigo-400" />,
  },
  {
    id: "data-science",
    name: "Data Science & NLP Engineering",
    issuer: "Applied Research & Projects",
    status: "Diterapkan",
    icon: <Target size={24} className="text-emerald-400" />,
    description: "Keterampilan analitik data dan NLP terapan yang divalidasi lewat proyek riset: data crawling 2.000+ data, preprocessing pipeline, TF-IDF, SVD/LSA, dan evaluasi performa model.",
    tags: ["Python", "NLP Pipeline", "Scikit-Learn", "TF-IDF & SVD"],
    color: "from-emerald-500/15 to-teal-600/5",
    border: "border-emerald-500/20",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    progress: 78,
    progressColor: "from-emerald-400 to-teal-500",
    icon2: <CheckCircle size={14} className="text-emerald-400" />,
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-blue-400 text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-blue-400/40" />
            {"// PENDIDIKAN"}
            <span className="w-6 h-px bg-blue-400/40" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Pendidikan &{" "}
            <span className="gradient-text">Sertifikasi</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Membangun fondasi akademik yang kokoh sambil terus mengasah keahlian terapan melalui riset proyek dan persiapan sertifikasi industri.
          </p>
        </motion.div>

        {/* Education cards */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-white/90 mb-8 flex items-center gap-2.5 tracking-tight"
          >
            <GraduationCap size={22} className="text-blue-400" />
            Pendidikan Formal & Riwayat Akademik
          </motion.h3>

          <AnimatedTimeline>
            <div className="flex flex-col gap-6 relative">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <GlowCard className="rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 shadow-md">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Logo / Icon */}
                      {edu.logo ? (
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/95 border border-white/10 flex items-center justify-center p-2 shadow-lg overflow-hidden">
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
                            <div className="flex items-center gap-2">
                              <h4 className="text-xl font-bold text-white tracking-tight">{edu.institution}</h4>
                              <BadgeCheck size={18} className="text-blue-400" />
                            </div>
                            <p className="text-blue-400 font-mono text-sm font-medium">{edu.degree}</p>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-1">
                            <span className="font-mono text-xs text-white/50">{edu.period}</span>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-mono border ${edu.statusColor}`}>
                              {edu.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4">{edu.description}</p>

                        <ul className="space-y-1.5 mb-5">
                          {edu.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                              <span className="text-blue-400 flex-shrink-0 mt-0.5">▹</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Google Maps Button */}
                        {edu.mapsUrl && (
                          <div className="mt-4">
                            <a
                              href={edu.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium
                                bg-white/[0.04] hover:bg-blue-600/10 border border-white/[0.08] hover:border-blue-500/30 
                                text-white/75 hover:text-blue-300 shadow-sm transition-all duration-200 group cursor-pointer"
                            >
                              <MapPin size={13} className="text-white/50 group-hover:text-blue-400 transition-colors" />
                              <span>Lihat Lokasi</span>
                              <ExternalLink size={12} className="opacity-60" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </AnimatedTimeline>
        </div>

        {/* Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-white/90 mb-8 flex items-center gap-2.5 tracking-tight"
          >
            <Award size={22} className="text-indigo-400" />
            Sertifikasi & Keahlian Profesional
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                id={`cert-${cert.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="h-full"
              >
                <GlowCard className="h-full rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-md">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.color} border ${cert.border} flex items-center justify-center shadow-md`}>
                        {cert.icon}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {cert.icon2}
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${cert.statusColor}`}>
                          {cert.status}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <h4 className="font-bold text-white text-sm sm:text-base mb-1 tracking-tight">{cert.name}</h4>
                    <p className="text-blue-400 font-mono text-xs mb-3">{cert.issuer}</p>
                    <p className="text-white/60 text-xs leading-relaxed mb-4">{cert.description}</p>
                  </div>

                  <div>
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-mono text-white/50">Pemahaman</span>
                        <span className="text-xs font-mono text-blue-300 font-semibold">{cert.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.04]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${cert.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${cert.progressColor} shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.06] text-white/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
