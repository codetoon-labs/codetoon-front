'use client'
import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { GET_CATEGORY_BY_SLUG } from '@/lib/graphql/queries';
import { motion } from 'framer-motion';

interface Service {
    id: string;
    title: string;
    description: string;
    deliverables: string[];
    tags: string[];
}

interface Category {
    id: string;
    title: string;
    slug: string;
    description: string;
    overview: string;
    main_image: { full_url: string } | null;
    services: Service[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Derive accent colour from category slug
function getTheme(slug: string) {
    if (slug.includes('design')) {
        return { numberText: 'text-[#0D5182]', stroke: '#0D5182', blob: 'bg-[#0D5182]/20' ,describe:'Transform your ideas into impactful visual experiences with our creative design solutions.' };
    }
    if (slug.includes('marketing')) {
        return { numberText: 'text-[#0D5182]', stroke: '#0D5182', blob: 'bg-[#0D5182]/20' ,describe:'Results-driven digital marketing solutions to grow your brand, increase traffic, and boost conversions.' };
    }
    return { numberText: 'text-[#0D5182]', stroke: '#0D5182', blob: 'bg-[#0D5182]/20' ,describe:'Scalable technology solutions for web, mobile, and custom software—built for performance, security, and growth.' };
}

export default function ServiceClient({ slug }: { slug: string }) {
    const { data, loading, error } = useQuery<{ category: Category }>(GET_CATEGORY_BY_SLUG, {
        variables: { slug }
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin border-t border-b border-[#0d71ba] rounded-full w-10 h-10"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 font-bold text-xl">
                Error loading category details. Please try again later.
            </div>
        );
    }

    const category = data?.category;

    if (!category) {
        return (
            <div className="flex flex-col justify-center items-center gap-5 min-h-[60vh] text-center px-4">
                <h1 className="text-4xl font-bold text-[#2B3136]">Category Not Found</h1>
                <p className="text-[#535556]">We couldn&apos;t locate the category you were looking for.</p>
                <Link href="/services" className="text-[#0D71BA] font-semibold hover:underline">
                    &larr; Back to Services
                </Link>
            </div>
        );
    }

    const theme = getTheme(slug);

    return (
        <div className="overflow-hidden">
            {/* ── Hero ── */}
            <section className="relative  bg-linear-to-r from-[#3D8DC7] via-[#ffffff] to-[#F6DB43] h-[500px] flex flex-col items-center justify-center font-sans mb-8 ">
                <div className="container mx-auto px-4 sm:px-9 relative ">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="flex flex-col items-center text-center gap-2 sm:mt-0 lg:mt-15"
                    >
                        <span className="text-[#0D71BA] font-bold tracking-widest uppercase text-sm z-10">Our Services</span>
                        <h1 className="text-[50px] z-10 lg:text-[90px] font-bold leading-none uppercase bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent tracking-tight">
                            {category.title}
                        </h1>
                        <p className='text-[22px] text-[#535556] mt-10 z-10'>{theme.describe}</p>
                    </motion.div>
                </div>
                <div className="pointer-events-none absolute bottom-[-50px] left-[-25%] w-[150%] h-20
              bg-[#F3F8FC] blur-md z-0">
                 </div>
            </section>

            {/* ── Overview ── */}
            <section className="container mx-auto px-4 sm:px-9 py-[40px] lg:py-[60px] font-sans">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col w-full"
                >
                    <div className="flex flex-col lg:w-[820px] z-10">
                        <span className="text-[#000305] font-normal capitalize text-[50px] lg:text-[100px]">{category.title}</span>
                        <h2 className="self-center lg:self-end me-10  bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent text-[50px] lg:text-[100px] italic font-semibold leading-none tracking-tight mb-8">
                            Overview
                        </h2>
                    </div>
                    <p className="text-[16px] lg:text-[18px] text-[#535556] leading-[1.8] font-medium w-full z-10">
                        {category.overview}
                    </p>
                </motion.div>
            </section>

            {/* ── Services ── */}
            <section className="container mx-auto px-4 sm:px-9 py-[60px] pb-[80px] lg:pb-[140px] font-sans">
                {category.services && category.services.length > 0 ? (
                    <div className="flex flex-col gap-24">
                        {category.services.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20 z-10"
                            >
                                {/* ── Left column ── */}
                                <div className="flex flex-col lg:w-[820px]">
                                    {/* Title + description */}
                                    <div className="flex flex-col w-full mb-10">
                                        <h2 className="text-[32px] lg:text-[42px] font-semibold text-[#000305] leading-[1.2] mb-4">
                                            {service.title}
                                        </h2>
                                        <p className="text-[#535556] text-[16px] lg:text-[18px] leading-[1.8]">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-col w-full">
                                        <motion.h3
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            className="text-[24px] font-semibold text-[#000305] leading-[1.2] mb-4"
                                        >
                                            Tech Stack
                                        </motion.h3>

                                        {service.tags && service.tags.length > 0 ? (
                                            <motion.div
                                                variants={containerVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: '-50px' }}
                                                className="flex flex-wrap gap-4"
                                            >
                                                {service.tags.map((tag, i) => (
                                                    <motion.span
                                                        variants={itemVariants}
                                                        key={i}
                                                        className={`bg-[#E6F0F8] bordertransition-colors border-[#0D71BA]/20 px-6 py-3 rounded-full text-[16px] lg:text-[18px] font-semibold flex items-center shadow- ${theme.numberText}`}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        ) : (
                                            <p className="text-[#535556]">Details on the technologies used will be added shortly.</p>
                                        )}
                                    </div>
                                </div>

                                {/* ── Right column ── */}
                                <div className="flex flex-col justify-start w-full lg:w-1/2 self-start min-h-[300px]">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="flex flex-col"
                                    >
                                        <h3 className="text-[32px] font-bold leading-[1.2] tracking-tight mb-8 text-[#000305]">
                                            What We Deliver
                                        </h3>

                                        {service.deliverables && service.deliverables.length > 0 ? (
                                            <ul className="flex flex-col gap-6">
                                                {service.deliverables.map((item, i) => (
                                                    <li key={i} className="flex gap-4 items-start text-[18px] lg:text-[22px] text-[#535556] leading-[1.6] font-medium group">
                                                        <svg width="28" height="28" className="mt-1 shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke={theme.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-[#535556]">Detailed deliverables coming soon.</p>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-[#535556] text-[18px]">No services found in this category yet.</p>
                )}

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <Link href="/services" className="inline-flex items-center gap-2 font-bold text-[#000305] hover:text-black transition-colors group">
                        <svg className="transform rotate-180 transition-transform group-hover:-translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="currentColor" />
                        </svg>
                        Browsing all Services
                    </Link>
                </motion.div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-[#0D71BA] py-[80px] lg:py-[120px] relative overflow-hidden z-10">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 sm:px-9 flex flex-col items-center text-center gap-[30px] relative z-10">
                    <h2 className="text-[40px] lg:text-[64px] font-bold text-[#FCF6D0] leading-[1.2]">
                        Ready to Transform Your <span className="italic text-white">Business?</span>
                    </h2>
                    <p className="text-[20px] font-medium text-white/90 max-w-[600px] mx-auto">
                        Let&apos;s work together to build, brand, and boost your next big idea.
                    </p>
                    <Link href="/contact">
                        <button className="mt-4 cursor-pointer bg-[#F4D315] hover:bg-white hover:scale-[1.02] transition-all duration-300 px-8 py-4 rounded-[8px] font-bold text-[20px] flex items-center justify-center gap-[12px] text-[#000305] shadow-[0_8px_20px_rgba(0,0,0,0.15)] group">
                            Start a Project
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#000305" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
