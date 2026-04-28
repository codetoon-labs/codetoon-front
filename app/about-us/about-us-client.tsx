'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useModal } from '@/app/context/ModalContext';
import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import { GET_TEAMS } from '@/lib/graphql/queries';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image?: {
    full_url: string;
  };
}

interface GetTeamsData {
  teams: TeamMember[];
}
/* ─── Animation variant ─────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

/* ─── Static data ────────────────────────────────────────────────────────── */
const codetoonWay = [
  'Lead with Curiosity',
  'Design Loud, Code Smart',
  'Break Rules, Build Better',
  'Embrace the Chaos',
];

const processSteps = [
  {
    number: '01', title: 'Discover',
    description: "We kick off by asking the right questions, aligning goals, and deeply understanding user needs. This is where clarity is born and real problems surface — it's the foundation of everything we build.",
    exploreLabel: 'We explore through:',
    bullets: ['Collaborative workshops', 'Market and user research', 'Vision alignment and goal mapping'],
  },
  {
    number: '02', title: 'Define',
    description: 'We translate discovery insights into clear requirements, user journeys, and a solid project roadmap. Every decision here sets the direction for the entire project.',
    exploreLabel: 'We define through:',
    bullets: ['User journey mapping', 'Requirement documentation', 'Project roadmap planning'],
  },
  {
    number: '03', title: 'Design',
    description: 'We craft bold, purposeful interfaces that delight users and embody your brand. From wireframes to pixel-perfect visuals, every detail matters.',
    exploreLabel: 'We design through:',
    bullets: ['Wireframing and prototyping', 'Visual identity refinement', 'Interactive design systems'],
  },
  {
    number: '04', title: 'Develop',
    description: 'We build with precision, using the latest technologies to bring designs to life. Clean code, robust architecture, and scalable systems are our standards.',
    exploreLabel: 'We develop through:',
    bullets: ['Agile sprints and iterations', 'Code reviews and testing', 'CI/CD pipelines'],
  },
  {
    number: '05', title: 'Deliver',
    description: "We launch, monitor, and iterate. Delivery isn't the end — it's the beginning of a partnership. We ensure everything performs flawlessly from day one.",
    exploreLabel: 'We deliver through:',
    bullets: ['Phased rollouts', 'Performance monitoring', 'Ongoing support and iteration'],
  },
];

/* ─── Shared staggered headline ──────────────────────────────────────────── */
interface StaggerHeadlineProps {
  topLeft: React.ReactNode;
  bottomRight: React.ReactNode;
  className?: string;
}
function StaggerHeadline({ topLeft, bottomRight, className = '' }: StaggerHeadlineProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={`relative h-[130px] sm:h-[170px] lg:h-[225px] flex justify-between ${className}`}
    >
      <motion.div variants={fadeUp} className="absolute top-0 left-0 flex gap-2 sm:gap-3 items-center">
        {topLeft}
      </motion.div>
      <motion.div variants={fadeUp} className="absolute bottom-0 right-[0%] lg:right-[10%] flex gap-2 sm:gap-3 items-center">
        {bottomRight}
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[100px] lg:pt-[140px] pb-10">
      <div className="container mx-auto px-4 sm:px-9">
        <motion.div
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col items-center"
        >
          {/* Decorative "Vision Becomes Product" composition */}
          <div className="relative w-full max-w-[862px] h-[360px] sm:h-[460px] lg:h-[480px] mx-auto select-none">

            {/* Centre image card */}
            <motion.div 
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute inset-x-0 top-[55px] sm:top-[70px] lg:top-[77px] flex justify-center z-5">
              <Image className='rounded-[22px] shadow-2xl' src="/about-us-img.webp" alt="about us image" width={506} height={370} priority />
            </motion.div>
            
            {/* "Vision" */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
              style={{ backgroundImage: 'linear-gradient(120deg, #0D71BA 15%, #ffffff 100%)' }}
              className="absolute top-15 left-3  sm:top-7 sm:left-10 lg:top-4 lg:left-19 text-transparent bg-clip-text text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px] z-10">
              Vision
            </motion.p>

            {/* "Becomes" (Be + comes) */}
            <motion.div 
              initial={{ opacity: 0, y: 0}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              viewport={{ once: true }}
              className="absolute right-19 top-[48%]  sm:top-50 sm:right-[-30px] lg:right-[-76px] lg:top-[175px] z-10">
              <span className="text-[#E6F0F8] text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px]">Be</span>
              <span className="text-[#0d71ba] text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px]">comes</span>
            </motion.div>

            {/* "Product" — gradient */}
            <motion.p 
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-7 lg:bottom-1 right-3 sm:bottom-0 sm:right-[20%] lg:right-[21%] text-transparent bg-clip-text text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px] z-10"
              style={{ backgroundImage: 'linear-gradient(180deg, #ffffff 22%, #0B65A7 99%)' }}>
              Product
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.7 }}
            viewport={{ once: true }}
            className="mt-10 text-center text-[#535556] text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-relaxed max-w-[656px] px-4 z-10">
            From idea to execution, we turn raw vision into refined, scalable digital products.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}


