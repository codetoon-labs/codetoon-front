'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import { GET_SERVICE_BY_SLUG } from '@/lib/graphql/queries';
import { motion } from 'framer-motion';
import { useModal } from '@/app/context/ModalContext';

interface MediaItem {
    full_url: string | null;
}

interface ProcessStep {
    title: string;
    description: string;
}

interface ServiceCategory {
    id: string;
    title: string;
    slug: string | null;
    main_image: { full_url: string } | null;
}

interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    short_description: string | null;
    deliverables: string[];
    tags: string[];
    banner: MediaItem | null;
    process_steps: ProcessStep[];
    gallery: MediaItem[];
    categories: ServiceCategory[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ServiceClient({ slug }: { slug: string }) {
    const { openContactModal } = useModal();
    const { data, loading, error } = useQuery<{ service: Service }>(GET_SERVICE_BY_SLUG, {
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
                Error loading service details. Please try again later.
            </div>
        );
    }

    const service = data?.service;

    if (!service) {
        return (
            <div className="flex flex-col justify-center items-center gap-5 min-h-[60vh] text-center px-4">
                <h1 className="text-4xl font-bold text-[#2B3136]">Service Not Found</h1>
                <p className="text-[#535556]">We couldn&apos;t locate the service you were looking for.</p>
                <Link href="/solutions" className="text-[#0D71BA] font-semibold hover:underline">
                    &larr; Back to Solutions
                </Link>
            </div>
        );
    }

    const parentCategory = service.categories?.[0] ?? null;
    const bannerUrl = service.banner?.full_url ?? parentCategory?.main_image?.full_url ?? null;
    const description = String(service.description ?? '');
    const shortDescription = service.short_description ? String(service.short_description) : '';
    const processSteps = service.process_steps ?? [];
    const gallery = (service.gallery ?? []).filter((img) => img?.full_url);

    return (
        <div className="overflow-hidden">
            {/* ── Hero with banner image ── */}
            <section className="relative min-h-[600px] flex items-end overflow-hidden font-sans z-10 pt-[110px] lg:pt-[160px]">
                {bannerUrl ? (
                    <>
                        <Image
                            src={bannerUrl}
                            alt={String(service.title)}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/50 to-black/20" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-linear-to-r from-[#3D8DC7] via-[#ffffff] to-[#F6DB43]" />
                )}

                <div className="container mx-auto px-4 sm:px-9 relative z-10 pb-16 lg:pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="flex flex-col gap-4 max-w-[840px]"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`font-bold tracking-widest uppercase text-sm ${bannerUrl ? 'text-[#F4D315]' : 'text-[#0D71BA]'}`}>
                                Our Services
                            </span>
                            {parentCategory && (
                                parentCategory.slug ? (
                                    <Link
                                        href={`/solution/${parentCategory.slug}`}
                                        className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${bannerUrl ? 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm' : 'bg-[#E6F0F8] text-[#0D5182] hover:bg-[#d4e6f5]'}`}
                                    >
                                        {parentCategory.title}
                                    </Link>
                                ) : (
                                    <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${bannerUrl ? 'bg-white/15 text-white backdrop-blur-sm' : 'bg-[#E6F0F8] text-[#0D5182]'}`}>
                                        {parentCategory.title}
                                    </span>
                                )
                            )}
                        </div>

                        <h1 className={`text-[44px] lg:text-[80px] font-bold leading-[1.05] uppercase tracking-tight ${bannerUrl ? 'text-white' : 'bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent'}`}>
                            {service.title}
                        </h1>

                        {shortDescription && (
                            <p className={`text-[18px] lg:text-[20px] leading-[1.7] max-w-[680px] ${bannerUrl ? 'text-white/85' : 'text-[#535556]'}`}>
                                {shortDescription}
                            </p>
                        )}

                        <button
                            onClick={() => openContactModal()}
                            className="mt-4 w-fit cursor-pointer bg-[#F4D315] hover:bg-white hover:scale-[1.02] transition-all duration-300 px-7 py-3.5 rounded-[8px] font-bold text-[18px] flex items-center gap-3 text-[#000305] shadow-[0_8px_20px_rgba(0,0,0,0.2)] group"
                        >
                            Start a Project
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#000305" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── Overview ── */}
            <section className="container mx-auto px-4 sm:px-9 py-[50px] lg:py-[90px] font-sans relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-start"
                >
                    <div className="flex flex-col">
                        <span className="text-[#0D71BA] font-bold tracking-widest uppercase text-sm mb-3">Overview</span>
                        <h2 className="bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent text-[40px] lg:text-[64px] font-semibold leading-[1.05] tracking-tight">
                            What this service is about
                        </h2>
                    </div>
                    <p className="text-[17px] lg:text-[19px] text-[#535556] leading-[1.9] font-medium">
                        {description}
                    </p>
                </motion.div>
            </section>

            {/* ── What We Deliver (card grid) ── */}
            {service.deliverables && service.deliverables.length > 0 && (
                <section className="bg-[#F3F8FC] py-[60px] lg:py-[100px] font-sans relative z-10">
                    <div className="container mx-auto px-4 sm:px-9">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 lg:mb-16"
                        >
                            <span className="text-[#0D71BA] font-bold tracking-widest uppercase text-sm">Deliverables</span>
                            <h2 className="text-[36px] lg:text-[56px] font-bold text-[#000305] leading-[1.1] tracking-tight mt-2">
                                What We Deliver
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {service.deliverables.map((item, i) => (
                                <motion.div
                                    variants={itemVariants}
                                    key={i}
                                    className="relative z-10 flex gap-4 items-start bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgba(13,113,186,0.06)] hover:shadow-[0_8px_30px_rgba(13,113,186,0.12)] transition-shadow group"
                                >
                                    <span className="shrink-0 w-11 h-11 rounded-full bg-[#E6F0F8] flex items-center justify-center transition-transform group-hover:scale-110">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17L4 12" stroke="#0D5182" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-[17px] lg:text-[19px] text-[#2B3136] leading-[1.6] font-medium pt-1.5">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── Process steps ── */}
            {processSteps.length > 0 && (
                <section className="container mx-auto px-4 sm:px-9 py-[60px] lg:py-[100px] font-sans relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 lg:mb-16 max-w-[700px]"
                    >
                        <span className="text-[#0D71BA] font-bold tracking-widest uppercase text-sm">Our Process</span>
                        <h2 className="text-[36px] lg:text-[56px] font-bold text-[#000305] leading-[1.1] tracking-tight mt-2">
                            How we make it happen
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                                className="relative z-10 flex flex-col gap-4 p-8 rounded-2xl border border-[#0D71BA]/10 hover:border-[#0D71BA]/30 transition-colors bg-white"
                            >
                                <span className="text-[#0D71BA] text-[40px] font-bold leading-none">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="text-[22px] font-semibold text-[#000305] leading-[1.3]">{String(step.title)}</h3>
                                <p className="text-[16px] text-[#535556] leading-[1.7]">{String(step.description)}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Gallery ── */}
            {gallery.length > 0 && (
                <section className="bg-[#F3F8FC] py-[60px] lg:py-[100px] font-sans relative z-10">
                    <div className="container mx-auto px-4 sm:px-9">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 lg:mb-16"
                        >
                            <span className="text-[#0D71BA] font-bold tracking-widest uppercase text-sm">Gallery</span>
                            <h2 className="text-[36px] lg:text-[56px] font-bold text-[#000305] leading-[1.1] tracking-tight mt-2">
                                A look at our work
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {gallery.map((img, i) => (
                                <motion.div
                                    variants={itemVariants}
                                    key={i}
                                    className="relative z-10 aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(13,113,186,0.08)] hover:shadow-[0_12px_36px_rgba(13,113,186,0.18)] transition-shadow group"
                                >
                                    <Image
                                        src={img.full_url as string}
                                        alt={`${String(service.title)} gallery image ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── Technologies & Focus Areas ── */}
            {service.tags && service.tags.length > 0 && (
                <section className="container mx-auto px-4 sm:px-9 py-[60px] lg:py-[100px] font-sans relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <span className="text-[#0D71BA] font-bold tracking-widest uppercase text-sm">Stack</span>
                        <h2 className="text-[32px] lg:text-[48px] font-bold text-[#000305] leading-[1.1] tracking-tight mt-2">
                            Technologies &amp; Focus Areas
                        </h2>
                    </motion.div>

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
                                className="relative z-10 bg-[#E6F0F8] border border-[#0D71BA]/20 px-6 py-3 rounded-full text-[16px] lg:text-[18px] font-semibold text-[#0D5182]"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </section>
            )}

            {/* ── Back link ── */}
            <section className="container mx-auto px-4 sm:px-9 pb-[40px] lg:pb-[60px] font-sans relative z-10">
                <Link
                    href={parentCategory?.slug ? `/solution/${parentCategory.slug}` : '/solutions'}
                    onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 font-bold text-[#000305] hover:text-black transition-colors group"
                >
                    <svg className="transform rotate-180 transition-transform group-hover:-translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="currentColor" />
                    </svg>
                    <span>{parentCategory?.slug ? `Back to ${parentCategory.title}` : 'Browse all Solutions'}</span>
                </Link>
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
                    <button onClick={() => openContactModal()} className="mt-4 cursor-pointer bg-[#F4D315] hover:bg-white hover:scale-[1.02] transition-all duration-300 px-8 py-4 rounded-[8px] font-bold text-[20px] flex items-center justify-center gap-[12px] text-[#000305] shadow-[0_8px_20px_rgba(0,0,0,0.15)] group">
                        Start a Project
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#000305" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
}
