"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  MapPin,
  Calendar,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Tag,
  MessageSquareQuote
} from "lucide-react";
import { useSoundFX } from "./useSoundFX";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "seminar" | "org" | "casual";
  categoryLabel: string;
  src: string;
  date: string;
  location: string;
  description: string;
  emoji: string;
  gradient: string;
  borderColor: string;
  tagColor: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "seminar-speaker",
    title: "Seminar Security & Keamanan Data",
    subtitle: "Sesi Diskusi & QnA Transformatif",
    category: "seminar",
    categoryLabel: "Seminar & Tech",
    src: "/gallery/seminar-speaker.jpg",
    date: "2026",
    location: "Ruang Seminar Amikom, Yogyakarta",
    description:
      "Berpartisipasi aktif dan berdiskusi langsung dalam seminar bertema 'Security & Keamanan Data dalam Transformasi Digital'. Pengalaman berharga yang memperluas wawasan mengenai tren cybersecurity dan proteksi data industri.",
    emoji: "🎙️",
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
    borderColor: "border-cyan-400/30",
    tagColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "org-forum",
    title: "Forum Diskusi Organisasi Mahasiswa",
    subtitle: "Kolaborasi Komunitas & Himpunan",
    category: "org",
    categoryLabel: "Organisasi & Kampus",
    src: "/gallery/org-forum.jpg",
    date: "2026",
    location: "Gedung Utama Universitas Amikom",
    description:
      "Sesi kumpul dan diskusi strategis bersama sesama pengurus organisasi mahasiswa teknologi. Tempat bertukar ide, membangun komunikasi tim, dan menyusun program kerja yang berdampak.",
    emoji: "🤝",
    gradient: "from-violet-500/20 via-purple-600/10 to-transparent",
    borderColor: "border-violet-400/30",
    tagColor: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  {
    id: "casual-mirror",
    title: "Daily Outfit & Casual Lifestyle",
    subtitle: "Developer Off-Duty Vibes",
    category: "casual",
    categoryLabel: "Casual & Daily",
    src: "/gallery/casual-mirror.jpg",
    date: "2026",
    location: "Yogyakarta, Indonesia",
    description:
      "Momen santai di luar jam pengkodean — mengekspresikan gaya kasual minimalis dan mengisi ulang energi kreatif untuk mempersiapkan sesi *deep work* dan eksplorasi teknologi berikutnya.",
    emoji: "📸",
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    borderColor: "border-emerald-400/30",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua Foto" },
  { id: "seminar", label: "Seminar & Tech" },
  { id: "org", label: "Organisasi" },
  { id: "casual", label: "Casual & Daily" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { playClickSound } = useSoundFX();

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    playClickSound();
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    playClickSound();
    setLightboxIndex(null);
  }, [playClickSound]);

  const showNext = useCallback(() => {
    playClickSound();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  }, [filteredItems.length, playClickSound]);

  const showPrev = useCallback(() => {
    playClickSound();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  }, [filteredItems.length, playClickSound]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="relative py-24 overflow-hidden w-full flex flex-col items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">{"// GALERI PRIBADI"}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Momen &{" "}
            <span className="gradient-text">Aktivitas</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Koleksi dokumentasi pribadi — perjalanan seminar teknologi, kegiatan organisasi mahasiswa, dan inspirasi harian.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound();
                setActiveCategory(cat.id);
              }}
              className={`relative px-5 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-semibold shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                  : "glass text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Creative Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 25 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={() => openLightbox(idx)}
                className="group glass gradient-border rounded-2xl overflow-hidden cursor-pointer flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(0,212,255,0.25)] transition-all duration-500"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={idx === 0}
                  />

                  {/* Glass overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono border backdrop-blur-md shadow-md ${item.tagColor}`}>
                      {item.emoji} {item.categoryLabel}
                    </span>
                    <span className="w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-white/80 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300 shadow-md">
                      <Maximize2 size={14} />
                    </span>
                  </div>

                  {/* Bottom location pill inside image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-[11px] font-mono">
                    <MapPin size={12} className="text-cyan-400" />
                    <span className="truncate max-w-[200px]">{item.location}</span>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-cyan-400/80 font-mono text-xs mb-3 flex items-center gap-1">
                      <Sparkles size={12} /> {item.subtitle}
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-cyan-400" /> {item.date}
                    </span>
                    <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                      <Camera size={12} /> Perbesar Foto
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl glass border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 flex items-center justify-center transition-all duration-300"
                title="Tutup Modal (Esc)"
              >
                <X size={20} />
              </button>

              {/* Photo Area */}
              <div className="relative flex-1 bg-black/60 min-h-[300px] lg:min-h-[500px] flex items-center justify-center p-4 group">
                <div className="relative w-full h-full min-h-[280px] lg:min-h-[460px]">
                  <Image
                    src={currentLightboxItem.src}
                    alt={currentLightboxItem.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 65vw"
                    className="object-contain rounded-2xl"
                    priority
                  />
                </div>

                {/* Prev Button */}
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-cyan-300 hover:scale-110 flex items-center justify-center transition-all duration-300"
                  title="Foto Sebelumnya (Panah Kiri)"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Next Button */}
                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-cyan-300 hover:scale-110 flex items-center justify-center transition-all duration-300"
                  title="Foto Selanjutnya (Panah Kanan)"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Info Sidebar Area */}
              <div className="w-full lg:w-[360px] p-6 lg:p-8 flex flex-col justify-between bg-[#080d1a]/95 border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono border ${currentLightboxItem.tagColor}`}>
                      {currentLightboxItem.emoji} {currentLightboxItem.categoryLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 leading-snug">
                      {currentLightboxItem.title}
                    </h3>
                    <p className="text-cyan-400 font-mono text-xs flex items-center gap-1">
                      <Sparkles size={14} /> {currentLightboxItem.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-cyan-400 flex-shrink-0" />
                      <span>{currentLightboxItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-violet-400 flex-shrink-0" />
                      <span>Tahun: {currentLightboxItem.date}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-mono text-white/40 mb-2 flex items-center gap-1">
                      <MessageSquareQuote size={14} className="text-cyan-400" /> Keterangan:
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentLightboxItem.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span className="flex items-center gap-1">
                    <Tag size={12} className="text-cyan-400" /> {lightboxIndex! + 1} dari {filteredItems.length} foto
                  </span>
                  <span>Gunakan ⬅️ ➡️ untuk navigasi</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
