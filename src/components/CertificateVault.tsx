import React, { useState } from 'react';
import { ShieldCheck, Eye, X, Award, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  refCode: string;
  imageUrl: string;
  date: string;
  skillsVerified: string[];
}

const CERTIFICATE_DATA: Certificate[] = [
  {
    id: '1',
    title: 'Python Core Systems',
    issuer: 'NxtWave Academy',
    refCode: 'ID: NXW-PY-01',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGM8714U7wVYvV5irW-vaWVTSHJFNd92o5ptbOpzDvxeeeic6gRNTalF3OSQ1BG6kyR1WbJJFWqHm1Hzsz8fWEQpcnrkRvSvl6os_onFcz0VYB6IIhmmBKN9laHkSKWocvYJE7Nh9SVbht8UE5qhZXkaqVV5kI2Tkn43kWNAF2RXBZYuryGjHlMxvX0xTCy9GqAOOiGYv2pWOrr5xK5_4rdHH4QNBsXyJJh-fsrDgGDBBxRkoTbVjwJJrlE9z8o8jbnsjwmSjvha0',
    date: 'August 2023',
    skillsVerified: ['Python OOP', 'Data Structures', 'Algorithmic Optimization']
  },
  {
    id: '2',
    title: 'Java Enterprise Engineering',
    issuer: 'NxtWave Academy',
    refCode: 'ID: NXW-JV-02',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPh3fWuTCVAtNqoXKwzc_XknqW9BJf4vNs-_OO1u0eCESVIdXXgMOKLOez9W0jCC8g5YDVn6xuYgriSubyNtt_lcsXJ-W89H0PdX0iVNzlUMcrDiYeRc0B3Dd-k0IDaDIEdIBm4n7phSGJzqO5Ln49TxG4tyqtUrifW6xetSPBLzFoi5GEq9gYA0-dSPx-xLWkgtYxYuWX51Osu7EBdzkPkKcq9uGXu0Z427rRX8iPvHackcuAtV6kw_cUyIxK_zBQBt4dd_XjAQ8',
    date: 'October 2023',
    skillsVerified: ['Java SE/EE', 'Multithreading', 'Database Integrations']
  },
  {
    id: '3',
    title: 'SQL Relational Databases',
    issuer: 'NxtWave Academy',
    refCode: 'ID: NXW-SQL-03',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGM8714U7wVYvV5irW-vaWVTSHJFNd92o5ptbOpzDvxeeeic6gRNTalF3OSQ1BG6kyR1WbJJFWqHm1Hzsz8fWEQpcnrkRvSvl6os_onFcz0VYB6IIhmmBKN9laHkSKWocvYJE7Nh9SVbht8UE5qhZXkaqVV5kI2Tkn43kWNAF2RXBZYuryGjHlMxvX0xTCy9GqAOOiGYv2pWOrr5xK5_4rdHH4QNBsXyJJh-fsrDgGDBBxRkoTbVjwJJrlE9z8o8jbnsjwmSjvha0',
    date: 'November 2023',
    skillsVerified: ['RDBMS Design', 'Query Tuning', 'Joins & Subqueries']
  },
  {
    id: '4',
    title: 'MERN Stack Web Architecture',
    issuer: 'NxtWave Academy',
    refCode: 'ID: NXW-MEAN-04',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCITMf471XIk0Ld1pRdN8JmiBonvWbfcj2bMeCvv1qB7U8huX2sVTA2lB_D8kLrr2K1NthDnm7AjYNR6WwYLZLMCumaTin4OLM7dWWpdbrWe3gyjZ0pRT2xFEDrcumnTql1Nla6WiU-lFI_uQop2nR2WHW14NydaJ4CkY3QYfpdJbRtPcOBMbDgZefvxS1n5389sircYFxkr3xWObDZQjX8dh3i08LHLFCMxcYtxhzV8Ey0CwWVG4xR0Y-81Ox59ObQcjRtZkPGsyI',
    date: 'January 2024',
    skillsVerified: ['React.js', 'Express', 'MongoDB', 'NodeJS', 'REST APIs']
  },
  {
    id: '5',
    title: 'Consistent Programmer Excellence',
    issuer: 'NxtWave Milestone',
    refCode: 'BADGE: CONS-W3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeEulZ8mHkWzuS-7ccvnQdB0Fc5ksVd4mfnCBGaf2O53bbpMhA0NTZV4C_561qlbOIZUnM69fPzWCst__dtFuVHC9W7g5hk406fuuaoCI0EH7ALMaf9qZ3I0Oi-hqOwRVfZW7EvskABP_AMYUh79LkMLn2fHn0WPfSLwML0eQOFHm7rJTs9cxJqafj1pNWZaT2GTLJydJIhWqP14rA3zq0S2WvHKXAf8NG359w-JyxxTPLaH8s4wSVg9PPJpFjHRUQYdQnxOlTD_M',
    date: 'December 2023',
    skillsVerified: ['Daily Consistency', 'Problem Solving Uptime', 'Clean Code Ethics']
  },
  {
    id: '6',
    title: 'Generative AI Frameworks',
    issuer: 'Google Developer Group',
    refCode: 'ID: GOV-AI-05',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJX6USPCgjx0YTrHRNxG9_hbYG6VE9-H_O_1D7pyjCXcF-E_1R36u-Uiq_SX_UEtbj9DSIRpNfn3r2lRs4a1hKRQ6_F-edYqNjVp1QMtRJLmEUQidyrfdIgGgUwm84qA6QN9njGEYAMWbhNgSoJCN3ZGp18cy7oxb9iT6dkNi0_Zs2t0weorFmyu1TTv6Rwhdq82tS7jhvh9X35-ZKgjOmHHNdplsxNeUmTpuVyF0RdD2VoUPvpTZwDkWfU9kU0s8lKAmeSHzjsFU',
    date: 'March 2024',
    skillsVerified: ['LLM Orchestration', 'Prompt Design Systems', 'AI Product Integrations']
  }
];

