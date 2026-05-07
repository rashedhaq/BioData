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
      // Ensure we are at the top and layout is settled
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const printable = clonedDoc.getElementById('printable-content');
          if (!printable) return;

          // Remove no-print elements
          const noPrint = clonedDoc.querySelectorAll('.no-print');
          noPrint.forEach(el => (el as HTMLElement).style.setProperty('display', 'none', 'important'));

          // Force standard PDF layout - Stabilized for A4
          printable.style.setProperty('padding', '25mm', 'important');
          printable.style.setProperty('width', '1000px', 'important');
          printable.style.setProperty('max-width', '1000px', 'important');
          printable.style.setProperty('margin', '0 auto', 'important');
          printable.style.setProperty('background-color', 'white', 'important');
          printable.style.setProperty('border-radius', '0', 'important');

          // Critical: Fix for modern CSS colors (oklch/oklab) and layout cleanup
          const all = printable.querySelectorAll('*');
          all.forEach(el => {
            const node = el as HTMLElement;
            const style = window.getComputedStyle(node);
            
            // Force reveal everything
            node.style.setProperty('opacity', '1', 'important');
            node.style.setProperty('visibility', 'visible', 'important');
            node.style.setProperty('transform', 'none', 'important');
            node.style.setProperty('animation', 'none', 'important');
            node.style.setProperty('transition', 'none', 'important');
            node.style.setProperty('box-shadow', 'none', 'important');
            node.style.setProperty('text-shadow', 'none', 'important');

            // Responsive Layout Fix: Forces vertical stacking for the PDF
            if (style.display === 'grid' || style.display === 'flex') {
               // Only force block if it's a structural container or has multiple columns
               if (node.classList.contains('grid-cols-2') || 
                   node.classList.contains('grid-cols-4') || 
                   node.classList.contains('md:grid-cols-2') ||
                   node.tagName === 'MAIN') {
                 node.style.setProperty('display', 'block', 'important');
               }
            }
            
            // Clean up card appearances
            if (node.classList.contains('glass-card')) {
              node.style.setProperty('background', '#ffffff', 'important');
              node.style.setProperty('border', '1px solid #e2e8f0', 'important');
              node.style.setProperty('backdrop-filter', 'none', 'important');
              node.style.setProperty('margin-bottom', '20px', 'important');
              node.style.setProperty('padding', '25px', 'important');
            }
          });

          // Style injection for a premium PDF look
          const styleSheet = clonedDoc.createElement('style');
          styleSheet.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            
            * { 
              font-family: 'Inter', system-ui, sans-serif !important; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            header {
              border-bottom: 6px solid #1c1917 !important;
              margin-bottom: 50px !important;
              padding-bottom: 30px !important;
              display: block !important;
              width: 100% !important;
            }

            h1 { 
              font-size: 36pt !important; 
              font-weight: 800 !important; 
              color: #1c1917 !important; 
              margin: 0 0 10px 0 !important;
              letter-spacing: -0.03em !important;
            }

            h3 { 
              font-size: 18pt !important; 
              font-weight: 800 !important; 
              color: #1e293b !important;
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              border-bottom: 2px solid #1e293b !important;
              padding-bottom: 12px !important;
              margin: 40px 0 25px 0 !important;
              display: block !important;
              width: 100% !important;
            }

            section { 
              margin-bottom: 60px !important; 
              page-break-inside: avoid !important; 
              display: block !important;
              width: 100% !important;
              padding-bottom: 20px !important;
            }

            .glass-card { 
               display: block !important;
               width: 100% !important;
               page-break-inside: avoid !important;
               margin-bottom: 35px !important;
               background: #ffffff !important;
               border: 1px solid #f1f5f9 !important;
               padding: 30px !important;
            }

            p, span, div { 
              color: #334155 !important; 
              font-size: 12pt !important;
              line-height: 1.7 !important;
            }

            .text-brand-stone-900 { color: #0f172a !important; font-weight: 700 !important; }
            .text-brand-stone-600 { color: #475569 !important; }
          `;
          clonedDoc.head.appendChild(styleSheet);
        }
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const imgPageHeight = (imgHeight * pdfWidth) / imgWidth;
      const topMargin = 20; // 20mm top margin for pages after the first
      const effectivePageHeight = pdfHeight - topMargin;
      
      // Add the first page (no top margin needed for the very first page as it has header padding)
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgPageHeight);
      
      let heightLeft = imgPageHeight - pdfHeight;
      let position = -pdfHeight;

      // Add remaining pages with a top margin
      while (heightLeft > 0) {
        pdf.addPage();
        // Shift position down by topMargin and draw
        pdf.addImage(imgData, 'JPEG', 0, position + topMargin, pdfWidth, imgPageHeight);
        
        // Overlay a white rectangle at the top to create a clean margin
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdfWidth, topMargin, 'F');

        heightLeft -= effectivePageHeight;
        position -= effectivePageHeight;
      }

      pdf.save(`Md-Rashidul-Haq-CV.pdf`);
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
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-brand-stone-900 tracking-tight mb-8"
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
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-display font-extrabold text-brand-stone-900 tracking-tighter leading-[0.85] mb-2">
                  মোঃ রাশিদুল হক
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px", once: false }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12 bg-brand-gold"></div>
                <p className="text-brand-stone-500 font-display font-bold text-xl sm:text-3xl tracking-tight">
                  মিরপুর ১, ঢাকা-১২১৬
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3 sm:gap-4 text-[12px] sm:text-[13px] font-bold text-brand-stone-700 no-print items-center"
            >
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="relative group overflow-hidden bg-brand-stone-900 text-brand-cream px-6 py-3 rounded-2xl shadow-xl uppercase tracking-[0.25em] text-[10px] font-black font-display"
             >
               <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000"></div>
               IT Professional
             </motion.div>
             <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/60 transition-all hover:bg-white/80 group">
                <div className="p-2 bg-brand-stone-50 rounded-xl group-hover:bg-brand-gold/10 transition-colors">
                  <Phone size={14} className="text-brand-stone-500 group-hover:text-brand-gold" />
                </div>
                <span className="font-sans font-black text-brand-stone-900 leading-none tracking-tight">01912196464</span>
             </div>
             <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/60 transition-all hover:bg-white/80 group lowercase">
                <div className="p-2 bg-brand-stone-50 rounded-xl group-hover:bg-brand-gold/10 transition-colors">
                  <Mail size={14} className="text-brand-stone-500 group-hover:text-brand-gold" />
                </div>
                <span className="font-sans font-black text-brand-stone-900 leading-none tracking-tighter">rashidulhaq015@gmail.com</span>
             </div>
            </motion.div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Portrait & Stats */}
            <motion.aside 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6 }}
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

              <Section title="জীবন দর্শন" compact direction="down">
              <p className="text-sm text-brand-stone-600 leading-relaxed font-sans italic">
                "আল্লাহ প্রদত্ত রাসূল (সাঃ) প্রদর্শিত বিধান অনুযায়ী মানুষের সার্বিক জীবনের পুনর্বিন্যাস সাধন করে আল্লাহর সন্তুষ্টি অর্জন"
              </p>
            </Section>
          </motion.aside>

            {/* Center Column: Detailed Info */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-6 flex flex-col gap-8"
            >
            <div className="flex flex-col gap-8">
              <Section title="শিক্ষাগত যোগ্যতা" direction="up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <CardItem>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">বিএসসি ইঞ্জিনিয়ারিং</p>
                      <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">২০১৯-২০২০</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 font-bold font-display">কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং</p>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">বাংলাদেশ ইউনিভার্সিটি অফ বিজনেস এন্ড টেকনোলজি (BUBT)</p>
                    <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">রেজাল্টঃ সিজিপিএ ৩.৬৩</p>
                  </CardItem>
                  <CardItem>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">কামিল মাস্টার্স</p>
                      <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">২০২৩-২০২৪</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">বেথুলিয়া বড়লাহোরিয়া কামিল মাদ্রাসা</p>
                    <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">তাফসীর বিভাগ | রেজাল্টঃ সিজিপিএ ৩.৮১ (১ম বর্ষ)</p>
                  </CardItem>
                  <CardItem>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">ফাজিল অনার্স</p>
                      <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">২০১৯-২০২০</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">বেথুলিয়া বড়লাহোরিয়া কামিল মাদ্রাসা</p>
                    <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">রেজাল্টঃ জিপিএ ৪.৫০</p>
                  </CardItem>
                  <CardItem>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">আলিম</p>
                      <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">২০১৯</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">হোগলাডাংগী এম আই কামিল মডেল মাদ্রাসা</p>
                    <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">রেজাল্টঃ জিপিএ ৪.৫০ (বিজ্ঞান বিভাগ)</p>
                  </CardItem>
                  <CardItem>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">দাখিল</p>
                      <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">২০১৭</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">হোগলাডাংগী এম আই কামিল মডেল মাদ্রাসা</p>
                    <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">রেজাল্টঃ জিপিএ ৫.০০ (বিজ্ঞান বিভাগ)</p>
                  </CardItem>
                  <CardItem>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-lg sm:text-xl text-brand-stone-900 leading-tight">জেডিসি</p>
                      <span className="text-[10px] bg-brand-stone-100 text-brand-stone-500 px-2 py-0.5 rounded-full font-bold">২০১৪</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-brand-stone-700 uppercase tracking-widest font-black font-display">আফড়া আলিম মাদ্রাসা</p>
                    <p className="text-[12px] sm:text-sm text-brand-stone-600 mt-1 font-bold font-sans">রেজাল্টঃ জিপিএ ৫.০০</p>
                  </CardItem>
                </div>
              </Section>
              
              <Section title="ব্যক্তিগত তথ্য" direction="right">
                <div className="space-y-1">
                  <StatItem label="জন্ম তারিখ" value="১৯/০৭/২০০১" />
                  <StatItem label="জাতীয়তা" value="বাংলাদেশি" />
                  <StatItem label="ধর্ম" value="ইসলাম" />
                  <StatItem label="রক্তের গ্রুপ" value="এবি+" />
                  <StatItem label="উচ্চতা" value="৫'৬''" />
                  <StatItem label="ওজন" value="৬৩ কেজি" />
                  <StatItem label="গায়ের রঙ" value="ফর্সা" />
                </div>
              </Section>
              
              <Section title="পেশা" direction="down">
                <div className="space-y-1">
                  <p className="font-display font-bold text-2xl text-brand-stone-900 tracking-tight">সফটওয়্যার ইঞ্জিনিয়ার</p>
                  <p className="text-[10px] text-brand-stone-500 uppercase tracking-widest font-black font-display">প্রাইভেট আইটি কোম্পানি</p>
                  <p className="text-sm text-brand-stone-600 mt-3 font-medium leading-relaxed font-sans italic">
                    "বর্তমানে একটি বেসরকারি আইটি প্রতিষ্ঠানে কর্মরত"
                  </p>
                </div>
              </Section>
            </div>

            <Section title="পারিবারিক তথ্য" direction="left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <CardItem>
                    <p className="flex flex-col">
                      <span className="text-brand-stone-600 uppercase tracking-widest font-black text-[10px] mb-1 font-display">পিতা</span>
                      <span className="font-bold text-lg text-brand-stone-900 font-sans">মোঃ আরিফুল হক</span>
                      <span className="text-sm text-brand-stone-600 font-bold">সুপার, কল্যাণপুর দাখিল মাদ্রাসা</span>
                    </p>
                  </CardItem>
                  <CardItem>
                    <p className="flex flex-col">
                      <span className="text-brand-stone-600 uppercase tracking-widest font-black text-[10px] mb-1 font-display">মাতা</span>
                      <span className="font-bold text-lg text-brand-stone-900 font-sans">তানিয়া আক্তার</span>
                      <span className="text-sm text-brand-stone-600 font-bold">গৃহিণী</span>
                    </p>
                  </CardItem>
                </div>
                <div className="space-y-4 border-l border-brand-stone-300 pl-8">
                  <CardItem>
                    <p className="flex flex-col">
                      <span className="text-brand-stone-600 uppercase tracking-widest font-black text-[10px] mb-1 font-display">ভাই-বোন</span>
                      <span className="font-extrabold text-lg text-brand-stone-900 font-sans leading-tight">নেই</span>
                      <span className="text-sm text-brand-stone-700 font-bold font-sans italic mt-1">পিতা মাতার একমাত্র সন্তান</span>
                    </p>
                  </CardItem>
                </div>
              </div>
            </Section>

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
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 1 }}
              className="lg:col-span-3 flex flex-col gap-6 no-print"
            >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-brand-stone-400 uppercase tracking-widest flex items-center gap-2 flex-1">
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
            
            <div className="p-5 glass-card bg-brand-gold/5 border-brand-gold/20 mt-auto">
              <p className="text-[10px] text-brand-stone-500 uppercase font-black tracking-[0.2em] mb-3 font-display">সরাসরি যোগাযোগ করুন</p>
              <div className="space-y-3">
                <p className="text-sm font-bold text-brand-stone-900 flex items-center gap-2 font-sans">
                  <Mail size={14} className="text-brand-stone-400" />
                  rashidulhaq015@gmail.com
                </p>
                <p className="text-sm font-bold text-brand-stone-900 flex items-center gap-2 font-sans">
                  <Phone size={14} className="text-brand-stone-400" />
                  01912196464
                </p>
                <div className="flex gap-3 pt-3 no-print">
                  <motion.a 
                    whileHover={{ y: -4, scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="http://facebook.com/rashidul.haq0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#1877F2]/10 backdrop-blur-xl border border-[#1877F2]/20 text-[#1877F2] shadow-sm hover:shadow-[0_10px_25px_-8px_rgba(24,119,242,0.5)] hover:bg-[#1877F2] hover:text-white transition-all duration-500"
                  >
                    <Facebook size={20} weight="fill" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -4, scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.instagram.com/md.rashidul.haq/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#E4405F]/10 backdrop-blur-xl border border-[#E4405F]/20 text-[#E4405F] shadow-sm hover:shadow-[0_10px_25px_-8px_rgba(228,64,95,0.5)] hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-500"
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -4, scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.linkedin.com/in/rashidulhaq/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#0A66C2]/10 backdrop-blur-xl border border-[#0A66C2]/20 text-[#0A66C2] shadow-sm hover:shadow-[0_10px_25px_-8px_rgba(10,102,194,0.5)] hover:bg-[#0A66C2] hover:text-white transition-all duration-500"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -4, scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://wa.me/8801912196464" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#25D366]/10 backdrop-blur-xl border border-[#25D366]/20 text-[#25D366] shadow-sm hover:shadow-[0_10px_25px_-8px_rgba(37,211,102,0.5)] hover:bg-[#25D366] hover:text-white transition-all duration-500"
                  >
                    <Phone size={20} />
                  </motion.a>
                </div>
              </div>
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
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card group relative overflow-hidden p-6 sm:p-8 flex flex-col gap-6 print-break-inside-avoid shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40 backdrop-blur-md rounded-3xl ${compact ? 'py-7 px-6' : ''}`}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/0 group-hover:bg-brand-gold/10 rounded-full blur-3xl pointer-events-none transition-colors duration-700"></div>
      
      <div className="flex items-center gap-4 relative">
        <h3 className="text-[10px] font-black text-brand-stone-500 uppercase tracking-[0.3em] font-display transition-colors group-hover:text-brand-gold">
          {title}
        </h3>
        <div className="h-[2px] bg-brand-stone-100 flex-1 relative overflow-hidden rounded-full">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: false }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
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
              staggerChildren: 0.1
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

function CardItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
      }}
      whileHover={{ scale: 1.01, x: 4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 -m-4 rounded-2xl hover:bg-white/40 transition-all duration-300 border border-transparent hover:border-brand-gold/10 group"
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
