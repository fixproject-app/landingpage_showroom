import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Car,
  Bike,
  ShieldCheck,
  Share2,
  FileText,
  Users,
  Wrench,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Maximize2,
  SlidersHorizontal,
  Sparkles,
  Clock,
  FolderKanban,
  Image as ImageIcon,
  Lock,
  Eye,
  Menu,
  Check,
  AlertCircle,
  ExternalLink,
  Smartphone,
  Laptop,
  BarChart3,
  Receipt,
  Settings,
  Info,
  Copy
} from 'lucide-react';

/* ============================================================================
 * 1. KONFIGURASI BRAND, CTA, DAN DATA KONTEN (MUDAH DIUBAH)
 * ============================================================================
 * Catatan Konfigurasi:
 * - Ganti `whatsappNumber` dengan nomor WhatsApp aktif berformat internasional
 *   tanpa tanda '+' atau spasi (contoh: '6281234567890').
 * - Jika `whatsappNumber` masih berupa placeholder 'KONFIGURASI_NOMOR_WA',
 *   aplikasi akan menampilkan modal informasi konfigurasi yang jujur dan
 *   tidak mengarahkan pengunjung ke tautan yang rusak.
 */
const SITE_CONFIG = {
  brandName: 'Fix Projects',
  brandTagline: 'Showroom Web App System',
  serviceName: 'Jasa Pembuatan Web App Showroom Motor / Mobil Bekas',
  mainTagline: 'Showroom Anda, rapi di satu aplikasi. Dari motor/mobil masuk sampai terjual.',
  whatsappNumber: '6285777730169', // Isi dengan format 628xxxxxxxxxx saat siap produksi
  demoUrl: '#demo-katalog', // Dapat diisi URL demo eksternal jika sudah tersedia
  whatsappDefaultMessage:
    'Halo tim Fix Projects, saya ingin berkonsultasi mengenai pembuatan Web App Showroom untuk usaha motor/mobil bekas saya.',
  ctaText: {
    nav: 'Coba Demo',
    heroPrimary: 'Lihat Demo Aplikasi',
    heroSecondary: 'Konsultasi via WhatsApp',
    offer: 'Konsultasi via WhatsApp',
    finalPrimary: 'Lihat Demo Aplikasi',
    finalSecondary: 'Konsultasi via WhatsApp',
  },
};

// Helper pembuat URL WhatsApp yang aman & sesuai standar internasional
function buildWhatsAppUrl(customMessage) {
  const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(customMessage || SITE_CONFIG.whatsappDefaultMessage);
  if (!cleanNumber || SITE_CONFIG.whatsappNumber === 'KONFIGURASI_NOMOR_WA') {
    return null;
  }
  return `https://wa.me/${cleanNumber}?text=${message}`;
}

const MARQUEE_ITEMS = [
  'MOTOR BEKAS',
  'MOBIL BEKAS',
  'MANAJEMEN STOK',
  'RESTORASI',
  'KATALOG ONLINE',
  'PENJUALAN',
  'LAPORAN',
  'DOKUMEN DIGITAL',
];

const PROBLEMS_DATA = [
  {
    number: '01/04',
    title: 'Buku nota menumpuk',
    description:
      'Data pembelian, biaya, dan penjualan sulit dicari kembali karena tercatat terpisah di banyak buku nota.',
    icon: FolderKanban,
    painTag: 'Pencatatan Manual',
    visualNote: 'Nota fisik & arsip terpisah-pisah',
  },
  {
    number: '02/04',
    title: 'Chat WhatsApp berantakan',
    description:
      'Informasi kendaraan dan calon pembeli tersebar di banyak percakapan admin maupun pemilik.',
    icon: MessageSquare,
    painTag: 'Komunikasi Tersebar',
    visualNote: 'Ketik ulang spesifikasi berkali-kali',
  },
  {
    number: '03/04',
    title: 'Foto kendaraan tercecer',
    description:
      'Foto sulit dicari ketika ingin membagikan stok kepada calon pembeli karena menumpuk di galeri HP.',
    icon: ImageIcon,
    painTag: 'Aset Tidak Terpusat',
    visualNote: 'Tercampur dengan foto pribadi di HP',
  },
  {
    number: '04/04',
    title: 'Stok sulit dipantau',
    description:
      'Pemilik membutuhkan gambaran kendaraan yang masuk, sedang direstorasi, siap jual, dan sudah terjual.',
    icon: Eye,
    painTag: 'Visibilitas Operasional',
    visualNote: 'Status unit tidak sinkron antar-tim',
  },
];

const CATALOG_DEMO_UNITS = [
  {
    id: 'FP-MBL-01',
    type: 'Mobil Bekas',
    category: 'SUV',
    name: 'Honda CR-V 1.5L Turbo Prestige',
    year: 2021,
    transmission: 'CVT Automatic',
    mileage: '42.500 km',
    taxStatus: 'Pajak Hidup (08/2027)',
    price: 438000000,
    priceFormatted: 'Rp 438.000.000',
    status: 'Siap Jual',
    verifiedChecklist: true,
    checklistScore: '18/18 Titik Pemeriksaan Tercatat',
    location: 'Showroom Pusat',
    images: [
      'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Interior Orisinal Rapi', 'Riwayat Servis Berkala', 'Dokumen BPKB & Faktur Lengkap'],
  },
  {
    id: 'FP-MTR-02',
    type: 'Motor Bekas',
    category: 'Maxi Scooter',
    name: 'Yamaha XMAX 250 Connected ABS',
    year: 2023,
    transmission: 'Automatic',
    mileage: '8.900 km',
    taxStatus: 'Pajak Hidup (11/2026)',
    price: 61500000,
    priceFormatted: 'Rp 61.500.000',
    status: 'Siap Jual',
    verifiedChecklist: true,
    checklistScore: '14/14 Titik Pemeriksaan Tercatat',
    location: 'Cabang Utama',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Kunci Keyless Lengkap', 'Ban Tebal Depan-Belakang', 'CVT Halus Terawat'],
  },
  {
    id: 'FP-MBL-03',
    type: 'Mobil Bekas',
    category: 'MPV',
    name: 'Toyota Kijang Innova Zenix 2.0 G HV',
    year: 2023,
    transmission: 'e-CVT Hybrid',
    mileage: '21.200 km',
    taxStatus: 'Pajak Hidup (05/2027)',
    price: 445000000,
    priceFormatted: 'Rp 445.000.000',
    status: 'Siap Jual',
    verifiedChecklist: true,
    checklistScore: '18/18 Titik Pemeriksaan Tercatat',
    location: 'Showroom Pusat',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Baterai Hybrid Normal', 'Bebas Bekas Tabrak & Banjir', 'Buku Manual & Kunci Serep Ada'],
  },
  {
    id: 'FP-MTR-04',
    type: 'Motor Bekas',
    category: 'Sport Classic',
    name: 'Kawasaki W175 SE Chrome Edition',
    year: 2022,
    transmission: 'Manual 5-Speed',
    mileage: '11.400 km',
    taxStatus: 'Pajak Hidup (03/2027)',
    price: 27800000,
    priceFormatted: 'Rp 27.800.000',
    status: 'Siap Jual',
    verifiedChecklist: false,
    checklistScore: 'Menunggu Verifikasi Akhir Checklist',
    location: 'Showroom Pusat',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Cat Tangki Mulus', 'Kelistrikan Normal', 'Surat Lengkap STNK & BPKB'],
  },
  {
    id: 'FP-MBL-05',
    type: 'Mobil Bekas',
    category: 'Hatchback',
    name: 'Honda City Hatchback RS Sensing',
    year: 2022,
    transmission: 'CVT Automatic',
    mileage: '29.800 km',
    taxStatus: 'Pajak Hidup (09/2027)',
    price: 289000000,
    priceFormatted: 'Rp 289.000.000',
    status: 'Siap Jual',
    verifiedChecklist: true,
    checklistScore: '18/18 Titik Pemeriksaan Tercatat',
    location: 'Showroom Pusat',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Fitur Honda Sensing Aktif', 'Body Kaleng Orisinal', 'Siap Pakai Luar Kota'],
  },
];

const FEATURE_GRID_DATA = [
  {
    code: 'FITUR 01',
    title: 'Katalog Publik Otomatis',
    copy: 'Etalase online sendiri, tanpa bikin website dari nol.',
    description:
      'Susun kendaraan menjadi katalog profesional dengan foto, informasi harga, filter, dan tombol WhatsApp.',
    icon: Car,
    badge: 'Etalase Digital',
    visualType: 'catalog',
  },
  {
    code: 'FITUR 02',
    title: 'Lencana Terverifikasi',
    copy: 'Pembeli lebih percaya ketika informasi pemeriksaan kendaraan ditampilkan dengan jelas.',
    description:
      'Checklist pemeriksaan membantu admin mencatat kondisi kendaraan. Lencana hanya ditampilkan sesuai aturan verifikasi aplikasi.',
    disclaimer:
      'Catatan: Lencana tidak ditampilkan apabila checklist pemeriksaan atau status unit belum memenuhi aturan verifikasi.',
    icon: ShieldCheck,
    badge: 'Transparansi Kondisi',
    visualType: 'verified',
  },
  {
    code: 'FITUR 03',
    title: 'Bagikan Listing ke WhatsApp',
    copy: 'Sekali klik, kirim informasi kendaraan kepada calon pembeli.',
    description:
      'Bagikan tautan kendaraan dengan judul, foto, dan harga melalui fitur berbagi yang sesuai.',
    disclaimer:
      'Catatan teknis: Pratinjau foto (link preview) pada WhatsApp bergantung pada metadata halaman, crawler, serta perilaku platform.',
    icon: Share2,
    badge: 'Distribusi Cepat',
    visualType: 'whatsapp',
  },
  {
    code: 'FITUR 04',
    title: 'Watermark Foto Otomatis',
    copy: 'Bantu menjaga identitas showroom pada foto kendaraan.',
    description:
      'Tambahkan logo atau watermark pada foto sesuai pengaturan aplikasi.',
    disclaimer:
      'Catatan: Watermark berfungsi menjaga konsistensi identitas visual showroom, bukan perlindungan absolut terhadap pencurian foto.',
    icon: Sparkles,
    badge: 'Identitas Brand',
    visualType: 'watermark',
  },
  {
    code: 'FITUR 05',
    title: 'Kuitansi dan Surat Jual-Beli PDF',
    copy: 'Dokumen lebih rapi dalam hitungan langkah.',
    description:
      'Siapkan dokumen dengan identitas showroom, nomor dokumen, serta data transaksi yang sesuai.',
    icon: FileText,
    badge: 'Administrasi Rapi',
    visualType: 'pdf',
  },
  {
    code: 'FITUR 06',
    title: 'Hak Akses Owner dan Admin',
    copy: 'Pembagian akses yang lebih terstruktur.',
    description:
      'Sesuaikan akses pengguna dengan tanggung jawabnya. Pemilik dapat memantau data sesuai izin yang ditetapkan.',
    disclaimer:
      'Catatan: Rincian izin akses (permission) dikonfigurasi mengikuti ruang lingkup fitur aplikasi yang disepakati.',
    icon: Users,
    badge: 'Kontrol Internal',
    visualType: 'roles',
  },
];

