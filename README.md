# 🚀 Marcellinus Alfrits Sorongan — Personal Portfolio & Interactive CV Website

> Website CV & Portofolio Personal berarsitektur modern, responsif, dan kaya interaktivitas — dibangun dengan **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, dan **Web Audio API**.

[![Next.js](https://img.shields.io/badge/Next.js-16%20(Turbopack)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

---

## 📋 Tentang Website

Website ini merupakan platform CV digital dan portofolio resmi **Marcellinus Alfrits Sorongan** — Mahasiswa S-1 Sistem Informasi di Universitas Amikom Yogyakarta. Menggabungkan konsep visual **Space Cyberpunk Glassmorphism** dengan rekayasa interaktivitas tingkat lanjut:

1. **Interactive Resume Modal**: Melihat CV format ATS lengkap dan langsung mencetak / menyimpan format PDF beresolusi tinggi langsung dari browser.
2. **Interactive CLI Terminal**: Terminal konsol UNIX-like dengan perintah kustom seperti `neofetch` (ASCII system info), `whoami`, `skills`, `projects`, `education`, `matrix`, dan `quote`.
3. **Orbit Tech System**: Animasi orbit real-time berbasis `requestAnimationFrame` untuk icon teknologi utama di sekitar foto profil dengan pause on hover.
4. **Web Audio Synthesizer**: Efek suara sintetis menggunakan browser Web Audio API bawaan (tanpa ketergantungan file audio eksternal dan bebas 404).
5. **Interactive Project & Gallery Lightbox**: Filter multi-kategori, modal deep dive arsitektur proyek, dan lightbox foto dengan navigasi keyboard (`Esc`, `ArrowLeft`, `ArrowRight`).
6. **Formulir Kontak Cerdas**: Pilihan preset pesan cepat (*Tawaran Proyek*, *Kolaborasi Riset*, *Say Hello*) dan 1-Click Copy Email dengan notifikasi toast real-time.

---

## 🛠️ Tech Stack & Arsitektur

### Core Framework & Library
- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack, Server-side Prerendering)
- **Library UI**: [React 19](https://react.dev)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Animation Engine**: [Framer Motion 12](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & Custom Glassmorphism CSS Directives
- **Icons**: [Lucide React](https://lucide.dev) & [react-icons](https://react-icons.github.io/react-icons/)
- **Audio Engine**: Native Browser Web Audio API (OscillatorNode & GainNode synthesis)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)

---

## 📂 Struktur Direktori

```
cv-portfolio/
├── app/
│   ├── layout.tsx              # Root Layout, font Inter & Fira Code, SEO Metadata, JSON-LD Schema
│   ├── page.tsx                # Main single-page application assembler
│   └── globals.css             # Design tokens, Aurora animations, Glassmorphism & Print styles
│
├── components/
│   ├── Navbar.tsx              # Sticky glass navbar, active scroll spy, theme & audio toggles
│   ├── Hero.tsx                # Hero banner, typewriter, orbit system, stats counter, CTA
│   ├── ResumeModal.tsx         # ATS-friendly interactive printable CV modal (PDF-ready)
│   ├── About.tsx               # Tech stack matrix, interactive skill search & proficiency bars
│   ├── Projects.tsx            # Featured projects grid with category filters
│   ├── ProjectModal.tsx        # Project deep-dive modal (architecture & implementation)
│   ├── Education.tsx           # Education history, certifications progress & Google Maps links
│   ├── Hobbies.tsx             # Beyond the code: personal passions, quotes, and badges
│   ├── Gallery.tsx             # Photo documentation grid with interactive fullscreen lightbox
│   ├── Contact.tsx             # Smart contact form with quick presets & 1-click email copy
│   ├── Footer.tsx              # Footer navigation, brand identity & social connects
│   ├── InteractiveTerminal.tsx # Full CLI console modal with 'neofetch' & custom commands
│   ├── CyberClouds.tsx         # Interactive canvas-based ambient clouds parallax
│   ├── CursorGlow.tsx          # Dynamic cursor lighting effect
│   ├── ScrollProgress.tsx      # Top reading progress indicator
│   ├── SectionReveal.tsx       # Scroll-triggered spring entrance wrapper
│   ├── SectionTransitionManager.tsx # Section transition dividers & background accents
│   ├── ThemeProvider.tsx       # Dark, Light & Cyberpunk multi-theme context
│   └── useSoundFX.ts           # Web Audio API procedural sound synthesizer hook
│
├── public/
│   ├── Profile pic.jpeg        # Profile avatar asset
│   ├── logo_amikom2 (1).png    # Universitas Amikom Yogyakarta logo
│   ├── rex.jpg                 # SMA Rex Mundi Manado logo
│   ├── pax.jpg                 # SMP Pax Christi Manado logo
│   └── gallery/                # Activity and seminar photo documentation
│
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Comprehensive documentation
```

---

## ⚡ Fitur Unggulan

| Fitur | Deskripsi |
|---|---|
| 🌌 **Space Aurora Aesthetics** | Starfield parallax, glowing ambient aurora blobs, dan grid cockpit sci-fi |
| 📄 **Printable ATS Resume** | Preview CV lengkap dengan format siap cetak dan simpan PDF dalam 1-klik |
| 💻 **CLI Terminal (Neofetch)** | Terminal interaktif dengan ASCII art, riwayat perintah (Up/Down arrow), dan suggestions |
| 🔊 **Procedural Audio FX** | Umpan balik audio lembut pada klik dan hover menggunakan Web Audio API |
| 🛡️ **Security & Data Highlights** | Dokumentasi riset NLP sentiment analysis, OWASP security scanner, dan AWS cloud |
| 📱 **Universal Responsiveness** | Tampilan presisi di smartphone, tablet, laptop, dan monitor ultrawide |
| 🎯 **SEO & OpenGraph** | Metadata lengkap, Twitter card, dan JSON-LD Person Structured Data |

---

## 🚀 Panduan Menjalankan Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org) versi 18.18+ atau lebih baru
- npm, pnpm, atau yarn

### Langkah Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/Zaayyy/personal_web.git
   cd personal_web/cv-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

4. **Buka di browser:**
   Kunjungi [http://localhost:3000](http://localhost:3000)

### Production Build & Verification

```bash
# Kompilasi bundle production Next.js
npm run build

# Menjalankan server production lokal
npm start
```

---

## 👤 Profil & Kontak Pengembang

**Marcellinus Alfrits Sorongan**  
*Mahasiswa S-1 Sistem Informasi — Universitas Amikom Yogyakarta*  
*Full-Stack Web Developer · Data & NLP Enthusiast · Cloud Security Learner*

- 🐙 **GitHub**: [@Zaayyy](https://github.com/Zaayyy)
- 💼 **LinkedIn**: [marcell-sorongan](https://www.linkedin.com/in/marcell-sorongan-36070a299)
- 📸 **Instagram**: [@aceeeelllllll](https://www.instagram.com/aceeeelllllll)
- 📧 **Email**: [soronganmarcell@gmail.com](mailto:soronganmarcell@gmail.com)

---

<div align="center">
  <sub>Dibangun dengan dedikasi dan kualitas tinggi &bull; Hak Cipta &copy; 2026 Marcellinus Alfrits Sorongan</sub>
</div>
