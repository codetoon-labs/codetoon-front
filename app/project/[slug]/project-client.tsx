'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, animate, useInView } from 'framer-motion';
import { useModal } from '@/app/context/ModalContext';
import TestimonialsSlider from '@/app/components/TestimonialsSlider/TestimonialsSlider';
import { useQuery } from '@apollo/client/react';
import { GET_PROJECTS } from '@/lib/graphql/queries';

interface Project {
    description: string;
    id: string | number;
    slug: string;
    title: string;
    main_image: {
        full_url: string;
    } | null;
    country: {
        id: string | number;
        name: string;
        image: {
            full_url: string;
        } | null;
    } | null;
    categories?: {
        title: string;
        type: string;
    }[];
    services: {
        id: string | number;
        title: string;
        description: string;
    }[];
    gallery: {
        full_url: string;
    }[];
    objectives: {
        title: string;
        description: string;
    }[];
    phases: {
        title: string;
        description: string;
    }[];
    counters: {
        title: string;
        count: string | number;
        abbreviation?: string;
    }[];
    visit_link: string;
    in_homepage: boolean;
    short_title: string;
    short_description: string;
    tags: string[];
    sort_order: number;
}

interface GetProjectsData {
    projects: {
        data: Project[];
    };
}

function AnimatedStat({ valueStr, staticPrefix = "", staticSuffix = "" }: { valueStr: string | number | null | undefined, staticPrefix?: string, staticSuffix?: string }) {
    const strVal = valueStr != null ? String(valueStr) : '';
    const match = strVal.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return <span>{staticPrefix}{strVal}{staticSuffix}</span>;

    const prefix = staticPrefix || match[1];
    const num = parseInt(match[2], 10);
    const suffix = staticSuffix || match[3];

    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(0, num, {
                duration: 2,
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.round(value).toString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, num]);

    return (
        <span>
            {prefix}
            <span ref={ref}>0</span>
            {suffix}
        </span>
    );
}



// Removed hardcoded data arrays to use dynamic data from GET_PROJECTS query