const DEEP_DIVE_SHOWCASES = [
  {
    id: 'showcase-a',
    code: 'SHOWCASE A · MANAJEMEN STOK KENDARAAN',
    eyebrow: 'Manajemen Stok Kendaraan',
    headline: 'Pantau Seluruh Unit dari Satu Daftar Terpusat yang Mudah Dicari.',
    description:
      'Tidak perlu lagi membuka banyak buku nota atau bertanya ke admin hanya untuk mengecek ketersediaan satu unit motor atau mobil.',
    benefits: [
      'Filter instan berdasarkan jenis kendaraan (Motor/Mobil), status unit, dan rentang tahun.',
      'Pencarian cepat menggunakan nomor polisi, kode stok internal, atau merek kendaraan.',
      'Indikator visual yang jelas antara unit Baru Masuk, Dalam Restorasi, Siap Jual, dan Terjual.',
    ],
    type: 'stock',
  },
  {
    id: 'showcase-b',
    code: 'SHOWCASE B · RESTORASI DAN BIAYA',
    eyebrow: 'Restorasi dan Biaya (Sesuai Dukungan Modul)',
    headline: 'Lacak Rincian Biaya Perbaikan agar Modal Pokok Tercatat Akurat.',
    description:
      'Pada konfigurasi aplikasi dengan modul restorasi, setiap pengeluaran bengkel, pengecatan, hingga penggantian suku cadang tercatat langsung pada halaman detail kendaraan.',
    benefits: [
      'Rincian komponen biaya perbaikan (servis mesin, body repair, pajak, detailing).',
      'Perhitungan otomatis akumulasi harga beli awal ditambah total biaya restorasi.',
      'Pemantauan status tahapan pengerjaan sebelum unit dinyatakan siap dipasarkan.',
    ],
    type: 'restoration',
  },
  {
    id: 'showcase-c',
    code: 'SHOWCASE C · KATALOG PUBLIK',
    eyebrow: 'Katalog Publik',
    headline: 'Halaman Detail Kendaraan yang Rapi dan Nyaman Diakses dari HP Pembeli.',
    description:
      'Ketika calon pembeli membuka tautan katalog showroom Anda, mereka langsung melihat galeri foto yang bersih, spesifikasi jelas, dan tombol tanya WhatsApp.',
    benefits: [
      'Galeri multi-foto yang responsif dengan informasi tahun, kilometer, dan status pajak.',
      'Ringkasan poin pemeriksaan kondisi kendaraan yang mudah dibaca calon pembeli.',
      'Tombol WhatsApp langsung menyertakan nama dan kode unit pada pesan pembuka.',
    ],
    type: 'public-detail',
  },
  {
    id: 'showcase-d',
    code: 'SHOWCASE D · WATERMARK DAN BERBAGI',
    eyebrow: 'Watermark dan Berbagi',
    headline: 'Jaga Konsistensi Identitas Showroom Saat Membagikan Stok.',
    description:
      'Bantu tim admin membagikan informasi unit dengan format teks yang rapi serta penempatan identitas visual showroom pada foto katalog.',
    benefits: [
      'Penempatan watermark logo atau nama showroom secara konsisten sesuai pengaturan.',
      'Template teks ringkasan spesifikasi siap salin untuk dikirim ke ruang chat WhatsApp.',
      'Tautan langsung menuju halaman detail unit terkait di katalog publik.',
    ],
    type: 'watermark-share',
  },
  {
    id: 'showcase-e',
    code: 'SHOWCASE E · DOKUMEN TRANSAKSI',
    eyebrow: 'Dokumen Transaksi PDF',
    headline: 'Siapkan Kuitansi dan Surat Jual-Beli PDF yang Seragam dan Rapi.',
    description:
      'Kurangi kesalahan tulis tangan pada kuitansi tanda jadi maupun pelunasan. Data kendaraan dan pembeli langsung disusun ke dalam format PDF siap unduh.',
    benefits: [
      'Kop dokumen resmi memuat logo, nama, dan informasi kontak showroom Anda.',
      'Penomoran dokumen terstruktur beserta rincian identitas kendaraan.',
      'Dapat diunduh dan dibuka dengan nyaman baik melalui laptop maupun layar smartphone.',
    ],
    type: 'pdf-doc',
  },
  {
    id: 'showcase-f',
    code: 'SHOWCASE F · DASHBOARD DAN HAK AKSES',
    eyebrow: 'Dashboard dan Hak Akses',
    headline: 'Bedakan Tampilan Kerja Admin Harian dengan Panel Pantau Owner.',
    description:
      'Atur pembagian tugas secara proporsional. Admin fokus memperbarui stok dan foto kendaraan, sementara pemilik memantau ringkasan operasional sesuai izin yang ditetapkan.',
    benefits: [
      'Tampilan Admin difokuskan pada input unit masuk, unggah foto, dan pembaruan status.',
      'Tampilan Owner menyajikan ringkasan nilai inventaris, harga perolehan, dan rekap transaksi.',
      'Riwayat aktivitas tercatat agar pemilik mengetahui pembaruan data di dalam aplikasi.',
    ],
    type: 'roles-dashboard',
  },
];

const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Kendaraan Masuk',
    subtitle: 'Catat kendaraan dan informasi pembelian.',
    description:
      'Admin atau pemilik mencatat identitas motor/mobil yang baru masuk, harga pembelian awal, kelengkapan surat (STNK, BPKB, Faktur), serta foto kondisi awal.',
    badge: 'Input Unit Awal',
  },
  {
    step: '02',
    title: 'Pemeriksaan dan Persiapan',
    subtitle: 'Catat kondisi, checklist pemeriksaan, serta biaya restorasi jika fitur tersedia.',
    description:
      'Lakukan pengecekan kondisi fisik dan mesin, isi checklist pemeriksaan, lalu catat setiap biaya perbaikan di bengkel agar total modal unit terhitung rapi.',
    badge: 'Inspeksi & Rekondisi',
  },
  {
    step: '03',
    title: 'Siap Dipasarkan',
    subtitle: 'Tampilkan kendaraan di katalog publik dan bagikan informasi kepada calon pembeli.',
    description:
      'Ubah status unit menjadi Siap Jual. Kendaraan otomatis tampil di etalase online showroom dan siap dibagikan tautannya ke WhatsApp calon pembeli.',
    badge: 'Publikasi Katalog',
  },
  {
    step: '04',
    title: 'Penjualan dan Dokumen',
    subtitle: 'Perbarui status kendaraan serta siapkan dokumen transaksi jika tersedia.',
    description:
      'Saat terjadi kesepakatan, perbarui status unit menjadi Terjual, catat nilai transaksi akhir, dan siapkan dokumen kuitansi atau surat jual-beli dalam format PDF.',
    badge: 'Transaksi Selesai',
  },
];

const DIFFERENTIATORS_DATA = [
  {
    title: 'Pengelolaan kendaraan lebih terstruktur',
    description:
      'Setiap unit memiliki kartu riwayat tersendiri mulai dari saat dibeli, diperbaiki di bengkel, dipajang di katalog, hingga terjual.',
    icon: FolderKanban,
  },
  {
    title: 'Data kendaraan dan informasi penjualan dalam satu sistem',
    description:
      'Tidak perlu lagi mencocokkan buku stok dengan tumpukan kuitansi terpisah karena spesifikasi dan dokumen berada di satu tempat.',
    icon: LayoutDashboard,
  },
  {
    title: 'Katalog dapat diakses melalui tautan',
    description:
      'Calon pembeli cukup membuka satu tautan di browser smartphone mereka untuk melihat seluruh stok motor atau mobil yang siap jual.',
    icon: ExternalLink,
  },
  {
    title: 'Proses berbagi listing lebih praktis',
    description:
      'Kirimkan informasi harga, tahun, dan tautan foto unit ke WhatsApp calon pembeli tanpa harus mengetik ulang spesifikasi dari awal.',
    icon: Share2,
  },
  {
    title: 'Tampilan responsif di smartphone',
    description:
      'Baik pemilik showroom, admin lapangan, maupun calon pembeli dapat mengakses aplikasi dengan nyaman langsung dari layar HP.',
    icon: Smartphone,
  },
  {
    title: 'Dapat dikembangkan sesuai kebutuhan bisnis',
    description:
      'Ruang lingkup fitur dan alur kerja sistem dapat disesuaikan lebih lanjut mengikuti perkembangan showroom Anda melalui kesepakatan proyek.',
    icon: Settings,
  },
];

