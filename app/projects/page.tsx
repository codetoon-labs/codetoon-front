'use client';
import React, { useState, useRef, useEffect } from 'react';

import { useQuery } from '@apollo/client/react';
import ProjectSection from '../components/projectSection/projectSection';
import { motion, AnimatePresence } from 'framer-motion';
import { GET_CATEGORIES } from '@/lib/graphql/queries';
interface Category {
  id: string;
  title: string;
  slug: string;
  type?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data, loading } = useQuery<{ allCategories: Category[] }>(GET_CATEGORIES);

  const rawCategories = data?.allCategories || [];
  
  // Filter categories shown in the bar
  const filterOptions = ["All Projects", "Featured", ...rawCategories.map(cat => cat.title)];

  const displayLimit = 5;
  const visibleCategories = filterOptions.slice(0, displayLimit);
  const dropdownCategories = filterOptions.slice(displayLimit);
  const hasMore = dropdownCategories.length > 0;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center font-sans dark:bg-black mt-30 lg:mt-[180px] lg:min-h-[50vh] min-h-[400px]">
        {/* <Background /> */}
        <svg className='absolute md:top-[-50px] top-[-70px] left-0 w-full h-full z-0' xmlns="http://www.w3.org/2000/svg" width="937" height="540" viewBox="0 0 937 540" fill="none">
          <g filter="url(#filter0_f_251_2766)">
            <path d="M468.5 225.049C499.065 186.911 530.973 148.813 564.294 118.769C604.679 82.306 649.992 55 701.094 55C801.264 55 882 161.894 882 269.606C882 377.317 801.264 484.211 701.094 484.211C649.992 484.211 604.679 456.905 564.294 420.443C530.973 390.398 499.065 352.3 468.5 314.162C437.935 352.3 406.027 390.398 372.706 420.443C332.321 456.905 287.008 484.211 235.906 484.211C135.736 484.211 55 377.317 55 269.606C55 161.894 135.736 55 235.906 55C287.008 55 332.321 82.2652 372.706 118.769C406.027 148.813 437.935 186.911 468.5 225.049ZM235.906 116.316C165.887 116.316 106.688 193.778 106.688 269.606C106.688 345.433 165.887 422.895 235.906 422.895C270.95 422.895 305.305 404.214 341.418 371.676C372.086 343.961 401.995 308.153 432.905 269.606C401.995 231.058 372.086 195.209 341.418 167.535C305.305 134.997 270.95 116.316 235.906 116.316ZM504.095 269.606C535.005 308.153 564.914 344.002 595.582 371.676C631.695 404.214 666.05 422.895 701.094 422.895C771.113 422.895 830.312 345.433 830.312 269.606C830.312 193.778 771.113 116.316 701.094 116.316C666.05 116.316 631.695 134.997 595.582 167.535C564.914 195.25 535.005 231.058 504.095 269.606Z" fill="url(#paint0_radial_251_2766)" />
          </g>
          <defs>
            <filter id="filter0_f_251_2766" x="0" y="0" width="937" height="539.211" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="27.5" result="effect1_foregroundBlur_251_2766" />
            </filter>
            <radialGradient id="paint0_radial_251_2766" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(468.5 269.606) rotate(90) scale(214.606 413.5)">
              <stop stopColor="#257FC0" stopOpacity="0.3" />
              <stop offset="1" stopColor="#FBF1B8" stopOpacity="0.8" />
            </radialGradient>
          </defs>
        </svg>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="container mx-auto px-4 sm:px-9 relative z-10"
        >
          <div className="flex flex-col items-center text-center gap-7">
            <h1 className="flex flex-col relative right-5 lg:right-0 lg:w-[682px] scale-100 text-[50px] md:text-[70px] lg:text-[92px] font-semibold leading-[1.1] uppercase">
              <span className="relative left-10 lg:left-10 p-1 bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">
                Real Work.
              </span>
              <span className="relative left-10 lg:left-[-100px] p-1 bg-linear-to-r text-start from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">
                Real Growth.
              </span>
              <span className="relative left-8 lg:left-[-10px] p-1 bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">
                Real Fast.
              </span>
            </h1>
            <p className="w-full mt-10 max-w-[600px] mx-auto text-[20px] leading-[30px] font-medium text-[#535556]">
              We build digital products that solve real business problems—with speed, clarity, and a focus on measurable results.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Projects Filter Sections */}
      <motion.section 
        key={`filter-section-${rawCategories.length}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-9 py-6 relative z-20 flex flex-col gap-8"
      >
        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 border-t border-[#0D71BA]/10 pt-8">
          {visibleCategories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <motion.button
                variants={itemVariants}
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`
                  px-6 py-3 rounded-full text-[16px] lg:text-[18px] font-semibold flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isActive 
                    ? "bg-linear-to-r from-[#0D71BA] via-[#257FC0] to-[#3D8DC7] text-white shadow-lg border-transparent" 
                    : "bg-[#E6F0F8] text-[#0D5182] border border-[#0D71BA]/20 hover:bg-[#D8E9F5] shadow-sm"
                  }
                `}
              >
                {category}
              </motion.button>
            );
          })}
          
          {hasMore && (
            <motion.div variants={itemVariants} className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                  px-6 py-3 rounded-full text-[16px] lg:text-[18px] font-semibold flex items-center transition-all duration-300 transform hover:scale-105 active:scale-95 bg-[#E6F0F8] text-[#0D5182] border border-[#0D71BA]/20 hover:bg-[#D8E9F5] shadow-sm
                  ${dropdownCategories.includes(activeFilter) ? "bg-linear-to-r! from-[#0D71BA] via-[#257FC0] to-[#3D8DC7] text-white! border-transparent! shadow-lg" : ""}
                `}
              >
                {dropdownCategories.includes(activeFilter) ? activeFilter : `+${dropdownCategories.length} More`}
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 top-full mt-3 right-0 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
                  >
                    <div className="py-2">
                      {dropdownCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setActiveFilter(category);
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full text-left px-6 py-3 text-[15px] font-semibold transition-colors
                            ${activeFilter === category 
                              ? "bg-linear-to-r from-[#0D71BA] to-[#3D8DC7] text-white" 
                              : "text-[#0D5182] hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            }
                          `}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='container mx-auto px-4 sm:px-9 py-12 relative z-10'
      >
        <ProjectSection activeFilter={activeFilter} />
      </motion.section>
    </main>
  );
}

export default Projects;