function ArrowUpRight() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#F4D315" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function ProjectClient({ slug }: { slug: string }) {
    const { openContactModal } = useModal();
    const { loading, error, data } = useQuery<GetProjectsData>(GET_PROJECTS);

    const project = data?.projects.data.find((p) => p.slug === slug);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin border-t border-b border-[#0d71ba] rounded-full w-10 h-10"></div>
                    <p className="text-[#535556] font-medium animate-pulse">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="text-center flex flex-col gap-6 max-w-md">
                    <h2 className="text-[32px] font-bold text-[#000305]">Project Not Found</h2>
                    <p className="text-[#535556]">
                        We couldn&rsquo;t find the project you&rsquo;re looking for. It may have been moved or the URL might be incorrect.
                    </p>
                    <Link
                        href="/projects"
                        className="bg-[#0D71BA] text-white px-8 py-3 rounded-[8px] font-bold hover:bg-[#0B65A7] transition-colors"
                    >
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    const displayTitle = project.title || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="pt-[140px] lg:pt-[180px] pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="container mx-auto px-4 sm:px-9 flex flex-col items-center gap-10"
                >
                    <div className="flex flex-col items-center gap-2 text-center capitalize">
                        <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.1] font-semibold text-[#000305] z-10">
                            {project.short_title}
                        </h1>
                        <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.54] text-[#535556] max-w-[820px] z-10">
                            {project.short_description || "Creating a sleek new experience for global innovation."}
                        </p>
                    </div>
                    <div className="relative w-full max-w-[750px] aspect-video rounded-[30px] shadow-2xl overflow-hidden">
                        <Image
                            src={project.main_image?.full_url || "/Frame 43.png"}
                            alt={`${displayTitle} project cover`}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-contain z-10"
                            priority
                        />
                    </div>
                </motion.div>
            </section>

            {/* Overview Section */}
            <section className="py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 sm:px-9 lg:px-12 flex flex-col gap-4 items-start"
                >
                    <div className="flex flex-wrap gap-[22px] items-center">
                        {project.tags && project.tags.length > 0 ? (
                            project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-[#E6F0F8] text-[#000305] text-[16px] sm:text-[18px] font-semibold capitalize px-4 py-[6px] rounded-[8px] leading-[1.71] z-10"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="bg-[#E6F0F8] text-[#000305] text-[16px] sm:text-[18px] font-semibold capitalize px-4 py-[6px] rounded-[8px] leading-[1.71] z-10">
                                Project Detail
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-7 w-full">
                        <div className="flex flex-col gap-4 capitalize w-full">
                            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#000305] leading-[1.14] z-10">
                                {project.title}
                            </h2>
                            <div className="text-[16px] sm:text-[18px] text-[#393B3C] tracking-[0.02em] leading-normal flex flex-col gap-4 z-10">
                                {project.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                                ) : (
                                    <p>No description available for this project.</p>
                                )}
                            </div>
                        </div>
                        {project.visit_link && (
                            <Link
                                href={project.visit_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-[#0D71BA] hover:bg-[#0B65A7] transition-colors duration-300 cursor-pointer  flex gap-3 h-12 items-center justify-center rounded-[8px] w-[200px] capitalize font-bold text-[#F4D315] text-[18px] tracking-[0.01em] z-10"
                            >
                                <span>Visit site</span>
                                <ArrowUpRight />
                            </Link>
                        )}
                    </div>
                </motion.div>
            </section>

            {/* Objectives & Process Section */}
            <section className="py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 sm:px-9 lg:px-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-8"
                >
                    {project.objectives && project.objectives.length > 0 && (
                        <div className="flex flex-col gap-4 w-full lg:w-[506px] shrink-0">
                            <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#000305] capitalize leading-[1.2] z-10">
                                Project Objectives
                            </h3>
                            <ul className="flex flex-col gap-3 w-full list-disc ps-8">
                                {project.objectives.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="border-b border-dashed border-[#F7E05B] pt-[10px] pb-3 pe-1 capitalize text-[#000305] text-[15px] sm:text-[16px] leading-6 marker:text-[#000305] z-10"
                                    >

                                        {item.description && (
                                            <p className="text-[16px] text-[#535556] mt-1 normal-case">{item.description}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.phases && project.phases.length > 0 && (
                        <div className="flex flex-col gap-4 w-full lg:w-[584px] shrink-0">
                            <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#000305] capitalize leading-[1.2]">
                                How We Made It Happen
                            </h3>
                            <div className="flex flex-col gap-6 mt-4 z-10">
                                {project.phases.map((phase, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-[#0D71BA] text-[#F4D315] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                                {idx + 1}
                                            </div>
                                            {idx < project.phases.length - 1 && (
                                                <div className="w-[2px] h-full bg-dashed border-r border-dashed border-[#0D71BA]/30 my-2"></div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 pb-4">
                                            <h4 className="text-[18px] font-bold text-[#000305] capitalize leading-tight">
                                                {phase.title}
                                            </h4>
                                            <p className="text-[15px] text-[#535556] leading-relaxed">
                                                {phase.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Stats Section */}
            {project.counters && project.counters.length > 0 && (
                <section className="py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto px-4 sm:px-9 lg:px-12"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-10 items-center justify-center capitalize text-center">
                            {project.counters.map((stat, idx) => {
                                let staticPrefix = "";
                                let staticSuffix = stat.abbreviation || "";

                                // Logic to handle symbols like +% where number should be in the middle
                                if (staticSuffix.includes('+')) {
                                    staticPrefix = "+";
                                    staticSuffix = staticSuffix.replace('+', '');
                                }

                                return (
                                    <div
                                        key={stat.title}
                                        className={`relative z-10 flex flex-col gap-3 items-center px-5 py-10 sm:py-0 sm:px-8 lg:px-4 
                                            /* Vertical separators for Tablet/Desktop */
                                            border-[#257FC0] border-dashed border-r-0 sm:odd:border-r-2 xl:border-r-2 xl:last:border-r-0
                                            /* Mobile bottom separator (centered and shortened) */
                                            after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[250px] after:border-b-2 after:border-dashed after:border-[#257FC0] 
                                            after:sm:hidden`}
                                    >
                                        <p className="text-[#000305] text-[32px] sm:text-[36px] lg:text-[40px] font-semibold leading-[1.44]">
                                            <AnimatedStat
                                                valueStr={stat.count}
                                                staticPrefix={staticPrefix}
                                                staticSuffix={staticSuffix}
                                            />
                                        </p>
                                        <p className="text-[#535556] text-[16px] sm:text-[20px] lg:text-[22px] font-medium leading-[1.3]">
                                            {stat.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Gallery Section */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto px-4 sm:px-9 lg:px-[87px]"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[31px]">
                            {project.gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px] rounded-[24px] overflow-hidden bg-[#E6F0F8] hover:scale-110 transition-transform duration-300 z-10"
                                >
                                    <Image
                                        src={project.gallery[idx].full_url || ""}
                                        alt={`${displayTitle} gallery image ${idx + 1}`}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 348px"
                                        className="object-cover z-10"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Testimonial Section */}
            <section className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 sm:px-9 lg:px-12 flex flex-col lg:flex-row items-start justify-between gap-10"
                >
                    <TestimonialsSlider />
                </motion.div>
            </section>

            {/* Final CTA Section */}
            <section
                className="relative overflow-hidden opacity-90 py-16 px-6 sm:px-12 z-10"
                style={{
                    backgroundImage:
                        'linear-gradient(73.24deg, #FDFAE7 0.59%, #B6D4EA 100%)',
                }}
            >
                <div className="container mx-auto flex flex-col items-center gap-6 text-center relative z-10">
                    <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className="text-[#000305] text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.2]">
                            Turn Ideas Into Impact
                        </h2>
                        <p className="text-[#393B3C] text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.68] max-w-[900px]">
                            From startup dreams to scaling giants &mdash; we craft digital experiences that work and wow.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between w-full max-w-[364px]">
                        <p className="text-[#393B3C] text-[16px] sm:text-[18px] font-semibold leading-[1.22]">
                            The Next Big Thing?
                        </p>
                        <button
                            type="button"
                            onClick={() => openContactModal()}
                            className="bg-[#0D71BA] hover:bg-[#0B65A7] transition-colors duration-300 h-12 w-[200px] rounded-[8px] px-4 flex items-center justify-center capitalize font-bold text-[#F4D315] text-[18px] tracking-[0.01em] cursor-pointer"
                        >
                            Start Your Project
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
