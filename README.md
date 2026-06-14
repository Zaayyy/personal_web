# 🚀 Marcellinus Alfrits Sorongan — Personal CV Website

> Website CV personal yang dibangun sebagai portofolio sekaligus bukti kemampuan web development.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)

---

## 📋 Deskripsi Proyek

Website ini adalah CV digital personal Marcellinus Alfrits Sorongan — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta. Didesain dengan estetika **dark mode premium** menggunakan glassmorphism, animasi scroll-triggered, dan layout yang responsif penuh.

Website ini bukan sekadar CV statis — ia sendiri merupakan **demonstrasi langsung kemampuan web development** kepada setiap recruiter yang mengunjunginya.

---

## 🛠️ Tech Stack

### Core Framework
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Next.js** | 15 (App Router) | Framework React full-stack dengan SSR, routing, dan optimisasi otomatis |
| **TypeScript** | 5 | Type safety untuk mengurangi bug dan meningkatkan DX (Developer Experience) |
| **React** | 19 | Library UI deklaratif berbasis komponen |

### Styling
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Tailwind CSS** | v4 | Utility-first CSS framework untuk styling cepat dan konsisten |
| **PostCSS** | Latest | Prosesor CSS untuk transformasi Tailwind menjadi CSS standar |
| **Custom CSS** | — | Animasi keyframe, glassmorphism, gradient effects, dan efek khusus |

### UI & Animasi
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Framer Motion** | Latest | Animasi deklaratif berbasis React — scroll-triggered, hover effects |
| **Lucide React** | Latest | Icon library modern dan konsisten berbasis SVG |
| **react-icons** | Latest | Koleksi 40+ icon library termasuk brand icons (GitHub, LinkedIn, AWS) |

### Form & Interaksi
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React Hook Form** | Latest | Manajemen form dengan validasi performa tinggi dan zero re-renders |

### Font & Typography
| Font | Tipe | Digunakan Untuk |
|------|------|-----------------|
| **Inter** | Sans-serif | Body text, headings, UI elements |
| **Fira Code** | Monospace | Code snippets, badge labels, nav logo |

---

## 🎨 Design System

### Color Palette
```
Primary Background : #050a15 (Deep Navy)
Secondary BG       : #0a0f1e
Accent Cyan        : #00d4ff / #06b6d4
Accent Violet      : #7c3aed / #8b5cf6
Glass Surface      : rgba(255, 255, 255, 0.04)
Border             : rgba(255, 255, 255, 0.08)
```

### Efek Visual
- **Glassmorphism** — Kartu semi-transparan dengan `backdrop-filter: blur()`
- **Gradient Text** — Teks animasi cyan-ke-violet dengan keyframe `gradientShift`
- **Glow Effect** — `box-shadow` berwarna untuk tombol dan elemen aktif
- **Scroll Animation** — `IntersectionObserver` memicu animasi `fadeInUp` saat elemen masuk viewport
- **Progress Bars** — Animasi lebar dari 0% ke nilai target saat terlihat
- **Typewriter Effect** — Efek mengetik dengan kursor berkedip di Hero section

---

## 📂 Struktur Proyek

```
cv-portfolio/
├── app/
│   ├── layout.tsx          # Root layout (font, metadata SEO, dark mode)
│   ├── page.tsx            # Halaman utama — assembles semua sections
│   └── globals.css         # Global styles, Tailwind directives, custom CSS
│
├── components/
│   ├── Navbar.tsx          # Sticky nav glassmorphism + mobile hamburger
│   ├── Hero.tsx            # Hero section — typewriter, particles, CTA
│   ├── About.tsx           # Bio + skill cards dengan animated progress bars
│   ├── Projects.tsx        # Portfolio grid — 4 proyek dengan detail proses
│   ├── Education.tsx       # Pendidikan formal + 3 sertifikasi
│   ├── Hobbies.tsx         # 6 kartu hobi & minat personal
│   ├── Contact.tsx         # Form kontak + social links
│   └── Footer.tsx          # Footer dengan icon sosial
│
├── public/
│   └── (assets, placeholder PDF)
│
├── tailwind.config.ts      # Konfigurasi Tailwind — custom colors, animations
├── next.config.ts          # Konfigurasi Next.js
├── tsconfig.json           # Konfigurasi TypeScript
└── README.md               # Dokumentasi ini
```

---

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm

### Instalasi & Development

```bash
# Clone atau masuk ke direktori proyek
cd cv-portfolio

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
# Build untuk production
npm run build

# Jalankan production server
npm start
```

---

## 📄 Sections Website

| # | Section | Deskripsi |
|---|---------|-----------|
| 1 | **Hero** | Nama, headline typewriter, CTA buttons (Resume, GitHub, LinkedIn, Instagram) |
| 2 | **About / Tech Stack** | Bio singkat + skill cards dalam 3 kategori dengan progress bars |
| 3 | **Portfolio Projects** | 4 proyek unggulan dengan detail proses, tech stack, dan GitHub link |
| 4 | **Education** | Pendidikan formal + 3 sertifikasi dengan progress indicator |
| 5 | **Hobbies** | 6 kartu hobi personal untuk kesan yang lebih manusiawi |
| 6 | **Contact** | Form kontak dengan validasi + tautan semua platform sosial |

---

## ⚡ Fitur Unggulan

- ✅ **Fully Responsive** — Mobile, tablet, desktop
- ✅ **Dark Mode** — Default dark theme premium
- ✅ **SEO Optimized** — Meta tags, Open Graph, semantic HTML
- ✅ **Smooth Scroll** — Navigation antar section mulus
- ✅ **Scroll Animations** — Elemen muncul dengan elegan saat di-scroll
- ✅ **Typewriter Effect** — Headline berganti secara otomatis
- ✅ **Contact Form** — Validasi real-time + mailto integration
- ✅ **Performance First** — Next.js Image optimization, font optimization

---

## 🔮 Pengembangan Selanjutnya

- [ ] Tambah foto profil asli
- [ ] Integrasikan contact form ke backend (EmailJS / Resend)
- [ ] Tambah section Blog / Artikel
- [ ] Deploy ke Vercel
- [ ] Tambah resume PDF yang sebenarnya
- [ ] Animasi halaman masuk (page transition)

---

## 👤 Author

**Marcellinus Alfrits Sorongan**  
S-1 Sistem Informasi — Universitas Amikom Yogyakarta

- 🐙 GitHub: [@Zaayyy](https://github.com/Zaayyy)
- 💼 LinkedIn: [marcell-sorongan](https://www.linkedin.com/in/marcell-sorongan-36070a299)
- 📸 Instagram: [@aceeeelllllll](https://www.instagram.com/aceeeelllllll)
- 📧 Email: soronganmarcell@gmail.com

---

*Dibangun dengan ❤️ menggunakan Next.js & Tailwind CSS*
