# 🚀 Marcellinus Alfrits Sorongan — Personal CV Website

> Website CV personal yang dibangun sebagai portofolio sekaligus bukti kemampuan web development.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Deskripsi Proyek

Website ini adalah CV digital personal **Marcellinus Alfrits Sorongan** — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta. Didesain dengan estetika **dark mode premium** menggunakan glassmorphism, animasi scroll-triggered, efek parallax, dan layout yang responsif penuh.

Website ini bukan sekadar CV statis — ia sendiri merupakan **demonstrasi langsung kemampuan web development** kepada setiap recruiter yang mengunjunginya.

### Highlights
- 🌌 **Hero section** dengan starfield parallax, orbit icon system, dan terminal widget animasi
- 🔴 **Scroll progress bar** real-time di bagian atas halaman
- 🎬 **Typewriter effect** headline yang berganti otomatis
- 🪐 **Orbiting tech icons** yang interaktif dan bisa di-pause saat hover
- 📊 **Animated counters** yang trigger saat elemen masuk viewport

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
| **Custom CSS** | — | Animasi keyframe, glassmorphism, gradient effects, starfield, meteors, aurora blobs |

### UI & Animasi
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Lucide React** | Latest | Icon library modern dan konsisten berbasis SVG |
| **react-icons** | Latest | Koleksi 40+ icon library termasuk brand icons (GitHub, LinkedIn, AWS, Si*) |

### Form & Interaksi
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React Hook Form** | Latest | Manajemen form dengan validasi performa tinggi dan zero re-renders |

### Font & Typography
| Font | Tipe | Digunakan Untuk |
|------|------|-----------------|
| **Inter** | Sans-serif | Body text, headings, UI elements |
| **Fira Code** | Monospace | Code snippets, badge labels, nav logo, terminal widget |

---

## 🎨 Design System

### Color Palette
```
Primary Background : #020205 (Deep Space Black)
Secondary BG       : #050a15 / #0a0f1e
Accent Cyan        : #00d4ff / #06b6d4
Accent Violet      : #7c3aed / #8b5cf6
Accent Pink        : #ec4899
Glass Surface      : rgba(255, 255, 255, 0.04)
Border             : rgba(255, 255, 255, 0.08)
```

### Efek Visual
- **Glassmorphism** — Kartu semi-transparan dengan `backdrop-filter: blur()`
- **Gradient Text** — Teks animasi cyan-ke-violet dengan keyframe `gradientShift`
- **Glow Effect** — `box-shadow` berwarna untuk tombol dan elemen aktif
- **Scroll Animation** — `IntersectionObserver` memicu animasi `fadeInUp` saat elemen masuk viewport
- **Starfield** — Tiga lapis bintang dengan ukuran berbeda dan efek parallax mouse
- **Aurora Blobs** — Gradien organik yang bergerak perlahan sebagai latar belakang
- **Meteors** — Efek meteor yang meluncur diagonal dengan CSS animation
- **Orbit System** — Icon teknologi yang mengorbit avatar menggunakan `requestAnimationFrame`
- **Progress Bars** — Animasi lebar dari 0% ke nilai target saat terlihat
- **Typewriter Effect** — Efek mengetik dengan kursor berkedip di Hero section
- **Scroll Progress** — Bar progress merah di atas halaman yang menunjukkan posisi scroll

---

## 📂 Struktur Proyek

```
cv-portfolio/
├── app/
│   ├── layout.tsx          # Root layout (font, metadata SEO, dark mode)
│   ├── page.tsx            # Halaman utama — assembles semua sections
│   └── globals.css         # Global styles, Tailwind directives, custom CSS
│                           #   (starfield, aurora, meteors, animations)
│
├── components/
│   ├── Navbar.tsx          # Sticky nav glassmorphism + mobile hamburger menu
│   ├── ScrollProgress.tsx  # Real-time scroll progress bar (merah, fixed top)
│   ├── Hero.tsx            # Hero section — parallax bg, orbit icons, typewriter,
│   │                       #   terminal widget, stats counter, CTA buttons
│   ├── About.tsx           # Bio singkat + skill cards dengan animated progress bars
│   ├── Projects.tsx        # Portfolio grid — proyek unggulan dengan detail & links
│   ├── Education.tsx       # Pendidikan formal + sertifikasi dengan progress indicator
│   ├── Hobbies.tsx         # Kartu hobi & minat personal
│   ├── Contact.tsx         # Form kontak dengan validasi + tautan platform sosial
│   └── Footer.tsx          # Footer dengan icon sosial dan copyright
│
├── public/
│   ├── Profile pic.jpeg    # Foto profil
│   └── (assets, PDF resume)
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
# Clone repository
git clone https://github.com/Zaayyy/cv-portfolio.git
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

### Lint

```bash
npm run lint
```

---

## 📄 Sections Website

| # | Section | Deskripsi |
|---|---------|-----------|
| 1 | **Hero** | Starfield parallax, orbit icon system, nama, headline typewriter, terminal widget animasi, stats counter, CTA buttons |
| 2 | **About / Tech Stack** | Bio singkat + skill cards dalam 3 kategori dengan animated progress bars |
| 3 | **Portfolio Projects** | Proyek unggulan dengan detail proses, tech stack, dan GitHub link |
| 4 | **Education** | Pendidikan formal + sertifikasi dengan progress indicator |
| 5 | **Hobbies** | Kartu hobi personal untuk kesan yang lebih manusiawi |
| 6 | **Contact** | Form kontak dengan validasi + tautan semua platform sosial |

---

## ⚡ Fitur Unggulan

- ✅ **Fully Responsive** — Mobile, tablet, desktop
- ✅ **Dark Mode** — Default dark theme premium
- ✅ **SEO Optimized** — Meta tags, Open Graph, semantic HTML
- ✅ **Smooth Scroll** — Navigation antar section mulus
- ✅ **Scroll Progress Bar** — Indikator merah real-time di atas halaman
- ✅ **Parallax Background** — Starfield, grid, dan nebula bereaksi terhadap gerakan mouse
- ✅ **Orbit System** — Icon teknologi yang mengorbit avatar secara animasi
- ✅ **Terminal Widget** — Animasi terminal yang menampilkan skill & output
- ✅ **Scroll Animations** — Elemen muncul dengan elegan saat di-scroll
- ✅ **Typewriter Effect** — Headline berganti secara otomatis
- ✅ **Animated Counters** — Statistik yang dihitung animasi saat terlihat
- ✅ **Contact Form** — Validasi real-time + mailto integration
- ✅ **Performance First** — Next.js Image optimization, font optimization

---

## 🔮 Pengembangan Selanjutnya

- [x] Tambah foto profil asli
- [x] Scroll progress bar
- [x] Orbit icon system interaktif
- [x] Terminal widget animasi
- [ ] Integrasikan contact form ke backend (EmailJS / Resend)
- [ ] Deploy ke Vercel
- [ ] Tambah resume PDF yang sebenarnya
- [ ] Tambah section Blog / Artikel
- [ ] Animasi halaman masuk (page transition)
- [ ] Dark / Light mode toggle

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