const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    category: 'Dashboard',
    title: 'Dashboard Eksekutif Showroom',
    subtitle: 'Menampilkan ringkasan total stok, unit siap jual, unit dalam proses, dan aktivitas terbaru.',
    aspect: 'Laptop View · 16:10',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'SIMULASI DASHBOARD OWNER',
    highlights: ['4 Kartu Status Utama', 'Filter Periode Bulanan/Kuartal', 'Log Aktivitas Admin'],
  },
  {
    id: 'gal-2',
    category: 'Daftar Stok',
    title: 'Manajemen Daftar Stok Motor & Mobil',
    subtitle: 'Tabel dan kartu inventaris dengan pencarian cepat, filter kategori, dan label status unit.',
    aspect: 'Web App View · 16:10',
    image:
      'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'MODUL INVENTARIS UNIT',
    highlights: ['Pencarian Kode & Nopol', 'Indikator Status Warna', 'Ringkasan Harga Modal vs Jual'],
  },
  {
    id: 'gal-3',
    category: 'Detail Kendaraan',
    title: 'Halaman Detail Kendaraan & Checklist',
    subtitle: 'Memuat rincian nomor polisi, status pajak, checklist pemeriksaan, dan galeri multi-foto.',
    aspect: 'Split View · Desktop & Mobile',
    image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'PROFIL LENGKAP KENDARAAN',
    highlights: ['18 Poin Checklist Pemeriksaan', 'Status STNK, BPKB & Faktur', 'Riwayat Kepemilikan'],
  },
  {
    id: 'gal-4',
    category: 'Katalog Publik',
    title: 'Etalase Katalog Publik Responsif',
    subtitle: 'Tampilan publik beridentitas showroom dengan filter mudah dan tombol tanya WhatsApp.',
    aspect: 'Mobile First · Smartphone & Desktop',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'ETALASE ONLINE PELANGGAN',
    highlights: ['Filter Motor / Mobil & Harga', 'Slider Foto Kendaraan', 'Tombol Tanya via WhatsApp'],
  },
  {
    id: 'gal-5',
    category: 'Restorasi',
    title: 'Modul Pencatatan Restorasi & Biaya Bengkel',
    subtitle: 'Daftar komponen biaya perbaikan, suku cadang, dan akumulasi harga pokok kendaraan.',
    aspect: 'Module View · 16:10',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'KONTROL BIAYA REKONDISI',
    highlights: ['Input Item Perbaikan & Nota', 'Kalkulasi Otomatis Total Modal', 'Status Tahapan Pengerjaan'],
  },
  {
    id: 'gal-6',
    category: 'Laporan',
    title: 'Rekapitulasi Laporan Stok & Penjualan',
    subtitle: 'Ringkasan kendaraan masuk dan kendaraan terjual berdasarkan periode waktu yang dipilih.',
    aspect: 'Analytics View · 16:10',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'MODUL LAPORAN PERIODIK',
    highlights: ['Rekap Unit Terjual per Periode', 'Ringkasan Nilai Akuisisi & Biaya', 'Ekspor Data Ringkas'],
  },
  {
    id: 'gal-7',
    category: 'Dokumen PDF',
    title: 'Pratinjau Kuitansi & Surat Jual-Beli PDF',
    subtitle: 'Dokumen PDF siap cetak atau kirim dengan identitas showroom dan rincian transaksi.',
    aspect: 'A4 Document Preview',
    image:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    uiTag: 'GENERATOR DOKUMEN TRANSAKSI',
    highlights: ['Kop Resmi Showroom Anda', 'Nomor Dokumen Terstruktur', 'Kolom Tanda Tangan Penjual & Pembeli'],
  },
];

const FAQ_DATA = [
  {
    question: '1. Apa itu Web App Showroom?',
    answer:
      'Web App Showroom adalah aplikasi berbasis web yang dirancang untuk membantu pemilik showroom motor atau mobil bekas mengelola data stok kendaraan, memantau biaya restorasi, menampilkan katalog online kepada calon pembeli, hingga menyiapkan dokumen penjualan dalam satu sistem terpadu.',
  },
  {
    question: '2. Apakah aplikasi bisa digunakan melalui HP?',
    answer:
      'Ya. Tampilan aplikasi dirancang dengan pendekatan mobile-first sehingga dapat diakses langsung melalui browser di smartphone (Android maupun iOS), tablet, maupun laptop tanpa perlu menginstall aplikasi berat dari toko aplikasi.',
  },
  {
    question: '3. Apakah bisa digunakan untuk showroom motor dan mobil?',
    answer:
      'Bisa. Struktur sistem mendukung pengelolaan showroom khusus motor bekas, khusus mobil bekas, maupun showroom gabungan yang menjual motor dan mobil sekaligus.',
  },
  {
    question: '4. Apakah saya dapat mencoba demo sebelum membeli?',
    answer:
      'Tentu. Anda dapat menjelajahi simulasi interaktif langsung pada halaman ini atau menghubungi tim kami melalui WhatsApp untuk menjadwalkan sesi demonstrasi aplikasi sesuai kesepakatan.',
  },
  {
    question: '5. Apakah nama dan identitas showroom dapat disesuaikan?',
    answer:
      'Ya. Nama showroom, logo, warna aksen, informasi kontak WhatsApp, serta kop dokumen akan dikonfigurasi mengikuti identitas usaha Anda sesuai ruang lingkup yang disepakati.',
  },
  {
    question: '6. Apakah bisa menggunakan domain sendiri?',
    answer:
      'Bisa. Aplikasi dapat dihubungkan dengan nama domain pilihan showroom Anda (misalnya namashowroomanda.com atau .id) sesuai paket proyek dan deployment yang disepakati.',
  },
  {
    question: '7. Apakah katalog dapat dibagikan melalui WhatsApp?',
    answer:
      'Ya. Setiap unit kendaraan di katalog publik memiliki tautan tersendiri dan tombol berbagi untuk memudahkan pengiriman informasi unit ke WhatsApp calon pembeli. Perlu diketahui bahwa kemunculan gambar pratinjau (link preview) pada chat WhatsApp bergantung pada metadata halaman, crawler, dan perilaku platform WhatsApp.',
  },
  {
    question: '8. Apakah hosting dan domain sudah termasuk?',
    answer:
      'Kebutuhan infrastruktur seperti domain, cloud hosting/deployment, dan kapasitas penyimpanan diatur secara transparan di awal diskusi dan disesuaikan dengan paket proyek yang disepakati bersama.',
  },
  {
    question: '9. Apakah fitur dapat dikembangkan sesuai kebutuhan?',
    answer:
      'Sangat bisa. Karena layanan kami berupa jasa pembuatan dan penyesuaian web app, ruang lingkup fitur dapat disesuaikan atau dikembangkan lebih lanjut mengikuti alur kerja spesifik di showroom Anda berdasarkan kesepakatan proyek.',
  },
  {
    question: '10. Bagaimana proses konsultasi dan pembuatan aplikasi?',
    answer:
      'Proses dimulai dari konsultasi kebutuhan via WhatsApp, pemetaan alur kerja showroom Anda, penyepakatan ruang lingkup fitur & rincian biaya sebelum pengerjaan, konfigurasi identitas & pembangunan sistem, pengujian bersama, hingga pendampingan penggunaan sesuai kesepakatan.',
  },
];

/* ============================================================================
 * 2. CUSTOM HOOK / COMPONENT: SCROLL REVEAL (RESPECTS PREFERS-REDUCED-MOTION)
 * ============================================================================
 * Konten utama tidak pernah disembunyikan permanen jika JS belum jalan;
 * menggunakan transisi ringan pada transform & opacity.
 */
