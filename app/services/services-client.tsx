'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '@/lib/graphql/queries';

interface Services {
    id: string;
    title: string;
    slug: string;
    description: string;
    main_image: {
        full_url: string;
    };
    services: {
        id: string;
        title: string;
        description: string;
    }[];
}

export default function Services() {
    const { data, loading, error } = useQuery<{ allCategories: Services[] }>(GET_CATEGORIES);
    return (
        <>
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
                <div className="container mx-auto px-4 sm:px-9 relative z-10">
                    <div className="flex flex-col items-center text-center gap-7">
                        <h1 className="flex flex-col relative right-5 lg:right-0 lg:w-[682px] scale-100 text-[50px] lg:text-[92px] font-semibold leading-[1.1] uppercase">
                            <span className="p-1 bg-linear-to-r text-start from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">Tech</span>
                            <span className="relative left-10 lg:left-0 p-1 bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">
                                Design
                            </span>
                            <span className="p-1 bg-linear-to-r text-start from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">
                                Marketing.
                            </span>
                            <span className="relative left-8 lg:left-18 p-1 bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent italic">
                                Fully Fused
                            </span>
                        </h1>
                        <p className="w-full mt-10 max-w-[600px] mx-auto text-[20px] leading-[30px] font-medium text-[#535556]">
                            From pixel-perfect branding to powerful digital products—we turn complex problems into elegant solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Listing */}
            <section className="container mx-auto px-4 sm:px-9 py-[80px] lg:pb-[140px] mt-0 lg:mt-10 lg:pt-[40px] font-sans">
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#0D71BA] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {error && (
                    <div className="text-center py-20 text-red-500">
                        Error loading services. Please try again later.
                    </div>
                )}
                {!loading && !error && data?.allCategories && (
                    <div className="flex flex-col gap-[50px]">
                        {data.allCategories.map((category: Services, idx: number) => {
                            const isEven = idx % 2 === 0;
                            const theme = [
                                { numberText: 'text-[#0D71BA]', stroke: '#0D71BA' },
                                { numberText: 'text-[#c5ba53] drop-shadow-sm', stroke: '#b69c0d' },
                                { numberText: 'text-[#d13a3a]', stroke: '#d13a3a' }
                            ][idx % 3];

                            return (
                                <div key={category.id} className={`flex flex-col-reverse xl:flex-row justify-between items-center gap-10 lg:gap-50 px-14 group/${category.slug || 'service'} mb-10`}>
                                    <div className={`flex flex-col w-full order-2 ${isEven ? 'xl:order-1' : 'xl:order-2'} z-10`}>
                                        <div className="flex gap-[8px] items-baseline mb-[16px]">
                                            <span className={`text-[20px] font-bold ${theme.numberText}`}>({String(idx + 1).padStart(2, '0')})</span>
                                            <h2 className="text-[40px] lg:text-[56px] font-semibold text-[#2B3136] leading-[1.1]">{category.title}</h2>
                                        </div>
                                        <p className="text-[18px] lg:text-[20px] text-[#535556] mb-[32px] leading-[1.6]">
                                            {category.description}
                                        </p>
                                        {category.services && category.services.length > 0 && (
                                            <ul className="flex flex-col gap-[16px]">
                                                {category.services.map((item) => (
                                                    <li key={item.id} className="flex items-center gap-[12px]">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20 6L9 17L4 12" stroke={theme.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className="text-[18px] font-semibold text-[#000305]">{item.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className={`flex flex-col justify-center items-center  ${isEven ? 'xl:order-2' : 'xl:order-1'}`}>
                                        <div className="z-10 ">
                                            <div className="w-[300px] md:w-[584px] ">
                                                <svg className="h-full" viewBox="0 0 586 442" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <defs>
                                                        <clipPath id={`clip-${category.id || idx}`}>
                                                            <rect x="289.5" y="2.5" width="290.02" height="181" rx="37.5" />
                                                            <rect x="0.5" y="293.832" width="212.841" height="147.2" rx="32.5" />
                                                            <path d="M255.733 1C271.197 1 283.733 13.536 283.733 29V144.385C283.733 170.342 304.776 191.385 330.733 191.385H553C570.673 191.385 585 205.712 585 223.385V408.999C585 426.672 570.673 440.999 553 440.999H252C234.327 440.999 220 426.672 220 408.999V330.733C220 304.776 198.957 283.733 173 283.733H29C13.536 283.733 1 271.197 1 255.733V29C1.00002 13.536 13.536 1 29 1H255.733Z" />
                                                        </clipPath>
                                                    </defs>
                                                    <g clipPath={`url(#clip-${category.id || idx})`}>
                                                        <foreignObject x="0" y="0" width="586" height="442">
                                                            <Image src={category.main_image?.full_url || "/service-img.webp"} className="w-full h-full object-cover block" width={586} height={442} alt={category.title || ''}/>
                                                        </foreignObject>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-[#0D71BA] py-[80px] lg:py-[120px] relative overflow-hidden z-10">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto px-4 sm:px-9 flex flex-col items-center text-center gap-[30px] relative z-10">
                    <h2 className="text-[40px] lg:text-[64px] font-bold text-[#FCF6D0] leading-[1.2]">
                        Ready to Transform Your <span className="italic text-white">Business?</span>
                    </h2>
                    <p className="text-[20px] font-medium text-white/90 max-w-[600px] mx-auto">
                        Let's work together to build, brand, and boost your next big idea.
                    </p>
                    <Link href="/">
                        <button className="mt-4 cursor-pointer bg-[#F4D315] hover:bg-white hover:scale-[1.02] transition-all duration-300 px-8 py-4 rounded-[8px] font-bold text-[20px] flex items-center justify-center gap-[12px] text-[#000305] shadow-[0_8px_20px_rgba(0,0,0,0.15)] group">
                            Start a Project
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#000305" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
}
