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
      className={`relative h-[130px] sm:h-[170px] lg:h-[225px] ${className}`}
    >
      <motion.div variants={fadeUp} className="absolute top-0 left-0 flex gap-2 sm:gap-3 items-center">
        {topLeft}
      </motion.div>
      <motion.div variants={fadeUp} className="absolute bottom-0 right-0 flex gap-2 sm:gap-3 items-center">
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute inset-x-0 top-[55px] sm:top-[70px] lg:top-[77px] flex justify-center z-5">
              <Image className='rounded-[22px] shadow-2xl' src="/about-us-img.webp" alt="" width={506} height={370} />
            </motion.div>
            
            {/* "Vision" */}
            <motion.p 
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              viewport={{ once: true }}
              style={{ backgroundImage: 'linear-gradient(120deg, #0D71BA 15%, #ffffff 100%)' }}
              className="absolute top-15 left-3  sm:top-7 sm:left-10 lg:top-4 lg:left-19 text-transparent bg-clip-text text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px] z-10">
              Vision
            </motion.p>

            {/* "Becomes" (Be + comes) */}
            <motion.div 
              initial={{ opacity: 0, y: 0}}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              viewport={{ once: true }}
              className="absolute right-19 top-[48%]  sm:top-50 sm:right-[-30px] lg:right-[-76px] lg:top-[175px] z-10">
              <span className="text-[#E6F0F8] text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px]">Be</span>
              <span className="text-[#0d71ba] text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px]">comes</span>
            </motion.div>

            {/* "Product" — gradient */}
            <motion.p 
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-7 lg:bottom-1 right-3 sm:bottom-0 sm:right-[20%] lg:right-[21%] text-transparent bg-clip-text text-[60px] sm:text-[68px] lg:text-[88px] font-semibold leading-none tracking-[2px] z-10"
              style={{ backgroundImage: 'linear-gradient(180deg, #ffffff 22%, #0B65A7 99%)' }}>
              Product
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
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
        <p className="text-[#000305] text-[16px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.2]">{name}</p>
        <p className="text-[#535556] text-[13px] sm:text-[15px] lg:text-[16px] font-normal leading-snug">{role}</p>
      </div>
    </div>
  );
}


/* ─── Team Section ───────────────────────────────────────────────────────── */

