"use client";

import { useEffect, useState } from "react";
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";

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
    icon: <FiGithub size={22} />,
    color: "hover:border-white/40 hover:text-white",
    bg: "group-hover:bg-white/5",
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    handle: "marcell-sorongan",
    href: "https://www.linkedin.com/in/marcell-sorongan-36070a299",
    icon: <FaLinkedinIn size={22} />,
    color: "hover:border-blue-400/50 hover:text-blue-300",
    bg: "group-hover:bg-blue-500/5",
  },
  {
    id: "contact-instagram",
    label: "Instagram",
    handle: "@aceeeelllllll",
    href: "https://www.instagram.com/aceeeelllllll",
    icon: <FiInstagram size={22} />,
    color: "hover:border-pink-400/50 hover:text-pink-300",
    bg: "group-hover:bg-pink-500/5",
  },
  {
    id: "contact-email",
    label: "Email",
    handle: "soronganmarcell@gmail.com",
    href: "mailto:soronganmarcell@gmail.com",
    icon: <Mail size={22} />,
    color: "hover:border-cyan-400/50 hover:text-cyan-300",
    bg: "group-hover:bg-cyan-500/5",
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: FormData) => {
    setFormStatus("sending");
    // Simulate sending (replace with actual API call or EmailJS)
    await new Promise((r) => setTimeout(r, 1500));
    // Build mailto fallback
    const mailtoUrl = `mailto:soronganmarcell@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
      `Halo Marcell,\n\nNama: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormStatus("success");
    reset();
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative py-24 pb-32 overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <p className="font-mono text-cyan-400 text-sm tracking-widest mb-3">// KONTAK</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mari{" "}
            <span className="gradient-text">Terhubung</span>
          </h2>
          <div className="section-separator" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Punya proyek menarik, tawaran kolaborasi, atau sekadar ingin berdiskusi tentang teknologi? Saya selalu terbuka untuk percakapan baru!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 animate-on-scroll">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/50">
                <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="text-sm">Yogyakarta, Indonesia 🇮🇩</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm">Terbuka untuk peluang & kolaborasi</span>
              </div>
            </div>

            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Response time biasanya dalam 24 jam. Untuk urusan mendesak, langsung email atau DM di Instagram.
            </p>

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  id={social.id}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className={`group flex items-center gap-4 p-4 rounded-xl glass border border-white/8 text-white/50 transition-all duration-300 ${social.color}`}
                >
                  <div className={`w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center transition-all duration-300 ${social.bg}`}>
                    {social.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{social.label}</p>
                    <p className="text-xs opacity-60 font-mono">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-3 animate-on-scroll" style={{ animationDelay: "0.2s" }}>
            <div className="glass gradient-border rounded-2xl p-8">
              <h3 className="font-semibold text-white text-lg mb-6">Kirim Pesan</h3>

              <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2" htmlFor="contact-name">
                      Nama Lengkap
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder-white/20 text-sm
                        focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)]
                        transition-all duration-300 bg-transparent
                        ${errors.name ? "border-red-400/50" : "border-white/10"}`}
                      {...register("name", { required: "Nama wajib diisi" })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2" htmlFor="contact-email">
                      Alamat Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder-white/20 text-sm
                        focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)]
                        transition-all duration-300 bg-transparent
                        ${errors.email ? "border-red-400/50" : "border-white/10"}`}
                      {...register("email", {
                        required: "Email wajib diisi",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Format email tidak valid" },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2" htmlFor="contact-subject">
                    Subjek
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Kolaborasi Proyek / Diskusi / ..."
                    className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder-white/20 text-sm
                      focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)]
                      transition-all duration-300 bg-transparent
                      ${errors.subject ? "border-red-400/50" : "border-white/10"}`}
                    {...register("subject", { required: "Subjek wajib diisi" })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2" htmlFor="contact-message">
                    Pesan
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Halo Marcell, saya ingin mengajak..."
                    className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder-white/20 text-sm
                      focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)]
                      transition-all duration-300 bg-transparent resize-none
                      ${errors.message ? "border-red-400/50" : "border-white/10"}`}
                    {...register("message", { required: "Pesan wajib diisi", minLength: { value: 20, message: "Pesan minimal 20 karakter" } })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm
                    bg-gradient-to-r from-cyan-500 to-violet-600 text-white
                    hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:scale-[1.01]
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                    transition-all duration-300"
                >
                  {formStatus === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Mengirim...
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <CheckCircle size={18} />
                      Terkirim! Terima kasih 🎉
                    </>
                  ) : formStatus === "error" ? (
                    <>
                      <AlertCircle size={18} />
                      Gagal — Coba lagi
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Pesan
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/30">
                  Pesan akan dikirimkan langsung ke inbox saya via email.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
