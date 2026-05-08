/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Download, 
  Printer, 
  User, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Trash2, 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Phone,
  Mail,
  Home,
  Globe,
  Star,
  Activity,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  X,
  ExternalLink,
  Maximize2,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// @ts-ignore
import html2pdf from 'html2pdf.js';
// @ts-ignore
import domtoimage from 'dom-to-image-more';

declare global {
  interface Window {
    particlesJS: any;
  }
}

interface Photo {
  id: string;
  url: string;
  title: string;
}

const GALLERY_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://drive.google.com/file/d/1YNO1WVnmAGG9Gy8dy6RrBA-fBOHgapJg/view?usp=drivesdk',
    title: 'ছবি ১'
  },
  {
    id: '2',
    url: 'https://drive.google.com/file/d/1z3lTE2wMGoFLUgy1fWdGaPrBxZRQwuKX/view?usp=drivesdk',
    title: 'ছবি ২'
  },
  {
    id: '3',
    url: 'https://drive.google.com/file/d/1nyYzGhlmj1QgV2SRb0CKojn-VTmTVPDB/view?usp=drivesdk',
    title: 'ছবি ৩'
  },
  {
    id: '4',
    url: 'https://drive.google.com/file/d/1KIU0dBWV53aESljFjZd6iR9_v-sjo_xd/view?usp=drivesdk',
    title: 'ছবি ৪'
  },
  {
    id: '5',
    url: 'https://drive.google.com/file/d/1h25zYVHlf3Wpbkv1hUYcxb_RUxu55RC6/view?usp=drivesdk',
    title: 'ছবি ৫'
  },
  {
    id: '6',
    url: 'https://drive.google.com/file/d/1AlXbpezTlwcS7sa-tvZL0J20kwztBFwB/view?usp=drivesdk',
    title: 'ছবি ৬'
  },
  {
    id: '7',
    url: 'https://drive.google.com/file/d/1CrDd92A2Pn65k0LJ8DuGlykl9bxVT5ro/view?usp=drivesdk',
    title: 'ছবি ৭'
  },
  {
    id: '8',
    url: 'https://drive.google.com/file/d/1QEggjnFsvA1QG9j7_q-jC8OJe-8FRQZ6/view?usp=drivesdk',
    title: 'ছবি ৮'
  },
  {
    id: '9',
    url: 'https://drive.google.com/file/d/1zkenjAXkrK4C6AocGSc3jqZlilpmUzfB/view?usp=drivesdk',
    title: 'ছবি ৯'
  },
  {
    id: '10',
    url: 'https://drive.google.com/file/d/1sBBV9DviXvzmwWBWfxaecVqd-LL-M5_t/view?usp=drivesdk',
    title: 'ছবি ১০'
  },
  {
    id: '11',
    url: 'https://drive.google.com/file/d/1HnCZodP2QulMUvPOBfTY4O0akoQzs-Hn/view?usp=drivesdk',
    title: 'ছবি ১১'
  },
  {
    id: '12',
    url: 'https://drive.google.com/file/d/1zO2LKpkfP-VN8eUxmGp8Mv71Hx_dBWHV/view?usp=drivesdk',
    title: 'ছবি ১২'
  },
  {
    id: '13',
    url: 'https://drive.google.com/file/d/1c9YroRv32zofgCOaQvK9z7lCx-1BrsVB/view?usp=drivesdk',
    title: 'ছবি ১৩'
  },
  {
    id: '14',
    url: 'https://drive.google.com/file/d/1VDzOFmlnGqZ-pbM1mvp6Hoy1oyTTxmuO/view?usp=drivesdk',
    title: 'ছবি ১৪'
  },
  {
    id: '15',
    url: 'https://drive.google.com/file/d/1OVOIvpfaAdZJnmp_y_AWaMWFI3XYP1WQ/view?usp=drivesdk',
    title: 'ছবি ১৫'
  }
];

// Helper to convert Google Drive links to direct image links
const getGoogleDriveLink = (url: string | null) => {
  if (!url) return "";
  if (url.includes('drive.google.com')) {
    const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || url.match(/id=([a-zA-Z0-9_-]+)/)?.[1];
    return id ? `https://lh3.googleusercontent.com/d/${id}` : url;
  }
  return url;
};

