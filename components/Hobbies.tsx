"use client";

import { motion } from "framer-motion";
import { Gamepad2, Users, Code2, Coffee, Zap, BookOpen, Sparkles } from "lucide-react";
import GlowCard from "./GlowCard";

const hobbies = [
  {
    id: "gaming",
    emoji: "🎮",
    title: "Competitive Gaming",
    icon: <Gamepad2 size={20} className="text-blue-400" />,
    description:
      "Menggeluti dunia gaming kompetitif sebagai arena melatih kemampuan strategi, pengambilan keputusan cepat, dan mentalitas pantang menyerah — nilai-nilai yang juga diterapkan dalam coding.",
    tags: ["Strategy", "Teamwork", "Problem Solving"],
    color: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/20",
    tagBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    fact: "\"Good gaming = good debugging mindset\"",
  },
  {
    id: "tech-community",
    emoji: "🤝",
    title: "Tech Community",
    icon: <Users size={20} className="text-indigo-400" />,
    description:
      "Aktif terlibat dalam komunitas teknologi kampus dan online — berbagi ilmu, kolaborasi proyek, dan berdiskusi tentang tren teknologi terkini bersama sesama developer.",
    tags: ["Networking", "Knowledge Sharing", "Collaboration"],
    color: "from-indigo-500/15 to-purple-600/5",
    border: "border-indigo-500/20",
    tagBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    fact: "\"Teknologi terbaik lahir dari kolaborasi\"",
  },
  {
    id: "open-source",
    emoji: "💻",
    title: "Open Source & Side Projects",
    icon: <Code2 size={20} className="text-emerald-400" />,
    description:
      "Menghabiskan waktu luang untuk membangun side project, bereksperimen dengan teknologi baru, dan berkontribusi pada ekosistem open source sebagai cara belajar yang paling efektif.",
    tags: ["GitHub", "Innovation", "Lifelong Learning"],
    color: "from-emerald-500/15 to-teal-600/5",
    border: "border-emerald-500/20",
    tagBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    fact: "\"Code setiap hari, belajar setiap saat\"",
  },
  {
    id: "coffee-code",
    emoji: "☕",
    title: "Coffee & Deep Work",
    icon: <Coffee size={20} className="text-amber-400" />,
    description:
      "Percaya pada sesi coding panjang dengan secangkir kopi — fokus mendalam (deep work) adalah kunci menghasilkan kode yang bersih, arsitektur yang solid, dan solusi yang elegan.",
    tags: ["Focus", "Deep Work", "Quality Code"],
    color: "from-amber-500/15 to-orange-600/5",
    border: "border-amber-500/20",
    tagBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    fact: "\"Kopi pertama, bug setelahnya\"",
  },
  {
    id: "learning",
    emoji: "📚",
    title: "Continuous Learning",
    icon: <BookOpen size={20} className="text-blue-400" />,
    description:
      "Selalu menemukan cara baru untuk belajar — dari dokumentasi resmi, YouTube, paper akademik, hingga trial and error langsung. Rasa ingin tahu adalah kompas utama saya.",
    tags: ["Self-Improvement", "Documentation", "Research"],
    color: "from-blue-500/15 to-indigo-600/5",
    border: "border-blue-500/20",
    tagBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    fact: "\"Tidak ada waktu yang terbuang saat belajar\"",
  },
  {
    id: "problem-solving",
    emoji: "⚡",
    title: "Problem Solving",
    icon: <Zap size={20} className="text-amber-400" />,
    description:
      "Menikmati tantangan algoritma dan puzzle logika sebagai cara mengasah kemampuan berpikir terstruktur. Dari LeetCode hingga masalah sehari-hari, semua adalah kesempatan belajar.",
    tags: ["Algorithms", "Logic", "Critical Thinking"],
    color: "from-amber-500/15 to-yellow-600/5",
    border: "border-amber-500/20",
    tagBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    fact: "\"Setiap bug adalah teka-teki yang menunggu diselesaikan\"",
  },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

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
            {"// HOBI & MINAT"}
            <span className="w-6 h-px bg-blue-400/40" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Di Luar{" "}
            <span className="gradient-text">Kode</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Mengenal saya lebih dalam — hal-hal yang mengisi waktu, menginspirasi kreativitas, dan membentuk cara saya berpikir sebagai seorang developer.
          </p>
        </motion.div>

        {/* Hobbies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, idx) => (
            <motion.div
              key={hobby.id}
              id={`hobby-${hobby.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="h-full"
            >
              <GlowCard className="h-full rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-md">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${hobby.color} border ${hobby.border} flex items-center justify-center text-xl shadow-md`}>
                      {hobby.emoji}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base tracking-tight">{hobby.title}</h3>
                      <div className="mt-0.5">{hobby.icon}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
                    {hobby.description}
                  </p>
                </div>

                <div>
                  {/* Fun fact */}
                  <div className="bg-white/[0.03] rounded-xl p-3 mb-4 border border-white/[0.05]">
                    <p className="text-[11px] text-white/50 italic font-mono flex items-center gap-1.5">
                      <Sparkles size={12} className="text-blue-400 flex-shrink-0" />
                      {hobby.fact}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {hobby.tags.map((tag) => (
                      <span key={tag} className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${hobby.tagBg}`}>
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
    </section>
  );
}