function RevealBox({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [animateReady, setAnimateReady] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      setIsVisible(false);
      setAnimateReady(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out ${
        animateReady && !isVisible
          ? 'opacity-0 translate-y-5'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  );
}

/* ============================================================================
 * 3. SUB-KOMPONEN MODULAR SESUAI SPESIFIKASI ARSITEKTUR
 * ============================================================================
 */

// --- SECTION 01: STICKY NAVBAR ---
function Navbar({ onOpenConsult, onScrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Fitur', target: 'fitur' },
    { label: 'Cara Kerja', target: 'cara-kerja' },
    { label: 'Demo', target: 'demo-katalog' },
    { label: 'FAQ', target: 'faq' },
  ];

  const handleNavClick = (targetId) => {
    setMobileMenuOpen(false);
    onScrollToSection(targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-xl shadow-black/30'
          : 'bg-zinc-950/70 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-zinc-950 font-black text-sm tracking-tighter shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            FP
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base sm:text-lg leading-none tracking-tight">
              {SITE_CONFIG.brandName}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 tracking-wider uppercase mt-0.5">
              showroom web app
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => handleNavClick(item.target)}
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-900/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions (CTA always visible on mobile & desktop) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavClick('demo-katalog')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <span>{SITE_CONFIG.ctaText.nav}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Hamburger Button for Mobile */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-200 hover:text-white hover:border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleNavClick(item.target)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 text-left text-sm font-medium text-zinc-200 hover:border-orange-500/50 hover:text-white"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsult('Navbar Mobile');
              }}
              className="w-full py-2.5 px-4 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Konsultasi via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// --- SECTION 02: HERO SECTION ---
function HeroSection({ onScrollToSection, onOpenConsult }) {
  const [activeHeroTab, setActiveHeroTab] = useState('semua');

  return (
    <section
      id="top"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      {/* Subtle Automotive Grid & Orange Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[380px] bg-orange-500/15 blur-[130px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copywriting Center */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono uppercase tracking-wider text-orange-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>FIX PROJECTS · SISTEM WEB APP SHOWROOM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Showroom Anda,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Rapi di Satu Aplikasi.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Kelola stok motor dan mobil bekas, pantau restorasi, tampilkan katalog online, hingga
            siapkan dokumen penjualan dalam satu aplikasi yang dirancang mengikuti alur usaha Anda.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onScrollToSection('demo-katalog')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-zinc-950 font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <span>{SITE_CONFIG.ctaText.heroPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenConsult('Hero Section')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm sm:text-base border border-zinc-700/80 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>{SITE_CONFIG.ctaText.heroSecondary}</span>
            </button>
          </div>

          {/* Microcopy */}
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dirancang untuk membantu pengelolaan showroom lebih terstruktur.</span>
          </p>

          {/* Quick Trust Pillars */}
          <div className="mt-6 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="text-orange-400">●</span> Dari Motor/Mobil Masuk Sampai Terjual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-orange-400">●</span> Dashboard + Katalog Publik
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-orange-400">●</span> Dokumen PDF Rapi
            </span>
          </div>
        </div>

        {/* Hero Dominant Visual: Laptop Dashboard + Smartphone Catalog Mockup */}
        <div className="mt-12 lg:mt-16 relative">
          {/* Transparency Badge: Visual Demonstrasi */}
          <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              VISUAL DEMONSTRASI ANTARMUKA · FIX PROJECTS STUDIO
            </span>
            <span className="hidden sm:inline text-zinc-500">
              Data pada layar merupakan simulasi produk, bukan klaim statistik pelanggan
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Laptop Mockup (8 Columns on Desktop) */}
            <div className="lg:col-span-8 rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-2xl shadow-black/60 overflow-hidden">
              {/* Browser Window Bar */}
              <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-2 truncate">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">app.showroom-anda.id/dashboard</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/15 text-orange-400 border border-orange-500/30 shrink-0">
                  ● DEMO UI
                </span>
              </div>

              {/* Laptop Dashboard Content */}
              <div className="p-4 sm:p-6 space-y-5">
                {/* Top Summary Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                  <div>
                    <div className="text-xs font-mono text-zinc-400">
                      PANEL KENDALI STOK & RESTORASI
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                      Garasi Utama Motor & Mobil (Simulasi)
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                    {[
                      { id: 'semua', label: 'Semua (24)' },
                      { id: 'siap', label: 'Siap Jual (16)' },
                      { id: 'restorasi', label: 'Restorasi (5)' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveHeroTab(tab.id)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                          activeHeroTab === tab.id
                            ? 'bg-orange-500 text-zinc-950 font-semibold'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/90">
                    <div className="text-[11px] font-mono text-zinc-400">TOTAL STOK AKTIF</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                      24 Unit
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1">14 Mobil · 10 Motor</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/90">
                    <div className="text-[11px] font-mono text-zinc-400">SIAP DIPASARKAN</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-orange-400 mt-1">
                      16 Unit
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">Tampil di katalog publik</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/90">
                    <div className="text-[11px] font-mono text-zinc-400">DALAM RESTORASI</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-300 mt-1">
                      5 Unit
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">Biaya bengkel tercatat</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/90">
                    <div className="text-[11px] font-mono text-zinc-400">TERJUAL BULAN INI</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">
                      8 Unit
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">Dokumen PDF tersimpan</div>
                  </div>
                </div>

                {/* Simulated Vehicle Inventory Rows */}
                <div className="space-y-2.5">
                  {[
                    {
                      code: 'STK-204',
                      unit: 'Honda CR-V 1.5L Turbo Prestige (2021)',
                      category: 'Mobil Bekas',
                      modal: 'Modal + Rekondisi: Rp 409,5 Jt',
                      price: 'Rp 438.000.000',
                      status: 'Siap Jual',
                      statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                      filterGroup: 'siap',
                      img: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=240&q=75',
                    },
                    {
                      code: 'STK-209',
                      unit: 'Yamaha XMAX 250 Connected ABS (2023)',
                      category: 'Motor Bekas',
                      modal: 'Modal + Servis CVT: Rp 56,2 Jt',
                      price: 'Rp 61.500.000',
                      status: 'Siap Jual',
                      statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                      filterGroup: 'siap',
                      img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=240&q=75',
                    },
                    {
                      code: 'STK-212',
                      unit: 'Toyota Innova Reborn 2.4 V Diesel (2020)',
                      category: 'Mobil Bekas',
                      modal: 'Tahap: Poles Body & Kalibrasi Injektor',
                      price: 'Estimasi: Rp 372.000.000',
                      status: 'Proses Restorasi',
                      statusColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                      filterGroup: 'restorasi',
                      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=240&q=75',
                    },
                  ]
                    .filter(
                      (item) => activeHeroTab === 'semua' || item.filterGroup === activeHeroTab
                    )
                    .map((row) => (
                      <div
                        key={row.code}
                        className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={row.img}
                            alt={row.unit}
                            width="64"
                            height="48"
                            className="w-16 h-12 rounded-lg object-cover border border-zinc-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-orange-400">
                                {row.code}
                              </span>
                              <span className="text-[11px] text-zinc-400">• {row.category}</span>
                            </div>
                            <div className="text-sm font-semibold text-white">{row.unit}</div>
                            <div className="text-xs text-zinc-400 mt-0.5">{row.modal}</div>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${row.statusColor}`}
                          >
                            {row.status}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-zinc-100">
                            {row.price}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Smartphone Public Catalog Mockup (4 Columns on Desktop) */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-[28px] bg-zinc-900 border-2 border-zinc-800 p-3 shadow-2xl shadow-black/70 relative fp-float-card">
                {/* Top Speaker Notch */}
                <div className="w-20 h-1.5 bg-zinc-800 rounded-full mx-auto mb-2.5" />

                <div className="rounded-2xl bg-zinc-950 border border-zinc-800/90 overflow-hidden">
                  {/* Mobile Header */}
                  <div className="px-3.5 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-orange-500 text-zinc-950 font-black text-xs flex items-center justify-center">
                        S
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white leading-none">
                          Katalog Showroom Anda
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                          ● Etalase Publik Online
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      HP View
                    </span>
                  </div>

                  {/* Mobile Featured Unit Card */}
                  <div className="p-3.5 space-y-3">
                    <div className="relative rounded-xl overflow-hidden border border-zinc-800">
                      <img
                        src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80"
                        alt="Preview Katalog Motor Bekas di Smartphone"
                        width="400"
                        height="250"
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-zinc-950/85 backdrop-blur-sm border border-emerald-500/40 text-[10px] font-medium text-emerald-300 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Checklist Terverifikasi</span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-zinc-950/80 text-[10px] font-mono text-white/90">
                        SHOWROOM WATERMARK
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span>Tahun 2023 • 8.900 km</span>
                        <span className="text-emerald-400 font-medium">Pajak Hidup</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        Yamaha XMAX 250 Connected ABS
                      </div>
                      <div className="text-base font-extrabold text-orange-400 mt-1">
                        Rp 61.500.000
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onScrollToSection('demo-katalog')}
                        className="py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-200"
                      >
                        Lihat Detail
                      </button>
                      <button
                        type="button"
                        onClick={() => onScrollToSection('demo-katalog')}
                        className="py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Micro Summary Card */}
              <div className="mt-3 w-full max-w-sm rounded-xl bg-zinc-900/90 border border-zinc-800 px-3.5 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="text-zinc-300">Kuitansi & Surat Jual-Beli PDF</span>
                </div>
                <span className="font-mono text-[11px] text-orange-400">Siap Unduh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 03: AUTOMOTIVE MARQUEE ---
function AutomotiveMarquee() {
  // Duplicate items solely for seamless visual loop
  const loopItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      aria-label="Kategori dan Modul Sistem Showroom"
      className="bg-zinc-900 border-y border-zinc-800 py-3.5 overflow-hidden select-none"
    >
      <div className="fp-marquee-track flex items-center gap-8 whitespace-nowrap w-max">
        {loopItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            aria-hidden={idx >= MARQUEE_ITEMS.length ? 'true' : undefined}
            className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono font-semibold tracking-widest text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- SECTION 04: PROBLEM SECTION ---
function ProblemSection() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50 text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-semibold">
            /01 · TANTANGAN OPERASIONAL HARIAN
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Masih Mengelola Showroom dengan Banyak Catatan Terpisah?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Saat stok motor atau mobil bertambah, pencatatan yang terpecah di buku nota, galeri HP,
            dan chat WhatsApp membuat tim kewalahan mencari informasi yang akurat.
          </p>
        </RevealBox>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <RevealBox
                key={item.number}
                delay={idx * 70}
                className="group rounded-2xl bg-white border border-zinc-200/90 p-6 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 group-hover:bg-orange-500 group-hover:text-zinc-950 transition-colors">
                      {item.number}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">{item.painTag}</span>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950">{item.title}</h3>
                  <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item.visualNote}</span>
                </div>
              </RevealBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 05: SOLUTION SECTION ---
function SolutionSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('Bulan Ini');

  const demoStats = {
    'Bulan Ini': {
      totalStok: '24 Unit',
      siapJual: '16 Unit',
      dalamProses: '5 Unit',
      terjual: '8 Unit',
      nilaiStok: 'Rp 4,85 Miliar',
      biayaRestorasi: 'Rp 34,2 Juta',
    },
    'Kuartal Ini': {
      totalStok: '31 Unit',
      siapJual: '19 Unit',
      dalamProses: '4 Unit',
      terjual: '22 Unit',
      nilaiStok: 'Rp 5,60 Miliar',
      biayaRestorasi: 'Rp 89,5 Juta',
    },
  };

  const currentData = demoStats[selectedPeriod];

  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            /02 · SOLUSI TERINTEGRASI
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Satukan Alur Pengelolaan Showroom dalam Satu Aplikasi.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Fix Projects membantu Anda mengelola perjalanan kendaraan dari pertama masuk hingga
            terjual, sekaligus menyajikan katalog yang lebih profesional bagi calon pembeli.
          </p>
        </RevealBox>

        {/* Big Interactive Solution Dashboard Mockup */}
        <RevealBox className="mt-12 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl overflow-hidden">
          {/* Top Notice Bar */}
          <div className="px-4 sm:px-6 py-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <LayoutDashboard className="w-4 h-4 text-orange-400" />
              <span>PUSAT KENDALI SHOWROOM · SIMULASI DASHBOARD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                
              </span>
              <div className="flex rounded-lg bg-zinc-900 p-0.5 border border-zinc-800">
                {['Bulan Ini', 'Kuartal Ini'].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-orange-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* 4 Primary Status Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90">
                <div className="text-xs font-mono text-zinc-400">TOTAL STOK TERCATAT</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
                  {currentData.totalStok}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Motor & Mobil di Garasi</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90">
                <div className="text-xs font-mono text-emerald-400">KENDARAAN SIAP JUAL</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1.5">
                  {currentData.siapJual}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Aktif di Katalog Publik</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90">
                <div className="text-xs font-mono text-amber-300">KENDARAAN DALAM PROSES</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1.5">
                  {currentData.dalamProses}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Tahap Bengkel / Detailing</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90">
                <div className="text-xs font-mono text-orange-400">KENDARAAN TERJUAL</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 mt-1.5">
                  {currentData.terjual}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Periode: {selectedPeriod}</div>
              </div>
            </div>

            {/* Bottom Two Columns: Ringkasan Transaksi & Aktivitas Terbaru */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Ringkasan Transaksi & Modal */}
              <div className="lg:col-span-7 rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Ringkasan Transaksi & Nilai Inventaris (Simulasi)
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Rekapitulasi nilai perolehan unit dan biaya restorasi tercatat
                    </p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
                    <div className="text-xs text-zinc-400">Estimasi Nilai Stok Aktif</div>
                    <div className="text-lg font-bold text-white mt-1">
                      {currentData.nilaiStok}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Berdasarkan harga akuisisi + perbaikan
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
                    <div className="text-xs text-zinc-400">Akumulasi Biaya Restorasi</div>
                    <div className="text-lg font-bold text-amber-300 mt-1">
                      {currentData.biayaRestorasi}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Tercatat per nota pengerjaan unit
                    </div>
                  </div>
                </div>

                {/* Simulated recent transaction table */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono text-zinc-400">
                    RIWAYAT DOKUMEN TRANSAKSI CONTOH
                  </div>
                  {[
                    {
                      doc: 'INV/2026/10/088',
                      unit: 'Honda Brio RS CVT 2022',
                      type: 'Pelunasan & Surat Jual-Beli PDF',
                      amount: 'Rp 182.000.000',
                    },
                    {
                      doc: 'INV/2026/10/087',
                      unit: 'Vespa Sprint S 150 i-Get 2023',
                      type: 'Kuitansi Tanda Jadi (DP) PDF',
                      amount: 'Rp 5.000.000',
                    },
                  ].map((trx) => (
                    <div
                      key={trx.doc}
                      className="px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-mono text-orange-400">{trx.doc}</span>
                        <span className="text-white font-semibold ml-2">{trx.unit}</span>
                        <div className="text-zinc-400 text-[11px]">{trx.type}</div>
                      </div>
                      <span className="font-bold text-emerald-400">{trx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aktivitas Terbaru Tim */}
              <div className="lg:col-span-5 rounded-xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Aktivitas Terbaru Sistem
                    </h3>
                    <Clock className="w-4 h-4 text-zinc-400" />
                  </div>

                  <ul className="space-y-3.5 text-xs">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-zinc-200 font-medium">
                          Admin Raka mengubah status{' '}
                          <span className="text-white">Yamaha XMAX 250</span> menjadi{' '}
                          <span className="text-emerald-400">Siap Jual</span>
                        </div>
                        <div className="text-zinc-500 font-mono text-[11px] mt-0.5">
                          Simulasi · 15 menit lalu
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-zinc-200 font-medium">
                          Biaya servis kaki-kaki & spooring ditambahkan pada{' '}
                          <span className="text-white">Innova Reborn 2020</span> (Rp 1.450.000)
                        </div>
                        <div className="text-zinc-500 font-mono text-[11px] mt-0.5">
                          Simulasi · 1 jam lalu
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-zinc-200 font-medium">
                          Dokumen PDF Surat Jual-Beli{' '}
                          <span className="text-white">INV/2026/10/088</span> dibuat oleh Owner
                        </div>
                        <div className="text-zinc-500 font-mono text-[11px] mt-0.5">
                          Simulasi · 3 jam lalu
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>Seluruh angka di atas adalah contoh demonstrasi antarmuka aplikasi.</span>
                </div>
              </div>
            </div>
          </div>
        </RevealBox>
      </div>
    </section>
  );
}

// --- SECTION 06: PUBLIC CATALOG SHOWCASE (INTERACTIVE CAROUSEL & FILTER) ---
function CatalogShowcase({ onOpenUnitDetail, onOpenConsult }) {
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('Semua');
  const [priceFilter, setPriceFilter] = useState('Semua Harga');
  const [photoIndexMap, setPhotoIndexMap] = useState({});
  const carouselRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const filteredUnits = CATALOG_DEMO_UNITS.filter((unit) => {
    const matchType = vehicleTypeFilter === 'Semua' || unit.type === vehicleTypeFilter;
    let matchPrice = true;
    if (priceFilter === 'Di bawah Rp 100 Jt') {
      matchPrice = unit.price < 100000000;
    } else if (priceFilter === 'Rp 100 Jt - Rp 350 Jt') {
      matchPrice = unit.price >= 100000000 && unit.price <= 350000000;
    } else if (priceFilter === 'Di atas Rp 350 Jt') {
      matchPrice = unit.price > 350000000;
    }
    return matchType && matchPrice;
  });

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 340;
    carouselRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  // Mouse Drag Handlers for Desktop Carousel
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  const toggleUnitPhoto = (unitId, totalPhotos) => {
    setPhotoIndexMap((prev) => ({
      ...prev,
      [unitId]: ((prev[unitId] || 0) + 1) % totalPhotos,
    }));
  };

  return (
    <section
      id="demo-katalog"
      className="py-16 sm:py-24 bg-stone-50 text-zinc-900 border-b border-zinc-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-semibold">
              /03 · DEMONSTRASI KATALOG PUBLIK
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Etalase Online Sendiri, Tanpa Harus Membangun Website dari Nol.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Setiap unit yang berstatus <strong>Siap Jual</strong> otomatis tersusun dalam halaman
              katalog showroom Anda. Coba filter dan geser simulasi katalog di bawah ini.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-end">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
              Demonstrasi Visual (Data Contoh)
            </span>
          </div>
        </RevealBox>

        {/* Simulated Showroom Public Website Container */}
        <div className="mt-10 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl overflow-hidden">
          {/* Showroom Banner Header */}
          <div className="p-5 sm:p-7 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-zinc-950 font-black text-xl flex items-center justify-center shrink-0">
                GM
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Garasi Mandiri Motor & Mobil
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                    Contoh Identitas Showroom
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  Stok motor & mobil bekas pilihan • Dokumen lengkap • Bisa tukar tambah
                </p>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800">
                {['Semua', 'Mobil Bekas', 'Motor Bekas'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVehicleTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      vehicleTypeFilter === type
                        ? 'bg-orange-500 text-zinc-950'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <select
                aria-label="Filter rentang harga kendaraan"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 focus:outline-none focus:border-orange-500"
              >
                <option value="Semua Harga">Semua Rentang Harga</option>
                <option value="Di bawah Rp 100 Jt">Di bawah Rp 100 Juta</option>
                <option value="Rp 100 Jt - Rp 350 Jt">Rp 100 Jt – Rp 350 Jt</option>
                <option value="Di atas Rp 350 Jt">Di atas Rp 350 Juta</option>
              </select>
            </div>
          </div>

          {/* Carousel Navigation Bar */}
          <div className="px-5 sm:px-7 py-3 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-mono">
              Menampilkan <strong className="text-white">{filteredUnits.length}</strong> unit contoh
              (Geser kartu atau gunakan tombol panah)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Geser katalog ke kiri"
                onClick={() => scrollCarousel('prev')}
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-orange-500 text-zinc-200 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Geser katalog ke kanan"
                onClick={() => scrollCarousel('next')}
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-orange-500 text-zinc-200 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Touch & Mouse Draggable Carousel */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            className="p-5 sm:p-7 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'thin' }}
          >
            {filteredUnits.length === 0 ? (
              <div className="w-full py-12 text-center text-zinc-400 text-sm">
                Tidak ada unit contoh pada kombinasi filter ini. Silakan pilih filter lainnya.
              </div>
            ) : (
              filteredUnits.map((unit) => {
                const currentPhotoIdx = photoIndexMap[unit.id] || 0;
                const currentPhotoUrl = unit.images[currentPhotoIdx] || unit.images[0];

                return (
                  <article
                    key={unit.id}
                    className="w-[285px] sm:w-[320px] shrink-0 snap-start rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Vehicle Photo + Slider Toggle */}
                      <div className="relative h-48 bg-zinc-950 overflow-hidden">
                        <img
                          src={currentPhotoUrl}
                          alt={unit.name}
                          loading="lazy"
                          width="320"
                          height="192"
                          className="w-full h-full object-cover select-none"
                        />

                        {/* Category Pill */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-zinc-950/85 backdrop-blur-sm text-[11px] font-mono text-zinc-200 border border-zinc-700">
                          {unit.type}
                        </div>

                        {/* Verified Checklist Badge (Only if verifiedChecklist is true) */}
                        {unit.verifiedChecklist && (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-[11px] font-medium text-emerald-300 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Terverifikasi</span>
                          </div>
                        )}

                        {/* Photo Switcher Button if multiple photos */}
                        {unit.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => toggleUnitPhoto(unit.id, unit.images.length)}
                            className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-zinc-950/85 hover:bg-zinc-900 text-[11px] font-mono text-orange-300 border border-zinc-700"
                          >
                            Foto {currentPhotoIdx + 1}/{unit.images.length} ↻
                          </button>
                        )}
                      </div>

                      {/* Vehicle Info Body */}
                      <div className="p-4">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>
                            {unit.year} • {unit.mileage}
                          </span>
                          <span>{unit.id}</span>
                        </div>

                        <h4 className="text-base font-bold text-white mt-1 line-clamp-1">
                          {unit.name}
                        </h4>

                        <div className="text-lg font-extrabold text-orange-400 mt-1.5">
                          {unit.priceFormatted}
                        </div>

                        <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-1 text-xs text-zinc-300">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-400">Transmisi:</span>
                            <span>{unit.transmission}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-400">Status Pajak:</span>
                            <span className="text-emerald-400">{unit.taxStatus}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenUnitDetail(unit)}
                        className="py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                      >
                        Detail Unit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenConsult(
                            `Simulasi Tanya Unit Katalog: ${unit.name} (${unit.priceFormatted})`
                          )
                        }
                        className="py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Tanya WA</span>
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 07: FEATURE GRID (6 PRIORITAS FITUR) ---
function FeatureGrid() {
  return (
    <section id="fitur" className="py-16 sm:py-24 bg-zinc-950 text-zinc-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            /04 · KAPABILITAS INTI SISTEM
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Fitur yang Dirancang Mengikuti Kebutuhan Showroom.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Enam modul utama yang disusun berdasarkan alur kerja nyata pengelolaan motor dan mobil
            bekas sehari-hari.
          </p>
        </RevealBox>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_GRID_DATA.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <RevealBox
                key={feat.code}
                delay={idx * 60}
                className="group rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Header Code & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="text-xs font-mono font-bold text-orange-400">
                      /{feat.code}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Feature Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  </div>

                  {/* Highlight Copy */}
                  <p className="text-sm font-semibold text-zinc-100 mt-2">“{feat.copy}”</p>

                  {/* Description */}
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{feat.description}</p>

                  {/* Supporting Mini UI Visual per Feature */}
                  <div className="mt-5 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 text-xs">
                    {feat.visualType === 'catalog' && (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-[10px] text-emerald-400">
                            ● KATALOG ONLINE AKTIF
                          </div>
                          <div className="text-zinc-200 font-medium mt-0.5">
                            Filter Motor / Mobil & Harga
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-300 font-mono text-[11px]">
                          Siap Akses
                        </span>
                      </div>
                    )}

                    {feat.visualType === 'verified' && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-300">Checklist Mesin & Transmisi</span>
                          <span className="text-emerald-400 font-mono">✓ Tercatat</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-300">Kelengkapan STNK & BPKB</span>
                          <span className="text-emerald-400 font-mono">✓ Sesuai Aturan</span>
                        </div>
                      </div>
                    )}

                    {feat.visualType === 'whatsapp' && (
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate">
                          <div className="font-mono text-[10px] text-zinc-400">
                            TAUTAN & RINGKASAN UNIT
                          </div>
                          <div className="text-zinc-200 truncate">
                            Honda CR-V 2021 • Rp 438.000.000
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold shrink-0">
                          Bagikan WA
                        </span>
                      </div>
                    )}

                    {feat.visualType === 'watermark' && (
                      <div className="relative h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                        <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase border border-white/20 px-2.5 py-0.5 rounded">
                          WATERMARK SHOWROOM ANDA
                        </span>
                      </div>
                    )}

                    {feat.visualType === 'pdf' && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                          <Laptop className="w-4 h-4 text-orange-400 shrink-0" />
                          <span className="text-[11px] text-zinc-200">Layar Laptop</span>
                        </div>
                        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-[11px] text-zinc-200">Layar HP</span>
                        </div>
                      </div>
                    )}

                    {feat.visualType === 'roles' && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/30">
                          Owner: Pantau Data
                        </span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          Admin: Input & Stok
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transparent Disclaimer Note if Applicable */}
                {feat.disclaimer && (
                  <p className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed">
                    {feat.disclaimer}
                  </p>
                )}
              </RevealBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 08: DEEP-DIVE SHOWCASE (ALTERNATING LEFT-RIGHT) ---
function FeatureShowcase({ onScrollToSection }) {
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyShareSimulation = () => {
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2200);
  };

  return (
    <section className="py-16 sm:py-24 bg-zinc-900 text-zinc-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            /05 · BEDAH MODUL APLIKASI SECARA MENDALAM
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Dirancang Detail untuk Setiap Tahap Operasional Showroom.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Pelajari bagaimana setiap halaman di dalam web app bekerja membantu kerapian
            pencatatan dan kecepatan pelayanan tim Anda.
          </p>
        </RevealBox>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {DEEP_DIVE_SHOWCASES.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <RevealBox
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Text Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-orange-400">
                    {item.code}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mt-3">
                    {item.eyebrow}
                  </div>
                  <h3 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                    {item.headline}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {item.benefits.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => onScrollToSection('demo-katalog')}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-400 hover:text-orange-300"
                    >
                      <span>Lihat Simulasi di Katalog Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mockup Visual Column */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-6 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                      <span>VISUAL DEMONSTRASI · {item.eyebrow.toUpperCase()}</span>
                      <span className="text-orange-400">● SIMULASI UI</span>
                    </div>

                    {/* SHOWCASE A: STOCK MANAGEMENT */}
                    {item.type === 'stock' && (
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Search className="w-4 h-4 text-zinc-500" />
                            <span>Cari Nopol / Kode Unit (mis. B 1924 KZT atau CR-V)...</span>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-zinc-800 text-[11px] font-mono text-zinc-200">
                            Filter: Semua Status ▾
                          </span>
                        </div>

                        {[
                          {
                            id: 'STK-204',
                            name: 'Honda CR-V 1.5L Turbo Prestige 2021',
                            plate: 'B 1829 PQR',
                            status: 'Siap Jual',
                            badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                          },
                          {
                            id: 'STK-209',
                            name: 'Yamaha XMAX 250 Connected 2023',
                            plate: 'D 4412 ZXA',
                            status: 'Siap Jual',
                            badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                          },
                          {
                            id: 'STK-212',
                            name: 'Toyota Innova Reborn 2.4 V Diesel 2020',
                            plate: 'B 2190 TKA',
                            status: 'Dalam Restorasi',
                            badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                          },
                          {
                            id: 'STK-198',
                            name: 'Kawasaki Ninja ZX-25R ABS SE 2022',
                            plate: 'B 6811 KLP',
                            status: 'Terjual',
                            badge: 'bg-zinc-800 text-zinc-400 border-zinc-700',
                          },
                        ].map((u) => (
                          <div
                            key={u.id}
                            className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/90 flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="font-mono text-[11px] text-orange-400">
                                {u.id} • {u.plate}
                              </div>
                              <div className="font-bold text-white text-sm mt-0.5">{u.name}</div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full border font-medium ${u.badge}`}>
                              {u.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* SHOWCASE B: RESTORATION & COST */}
                    {item.type === 'restoration' && (
                      <div className="space-y-4">
                        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-mono text-amber-400">
                              UNIT DALAM PROSES REKONDISI
                            </div>
                            <div className="text-sm font-bold text-white">
                              Toyota Innova Reborn 2.4 V Diesel (2020)
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">
                            Tahap 3/4 · Finishing
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                            <span className="text-zinc-300">Harga Akuisisi Awal (Pembelian Unit)</span>
                            <span className="font-mono font-semibold text-white">Rp 342.000.000</span>
                          </div>
                          <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                            <span className="text-zinc-300">
                              + Servis Berkala, Oli & Kalibrasi Injektor
                            </span>
                            <span className="font-mono text-amber-300">Rp 2.850.000</span>
                          </div>
                          <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                            <span className="text-zinc-300">
                              + Poles Body Full Detailing & Interior
                            </span>
                            <span className="font-mono text-amber-300">Rp 1.650.000</span>
                          </div>
                          <div className="flex justify-between p-3 rounded-xl bg-orange-500/15 border border-orange-500/40 text-sm font-bold">
                            <span className="text-orange-300">Total Modal Pokok Tercatat</span>
                            <span className="font-mono text-white">Rp 346.500.000</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SHOWCASE C: PUBLIC CATALOG DETAIL */}
                    {item.type === 'public-detail' && (
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-6 rounded-xl overflow-hidden border border-zinc-800">
                          <img
                            src="https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=600&q=80"
                            alt="Simulasi Halaman Detail Kendaraan Katalog Publik"
                            loading="lazy"
                            width="400"
                            height="260"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="sm:col-span-6 space-y-2.5 text-xs">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                            ✓ 18/18 CHECKLIST TERISI
                          </span>
                          <div className="text-base font-bold text-white">
                            Honda CR-V 1.5L Turbo Prestige 2021
                          </div>
                          <div className="text-lg font-extrabold text-orange-400">
                            Rp 438.000.000
                          </div>
                          <div className="space-y-1 text-zinc-300 pt-1">
                            <div>• Odometer: 42.500 km</div>
                            <div>• Pajak: Hidup s.d. Agustus 2027</div>
                            <div>• Surat: BPKB, STNK, Faktur Lengkap</div>
                          </div>
                          <div className="pt-2">
                            <span className="w-full py-2 px-3 rounded-lg bg-emerald-500 text-zinc-950 font-bold inline-flex items-center justify-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Tanya Unit Ini via WhatsApp</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SHOWCASE D: WATERMARK & WHATSAPP SHARE */}
                    {item.type === 'watermark-share' && (
                      <div className="space-y-4">
                        <div className="relative h-40 rounded-xl overflow-hidden border border-zinc-800">
                          <img
                            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80"
                            alt="Simulasi Watermark Otomatis"
                            loading="lazy"
                            width="500"
                            height="220"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                            <span className="px-2.5 py-1 rounded bg-zinc-950/80 border border-white/20 text-[11px] font-mono text-white tracking-wider">
                              GARASI MANDIRI MOTOR · STOK RESMI
                            </span>
                            <span className="text-[11px] font-mono text-orange-300">
                              Watermark Otomatis
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
                          <div className="text-zinc-300 truncate">
                            <span className="font-mono text-orange-400">[Format Share WA]</span>{' '}
                            Ready Yamaha XMAX 250 2023 • Pajak Hidup • Rp 61,5 Jt...
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyShareSimulation}
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold shrink-0 flex items-center gap-1.5"
                          >
                            <Copy className="w-3.5 h-3.5 text-orange-400" />
                            <span>{copiedText ? 'Tersalin!' : 'Salin Teks'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SHOWCASE E: PDF RECEIPT & SALE AGREEMENT */}
                    {item.type === 'pdf-doc' && (
                      <div className="rounded-xl bg-stone-50 text-zinc-900 p-4 sm:p-5 border border-zinc-300 shadow-inner space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5">
                          <div>
                            <div className="font-extrabold text-sm text-zinc-950">
                              GARASI MANDIRI SHOWROOM
                            </div>
                            <div className="text-[11px] text-zinc-600">
                              Bukti Kwitansi & Surat Jual-Beli Kendaraan
                            </div>
                          </div>
                          <div className="text-right font-mono text-[11px]">
                            <div className="font-bold text-orange-700">NO: INV/2026/10/088</div>
                            <div className="text-zinc-500">Format: A4 PDF</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-zinc-200">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">UNIT KENDARAAN</span>
                            <span className="font-bold">Honda CR-V 1.5L Turbo 2021</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">NOMOR POLISI</span>
                            <span className="font-mono font-bold">B 1829 PQR</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">JENIS TRANSAKSI</span>
                            <span className="font-semibold text-emerald-700">Pelunasan Unit</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">NILAI TRANSAKSI</span>
                            <span className="font-extrabold text-zinc-950">Rp 438.000.000</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-600">
                          <span>Tersedia untuk diunduh di HP & Laptop</span>
                          <span className="px-2.5 py-1 rounded bg-zinc-900 text-white font-mono">
                            ⬇ Unduh PDF (Simulasi)
                          </span>
                        </div>
                      </div>
                    )}

                    {/* SHOWCASE F: OWNER VS ADMIN ROLES */}
                    {item.type === 'roles-dashboard' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                        <div className="p-4 rounded-xl bg-zinc-900 border border-orange-500/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-orange-400">
                              PANEL OWNER
                            </span>
                            <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px]">
                              Akses Penuh Sesuai Izin
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-zinc-300 pt-1">
                            <li>✓ Pantau harga beli & modal restorasi</li>
                            <li>✓ Lihat rekap penjualan & laporan</li>
                            <li>✓ Kelola akun pengguna & pengaturan</li>
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-zinc-200">
                              PANEL ADMIN
                            </span>
                            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                              Operasional Harian
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-zinc-300 pt-1">
                            <li>✓ Input kendaraan baru & unggah foto</li>
                            <li>✓ Isi checklist pemeriksaan kondisi</li>
                            <li>✓ Bagikan katalog ke calon pembeli</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </RevealBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 09: HOW IT WORKS (4-STEP TIMELINE) ---
function ProcessTimeline() {
  return (
    <section
      id="cara-kerja"
      className="py-16 sm:py-24 bg-stone-50 text-zinc-900 border-y border-zinc-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-semibold">
            /06 · ALUR KERJA TERSTRUKTUR
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Dari Kendaraan Masuk Sampai Terjual.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Empat tahapan sederhana yang menjaga kerapian data showroom tanpa membebani pekerjaan
            harian tim Anda.
          </p>
        </RevealBox>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIMELINE_STEPS.map((item, idx) => (
            <RevealBox
              key={item.step}
              delay={idx * 80}
              className="relative rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-zinc-950 text-orange-400 font-mono font-extrabold text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-200/60">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-950">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold text-orange-700">{item.subtitle}</p>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>TAHAP {item.step}/04</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 10: DIFFERENTIATORS ("BUKAN SEKADAR ETALASE ONLINE") ---
function DifferentiatorSection() {
  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            /07 · NILAI LEBIH SISTEM
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Bukan Sekadar Etalase Online.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Lebih dari sekadar halaman profil biasa, web app ini menyatukan pencatatan internal
            showroom dengan tampilan katalog untuk calon pembeli.
          </p>
        </RevealBox>

        {/* 6 Differentiator Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFERENTIATORS_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <RevealBox
                key={item.title}
                delay={idx * 50}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </RevealBox>
            );
          })}
        </div>

        {/* Before vs After Comparison Inspired by Reference Structure */}
        <RevealBox className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-400">/01 · CARA KONVENSIONAL</span>
              <span className="px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono">
                TERPISAH-PISAH
              </span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex justify-between gap-4 py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Catatan Pembelian & Biaya</span>
                <span className="font-medium text-right">Tersebar di banyak buku nota</span>
              </li>
              <li className="flex justify-between gap-4 py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Foto Stok Kendaraan</span>
                <span className="font-medium text-right">Menumpuk di galeri HP masing-masing</span>
              </li>
              <li className="flex justify-between gap-4 py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-400">Kirim Info ke Calon Pembeli</span>
                <span className="font-medium text-right">Cari foto & ketik ulang spesifikasi</span>
              </li>
              <li className="flex justify-between gap-4 py-1.5">
                <span className="text-zinc-400">Kuitansi & Surat Jual-Beli</span>
                <span className="font-medium text-right">Ditulis manual berulang kali</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-zinc-900 border border-orange-500/40 p-6 shadow-xl shadow-orange-500/5">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <span className="text-xs font-mono text-orange-400">
                /02 · DENGAN WEB APP FIX PROJECTS
              </span>
              <span className="px-2.5 py-0.5 rounded bg-orange-500 text-zinc-950 text-xs font-mono font-bold">
                TERSTRUKTUR
              </span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-200">
              <li className="flex justify-between gap-4 py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Catatan Pembelian & Biaya</span>
                <span className="font-semibold text-white text-right">
                  Tersimpan per halaman kendaraan
                </span>
              </li>
              <li className="flex justify-between gap-4 py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Foto Stok Kendaraan</span>
                <span className="font-semibold text-white text-right">
                  Tersusun rapi di katalog online
                </span>
              </li>
              <li className="flex justify-between gap-4 py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Kirim Info ke Calon Pembeli</span>
                <span className="font-semibold text-emerald-400 text-right">
                  Bagikan tautan unit sekali klik
                </span>
              </li>
              <li className="flex justify-between gap-4 py-1.5">
                <span className="text-zinc-400">Kuitansi & Surat Jual-Beli</span>
                <span className="font-semibold text-orange-400 text-right">
                  Siap unduh dalam format PDF
                </span>
              </li>
            </ul>
          </div>
        </RevealBox>
      </div>
    </section>
  );
}

// --- SECTION 11: GALLERY / PRODUCT PREVIEW WITH WORKING TABS & LIGHTBOX ---
function ProductGallery() {
  const categories = [
    'Semua',
    'Dashboard',
    'Daftar Stok',
    'Detail Kendaraan',
    'Katalog Publik',
    'Restorasi',
    'Laporan',
    'Dokumen PDF',
  ];

  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredGallery =
    activeCategory === 'Semua'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevImage = useCallback(() => {
    if (lightboxIndex === null || filteredGallery.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  }, [lightboxIndex, filteredGallery.length]);

  const showNextImage = useCallback(() => {
    if (lightboxIndex === null || filteredGallery.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
  }, [lightboxIndex, filteredGallery.length]);

  // Keyboard support for Lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrevImage, showNextImage]);

  const activeLightboxItem =
    lightboxIndex !== null && filteredGallery[lightboxIndex]
      ? filteredGallery[lightboxIndex]
      : null;

  return (
    <section className="py-16 sm:py-24 bg-zinc-900 text-zinc-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            /08 · GALERI PRATINJAU MODUL
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Jelajahi Tampilan Setiap Bagian Aplikasi.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Pilih kategori modul di bawah ini dan klik kartu untuk membuka pratinjau ukuran penuh
            (Lightbox).
          </p>
        </RevealBox>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter Kategori Galeri Produk"
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-zinc-950 shadow-md shadow-orange-500/20'
                    : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-orange-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 bg-zinc-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width="480"
                    height="260"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-zinc-950/85 border border-zinc-700 text-[11px] font-mono text-orange-400">
                    {item.category}
                  </div>
                  <button
                    type="button"
                    aria-label={`Perbesar pratinjau ${item.title}`}
                    onClick={() => openLightbox(idx)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-zinc-950/90 hover:bg-orange-500 hover:text-zinc-950 text-xs font-semibold text-white border border-zinc-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </button>
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-mono text-zinc-400">{item.uiTag}</div>
                  <h3 className="text-base font-bold text-white mt-1">{item.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{item.aspect}</span>
                <button
                  type="button"
                  onClick={() => openLightbox(idx)}
                  className="text-orange-400 hover:underline"
                >
                  Lihat Preview →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${activeLightboxItem.title}`}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-orange-400">
                  {activeLightboxItem.category} • {activeLightboxItem.aspect}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup pratinjau gambar"
                onClick={closeLightbox}
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image & Simulated UI Overlay */}
            <div className="relative bg-zinc-950 p-4 sm:p-6">
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 max-h-[60vh]">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-72 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-5">
                  <span className="text-xs font-mono text-orange-400">
                    VISUAL DEMONSTRASI · {activeLightboxItem.uiTag}
                  </span>
                  <p className="text-sm sm:text-base text-zinc-100 mt-1 max-w-2xl">
                    {activeLightboxItem.subtitle}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeLightboxItem.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-700 text-xs text-zinc-200"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              {filteredGallery.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={showPrevImage}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>
                  <span className="text-xs font-mono text-zinc-400">
                    {lightboxIndex + 1} / {filteredGallery.length}
                  </span>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- SECTION 12: PENAWARAN JASA (SERVICE OFFERING) ---
function OfferSection({ onOpenConsult }) {
  const scopeItems = [
    {
      title: 'Konsultasi kebutuhan',
      desc: 'Diskusi awal untuk memetakan jumlah stok, alur pencatatan, dan kebutuhan tim showroom Anda.',
    },
    {
      title: 'Penyesuaian alur kerja',
      desc: 'Penyusunan modul aplikasi yang relevan dengan operasional showroom motor atau mobil bekas Anda.',
    },
    {
      title: 'Konfigurasi identitas showroom sesuai kesepakatan',
      desc: 'Penerapan nama showroom, logo, warna tema, kontak WhatsApp, serta kop dokumen transaksi.',
    },
    {
      title: 'Domain dan deployment sesuai paket proyek',
      desc: 'Penyiapan akses online menggunakan domain pilihan showroom sesuai paket infrastruktur yang disepakati.',
    },
    {
      title: 'Pendampingan penggunaan sesuai kesepakatan',
      desc: 'Panduan pengoperasian bagi pemilik dan admin agar transisi dari buku manual berjalan lancar.',
    },
    {
      title: 'Ruang lingkup fitur yang disepakati sebelum pengerjaan',
      desc: 'Transparansi daftar fitur, tahapan pengerjaan, dan estimasi biaya yang disepakati bersama di awal.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50 text-zinc-900 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Explanation */}
          <RevealBox className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-semibold">
              /09 · PENAWARAN JASA PEMBUATAN SISTEM
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Bangun Sistem Showroom Sesuai Kebutuhan Bisnis Anda.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Fix Projects menyediakan <strong>jasa pembuatan dan penyesuaian web app showroom</strong>{' '}
              (bukan layanan jual-beli kendaraan). Sistem disusun secara profesional mengikuti
              identitas dan skala usaha Anda.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scopeItems.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-zinc-950">{item.title}</h3>
                      <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBox>

          {/* Right Offer Card */}
          <RevealBox className="lg:col-span-5">
            <div className="rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono text-orange-400">
                PAKET PROYEK WEB APP SHOWROOM
              </div>

              <div className="mt-5 pb-6 border-b border-zinc-800">
                <div className="text-xs font-mono text-zinc-400 uppercase">INVESTASI & BIAYA</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Konsultasikan Kebutuhan Anda
                </div>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Biaya pengerjaan disesuaikan secara transparan berdasarkan ruang lingkup modul,
                  kebutuhan kustomisasi, dan konfigurasi deployment yang Anda perlukan.
                </p>
              </div>

              <ul className="my-6 space-y-3 text-sm text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Identitas Nama & Logo Showroom Sendiri</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Manajemen Stok Motor & Mobil Bekas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Katalog Publik Responsif + Integrasi Tombol WA</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modul Restorasi, Laporan & Dokumen PDF Sesuai Kesepakatan</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenConsult('Penawaran Jasa Section')}
                className="w-full py-3.5 px-5 rounded-xl bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-zinc-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{SITE_CONFIG.ctaText.offer}</span>
              </button>

              <p className="mt-3 text-center text-[11px] text-zinc-400">
                Diskusi awal tanpa komitmen untuk memetakan kebutuhan sistem showroom Anda.
              </p>
            </div>
          </RevealBox>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 13: FAQ ACCORDION (10 PERTANYAAN) ---
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-zinc-950 text-zinc-100 border-t border-zinc-800 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBox className="text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
            /10 · PERTANYAAN YANG SERING DIAJUKAN (FAQ)
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Informasi Lengkap Sebelum Anda Memulai.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300">
            Jawaban transparan mengenai layanan pembuatan Web App Showroom Fix Projects.
          </p>
        </RevealBox>

        <div className="mt-10 space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-panel-${idx}`;
            const buttonId = `faq-btn-${idx}`;

            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-zinc-900 border-orange-500/50'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(idx)}
                    className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-orange-500 text-zinc-950 rotate-180'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 14: FINAL CTA ---
function FinalCTA({ onScrollToSection, onOpenConsult }) {
  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/15 blur-[130px] rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-10 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono text-orange-400 mb-4">
                FIX PROJECTS · SIAP MENDAMPINGI SHOWROOM ANDA
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Sudah Saatnya Pengelolaan Showroom Lebih Terstruktur.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
                Lihat bagaimana web app showroom dapat membantu merapikan pencatatan kendaraan,
                menampilkan katalog, dan mendukung proses penjualan Anda.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onScrollToSection('demo-katalog')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all"
                >
                  <span>{SITE_CONFIG.ctaText.finalPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenConsult('Final CTA Section')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm sm:text-base border border-zinc-700 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-orange-400" />
                  <span>{SITE_CONFIG.ctaText.finalSecondary}</span>
                </button>
              </div>
            </div>

            {/* Closing Visual Composition */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                    alt="Visual Kendaraan dan Sistem Web App Showroom Fix Projects"
                    loading="lazy"
                    width="500"
                    height="240"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex items-end p-3.5">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500 text-zinc-950 font-bold">
                        MOTOR & MOBIL BEKAS
                      </span>
                      <div className="text-sm font-bold text-white mt-1">
                        {SITE_CONFIG.mainTagline}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="font-mono text-orange-400 font-bold">Stok</div>
                    <div className="text-[11px] text-zinc-400">Terpusat</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="font-mono text-emerald-400 font-bold">Katalog</div>
                    <div className="text-[11px] text-zinc-400">Siap Share</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="font-mono text-amber-300 font-bold">Dokumen</div>
                    <div className="text-[11px] text-zinc-400">Format PDF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 15: FOOTER ---
function Footer({ onScrollToSection, onOpenConsult }) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-zinc-950 font-black text-xs">
                FP
              </div>
              <span className="text-white font-bold text-lg">{SITE_CONFIG.brandName}</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {SITE_CONFIG.serviceName}. {SITE_CONFIG.mainTagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Navigasi Halaman
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('fitur')}
                  className="hover:text-white transition-colors"
                >
                  Fitur Aplikasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('cara-kerja')}
                  className="hover:text-white transition-colors"
                >
                  Cara Kerja Sistem
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('demo-katalog')}
                  className="hover:text-white transition-colors"
                >
                  Simulasi Katalog Demo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-white transition-colors"
                >
                  Pertanyaan Umum (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Configured Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Konsultasi & Demo
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hubungi kami melalui WhatsApp yang dikonfigurasi untuk diskusi kebutuhan aplikasi
              showroom Anda.
            </p>
            <button
              type="button"
              onClick={() => onOpenConsult('Footer')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Konsultasi via WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}. Hak cipta dilindungi.
          </div>
          <div>
            Seluruh mockup antarmuka pada halaman ini merupakan demonstrasi visual sistem.
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- FLOATING WHATSAPP BUTTON (MOBILE-SAFE PLACEMENT) ---
function WhatsAppButton({ onOpenConsult }) {
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <button
        type="button"
        aria-label="Konsultasi via WhatsApp"
        onClick={() => onOpenConsult('Floating WhatsApp Button')}
        className="group flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-xl shadow-black/50 border border-emerald-400/50 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">Konsultasi WA</span>
      </button>
    </div>
  );
}

/* ============================================================================
 * 4. MAIN APPLICATION COMPONENT (STATE & MODALS)
 * ============================================================================
 */
export default function App() {
  const [selectedUnitModal, setSelectedUnitModal] = useState(null);
  const [consultModalContext, setConsultModalContext] = useState(null);
  const [customWaMessage, setCustomWaMessage] = useState(SITE_CONFIG.whatsappDefaultMessage);
  const [copiedConfigMessage, setCopiedConfigMessage] = useState(false);

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenConsult = (sourceLabel) => {
    const directUrl = buildWhatsAppUrl(
      `${SITE_CONFIG.whatsappDefaultMessage} (Ref: ${sourceLabel})`
    );
    if (directUrl) {
      window.open(directUrl, '_blank', 'noopener,noreferrer');
    } else {
      setCustomWaMessage(SITE_CONFIG.whatsappDefaultMessage);
      setConsultModalContext(sourceLabel);
    }
  };

  const handleCopyMessage = () => {
    if (typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.value = customWaMessage;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedConfigMessage(true);
        setTimeout(() => setCopiedConfigMessage(false), 2000);
      } catch (err) {
        // Fallback silent
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-orange-500 selection:text-zinc-950 overflow-x-hidden">
      {/* Embedded Design Tokens & Keyframe Animations with Reduced Motion Support */}
      <style>{`
        :root {
          --fp-brand-primary: #f97316;
          --fp-brand-secondary: #fbbf24;
          --fp-bg-dark: #09090b;
          --fp-bg-surface: #18181b;
          --fp-bg-light: #fafaf9;
          --fp-text-primary: #fafafa;
          --fp-text-secondary: #a1a1aa;
          --fp-radius-card: 1rem;
          --fp-transition-fast: 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fpMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fpSubtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .fp-marquee-track {
          animation: fpMarquee 28s linear infinite;
        }

        .fp-float-card {
          animation: fpSubtleFloat 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .fp-marquee-track,
          .fp-float-card {
            animation: none !important;
            transform: none !important;
          }
          html {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* SECTION 01: STICKY NAVBAR */}
      <Navbar
        onOpenConsult={handleOpenConsult}
        onScrollToSection={handleScrollToSection}
      />

      {/* MAIN CONTENT */}
      <main>
        {/* SECTION 02: HERO */}
        <HeroSection
          onScrollToSection={handleScrollToSection}
          onOpenConsult={handleOpenConsult}
        />

        {/* SECTION 03: AUTOMOTIVE MARQUEE */}
        <AutomotiveMarquee />

        {/* SECTION 04: PROBLEM SECTION */}
        <ProblemSection />

        {/* SECTION 05: SOLUTION SECTION */}
        <SolutionSection />

        {/* SECTION 06: PUBLIC CATALOG SHOWCASE */}
        <CatalogShowcase
          onOpenUnitDetail={(unit) => setSelectedUnitModal(unit)}
          onOpenConsult={handleOpenConsult}
        />

        {/* SECTION 07: FEATURE GRID */}
        <FeatureGrid />

        {/* SECTION 08: DEEP-DIVE SHOWCASE */}
        <FeatureShowcase onScrollToSection={handleScrollToSection} />

        {/* SECTION 09: HOW IT WORKS */}
        <ProcessTimeline />

        {/* SECTION 10: DIFFERENTIATORS */}
        <DifferentiatorSection />

        {/* SECTION 11: PRODUCT GALLERY WITH LIGHTBOX */}
        <ProductGallery />

        {/* SECTION 12: PENAWARAN JASA */}
        <OfferSection onOpenConsult={handleOpenConsult} />

        {/* SECTION 13: FAQ ACCORDION */}
        <FAQAccordion />

        {/* SECTION 14: FINAL CTA */}
        <FinalCTA
          onScrollToSection={handleScrollToSection}
          onOpenConsult={handleOpenConsult}
        />
      </main>

      {/* SECTION 15: FOOTER */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenConsult={handleOpenConsult}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton onOpenConsult={handleOpenConsult} />

      {/* MODAL 1: DETAIL KENDARAAN DARI SIMULASI KATALOG PUBLIK */}
      {selectedUnitModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detail Kendaraan ${selectedUnitModal.name}`}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedUnitModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-orange-400">
                  SIMULASI DETAIL UNIT · {selectedUnitModal.id}
                </span>
                <h3 className="text-base font-bold text-white">{selectedUnitModal.name}</h3>
              </div>
              <button
                type="button"
                aria-label="Tutup modal detail unit"
                onClick={() => setSelectedUnitModal(null)}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <img
                src={selectedUnitModal.images[0]}
                alt={selectedUnitModal.name}
                className="w-full h-52 object-cover rounded-xl border border-zinc-800"
              />

              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-orange-400">
                  {selectedUnitModal.priceFormatted}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-xs font-medium text-emerald-300">
                  {selectedUnitModal.checklistScore}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs bg-zinc-900 p-3.5 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-400 block">Tahun Perakitan</span>
                  <span className="font-semibold text-white">{selectedUnitModal.year}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Jarak Tempuh</span>
                  <span className="font-semibold text-white">{selectedUnitModal.mileage}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Transmisi</span>
                  <span className="font-semibold text-white">{selectedUnitModal.transmission}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Status Pajak</span>
                  <span className="font-semibold text-emerald-400">
                    {selectedUnitModal.taxStatus}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-zinc-400 mb-2">
                  CATATAN KONDISI & KELENGKAPAN:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedUnitModal.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedUnitModal(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const unitName = selectedUnitModal.name;
                    setSelectedUnitModal(null);
                    handleOpenConsult(`Detail Unit Katalog: ${unitName}`);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Simulasi Tanya WA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KONFIGURASI WHATSAPP JUJUR (JIKA NOMOR WA MASIH PLACEHOLDER) */}
      {consultModalContext && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Informasi Konfigurasi Konsultasi WhatsApp"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setConsultModalContext(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white">
                  Konsultasi via WhatsApp ({SITE_CONFIG.brandName})
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup jendela konsultasi"
                onClick={() => setConsultModalContext(null)}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <strong>Mode Pratinjau Konfigurasi:</strong> Nomor tujuan WhatsApp saat ini diatur
                pada konstanta placeholder{' '}
                <code className="px-1.5 py-0.5 rounded bg-zinc-900 text-orange-300 font-mono">
                  SITE_CONFIG.whatsappNumber
                </code>
                . Isi dengan nomor internasional aktif (misal: <code className="font-mono">6285777730169</code>)
                agar tombol langsung membuka aplikasi WhatsApp.
              </div>

              <div>
                <label
                  htmlFor="wa-message-preview"
                  className="block text-xs font-mono text-zinc-400 mb-1.5"
                >
                  PRATINJAU PESAN KONSULTASI OTOMATIS:
                </label>
                <textarea
                  id="wa-message-preview"
                  rows={3}
                  value={customWaMessage}
                  onChange={(e) => setCustomWaMessage(e.target.value)}
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedConfigMessage ? 'Pesan Tersalin!' : 'Salin Draft Pesan'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultModalContext(null)}
                  className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}