function PopupInfo({ label, icon, color, content }: { 
  label: string; 
  icon: React.ReactNode; 
  color: string;
  content: { name: string; info: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic color mapping
  const colorMap: Record<string, { bg: string, text: string, border: string, hBg: string, glow: string }> = {
    sky: { 
      bg: "bg-sky-50", 
      text: "text-sky-600", 
      border: "border-sky-100/50", 
      hBg: "group-hover:bg-sky-500",
      glow: "hover:shadow-[0_10px_30px_-10px_rgba(14,165,233,0.3)]"
    },
    emerald: { 
      bg: "bg-emerald-50", 
      text: "text-emerald-600", 
      border: "border-emerald-100/50", 
      hBg: "group-hover:bg-emerald-500",
      glow: "hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)]"
    }
  };

  const theme = colorMap[color] || colorMap.sky;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        className={`w-full flex items-center gap-3 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm transition-all group ${theme.glow}`}
      >
        <div className={`w-8 h-8 rounded-lg ${theme.bg} ${theme.text} flex items-center justify-center transition-all ${theme.hBg} group-hover:text-white group-hover:scale-110 shadow-sm border ${theme.border}`}>
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-stone-400 font-display font-black leading-none mb-1">{label}</span>
          <span className="text-[12px] font-bold text-brand-stone-900 font-sans tracking-tight">বিস্তারিত দেখুন</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px] no-print"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-full left-0 mb-3 w-64 z-50 no-print"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl overflow-hidden p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-brand-stone-100">
                  <h4 className="font-display font-black text-[9px] uppercase tracking-widest text-brand-stone-500">{label} এর তথ্য</h4>
                  <button onClick={() => setIsOpen(false)} className="text-brand-stone-400 hover:text-brand-stone-900 transition-colors">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                  {content.map((item, i) => (
                    <div key={i} className="flex flex-col gap-0.5 p-2 rounded-lg bg-black/5 border border-black/5">
                      <span className="text-[13px] font-bold text-brand-stone-900 font-sans">{item.name}</span>
                      <span className="text-[11px] text-brand-stone-500 font-medium italic">{item.info}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-full left-6 w-3 h-3 bg-white/95 transform rotate-45 -translate-y-1.5 border-r border-b border-white/80 shadow-lg"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Initialize Particles.js if available
    if (window.particlesJS) {
      try {
        window.particlesJS('particles-js', {
          "particles": {
            "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#C5A059" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.8, "direction": "top", "random": true, "out_mode": "out" }
          },
          "interactivity": { "events": { "onhover": { "enable": false } } },
          "retina_detect": true
        });
      } catch (e) {
        console.error("Particles.js init failed", e);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = getGoogleDriveLink(url);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-content');
    if (!element) return;

    setIsDownloading(true);
    
    try {
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 800));

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Md-Rashidul-Haq-CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          windowWidth: 1200,
          // NUCLEAR FIX: Ignore all existing styles to prevent oklch/oklab parser crash in Tailwind v4
          ignoreElements: (el: Element) => {
            const tag = el.tagName.toLowerCase();
            return tag === 'style' || tag === 'link';
          },
          onclone: (clonedDoc: Document) => {
            // Remove motion and interactive interference from the clone
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach(el => {
              const node = el as HTMLElement;
              node.style.setProperty('transform', 'none', 'important');
              node.style.setProperty('transition', 'none', 'important');
              node.style.setProperty('animation', 'none', 'important');
              node.style.setProperty('opacity', '1', 'important');
              node.style.setProperty('visibility', 'visible', 'important');
              
              const inline = node.getAttribute('style');
              if (inline && (inline.includes('oklch') || inline.includes('oklab'))) {
                node.setAttribute('style', inline.replace(/oklch\([^)]+\)/g, '#1e293b').replace(/oklab\([^)]+\)/g, '#1e293b'));
              }
            });

            // Inject a safe, high-quality PDF stylesheet
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
              
              * {
                box-sizing: border-box !important;
                font-family: 'Hind Siliguri', sans-serif !important;
                color: #1e293b !important;
              }
              
              body { background: white !important; margin: 0 !important; padding: 0 !important; }
              
              #printable-content { 
                background: white !important; 
                padding: 40px !important; 
                width: 100% !important;
                max-width: 1000px !important;
                margin: 0 auto !important;
              }

              h1 { font-size: 48px !important; margin-bottom: 8px !important; font-weight: 700 !important; }
              h3 { 
                font-size: 26px !important; 
                font-weight: 700 !important; 
                margin-top: 35px !important; 
                display: block !important; 
                border-bottom: 2px solid #1e293b !important; 
                padding-bottom: 10px !important; 
                margin-bottom: 20px !important; 
              }
              p { font-size: 14px !important; line-height: 1.6 !important; }

              .glass-card { 
                background: white !important; 
                border: 1px solid #e2e8f0 !important; 
                border-radius: 12px !important;
                padding: 24px !important;
                margin-bottom: 20px !important;
                display: block !important;
                page-break-inside: avoid !important;
                box-shadow: none !important;
              }

              /* Hide decorative elements */
              .h-\\[2px\\], svg, .w-6, .h-6, .w-10, .h-10, .w-9, .h-9, [class*="lucide"] { display: none !important; }
              
              /* Layout: Multi-column support for PDF */
              .grid { display: block !important; }
              
              /* Force Personal Info & Family Info into 2 columns on A4 */
              .md\\:grid-cols-2, [class*="grid-cols-2"] {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 0 !important;
                width: 100% !important;
              }
              
              .md\\:grid-cols-2 > div, [class*="grid-cols-2"] > div {
                width: 50% !important;
                padding-right: 15px !important;
              }

              /* Personal Info entries */
              .justify-between {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                border-bottom: 1px solid #f1f5f9 !important;
                padding: 10px 0 !important;
                width: 100% !important;
              }
              
              .tracking-\[0\\.15em\] { font-size: 12px !important; font-weight: 600 !important; text-transform: none !important; color: #64748b !important; letter-spacing: 0 !important; }
              .text-\[14px\] { font-size: 14px !important; font-weight: 700 !important; }

              /* Education Section cleanup */
              .flex.items-center.gap-2.mb-1 { display: flex !important; align-items: center !important; margin-bottom: 5px !important; }
              .text-lg.sm\\:text-xl { font-size: 20px !important; font-weight: 700 !important; }
              .text-\\[10px\\]\\.sm\\:text-\\[11px\\] { font-size: 13px !important; color: #475569 !important; margin-top: 4px !important; }
              .text-brand-stone-600.mt-1 { font-size: 14px !important; color: #334155 !important; border-top: 1px dashed #e2e8f0 !important; padding-top: 5px !important; margin-top: 8px !important; }

              /* Cleanup background containers */
              .bg-white\\/20, .backdrop-blur-md, .rounded-2xl { 
                background: transparent !important; 
                border: none !important; 
                box-shadow: none !important; 
              }
              
              .bg-brand-stone-100 { 
                background: #f1f5f9 !important; 
                padding: 2px 10px !important; 
                border-radius: 6px !important; 
                font-size: 13px !important; 
                color: #475569 !important;
                margin-left: 10px !important;
              }

              /* Hide UI/Interactive */
              button, .no-print, #download-buttons, #print-cv-btn, .bg-blobs, #particles-js, .fixed, [role="button"] { 
                display: none !important; 
              }

              footer {
                margin-top: 60px !important;
                border-top: 1px solid #e2e8f0 !important;
                padding-top: 20px !important;
                display: flex !important;
                justify-content: space-between !important;
                color: #64748b !important;
                font-size: 14px !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // @ts-ignore
      html2pdf().from(element).set(opt).save();

    } catch (error) {
      console.error('PDF generation error:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-brand-rose/50">
      {/* Particles Background Layer */}
      <div id="particles-js" className="fixed inset-0 pointer-events-none z-0 no-print"></div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-brand-cream flex flex-col items-center justify-center p-6 no-print"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-stone-900 via-indigo-950 to-brand-stone-900 tracking-tight mb-8"
              >
                মোঃ রাশিদুল হক
              </motion.h2>
              <div className="w-48 h-[1px] bg-brand-stone-200 relative overflow-hidden mx-auto">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-brand-gold w-1/2"
                />
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-brand-stone-400 font-bold">
                জীবনবৃত্তান্ত লোড হচ্ছে
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Floating Action Bar - Fixed Bottom Right */}
        <div className="fixed bottom-6 right-6 z-[60] no-print">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              y: -3,
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(52, 211, 153, 0.4)",
                "0 0 40px rgba(52, 211, 153, 0.7)",
                "0 0 20px rgba(52, 211, 153, 0.4)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: { duration: 0.2 },
              y: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="group relative flex items-center gap-2 bg-emerald-400/40 backdrop-blur-3xl border-2 border-emerald-300 text-emerald-950 px-4 py-2 rounded-full no-print disabled:opacity-50 overflow-hidden"
            id="print-cv-btn"
          >
            {/* Ultra Bright Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-300 via-white/40 to-emerald-200 opacity-40 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative flex items-center gap-1.5">
              <div className="bg-white/60 p-1 rounded-full border border-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                {isDownloading ? (
                  <Loader2 size={12} className="animate-spin text-emerald-800" />
                ) : (
                  <Download size={12} className="text-emerald-900 group-hover:scale-110 transition-transform" />
                )}
              </div>
              <span className="font-display font-black uppercase tracking-[0.15em] text-[10px] antialiased text-emerald-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                {isDownloading ? 'তৈরি...' : 'PDF ডাউনলোড'}
              </span>
            </div>
            
            {/* High-Speed Shimmer Sweep */}
            <motion.div 
              initial={{ x: "-100%", skewX: -20 }}
              animate={{ x: "250%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
            />
          </motion.button>
        </div>

        {/* Theme Background Blobs */}
        <div className="bg-blobs no-print">
          <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-brand-rose rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[20%] -right-20 w-[700px] h-[700px] bg-brand-blue rounded-full blur-[140px] opacity-30"></div>
        </div>

      <div className="max-w-6xl px-4 sm:px-12 py-8 sm:py-12 mx-auto relative" id="printable-content">
        {/* Floating Background Accent */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 right-10 w-64 h-64 bg-brand-gold/5 blur-[100px] pointer-events-none"
        ></motion.div>
          {/* Header Section */}
          <header className="relative flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-12 gap-8 sm:gap-12">
            <div className="text-left relative">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px", once: false }}
                transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-stone-900 via-indigo-950 to-brand-stone-900 tracking-tighter leading-[1.1] mb-2">
                  মোঃ রাশিদুল হক
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px", once: false }}
                transition={{ duration: 2.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12 bg-brand-gold"></div>
                <p className="text-brand-stone-500 font-display font-bold text-base sm:text-xl lg:text-2xl tracking-tight">
                  মিরপুর ১, ঢাকা-১২১৬
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.8
                  }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-2 text-[11px] font-bold text-brand-stone-700 no-print items-start sm:items-center w-full sm:w-auto"
            >
             <motion.div 
               variants={{
                 hidden: { opacity: 0, y: 10, scale: 0.95 },
                 show: { opacity: 1, y: 0, scale: 1 }
               }}
               whileHover={{ scale: 1.05, y: -1 }}
               className="relative group overflow-hidden bg-gradient-to-br from-violet-950 via-indigo-950 to-emerald-950 text-white px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-lg shadow-[0_8px_15px_-4px_rgba(0,0,0,0.4)] uppercase tracking-[0.2em] text-[8px] sm:text-[7.5px] font-black font-display border border-white/5"
             >
               <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-1000"></div>
               <span className="relative z-10 flex items-center gap-1.5">
                 <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                 IT Professional
               </span>
             </motion.div>

             <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ y: -2, scale: 1.02, boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.3)" }}
                className="flex items-center gap-2.5 sm:gap-2 bg-emerald-400/10 backdrop-blur-2xl px-3 py-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-emerald-300/30 transition-all hover:bg-emerald-400/20 group cursor-pointer w-full sm:w-auto shadow-sm"
             >
                <div className="p-1.5 sm:p-1 bg-emerald-500/20 rounded-md group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <Phone size={12} className="text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[6.5px] sm:text-[6px] uppercase tracking-widest text-emerald-600/70 font-display font-black leading-none mb-0.5 whitespace-nowrap">যোগাযোগ</span>
                  <span className="font-sans font-black text-brand-stone-900 text-[12px] sm:text-[10px] leading-none tracking-tight">01912196464</span>
                </div>
             </motion.div>

             <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ y: -2, scale: 1.02, boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.2)" }}
                className="flex items-center gap-2.5 sm:gap-2 bg-emerald-400/10 backdrop-blur-2xl px-3 py-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-emerald-300/30 transition-all hover:bg-emerald-400/20 group cursor-pointer lowercase w-full sm:w-auto shadow-sm"
             >
                <div className="p-1.5 sm:p-1 bg-emerald-500/20 rounded-md group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <Mail size={12} className="text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[6.5px] sm:text-[6px] uppercase tracking-widest text-emerald-600/70 font-display font-black leading-none mb-0.5 whitespace-nowrap">ইমেইল</span>
                  <span className="font-sans font-black text-brand-stone-900 text-[12px] sm:text-[10px] leading-none tracking-tighter">rashidulhaq015@gmail.com</span>
                </div>
             </motion.div>
            </motion.div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Portrait & Stats */}
            <motion.aside 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="lg:col-span-3 flex flex-col gap-8"
            >
              {/* 
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="relative group no-print"
              >
                <div className="w-full aspect-square rounded-3xl overflow-hidden glass-card p-1.5 shadow-2xl shadow-brand-stone-200/50 relative z-10">
                  {profilePhoto ? (
                    <img 
                      src={getGoogleDriveLink(profilePhoto)} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-2xl" 
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-stone-100 rounded-2xl flex flex-col items-center justify-center text-brand-stone-400">
                      <User size={48} className="mb-2 opacity-20" />
                      <p className="text-[10px] uppercase font-bold tracking-widest text-center px-4">ছবি আপলোড করুন</p>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-brand-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2 rounded-2xl cursor-pointer">
                    <button 
                      onClick={() => profileInputRef.current?.click()}
                      className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors"
                    >
                      <Camera size={24} />
                    </button>
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">পরিবর্তন করুন</span>
                    <input 
                      type="file" 
                      ref={profileInputRef} 
                      className="hidden" 
                      onChange={handleProfilePhotoChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              </motion.div>
              */}

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.5
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Section title="জীবন দর্শন" compact direction="left">
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="text-sm text-brand-stone-600 leading-relaxed font-sans italic"
                  >
                    "আল্লাহ প্রদত্ত রাসূল (সাঃ) প্রদর্শিত বিধান অনুযায়ী মানুষের সার্বিক জীবনের পুনর্বিন্যাস সাধন করে আল্লাহর সন্তুষ্টি অর্জন"
                  </motion.p>
                </Section>
              </motion.div>
          </motion.aside>

            {/* Center Column: Detailed Info */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.25,
                    delayChildren: 0.7
                  }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-6 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-8">
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Section title="শিক্ষাগত যোগ্যতা" direction="right">
                    <motion.div 
                      variants={{
                        hidden: {},
                        show: {
                          transition: {
                            staggerChildren: 0.3,
                            delayChildren: 0.2
                          }
                        }
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
                    >
                    {[
                      {
                        title: "বিএসসি ইঞ্জিনিয়ারিং",
                        year: "২০১৯-২০২০",
                        subject: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
                        institution: "বাংলাদেশ ইউনিভার্সিটি অফ বিজনেস এন্ড টেকনোলজি (BUBT)",
                        result: "রেজাল্টঃ সিজিপিএ ৩.৬৩"
                      },
                      {
                        title: "কামিল মাস্টার্স",
                        year: "২০২৩-২০২৪",
                        subject: "তাফসীর বিভাগ",
                        institution: "বেথুলিয়া বড়লাহোরিয়া কামিল মাদ্রাসা",
                        result: "রেজাল্টঃ সিজিপিএ ৩.৮১ (১ম বর্ষ)"
                      },
                      {
                        title: "ফাজিল অনার্স",
                        year: "২০১৯-২০২০",
                        subject: "",
                        institution: "বেথুলিয়া বড়লাহোরিয়া কামিল মাদ্রাসা",
                        result: "রেজাল্টঃ জিপিএ ৪.৫০"
                      },
                      {
                        title: "আলিম",
                        year: "২০১৯",
                        subject: "বিজ্ঞান বিভাগ",
                        institution: "হোগলাডাংগী এম আই কামিল মডেল মাদ্রাসা",
                        result: "রেজাল্টঃ জিপিএ ৪.৫০"
                      },
                      {
                        title: "দাখিল",
                        year: "২০১৭",
                        subject: "বিজ্ঞান বিভাগ",
                        institution: "হোগলাডাংগী এম আই কামিল মডেল মাদ্রাসা",
                        result: "রেজাল্টঃ জিপিএ ৫.০০"
                      },
                      {
                        title: "জেডিসি",
                        year: "২০১৪",
                        subject: "",
                        institution: "আফড়া আলিম মাদ্রাসা",
                        result: "রেজাল্টঃ জিপিএ ৫.০০"
                      }
                    ].map((edu, idx) => (
                      <CardItem key={`edu-${idx}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">{edu.title}</p>
                          <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">{edu.year}</span>
                        </div>
                        {edu.subject && <p className="text-[10px] sm:text-[11px] text-brand-stone-700 font-bold font-display">{edu.subject}</p>}
                        <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">{edu.institution}</p>
                        <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">{edu.result}</p>
                      </CardItem>
                    ))}
                  </motion.div>
                </Section>
              </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Section title="ব্যক্তিগত তথ্য" direction="left">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden shadow-sm">
                  {[
                    { icon: <Calendar size={14} />, label: "জন্ম তারিখ", value: "১৯/০৭/২০০১" },
                    { icon: <Globe size={14} />, label: "জাতীয়তা", value: "বাংলাদেশি" },
                    { icon: <Star size={14} />, label: "ধর্ম", value: "ইসলাম" },
                    { icon: <Activity size={14} />, label: "রক্তের গ্রুপ", value: "এবি+ (AB+)" },
                    { icon: <Maximize2 size={14} />, label: "শারীরিক গঠন", value: "৫'৬'' | ৬৩ কেজি" },
                    { icon: <User size={14} />, label: "গায়ের রঙ", value: "ফর্সা" }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between px-5 py-3.5 ${idx !== 5 ? 'border-b border-white/10' : ''} hover:bg-white/30 transition-colors group`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 flex items-center justify-center text-brand-stone-500 group-hover:text-indigo-600 transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-brand-stone-600 font-display font-black leading-none">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[14px] font-bold text-brand-stone-900 font-sans tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Section title="পেশা" direction="right">
                <div className="space-y-1">
                  <p className="font-display font-bold text-2xl text-brand-stone-900 tracking-tight">সফটওয়্যার ইঞ্জিনিয়ার</p>
                  <p className="text-[10px] text-brand-stone-500 uppercase tracking-widest font-black font-display">প্রাইভেট আইটি কোম্পানি</p>
                  <p className="text-sm text-brand-stone-600 mt-3 font-medium leading-relaxed font-sans italic">
                    "বর্তমানে একটি বেসরকারি আইটি প্রতিষ্ঠানে কর্মরত"
                  </p>
                </div>
              </Section>
            </motion.div>
              
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Section title="পারিবারিক তথ্য" direction="left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { 
                    icon: <User size={16} />, 
                    label: "পিতা", 
                    value: "মোঃ আরিফুল হক", 
                    subtitle: "সুপার, কল্যাণপুর দাখিল মাদ্রাসা", 
                    iconClass: "bg-indigo-50 text-indigo-600 border-indigo-100/50 group-hover:bg-indigo-500",
                    glow: "group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                  },
                  { 
                    icon: <Heart size={16} />, 
                    label: "মাতা", 
                    value: "তানিয়া আক্তার", 
                    subtitle: "গৃহিণী", 
                    iconClass: "bg-rose-50 text-rose-600 border-rose-100/50 group-hover:bg-rose-500",
                    glow: "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                  },
                  { 
                    icon: <Users size={16} />, 
                    label: "ভাই-বোন", 
                    value: "নেই", 
                    subtitle: "পিতা মাতার একমাত্র সন্তান", 
                    iconClass: "bg-amber-50 text-amber-600 border-amber-100/50 group-hover:bg-amber-500",
                    glow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  }
                ].map((member, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                    className={`bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/60 shadow-sm transition-all group ${idx === 2 ? 'sm:col-span-2' : ''} ${member.glow}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:text-white group-hover:scale-110 shadow-sm border ${member.iconClass}`}>
                        {member.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-stone-400 font-display font-black leading-none mb-1.5">{member.label}</span>
                        <h4 className="font-bold text-[16px] text-brand-stone-900 font-sans tracking-tight mb-0.5">{member.value}</h4>
                        <p className="text-xs text-brand-stone-500 font-medium font-sans italic">{member.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Additional Information Popover Buttons */}
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <PopupInfo 
                     label="চাচা" 
                     icon={<Users size={16} />} 
                     color="sky"
                     content={[
                       { name: "১. মোঃ আমিনুল হক", info: "এজিএম, প্রাইভেট কোম্পানি" },
                       { name: "২. মোঃ আরিফুল হক", info: "পিতা" },
                       { name: "৩. মোঃ আনোয়ারুল হক", info: "আরবি প্রভাষক" },
                       { name: "৪. মোঃ আশরাফুল হক", info: "সিটি গ্রুপ" },
                       { name: "৫. মোঃ আব্দুল হক", info: "মরহুম" }
                     ]}
                   />
                  <PopupInfo 
                    label="মামা" 
                    icon={<Users size={16} />} 
                    color="emerald"
                    content={[
                      { name: "মোট মামা", info: "৭ জন" },
                      { name: "পেশা", info: "১ জন শিক্ষক এবং বাকি ৬ জন ব্যবসায়ী" }
                    ]}
                  />
                </div>
              </div>
            </Section>

              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Section title="ঠিকানা" direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <CardItem>
                  <p className="flex flex-col">
                    <span className="text-brand-stone-600 uppercase tracking-widest font-black text-[10px] mb-1 font-display">স্থায়ী ঠিকানা</span>
                    <span className="font-bold text-brand-stone-900 font-sans leading-relaxed">আফড়া, রাজবাড়ী সদর, রাজবাড়ী, ৭৭০০</span>
                  </p>
                </CardItem>
                <CardItem>
                  <p className="flex flex-col sm:border-l border-brand-stone-300 sm:pl-8">
                    <span className="text-brand-stone-600 uppercase tracking-widest font-black text-[10px] mb-1 font-display">বর্তমান ঠিকানা</span>
                    <span className="font-bold text-brand-stone-900 font-sans leading-relaxed">মিরপুর ১, ঢাকা ১২১৬</span>
                  </p>
                </CardItem>
              </div>
            </Section>

{/* 
            <Section title="জীবনসঙ্গিনী">
              <p className="text-base text-brand-stone-600 leading-relaxed italic border-l-4 border-brand-gold pl-6 py-3 font-sans">
                "তাকদীরের উপর বিশ্বাস রেখে জীবনের পথে একজন সৎ সঙ্গিনী খুঁজছি।"
              </p>
            </Section>
            */}
              </motion.div>
            </div>
          </motion.div>
          <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="lg:col-span-3 flex flex-col gap-6 no-print"
            >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-indigo-600/60 uppercase tracking-widest flex items-center gap-2 flex-1">
                ছবি গ্যালারি <span className="h-px flex-1 bg-brand-stone-200"></span>
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {GALLERY_PHOTOS.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative group glass-card p-2 shadow-sm aspect-square lg:aspect-[4/5] cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={getGoogleDriveLink(photo.url)} 
                    alt={photo.title} 
                    className="w-full h-full object-cover rounded-2xl" 
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  
                  {/* Photo Info Overlay */}
                  <div className="absolute inset-2 bg-brand-stone-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all rounded-2xl flex flex-col items-center justify-center gap-2 p-4">
                    <Maximize2 size={24} className="text-white transform scale-90 group-hover:scale-100 transition-transform" />
                    <p className="text-white text-[10px] font-black uppercase tracking-widest text-center">{photo.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-6 bg-white/30 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] mt-auto mt-8">
              <p className="text-[9px] text-brand-stone-400 uppercase font-black tracking-[0.3em] mb-4 font-display px-1">সরাসরি যোগাযোগ করুন</p>
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <motion.a 
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 }
                  }}
                  href="mailto:rashidulhaq015@gmail.com"
                  whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 10px 30px -10px rgba(14,165,233,0.2)" }}
                  className="flex items-center gap-3 bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100/50 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-sky-600/60 font-display font-black leading-none mb-0.5">ইমেইল করুন</span>
                    <span className="text-[13px] font-bold text-brand-stone-900 font-sans tracking-tight">rashidulhaq015@gmail.com</span>
                  </div>
                </motion.a>

                <motion.a 
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 }
                  }}
                  href="tel:01912196464"
                  whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 10px 30px -10px rgba(16,185,129,0.2)" }}
                  className="flex items-center gap-3 bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-emerald-600/60 font-display font-black leading-none mb-0.5">কল করুন</span>
                    <span className="text-[13px] font-bold text-brand-stone-900 font-sans tracking-tight">01912196464</span>
                  </div>
                </motion.a>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="flex gap-3 pt-4 no-print px-1"
                >
                  <motion.a 
                    whileHover={{ y: -6, scale: 1.15, rotate: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="http://facebook.com/rashidul.haq0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-xl border border-white text-[#1877F2] shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(24,119,242,0.4)] transition-all duration-500"
                  >
                    <Facebook size={22} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -6, scale: 1.15, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/md.rashidul.haq/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-xl border border-white text-[#E4405F] shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(228,64,95,0.4)] transition-all duration-500"
                  >
                    <Instagram size={22} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -6, scale: 1.15, rotate: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/rashidulhaq/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-xl border border-white text-[#0A66C2] shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(10,102,194,0.4)] transition-all duration-500"
                  >
                    <Linkedin size={22} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -6, scale: 1.15, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/8801912196464" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-xl border border-white text-[#25D366] shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(37,211,102,0.4)] transition-all duration-500"
                  >
                    <Phone size={22} />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.aside>
        </main>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-brand-stone-200 flex justify-between items-center text-[10px] text-brand-stone-400 font-black tracking-widest uppercase font-display"
        >
          <span>প্রস্তুতকারক: মোঃ রাশিদুল হক © ২০২৬</span>
          <div className="flex gap-6">
            <span>গোপনীয়তা সংরক্ষিত</span>
            <span>প্রোফাইল যাচাইকৃত</span>
          </div>
        </motion.footer>
      </div>

      {/* Photo Lightbox Modal - Minimal Full View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-stone-900 flex items-center justify-center no-print"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Minimal Back Button */}
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 left-6 z-[210] flex items-center gap-3 text-white/70 hover:text-white transition-colors group px-4 py-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">পিছনে ফিরুন</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={getGoogleDriveLink(selectedPhoto.url)} 
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}

function Section({ 
  title, 
  children, 
  compact = false,
  direction = "up"
}: { 
  title: string; 
  children: React.ReactNode; 
  compact?: boolean;
  direction?: "up" | "down" | "left" | "right";
}) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card group relative overflow-hidden p-6 sm:p-8 flex flex-col gap-6 print-break-inside-avoid shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40 backdrop-blur-md rounded-3xl ${compact ? 'py-7 px-6' : ''}`}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/0 group-hover:bg-brand-gold/10 rounded-full blur-3xl pointer-events-none transition-colors duration-700"></div>
      
      <div className="flex items-center gap-4 relative">
        <h3 className="text-[10px] font-black text-indigo-600/70 uppercase tracking-[0.3em] font-display transition-colors group-hover:text-emerald-600">
          {title}
        </h3>
        <div className="h-[2px] bg-brand-stone-100 flex-1 relative overflow-hidden rounded-full">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: false }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/50 to-brand-gold/0"
          ></motion.div>
        </div>
      </div>
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="w-full font-sans relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function CardItem({ children }: { children: React.ReactNode; key?: React.Key }) : React.JSX.Element {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
      }}
      whileHover={{ scale: 1.01, x: 4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 -m-4 rounded-2xl hover:bg-white/40 transition-all duration-300 border border-transparent hover:border-brand-gold/10 group glass-card"
    >
      {children}
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
      }}
      className="flex justify-between items-center text-sm py-4 border-b border-brand-stone-100 last:border-0 group transition-all hover:bg-white/40 -mx-4 px-4 rounded-xl"
    >
      <span className="text-brand-stone-400 font-bold uppercase tracking-[0.25em] text-[8.5px] font-display group-hover:text-brand-stone-700 transition-colors">{label}</span>
      <span className="font-bold text-brand-stone-900 font-sans tracking-tight group-hover:text-brand-gold transition-all group-hover:scale-105 origin-right">{value}</span>
    </motion.div>
  );
}

function InfoCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-emerald-500/5',
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-blue-500/5',
    rose: 'bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-rose-500/5',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-amber-500/5',
    red: 'bg-red-500/10 text-red-600 border-red-500/20 shadow-red-500/5',
    stone: 'bg-stone-500/10 text-stone-600 border-stone-500/20 shadow-stone-500/5',
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 shadow-indigo-500/5',
    cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 shadow-cyan-500/5',
  };

  const selectedColor = colorMap[color] || colorMap.stone;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10, scale: 1.03, rotate: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:bg-white/90 active:scale-95 overflow-hidden"
    >
      {/* High-end Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Subtle Bottom Glow linked to brand color */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${selectedColor.split(' ')[0]} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-1000 group-hover:scale-150`}></div>
      
      <div className={`w-14 h-14 rounded-2xl ${selectedColor} border flex items-center justify-center mb-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[-8deg] shadow-lg`}>
        {icon}
      </div>
      <div className="space-y-2">
        <p className="text-[9px] uppercase font-black tracking-[0.3em] text-brand-stone-400 font-display group-hover:text-brand-stone-500 transition-colors">
          {label}
        </p>
        <p className="text-[1.05rem] font-bold text-brand-stone-900 font-sans tracking-tight leading-tight">
          {value}
        </p>
      </div>
      
      <div className="absolute top-6 right-6">
        <div className="w-2 h-2 rounded-full bg-brand-stone-100 group-hover:bg-brand-gold group-hover:scale-150 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
}