/* ─── Story + Values Section ─────────────────────────────────────────────── */
function StorySection() {
  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto px-4 sm:px-9">
        {/* "Born to Disrupt / Fueled by Fun" staggered headline */}
        <StaggerHeadline
          className="mb-12 lg:mb-16 z-10"
          topLeft={<>
            <span className="text-[#000305] text-[36px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1]">Born to</span>
            <span className="text-[#0d71ba] text-[36px] sm:text-[60px] lg:text-[100px] font-[650] leading-[1.1]">Disrupt</span>
          </>}
          bottomRight={<>
            <span className="text-[#000305] text-[36px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1]">Fueled by</span>
            <span className="text-[#0d71ba] text-[36px] sm:text-[60px] lg:text-[100px] font-[650] leading-[1.1]">Fun.</span>
          </>}
        />
        {/* Two-column: Our Story | The CodeToon Way */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8 "
        >
          {/* Our Story */}
          <motion.div variants={fadeUp} className="flex flex-col gap-10 w-full lg:w-[531px] z-10">
            <div className="border-b-[3px] border-dashed border-[#f4d315] max-w-fit pb-3">
              <h2 className="text-[#000305] text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-[1.2]">Our Story</h2>
            </div>
            <p className="text-[#535556] text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.44]">
              We started CodeToon with a simple belief: great brands deserve a partner who cares as much as they do.
              A restless crew of designers, developers, and strategists came together in Egypt to build something different —
              a place where creativity meets execution, where bold ideas become real products.
              We don&apos;t just deliver services. We build futures, one bold project at a time.
            </p>
          </motion.div>
          {/* The CodeToon Way */}
          <motion.div variants={fadeUp} className="flex flex-col gap-10 w-full lg:w-[584px] z-10">
            <div className="border-b-[3px] border-dashed border-[#f4d315] max-w-fit pb-3">
              <h2 className="text-[#000305] text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-[1.2]">The CodeToon Way</h2>
            </div>
            <div className="flex flex-col gap-3">
              {codetoonWay.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex gap-4 items-center py-[14px] px-[10px] border-b-2 border-solid border-[#fbf1b8]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M0.0156481 9.51863L0 8.39048C0 6.61096 0.286073 5.31801 0.85822 4.5131C1.53648 3.55952 2.72332 3.08273 4.41776 3.08273H10.3133C11.3843 3.08273 12.1359 2.95021 12.5696 2.68566C12.7921 2.54824 12.9731 2.38394 13.11 2.19322C13.3325 1.88563 13.4704 1.54724 13.5232 1.17608L13.6821 0H14.3179L14.4768 1.17608C14.5306 1.54724 14.6675 1.88563 14.89 2.19322C15.1868 2.59617 15.648 2.86072 16.2725 2.98787C16.5903 3.05144 17.0622 3.08322 17.6867 3.08322H23.5822C25.2777 3.08322 26.4645 3.56001 27.1418 4.51359C27.7139 5.3185 28 6.61096 28 8.39096C28 8.57141 27.9951 8.94697 27.9844 9.51912H27.3056C27.2371 7.62566 26.0968 6.61536 24.64 6.3777C24.4605 6.35618 24.4072 6.33956 23.7417 6.35667H18.1957C16.8192 6.35667 15.8367 6.09994 15.2485 5.58599C14.6607 5.07204 14.245 4.23778 14.0005 3.08322C13.7575 4.23778 13.3491 5.06421 12.777 5.56203C12.173 6.09212 11.1828 6.35667 9.80523 6.35667H4.25932C3.59181 6.35667 3.48619 6.36694 3.30525 6.38846C1.83625 6.58455 0.661148 7.86625 0.690489 9.51912H0.0161376L0.0156481 9.51863Z" fill="#0D71BA"/>
                    <path d="M27.4956 19.3858V19.6606C26.3958 21.423 25.1566 22.8719 22.8558 24.4456C20.5555 26.0192 17.3847 27.1337 13.9993 27.1337C12.4237 27.1337 10.9434 26.8769 9.70572 26.5738C8.46802 26.2706 7.21223 25.7239 5.93835 24.9341C4.663 24.1443 3.54511 23.249 2.58224 22.247C1.62035 21.2455 0.922526 20.3609 0.488281 19.5946L0.520067 19.3369L1.13867 18.7188H1.36068C2.57735 19.9207 8.45775 22.4871 14.2183 22.4871C19.9789 22.4871 25.8515 19.5256 26.7611 18.7359L26.9992 18.7188L27.4956 19.3863V19.3858Z" fill="#0D71BA"/>
                    <path d="M21.9768 14.4324C21.9768 15.1215 21.7289 15.7063 21.2301 16.1885C20.7327 16.6707 20.1445 16.9117 19.4662 16.9117C18.7879 16.9117 18.185 16.6711 17.6867 16.1885C17.1893 15.7063 16.9399 15.1215 16.9399 14.4324C16.9399 13.7434 17.1869 13.1556 17.6793 12.6686C18.1718 12.1815 18.7674 11.9375 19.4662 11.9375C20.165 11.9375 20.7596 12.1815 21.2457 12.6686C21.7333 13.1556 21.9768 13.7434 21.9768 14.4324Z" fill="#0D71BA"/>
                    <path d="M6.04968 12.0469C7.6605 12.9667 9.3965 13.6083 11.1081 13.8885C11.0044 14.2313 11.0034 15.4387 11.6719 16.2895L11.179 16.6896C10.6166 16.4216 9.82194 15.9736 8.79452 15.3462C7.7671 14.7188 6.9436 14.1584 6.32451 13.665L5.80469 12.3139L6.04919 12.0474L6.04968 12.0469Z" fill="#0D71BA"/>
                  </svg>
                  <span className="text-[#000305] text-[18px] sm:text-[20px] font-normal leading-[1.54]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Team Card ──────────────────────────────────────────────────────────── */
function TeamCard({ name, role, image }: { name: string; role: string; image?: string }) {
  return (
    <div className="flex flex-col gap-3 border-b-2 border-[#559bce] pb-3 w-full z-10">
      <div className="w-full aspect-278/436 rounded-t-[16px] overflow-hidden bg-linear-to-b from-[#E6F0F8] to-[#B6D4EA] flex items-center justify-center relative">
        {image ? (
          <Image src={image} alt={name} fill loading='lazy' className="object-cover z-10" />
        ) : (
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="opacity-40">
            <circle cx="12" cy="8" r="4" fill="#0d71ba"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0d71ba" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-1 z-10">
        <p className="text-[#000305] text-[16px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.2] capitalize">{name}</p>
        <p className="text-[#535556] text-[13px] sm:text-[15px] lg:text-[16px] font-normal leading-snug capitalize">{role}</p>
      </div>
    </div>
  );
}


/* ─── Team Section ───────────────────────────────────────────────────────── */

function TeamSection() {
  const { data, loading, error } = useQuery<GetTeamsData>(GET_TEAMS);

    if (loading) {
    return (
      <div className="row">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="placeholder-">
              <span className="placeholder col-12" style={{height:"250px"}}></span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching team members</div>;
  }
    const displayTeams = data?.teams?.map((t: TeamMember) => ({
        name: t.name,
        role: t.title,
        image: t.image?.full_url
      })) ?? [];

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto px-4 sm:px-9 relative z-10">
        <StaggerHeadline
          className="mb-12 lg:mb-16"
          topLeft={
            <span className="text-[#000305] text-[36px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1] z-10">The Minds</span>
          }
          bottomRight={<>
            <span className="text-[#000305] text-[36px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1] z-10">Behind the</span>
            <span className="text-[#0d71ba] text-[36px] sm:text-[60px] lg:text-[100px] font-[650] leading-[1.1] z-10">Magic</span>
          </>}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-[24px] gap-y-10 lg:gap-y-12 z-10"
        >
          {displayTeams.map((member, mIdx) => (
            <motion.div key={mIdx} variants={fadeUp}>
              <TeamCard {...member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ─── Process Section ────────────────────────────────────────────────────── */
function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = processSteps[activeStep];

  const handleNext = () => {
    if (activeStep < processSteps.length - 1) setActiveStep((prev) => prev + 1);
  };
  
  const handlePrev = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto px-4 sm:px-9">
        {/* "How We / Build Bold" headline */}
        <div className="relative flex justify-start gap-5 mb-12 lg:mb-16 h-[130px] sm:h-[170px] lg:h-[202px] z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className=""
          >
            <span className="text-[#000305] text-[40px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1]">How We</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bottom-[-30px] right-0 flex gap-3 sm:gap-4 items-center"
          >
            <span className="text-[#000305] text-[40px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1]">Build</span>
            <span className="text-[#0d71ba] text-[40px] sm:text-[60px] lg:text-[100px] font-[650] leading-[1.1]">Bold</span>
          </motion.div>
        </div>

        {/* Stepper layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-around lg:flex-row gap-10 lg:gap-12 items-start z-10"
        >
          {/* Step numbers + content */}
          <div className="flex gap-5 sm:gap-6 w-full lg:w-[579px] relative  lg:pb-0">
            {/* Numbered column with dashed vertical line */}
            <div className="relative flex flex-col gap-0 items-center shrink-0 w-[45px] z-10">
              <div className="absolute top-[45px] left-1/2 -translate-x-1/2 w-[2px] h-[calc(75%-22px)] border-l-2 border border-[#F7E05B]" />
              {processSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="relative z-10 italic h-[calc((489px-22px)/5)] flex items-start justify-center cursor-pointer"
                >
                  <motion.span
                    initial={false}
                    animate={{
                      color: idx === activeStep ? '#000305' : '#dfe0e1',
                      fontWeight: idx === activeStep ? 700 : 500,
                      scale: idx === activeStep ? 1.1 : 1,
                      opacity: idx === activeStep ? 1 : 0.6
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1]"
                  >
                    {step.number}
                  </motion.span>
                </button>
              ))}
            </div>

            {/* Active step content */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-7 flex-1 min-w-0 z-10"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-[#000305] text-[28px] sm:text-[34px] lg:text-[40px] font-semibold leading-[1.1] z-10">
                  {currentStep.title}
                </h3>
                <p className="text-[#505253] text-[15px] sm:text-[17px] lg:text-[18px] font-normal leading-[1.2] z-10">
                  {currentStep.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border-b-2 border-[#3d8dc7] pb-1 pt-2.5 inline-block self-start">
                  <p className="text-[#000305] text-[15px] sm:text-[17px] lg:text-[18px] font-semibold leading-[1.2] z-10">
                    {currentStep.exploreLabel}
                  </p>
                </div>
                <ul className="flex flex-col gap-1 list-disc ps-6 sm:ps-7 z-10">
                  {currentStep.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-[#505253] text-[15px] sm:text-[17px] lg:text-[18px] font-normal leading-[1.4] z-10">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Previous Button */}
            <motion.button
              onClick={handlePrev}
              aria-label="Previous step"
              initial={false}
              animate={{
                opacity: activeStep === 0 ? 0 : 1,
                x: activeStep === 0 ? -20 : 0,
                scale: activeStep === processSteps.length - 1 ? 1.05 : (activeStep === 0 ? 0.9 : 1),
                pointerEvents: activeStep === 0 ? 'none' : 'auto'
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute bottom-[90px] left-[65px] sm:left-[69px] w-14 h-14 bg-[#0d71ba] rounded-full flex items-center justify-center hover:bg-[#0B65A7] transition-colors cursor-pointer shadow-md z-20"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="rotate-180">
                <path d="M19.3688 24L17.4915 22.1144L22.2507 17.3341L4.6665 17.3342L4.6665 14.6675L22.2513 14.6674L17.4913 9.88563L19.3687 8L27.3332 16.0005L19.3688 24Z" fill="#F4D315"/>
              </svg>
            </motion.button>
          </div>

          {/* Right: image card + next arrow */}
          <div className="relative w-full flex flex-col gap-6 lg:w-[385px] shrink-0">
            <div className="w-full h-[200px] sm:h-[240px] lg:h-[267px] rounded-[16px] overflow-hidden bg-linear-to-br from-[#E6F0F8] to-[#B6D4EA] flex items-center justify-center z-10">
              <span className="text-[#0d71ba] text-[14px] font-medium opacity-40">Process Visual</span>
            </div>
            
            {/* Animated Navigation Controls */}
            <div className="flex justify-end items-center relative h-14 w-full">
              {/* Next Button */}
              <motion.button
                onClick={handleNext}
                aria-label="Next step"
                initial={false}
                animate={{
                  opacity: activeStep === processSteps.length - 1 ? 0 : 1,
                  x: activeStep === processSteps.length - 1 ? 20 : 0,
                  scale: activeStep === processSteps.length - 1 ? 0.9 : 1,
                  pointerEvents: activeStep === processSteps.length - 1 ? 'none' : 'auto'
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="w-14 h-14 bg-[#0d71ba] rounded-full flex items-center justify-center hover:bg-[#0B65A7] transition-colors cursor-pointer shadow-md absolute bottom-[-30px] right-0 z-10"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M19.3688 24L17.4915 22.1144L22.2507 17.3341L4.6665 17.3342L4.6665 14.6675L22.2513 14.6674L17.4913 9.88563L19.3687 8L27.3332 16.0005L19.3688 24Z" fill="#F4D315"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────────────────── */

/* Keyframe styles injected once */
const ctaStyles = `
  @keyframes cta-orb-float-1 {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33%       { transform: translate(30px, -40px) scale(1.08); }
    66%       { transform: translate(-20px, 20px) scale(0.95); }
  }
  @keyframes cta-orb-float-2 {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    40%       { transform: translate(-35px, 30px) scale(1.1); }
    70%       { transform: translate(25px, -25px) scale(0.92); }
  }
  @keyframes cta-orb-float-3 {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    30%       { transform: translate(20px, 40px) scale(1.05); }
    65%       { transform: translate(-30px, -20px) scale(0.97); }
  }
  @keyframes cta-particle-drift {
    0%   { transform: translateY(0px) translateX(0px); opacity: 0.6; }
    50%  { transform: translateY(-18px) translateX(10px); opacity: 1; }
    100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
  }
  @keyframes cta-line-pulse {
    0%, 100% { stroke-opacity: 0.15; }
    50%       { stroke-opacity: 0.45; }
  }
  @keyframes cta-node-pulse {
    0%, 100% { r: 3; opacity: 0.5; }
    50%       { r: 5; opacity: 1; }
  }
  @keyframes cta-ring-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes cta-ring-spin-rev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes cta-scan {
    0%   { top: 0%; opacity: 0; }
    10%  { opacity: 0.7; }
    90%  { opacity: 0.7; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes cta-glow-pulse {
    0%, 100% { opacity: 0.25; transform: scale(1); }
    50%       { opacity: 0.55; transform: scale(1.12); }
  }
  @keyframes cta-badge-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes cta-counter {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const ORB_CONFIGS = [
  { size: 340, x: '8%',  y: '10%',  colorA: '#0d71ba', colorB: '#1a8de0', anim: 'cta-orb-float-1 14s ease-in-out infinite', blur: 80,  opacity: 0.35 },
  { size: 260, x: '72%', y: '5%',   colorA: '#f4d315', colorB: '#e8c000', anim: 'cta-orb-float-2 11s ease-in-out infinite', blur: 70,  opacity: 0.22 },
  { size: 200, x: '60%', y: '55%',  colorA: '#0d71ba', colorB: '#0b5a96', anim: 'cta-orb-float-3 16s ease-in-out infinite', blur: 60,  opacity: 0.28 },
  { size: 140, x: '15%', y: '60%',  colorA: '#f4d315', colorB: '#fce060', anim: 'cta-orb-float-1 9s  ease-in-out infinite 2s', blur: 50,  opacity: 0.18 },
  { size: 100, x: '88%', y: '72%',  colorA: '#0d71ba', colorB: '#3da0e8', anim: 'cta-orb-float-2 12s ease-in-out infinite 1s', blur: 40,  opacity: 0.2 },
];

const PARTICLE_CONFIGS = [
  { cx: '18%', cy: '22%', delay: '0s'   },
  { cx: '38%', cy: '15%', delay: '0.8s' },
  { cx: '60%', cy: '30%', delay: '1.6s' },
  { cx: '78%', cy: '18%', delay: '0.4s' },
  { cx: '90%', cy: '48%', delay: '2s'   },
  { cx: '72%', cy: '68%', delay: '1.2s' },
  { cx: '45%', cy: '75%', delay: '0.6s' },
  { cx: '25%', cy: '80%', delay: '1.9s' },
  { cx: '10%', cy: '52%', delay: '2.4s' },
  { cx: '55%', cy: '55%', delay: '1.1s' },
  { cx: '82%', cy: '82%', delay: '0.3s' },
  { cx: '32%', cy: '45%', delay: '1.7s' },
];

/* Neural network node + edge data */
const NN_NODES = [
  { id: 'n0',  x: 80,  y: 40  },
  { id: 'n1',  x: 200, y: 100 },
  { id: 'n2',  x: 340, y: 55  },
  { id: 'n3',  x: 500, y: 120 },
  { id: 'n4',  x: 640, y: 60  },
  { id: 'n5',  x: 760, y: 130 },
  { id: 'n6',  x: 160, y: 200 },
  { id: 'n7',  x: 420, y: 210 },
  { id: 'n8',  x: 580, y: 200 },
  { id: 'n9',  x: 720, y: 220 },
  { id: 'n10', x: 280, y: 280 },
  { id: 'n11', x: 460, y: 300 },
];
const NN_EDGES = [
  ['n0','n1'],['n1','n2'],['n2','n3'],['n3','n4'],['n4','n5'],
  ['n1','n6'],['n6','n10'],['n3','n7'],['n7','n11'],['n4','n8'],
  ['n8','n9'],['n9','n5'],['n10','n11'],['n11','n8'],['n2','n7'],
];

function CTASection() {
  const { openContactModal } = useModal();

  return (
    <section className="relative overflow-hidden pb-16 lg:pb-24">
      {/* Inject keyframes once */}
      <style dangerouslySetInnerHTML={{ __html: ctaStyles }} />

      {/* ── Dark gradient banner ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-2"
        style={{
          background: 'linear-gradient(160deg, #00070e 0%, #020f1c 40%, #030d19 70%, #000305 100%)',
          borderRadius: '0',
          margin: '0 0',
        }}
      />

      {/* ── Subtle grid overlay ──────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-3 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(13,113,186,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,113,186,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          borderRadius: '24px',
          margin: '0 16px',
        }}
      />

      {/* ── Scan line ───────────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute', left: '16px', right: '16px', height: '2px', zIndex: 3,
          background: 'linear-gradient(90deg, transparent 0%, rgba(13,113,186,0.6) 30%, rgba(244,211,21,0.4) 50%, rgba(13,113,186,0.6) 70%, transparent 100%)',
          animation: 'cta-scan 6s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── Glowing orbs ────────────────────────────────────────────────── */}
      {ORB_CONFIGS.map((o, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            left: o.x, top: o.y,
            width: o.size, height: o.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${o.colorA}, ${o.colorB} 60%, transparent 100%)`,
            filter: `blur(${o.blur}px)`,
            opacity: o.opacity,
            animation: o.anim,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Neural-network SVG ───────────────────────────────────────────── */}
      <svg
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none', opacity: 0.7 }}
        viewBox="0 0 840 340"
        preserveAspectRatio="xMidYMid slice"
      >
        {NN_EDGES.map(([a, b], i) => {
          const nodeA = NN_NODES.find(n => n.id === a)!;
          const nodeB = NN_NODES.find(n => n.id === b)!;
          return (
            <line
              key={i}
              x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
              stroke={i % 3 === 0 ? '#f4d315' : '#0d71ba'}
              strokeWidth="0.8"
              style={{ animation: `cta-line-pulse ${2.5 + (i % 4) * 0.7}s ease-in-out infinite ${(i * 0.18).toFixed(2)}s` }}
            />
          );
        })}
        {NN_NODES.map((n, i) => (
          <circle
            key={n.id}
            cx={n.x} cy={n.y} r="3"
            fill={i % 2 === 0 ? '#0d71ba' : '#f4d315'}
            style={{ animation: `cta-node-pulse ${1.8 + (i % 3) * 0.6}s ease-in-out infinite ${(i * 0.22).toFixed(2)}s` }}
          />
        ))}
      </svg>

      {/* ── Floating particle dots ───────────────────────────────────────── */}
      {PARTICLE_CONFIGS.map((p, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            left: p.cx, top: p.cy,
            width: i % 3 === 0 ? 6 : 4,
            height: i % 3 === 0 ? 6 : 4,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#0d71ba' : '#f4d315',
            boxShadow: i % 2 === 0
              ? '0 0 10px rgba(13,113,186,0.9)'
              : '0 0 10px rgba(244,211,21,0.9)',
            animation: `cta-particle-drift ${3 + (i % 4) * 0.9}s ease-in-out infinite ${p.delay}`,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      ))}
  
      {/* ── Spinning rings (AI orb centre) ──────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 280, height: 280,
          zIndex: 3, pointerEvents: 'none',
        }}
      >
        {/* Glow core */}
        <div style={{
          position: 'absolute', inset: '30%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,113,186,0.5) 0%, transparent 70%)',
          animation: 'cta-glow-pulse 3s ease-in-out infinite',
        }} />
        {/* Ring 1 */}
        <div style={{
          position: 'absolute', inset: '10%',
          borderRadius: '50%',
          border: '1.5px solid rgba(13,113,186,0.45)',
          animation: 'cta-ring-spin 10s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: '-5px', left: '50%',
            width: 10, height: 10, borderRadius: '50%',
            background: '#f4d315', boxShadow: '0 0 12px rgba(244,211,21,0.9)',
            transform: 'translateX(-50%)',
          }} />
        </div>
        {/* Ring 2 */}
        <div style={{
          position: 'absolute', inset: '25%',
          borderRadius: '50%',
          border: '1px solid rgba(244,211,21,0.35)',
          animation: 'cta-ring-spin-rev 14s linear infinite',
        }}>
          <div style={{
            position: 'absolute', bottom: '-4px', left: '50%',
            width: 8, height: 8, borderRadius: '50%',
            background: '#0d71ba', boxShadow: '0 0 10px rgba(13,113,186,0.9)',
            transform: 'translateX(-50%)',
          }} />
        </div>
        {/* Ring 3 */}
        <div style={{
          position: 'absolute', inset: '38%',
          borderRadius: '50%',
          border: '1px solid rgba(13,113,186,0.3)',
          animation: 'cta-ring-spin 7s linear infinite',
        }} />
      </div>

      {/* ── Floating stat badges ─────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute', left: '5%', top: '20%',
          background: 'rgba(13,113,186,0.15)',
          border: '1px solid rgba(13,113,186,0.4)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px', padding: '10px 16px',
          animation: 'cta-badge-float 4s ease-in-out infinite',
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', gap: '2px',
        }}
        className="hidden lg:flex"
      >
        <span style={{ color: '#f4d315', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>50+</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 500 }}>Projects Shipped</span>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute', right: '5%', top: '25%',
          background: 'rgba(244,211,21,0.1)',
          border: '1px solid rgba(244,211,21,0.35)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px', padding: '10px 16px',
          animation: 'cta-badge-float 5s ease-in-out infinite 1s',
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', gap: '2px',
        }}
        className="hidden lg:flex"
      >
        <span style={{ color: '#f4d315', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>100%</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 500 }}>Bold by Design</span>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute', left: '6%', bottom: '18%',
          background: 'rgba(13,113,186,0.12)',
          border: '1px solid rgba(13,113,186,0.35)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px', padding: '10px 16px',
          animation: 'cta-badge-float 6s ease-in-out infinite 2s',
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', gap: '2px',
        }}
        className="hidden lg:flex"
      >
        <span style={{ color: '#f4d315', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>3x</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 500 }}>Faster Delivery</span>
      </div>

      {/* ── Content (text + button) ──────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="relative container mx-auto px-4 sm:px-9 flex flex-col items-center text-center gap-8 pt-20 pb-16 lg:pt-28 lg:pb-24 z-10"
      >
        {/* Heading */}
        <div className="flex flex-col items-center gap-0">
          <motion.p
            variants={fadeUp}
            className="text-white text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.1] z-10"
            style={{ textShadow: '0 0 40px rgba(13,113,186,0.4)' }}
          >
            Change the World
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-3 sm:gap-4 items-end justify-center z-10">
            <span className="text-white text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.2]">Cause</span>
            <span
              className="text-[36px] sm:text-[52px] lg:text-[72px] font-[650] leading-[1.2]"
              style={{
                background: 'linear-gradient(135deg, #1a8de0 0%, #f4d315 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We Can
            </span>
          </motion.div>
        </div>

        {/* Body text */}
        <motion.div variants={fadeUp} className="flex flex-col gap-3 max-w-[806px] z-10">
          <p className="text-white text-[18px] sm:text-[24px] lg:text-[32px] font-semibold leading-[1.2]">
            Same templates? Same stock visuals? Same safe ideas?
          </p>
          <div className="text-[rgba(255,255,255,0.6)] text-[15px] sm:text-[17px] lg:text-[20px] font-normal leading-[1.4]">
            <p>While others blend in, we stand out.</p>
            <p>With bold design, playful energy, and purposeful code, we bring soul back to tech.</p>
            <p>
              <span className="font-semibold text-white">CodeToon isn&apos;t just a name,</span>
              {' '}it&apos;s a reminder that real creativity is brave, fun, and a little rebellious.
            </p>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.button
          variants={fadeUp}
          onClick={() => openContactModal()}
          className="relative overflow-hidden h-12 w-[261px] rounded-[8px] flex items-center justify-center gap-3 font-bold text-[#f4d315] text-[18px] tracking-[0.18px] cursor-pointer z-10 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            background: 'linear-gradient(135deg, #0d71ba 0%, #0b5a96 100%)',
            boxShadow: '0 0 24px rgba(13,113,186,0.6), 0 0 6px rgba(244,211,21,0.3)',
          }}
        >
          {/* Shimmer */}
          <span
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
              animation: 'cta-ring-spin 3s linear infinite',
              pointerEvents: 'none',
            }}
          />
          Let&apos;s Build Bold Together
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#F4D315" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function AboutUsClient() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StorySection />
      <TeamSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
