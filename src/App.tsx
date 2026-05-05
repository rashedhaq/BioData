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
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
      <div>
        {/* Floating Action Bar - Fixed Bottom Right */}
        <div className="fixed bottom-6 right-4 z-[60] no-print">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 glass-button px-5 py-2.5 text-brand-stone-800 font-black uppercase tracking-[0.25em] text-[9px] shadow-xl no-print disabled:opacity-50"
            id="print-cv-btn"
          >
            {isDownloading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            {isDownloading ? 'তৈরি হচ্ছে...' : 'পিডিএফ ডাউনলোড'}
          </motion.button>
        </div>

        {/* Theme Background Blobs */}
        <div className="bg-blobs no-print">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-brand-rose rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[20%] -right-20 w-[700px] h-[700px] bg-brand-blue rounded-full blur-[140px] opacity-30"></div>
      </div>

        <div className="max-w-6xl px-4 sm:px-12 py-8 sm:py-12 mx-auto relative px-4" id="printable-content">
          {/* Header Section */}
          <header className="relative flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-brand-stone-200 pb-8 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoading ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <h1 className="text-4xl sm:text-7xl lg:text-8xl font-display font-extrabold text-brand-stone-900 tracking-tight leading-tight">
                মোঃ রাশিদুল হক
              </h1>
              <p className="mt-2 text-brand-stone-600 font-display font-bold text-lg sm:text-2xl">
                মিরপুর ১, ঢাকা-১২১৬
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isLoading ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-2.5 sm:gap-4 text-[12px] sm:text-[13px] font-bold text-brand-stone-700 no-print items-center"
            >
             <div className="relative group overflow-hidden bg-white/50 text-brand-stone-900 px-5 py-2.5 rounded-2xl shadow-sm border border-brand-gold/30 uppercase tracking-[0.2em] text-[10px] font-black font-display transition-all hover:scale-105 active:scale-95">
               <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-1000"></div>
               IT Professional
             </div>
             <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm border border-white/60 transition-all hover:bg-white">
                <div className="p-1.5 bg-brand-stone-50 rounded-lg">
                  <Phone size={12} className="text-brand-stone-500" />
                </div>
                <span className="font-sans font-extrabold text-brand-stone-900 leading-none">01912196464</span>
             </div>
             <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm border border-white/60 transition-all hover:bg-white lowercase">
                <div className="p-1.5 bg-brand-stone-50 rounded-lg">
                  <Mail size={12} className="text-brand-stone-500" />
                </div>
                <span className="font-sans font-extrabold text-brand-stone-900 leading-none tracking-tight">rashidulhaq015@gmail.com</span>
             </div>
            </motion.div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Portrait & Stats */}
            <motion.aside 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
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

              <Section title="জীবন দর্শন" compact>
              <p className="text-sm text-brand-stone-600 leading-relaxed font-sans italic">
                "আল্লাহ প্রদত্ত রাসূল (সাঃ) প্রদর্শিত বিধান অনুযায়ী মানুষের সার্বিক জীবনের পুনর্বিন্যাস সাধন করে আল্লাহর সন্তুষ্টি অর্জন"
              </p>
            </Section>
          </motion.aside>

            {/* Center Column: Detailed Info */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-6 flex flex-col gap-8"
            >
            <div className="flex flex-col gap-8">
              <Section title="শিক্ষাগত যোগ্যতা">
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
              
              <Section title="ব্যক্তিগত তথ্য">
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
              
              <Section title="পেশা">
                <div className="space-y-1">
                  <p className="font-display font-bold text-2xl text-brand-stone-900 tracking-tight">সফটওয়্যার ইঞ্জিনিয়ার</p>
                  <p className="text-[10px] text-brand-stone-500 uppercase tracking-widest font-black font-display">প্রাইভেট আইটি কোম্পানি</p>
                  <p className="text-sm text-brand-stone-600 mt-3 font-medium leading-relaxed font-sans italic">
                    "বর্তমানে একটি বেসরকারি আইটি প্রতিষ্ঠানে কর্মরত আছি।"
                  </p>
                </div>
              </Section>
            </div>

            <Section title="পারিবারিক তথ্য">
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

            <Section title="ঠিকানা">
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
              animate={isLoading ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="lg:col-span-3 flex flex-col gap-6 no-print"
            >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-brand-stone-400 uppercase tracking-widest flex items-center gap-2 flex-1">
                ছবি গ্যালারি <span className="h-px flex-1 bg-brand-stone-200"></span>
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {GALLERY_PHOTOS.map((photo) => (
                <motion.div
                  key={photo.id}
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
                <div className="flex gap-2.5 pt-2 no-print">
                  <a href="http://facebook.com/rashidul.haq0" target="_blank" rel="noopener noreferrer" className="p-2.5 glass-button text-brand-stone-600 hover:text-[#1877F2]">
                    <Facebook size={18} />
                  </a>
                  <a href="https://www.instagram.com/md.rashidul.haq/?hl=en" target="_blank" rel="noopener noreferrer" className="p-2.5 glass-button text-brand-stone-600 hover:text-[#E4405F]">
                    <Instagram size={18} />
                  </a>
                  <a href="https://www.linkedin.com/in/rashidulhaq/" target="_blank" rel="noopener noreferrer" className="p-2.5 glass-button text-brand-stone-600 hover:text-[#0A66C2]">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://wa.me/8801912196464" target="_blank" rel="noopener noreferrer" className="p-2.5 glass-button text-brand-stone-600 hover:text-[#25D366]">
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </main>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
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
  );
}

function Section({ 
  title, 
  children, 
  compact = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  compact?: boolean;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-card p-6 sm:p-8 flex flex-col gap-5 print-break-inside-avoid shadow-lg ${compact ? 'py-6 px-5' : ''}`}
    >
      <h3 className="text-sm font-black text-brand-stone-700 uppercase tracking-[0.25em] flex items-center gap-3 font-display">
        {title} <span className="h-px flex-1 bg-brand-stone-300"></span>
      </h3>
      <div className="w-full font-sans">
        {children}
      </div>
    </motion.div>
  );
}

function CardItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="p-3 -m-3 rounded-2xl hover:bg-white/50 transition-colors"
    >
      {children}
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex justify-between items-center text-sm py-2.5 border-b border-brand-stone-200 last:border-0"
    >
      <span className="text-brand-stone-600 font-bold uppercase tracking-wider text-[10px] font-display">{label}</span>
      <span className="font-bold text-brand-stone-900 font-sans">{value}</span>
    </motion.div>
  );
}

function InfoCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    stone: 'bg-stone-50 text-stone-600 border-stone-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  };

  const selectedColor = colorMap[color] || colorMap.stone;

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white/60 backdrop-blur-sm p-5 rounded-3xl border border-white/60 shadow-sm transition-all hover:shadow-xl hover:bg-white active:scale-95"
    >
      <div className={`w-10 h-10 rounded-2xl ${selectedColor} border flex items-center justify-center mb-4 transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-stone-400 font-display">
          {label}
        </p>
        <p className="text-base font-bold text-brand-stone-900 font-sans tracking-tight">
          {value}
        </p>
      </div>
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-stone-200 group-hover:bg-brand-gold transition-colors"></div>
    </motion.div>
  );
}
