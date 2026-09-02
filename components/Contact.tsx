"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Loader2, Copy, Check, MessageSquare } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import GlowCard from "./GlowCard";
import MagneticButton from "./MagneticButton";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const socialLinks = [
  {
    id: "contact-github",
    label: "GitHub",
    handle: "@Zaayyy",
    href: "https://github.com/Zaayyy",
    icon: <FiGithub size={18} />,
    color: "hover:text-white",
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    handle: "marcell-sorongan",
    href: "https://www.linkedin.com/in/marcell-sorongan-36070a299",
    icon: <FaLinkedinIn size={18} />,
    color: "hover:text-blue-400",
  },
  {
    id: "contact-instagram",
    label: "Instagram",
    handle: "@aceeeelllllll",
    href: "https://www.instagram.com/aceeeelllllll",
    icon: <FiInstagram size={18} />,
    color: "hover:text-pink-400",
  },
  {
    id: "contact-email",
    label: "Email",
    handle: "soronganmarcell@gmail.com",
    href: "mailto:soronganmarcell@gmail.com",
    icon: <Mail size={18} />,
    color: "hover:text-blue-400",
  },
];

const PRESETS = [
  {
    label: "💼 Tawaran Proyek / Freelance",
    subject: "Tawaran Proyek / Diskusi Kebutuhan Web",
    message: "Halo Marcell, kami tertarik untuk mendiskusikan peluang proyek web/pengembangan aplikasi dengan Anda...",
  },
  {
    label: "🤝 Kolaborasi Riset / Komunitas",
    subject: "Ajakan Kolaborasi Riset & Komunitas",
    message: "Halo Marcell, saya ingin mengajak kolaborasi dalam kegiatan riset teknologi / project sharing...",
  },
  {
    label: "👋 Say Hello / Diskusi Santai",
    subject: "Halo Marcell! Salam kenal",
    message: "Halo Marcell, saya melihat portfolio Anda dan sangat terkesan. Ingin berkenalan dan berdiskusi...",
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("soronganmarcell@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setValue("subject", preset.subject);
    setValue("message", preset.message);
  };

  const onSubmit = async (data: FormData) => {
    setFormStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    const mailtoUrl = `mailto:soronganmarcell@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
      `Halo Marcell,\n\nNama: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    )}`;
    window.location.assign(mailtoUrl);
    setFormStatus("success");
    reset();
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative py-24 pb-32 overflow-hidden w-full flex flex-col items-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

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
            {"// KONTAK"}
            <span className="w-6 h-px bg-blue-400/40" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Mari{" "}
            <span className="gradient-text">Terhubung</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Punya proyek menarik, tawaran kolaborasi, atau sekadar ingin berdiskusi seputar teknologi? Saya selalu terbuka untuk percakapan baru!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium">Yogyakarta, Indonesia 🇮🇩</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-medium">Terbuka untuk freelance & peluang karir</span>
                </div>
              </div>

              {/* Quick Copy Email Box */}
              <GlowCard className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4 mb-6 shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider">Email Langsung</p>
                    <p className="text-xs sm:text-sm text-white font-mono truncate max-w-[180px] sm:max-w-[220px]">
                      soronganmarcell@gmail.com
                    </p>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-blue-600/15 text-white/80 hover:text-blue-300 border border-white/[0.08] hover:border-blue-500/30 text-xs font-mono transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span>Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </GlowCard>

              <p className="text-white/50 text-xs leading-relaxed mb-6">
                Response time biasanya dalam 24 jam. Untuk urusan mendesak, kirim email atau hubungi melalui akun media sosial di bawah.
              </p>

              {/* Social links */}
              <div className="space-y-2.5">
                {socialLinks.map((social) => (
                  <GlowCard key={social.id} className="rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <a
                      id={social.id}
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className={`group flex items-center gap-3.5 p-3 text-white/70 transition-all duration-200 ${social.color}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-medium text-xs sm:text-sm text-white/90 group-hover:text-blue-400 transition-colors">{social.label}</p>
                        <p className="text-[10px] opacity-60 font-mono">{social.handle}</p>
                      </div>
                    </a>
                  </GlowCard>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <GlowCard className="rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 tracking-tight">
                  <MessageSquare size={18} className="text-blue-400" />
                  Kirim Pesan
                </h3>
                <span className="text-[10px] font-mono text-white/40">Direct Mail</span>
              </div>

              {/* Preset buttons */}
              <div className="mb-5">
                <p className="text-[10px] font-mono text-white/50 mb-2">Preset pesan cepat (klik untuk mengisi otomatis):</p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono bg-white/[0.03] hover:bg-blue-600/10 border border-white/[0.06] hover:border-blue-500/30 text-white/70 hover:text-blue-300 transition-all cursor-pointer text-left"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5" htmlFor="contact-name">
                      Nama Lengkap *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-xs sm:text-sm
                        focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]
                        transition-all duration-200
                        ${errors.name ? "border-red-400/60" : "border-white/[0.08]"}`}
                      {...register("name", { required: "Nama wajib diisi" })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5" htmlFor="contact-email">
                      Alamat Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-xs sm:text-sm
                        focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]
                        transition-all duration-200
                        ${errors.email ? "border-red-400/60" : "border-white/[0.08]"}`}
                      {...register("email", {
                        required: "Email wajib diisi",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Format email tidak valid" },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5" htmlFor="contact-subject">
                    Subjek Pesan *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Kolaborasi Proyek / Tawaran Freelance / ..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-xs sm:text-sm
                      focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]
                      transition-all duration-200
                      ${errors.subject ? "border-red-400/60" : "border-white/[0.08]"}`}
                    {...register("subject", { required: "Subjek wajib diisi" })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5" htmlFor="contact-message">
                    Isi Pesan *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Halo Marcell, saya ingin mengajak..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-xs sm:text-sm
                      focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)]
                      transition-all duration-200 resize-none
                      ${errors.message ? "border-red-400/60" : "border-white/[0.08]"}`}
                    {...register("message", { required: "Pesan wajib diisi", minLength: { value: 15, message: "Pesan minimal 15 karakter" } })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <MagneticButton strength={0.15}>
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={formStatus === "sending" || formStatus === "success"}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-xs sm:text-sm
                      bg-blue-600 hover:bg-blue-500 text-white
                      disabled:opacity-60 disabled:cursor-not-allowed
                      shadow-[0_0_15px_rgba(59,130,246,0.3)]
                      transition-all duration-200 cursor-pointer"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Membuka Mail Client...
                      </>
                    ) : formStatus === "success" ? (
                      <>
                        <CheckCircle size={15} />
                        Terkirim! Terima kasih 🎉
                      </>
                    ) : formStatus === "error" ? (
                      <>
                        <AlertCircle size={15} />
                        Gagal — Coba lagi
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Kirim Pesan Sekarang
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