export const CertificateVault: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleInspect = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsScanning(true);
    // Simulate initial credential verification scan
    setTimeout(() => {
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="space-y-xl">
      {/* Grid of Certificates */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
        {CERTIFICATE_DATA.map((cert) => (
          <div 
            key={cert.id}
            onClick={() => handleInspect(cert)}
            className="glass-panel p-md group hover:bg-[#00f0ff]/5 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="corner-decor"></div>
            
            <div className="aspect-[4/3] bg-[#0e0e10]/80 mb-md relative overflow-hidden rounded-lg border border-[#00f0ff]/10">
              <img 
                alt={cert.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500" 
                src={cert.imageUrl}
              />
              <div className="absolute inset-0 bg-[#00f0ff]/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="text-white drop-shadow-md" size={24} />
              </div>
            </div>

            <div>
              <div className="font-label-caps text-[9px] text-[#00f0ff] mb-1">{cert.refCode}</div>
              <div className="font-code-md text-xs text-on-surface truncate font-semibold">
                {cert.title.split(' ')[0]} {cert.title.split(' ')[1]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Modal Dialog */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-4xl glass-panel bg-[#131315]/95 border-[#00f0ff]/30 p-lg md:p-xl relative overflow-hidden flex flex-col md:flex-row gap-lg rounded-2xl z-10"
            >
              <div className="corner-decor"></div>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-outline hover:text-[#00f0ff] transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Certificate Image Frame */}
              <div className="flex-1 bg-[#0e0e10] rounded-xl overflow-hidden relative border border-[#00f0ff]/20 aspect-[4/3] flex items-center justify-center">
                <img 
                  alt={selectedCert.title} 
                  className="w-full h-full object-contain" 
                  src={selectedCert.imageUrl}
                />

                {/* Laser Cryptographic Verification Scanner Effect */}
                {isScanning && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_12px_#00f0ff] animate-[scan_2.5s_ease-in-out_infinite]" />
                )}
                
                {/* Embedded scan animation styles inline */}
                <style>{`
                  @keyframes scan {
                    0% { top: 0%; }
                    50% { top: 100%; }
                    100% { top: 0%; }
                  }
                `}</style>
              </div>

              {/* Certificate Metadata Panel */}
              <div className="w-full md:w-80 flex flex-col justify-between space-y-md">
                <div className="space-y-sm">
                  <div className="flex items-center gap-2 text-[#00f0ff] font-label-caps text-xs">
                    <ShieldCheck size={16} />
                    SIGNATURE_VERIFIED
                  </div>
                  
                  <h3 className="font-headline-md text-xl text-on-background font-bold tracking-tight">
                    {selectedCert.title}
                  </h3>
                  
                  <div className="p-sm bg-[#0e0e10]/80 rounded-lg border border-[#3b494b]/20 font-code-md text-xs space-y-2 text-[#b9cacb]">
                    <div className="flex justify-between">
                      <span className="text-outline">ISSUER:</span>
                      <span className="text-on-surface font-semibold">{selectedCert.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">DATE:</span>
                      <span className="text-on-surface font-semibold">{selectedCert.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">HASH_KEY:</span>
                      <span className="text-[#00f0ff]">{selectedCert.refCode.split(' ')[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-sm">
                  <div className="text-[10px] font-label-caps text-outline">SKILLS_AUDITED:</div>
                  <div className="flex flex-wrap gap-xs">
                    {selectedCert.skillsVerified.map((skill, i) => (
                      <span 
                        key={i} 
                        className="bg-[#bc13fe]/10 text-[#ebb2ff] border border-[#bc13fe]/20 px-2 py-1 rounded text-[10px] font-code-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-md border-t border-[#3b494b]/20 flex gap-md">
                  <button 
                    onClick={() => {
                      setIsScanning(true);
                      setTimeout(() => setIsScanning(false), 2500);
                    }}
                    disabled={isScanning}
                    className="flex-1 bg-[#0e0e10] border border-[#00f0ff]/40 text-[#00f0ff] py-2 rounded-lg font-label-caps text-xs flex justify-center items-center gap-1.5 hover:bg-[#00f0ff]/10 disabled:opacity-50 transition-all"
                  >
                    <Award size={14} />
                    {isScanning ? 'SCANNING...' : 'SCAN_KEY'}
                  </button>
                  <a 
                    href={selectedCert.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#00f0ff] text-[#00363a] py-2 rounded-lg font-label-caps text-xs flex justify-center items-center gap-1.5 hover:brightness-110 transition-all text-center"
                  >
                    <ExternalLink size={14} />
                    FULL_VIEW
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
