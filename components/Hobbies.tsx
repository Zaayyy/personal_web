"use client";

import { motion } from "framer-motion";
import { Gamepad2, Users, Code2, Coffee, Zap, BookOpen, Sparkles } from "lucide-react";

const hobbies = [
  {
    id: "gaming",
    emoji: "🎮",
    title: "Competitive Gaming",
    icon: <Gamepad2 size={22} className="text-cyan-400" />,
    description:
      "Menggeluti dunia gaming kompetitif sebagai arena melatih kemampuan strategi, pengambilan keputusan cepat, dan mentalitas pantang menyerah — nilai-nilai yang juga diterapkan dalam coding.",
    tags: ["Strategy", "Teamwork", "Problem Solving"],
    color: "from-cyan-500/15 to-blue-600/5",
    border: "border-cyan-400/20",
    tagBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    fact: "\"Good gaming = good debugging mindset\"",
  },
  {
    id: "tech-community",
    emoji: "🤝",
    title: "Tech Community",
    icon: <Users size={22} className="text-violet-400" />,
    description:
      "Aktif terlibat dalam komunitas teknologi kampus dan online — berbagi ilmu, kolaborasi proyek, dan berdiskusi tentang tren teknologi terkini bersama sesama developer.",
    tags: ["Networking", "Knowledge Sharing", "Collaboration"],
    color: "from-violet-500/15 to-purple-600/5",
    border: "border-violet-400/20",
    tagBg: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    fact: "\"Teknologi terbaik lahir dari kolaborasi\"",
  },
  {
    id: "open-source",
    emoji: "💻",
    title: "Open Source & Side Projects",
    icon: <Code2 size={22} className="text-emerald-400" />,
    description:
      "Menghabiskan waktu luang untuk membangun side project, bereksperimen dengan teknologi baru, dan berkontribusi pada ekosistem open source sebagai cara belajar yang paling efektif.",
    tags: ["GitHub", "Innovation", "Lifelong Learning"],
    color: "from-emerald-500/15 to-teal-600/5",
    border: "border-emerald-400/20",
    tagBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    fact: "\"Code setiap hari, belajar setiap saat\"",
  },
  {
    id: "coffee-code",
    emoji: "☕",
    title: "Coffee & Deep Work",
    icon: <Coffee size={22} className="text-amber-400" />,
    description:
      "Percaya pada sesi coding panjang dengan secangkir kopi — fokus mendalam (deep work) adalah kunci menghasilkan kode yang bersih, arsitektur yang solid, dan solusi yang elegan.",
    tags: ["Focus", "Deep Work", "Quality Code"],
    color: "from-amber-500/15 to-orange-600/5",
    border: "border-amber-400/20",
    tagBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    fact: "\"Kopi pertama, bug setelahnya\"",
  },
  {
    id: "learning",
    emoji: "📚",
    title: "Continuous Learning",
    icon: <BookOpen size={22} className="text-pink-400" />,
    description:
      "Selalu menemukan cara baru untuk belajar — dari dokumentasi resmi, YouTube, paper akademik, hingga trial and error langsung. Rasa ingin tahu adalah kompas utama saya.",
    tags: ["Self-Improvement", "Documentation", "Research"],
    color: "from-pink-500/15 to-rose-600/5",
    border: "border-pink-400/20",
    tagBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    fact: "\"Tidak ada waktu yang terbuang saat belajar\"",
  },
  {
    id: "problem-solving",
    emoji: "⚡",
    title: "Problem Solving",
    icon: <Zap size={22} className="text-yellow-400" />,
    description:
      "Menikmati tantangan algoritma dan puzzle logika sebagai cara mengasah kemampuan berpikir terstruktur. Dari LeetCode hingga masalah sehari-hari, semua adalah kesempatan belajar.",
    tags: ["Algorithms", "Logic", "Critical Thinking"],
    color: "from-yellow-500/15 to-orange-600/5",
    border: "border-yellow-400/20",
    tagBg: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    fact: "\"Setiap bug adalah teka-teki yang menunggu diselesaikan\"",
  },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">{"// HOBI & MINAT"}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Di Luar{" "}
            <span className="gradient-text">Kode</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Mengenal saya lebih dalam — hal-hal yang mengisi waktu, menginspirasi kreativitas, dan membentuk cara saya berpikir sebagai seorang developer.
          </p>
        </motion.div>

        {/* Hobbies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hobbies.map((hobby, idx) => (
            <motion.div
              key={hobby.id}
              id={`hobby-${hobby.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: idx * 0.1 }}
              className="group glass gradient-border rounded-2xl p-6
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
                transition-all duration-300 cursor-default"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hobby.color} border ${hobby.border} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {hobby.emoji}
                </div>
                <div>
                  {hobby.icon}
                  <h3 className="font-semibold text-white text-sm mt-0.5 group-hover:text-cyan-300 transition-colors">{hobby.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {hobby.description}
              </p>

              {/* Fun fact */}
              <div className="glass rounded-lg p-3 mb-4 border border-white/5">
                <p className="text-xs text-white/40 italic font-mono flex items-center gap-1.5">
                  <Sparkles size={12} className="text-cyan-400 flex-shrink-0" />
                  {hobby.fact}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {hobby.tags.map((tag) => (
                  <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs border ${hobby.tagBg}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