function TeamSection() {
  const { data, loading } = useQuery<GetTeamsData>(GET_TEAMS);

  const displayTeams = data?.teams && data.teams.length > 0 
    ? data.teams.map((t: TeamMember) => ({
        name: t.name,
        role: t.title,
        image: t.image?.full_url
      })) as any
    : [];  

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
          {displayTeams.map((member: any, mIdx: number) => (
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

  const handleNext = () => setActiveStep((prev) => (prev + 1) % processSteps.length);

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto px-4 sm:px-9">
        {/* "How We / Build Bold" headline */}
        <div className="relative mb-12 lg:mb-16 h-[130px] sm:h-[170px] lg:h-[202px] z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="absolute top-0 left-0"
          >
            <span className="text-[#000305] text-[36px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1]">How We</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute bottom-0 right-0 flex gap-3 sm:gap-4 items-center"
          >
            <span className="text-[#000305] text-[36px] sm:text-[60px] lg:text-[100px] font-medium leading-[1.1]">Build</span>
            <span className="text-[#0d71ba] text-[36px] sm:text-[60px] lg:text-[100px] font-[650] leading-[1.1]">Bold</span>
          </motion.div>
        </div>

        {/* Stepper layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start"
        >
          {/* Step numbers + content */}
          <div className="flex gap-5 sm:gap-6 w-full lg:w-[579px]">
            {/* Numbered column with dashed vertical line */}
            <div className="relative flex flex-col gap-0 items-center shrink-0 w-[45px] z-10">
              <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-22px)] border-l-2 border-dashed border-[#9EA1A2]" />
              {processSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`relative z-10 h-[calc((489px-22px)/5)] flex items-start justify-center text-[28px] sm:text-[34px] lg:text-[40px] font-semibold leading-[1.1] transition-colors duration-300 cursor-pointer ${
                    idx === activeStep ? 'text-[#000305]' : 'text-[#dfe0e1]'
                  }`}
                >
                  {step.number}
                </button>
              ))}
            </div>

            {/* Active step content */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-7 flex-1 min-w-0"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-[#000305] text-[28px] sm:text-[34px] lg:text-[40px] font-semibold leading-[1.1]">
                  {currentStep.title}
                </h3>
                <p className="text-[#505253] text-[15px] sm:text-[17px] lg:text-[18px] font-normal leading-[1.2]">
                  {currentStep.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border-b-2 border-[#3d8dc7] pb-1 pt-2.5 inline-block self-start">
                  <p className="text-[#000305] text-[15px] sm:text-[17px] lg:text-[18px] font-semibold leading-[1.2]">
                    {currentStep.exploreLabel}
                  </p>
                </div>
                <ul className="flex flex-col gap-1 list-disc ps-6 sm:ps-7">
                  {currentStep.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-[#505253] text-[15px] sm:text-[17px] lg:text-[18px] font-normal leading-[1.4]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right: image card + next arrow */}
          <div className="relative w-full lg:w-[385px] shrink-0">
            <div className="w-full h-[200px] sm:h-[240px] lg:h-[267px] rounded-[16px] overflow-hidden bg-linear-to-br from-[#E6F0F8] to-[#B6D4EA] flex items-center justify-center">
              <span className="text-[#0d71ba] text-[14px] font-medium opacity-40">Process Visual</span>
            </div>
            {/* Next step arrow button */}
            <button
              onClick={handleNext}
              aria-label="Next step"
              className="absolute -bottom-6 right-0 w-14 h-14 bg-[#0d71ba] rounded-full flex items-center justify-center hover:bg-[#0B65A7] transition-colors cursor-pointer shadow-md"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M19.3688 24L17.4915 22.1144L22.2507 17.3341L4.6665 17.3342L4.6665 14.6675L22.2513 14.6674L17.4913 9.88563L19.3687 8L27.3332 16.0005L19.3688 24Z" fill="#F4D315"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────────────────── */
function CTASection() {
  const { openContactModal } = useModal();
  return (
    <section className="py-16 lg:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="container mx-auto px-4 sm:px-9 flex flex-col items-center text-center gap-8"
      >
        {/* Heading */}
        <div className="flex flex-col items-center gap-0">
          <motion.p variants={fadeUp}
            className="text-[#000305] text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.1]">
            Change the World
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-3 sm:gap-4 items-end justify-center">
            <span className="text-[#000305] text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.2]">Cause</span>
            <span className="text-[#0d71ba] text-[40px] sm:text-[58px] lg:text-[72px] font-[650] leading-[1.2]">We Can</span>
          </motion.div>
        </div>

        {/* Body text */}
        <motion.div variants={fadeUp} className="flex flex-col gap-3 max-w-[806px]">
          <p className="text-[#000305] text-[18px] sm:text-[24px] lg:text-[32px] font-semibold leading-[1.2]">
            Same templates? Same stock visuals? Same safe ideas?
          </p>
          <div className="text-[#535556] text-[15px] sm:text-[17px] lg:text-[20px] font-normal leading-[1.4]">
            <p>While others blend in, we stand out.</p>
            <p>With bold design, playful energy, and purposeful code, we bring soul back to tech.</p>
            <p>
              <span className="font-semibold text-[#000305]">CodeToon isn&apos;t just a name,</span>
              {' '}it&apos;s a reminder that real creativity is brave, fun, and a little rebellious.
            </p>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.button
          variants={fadeUp}
          onClick={() => openContactModal()}
          className="bg-[#0d71ba] hover:bg-[#0B65A7] transition-colors duration-300 h-12 w-[261px] rounded-[8px] flex items-center justify-center gap-3 font-bold text-[#f4d315] text-[18px] tracking-[0.18px] cursor-pointer"
        >
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
