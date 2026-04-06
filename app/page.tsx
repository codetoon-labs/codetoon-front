import React from 'react';
import Link from "next/link";
import Image from 'next/image'
import hero from '../public/bg-hero.svg'
import LogoScroller from './components/LogoScroller/LogoScroller';
import { Metadata } from 'next';
import TestimonialsSlider from "@/app/components/TestimonialsSlider/TestimonialsSlider";
import Project from './components/project/project';


export const metadata: Metadata = {
    title: "Codetoon | transform your ideas into reality",
    description: "Full service digital agency, crafting tech and design solutions based in Egypt",
    keywords: ["Codetoon", "digital agency", "tech solutions", "design solutions", "Egypt"],
    openGraph: {
        title: "Codetoon - Digital Agency in Egypt | Transform Your Ideas into Reality",
        description: "Full service digital agency, crafting tech and design solutions based in Egypt",
        url: "https://codetoon.net",
        siteName: "Codetoon",
        images: [
            {
                url: "https://codetoon.net/codetoon-og.png",
                width: 1200,
                height: 630,
                alt: "Codetoon - Transform your ideas into reality"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Codetoon - transform your ideas into reality",
        description: "Full service digital agency, crafting tech and design solutions based in Egypt",
        creator: "@Codetooneg",
        images: ["https://codetoon.net/codetoon-og.png"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        }
    }
};


function Background() {
    return (
        <Image
            alt="Codetoon"
            src={hero}
            quality={100}
            fetchPriority='high'
            fill
            sizes="100vw"
            style={{
                transform: 'scale(1)',
                marginTop: '25px',
                opacity: 0.7,
                zIndex: 1,
            }}
            className='lg:object-none translate-y-[-140px] lg:translate-y-0'
        />
    )
}

export default function Home() {


    return <>
        {/*hero section*/}
        <section className="flex lg:min-h-screen min-h-[780px] items-center justify-center font-sans dark:bg-black">
            <Background />
            <div className="container mx-auto px-4 sm:px-9">
                <div className="flex flex-col items-center z-9 text-center relative top-0 lg:top-[100px] gap-7">
                    <div className="flex flex-col lg:flex-row justify-between lg:xl:w-full gap-[26px] 2xl:px-0 lg:sm:px-[10px] w-full items-center">
                        <p className="hidden lg:block w-[278px] self-start font-semibold text-[20px] leading-6 text-start text-[#535556]">Delivering
                            the WOW factor—through code, design, and strategy.</p>
                        <h1 className="flex flex-col w-[624px] scale-55 lg:scale-100 text-[108px] lg:text-[80px] font-semibold leading-[77px] uppercase">
                            <span className="self-start mb-7">Change</span>
                            <span
                                className="self-end mb-8 p-1 bg-linear-to-r from-black via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent">The world</span>
                            <span className="self-start mb-7">cause</span>
                            <span
                                className="self-center relative right-10 mb-8 p-1 bg-linear-to-r from-black via-[#0d71ba] to-[#F4D315] bg-clip-text text-transparent">we can</span>
                        </h1>
                        <div className="hidden lg:flex flex-col items-end gap-[339px]">
                            <p className="w-[180px] text-[20px] leading-6 font-semibold text-[#535556]">From idea to
                                &#34;OMG that&#39;s awesome!&#34;</p>
                            <p className="w-[240px] text-[20px] leading-6 font-semibold text-[#0D71BA]">Full service
                                digital agency, crafting tech and design solutions based in Egypt</p>
                        </div>
                    </div>
                    <div>
                        <Link href='/'>
                            <button
                                className="cursor-pointer bg-[#0d71ba] px-5 py-2 rounded-[8px] font-bold text-[18px] flex items-center justify-center gap-[10px] text-[#FCF6D0]">
                                Let&#39;s Build Together
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#FCF6D0" />
                                    <path d="M17.2444 5.28982C17.5251 5.37173 17.9065 5.51534 18.1956 5.80444C18.4847 6.09355 18.6284 6.47497 18.7103 6.75566C18.8008 7.06599 18.8606 7.41701 18.9018 7.77008C18.9846 8.4788 19.0051 9.31068 18.9991 10.0842C18.993 10.8637 18.9594 11.6122 18.9277 12.1639C18.9118 12.4403 18.8962 12.6688 18.8846 12.8288C18.8788 12.908 18.8686 13.0376 18.8651 13.0822L18.865 13.0834C18.8186 13.6338 18.3348 14.0429 17.7845 13.9965C17.2342 13.9501 16.8257 13.4664 16.872 12.9161C16.8751 12.8765 16.8844 12.7595 16.8899 12.6838C16.9009 12.5323 16.9157 12.314 16.931 12.0489C16.9616 11.5176 16.9934 10.8042 16.9991 10.0685C17.0049 9.32682 16.984 8.59001 16.9153 8.002C16.8808 7.7067 16.8116 7.39695 16.7645 7.23556C16.6031 7.18846 16.2934 7.11924 15.9981 7.08476C15.41 7.01611 14.6732 6.99512 13.9315 7.00092C13.1958 7.00668 12.4825 7.03846 11.9511 7.06904C11.686 7.0843 11.4677 7.09917 11.3163 7.11017C11.2406 7.11567 11.124 7.12485 11.0844 7.12797C10.5341 7.17431 10.05 6.76584 10.0036 6.21554C9.9572 5.6652 10.3657 5.18146 10.9161 5.13507L10.9183 5.13489C10.9639 5.1313 11.0926 5.12115 11.1713 5.11543C11.3313 5.1038 11.5598 5.08825 11.8362 5.07234C12.3878 5.0406 13.1363 5.00709 13.9159 5.00099C14.6894 4.99493 15.5213 5.01551 16.23 5.09826C16.5831 5.13948 16.9341 5.19925 17.2444 5.28982Z" fill="#FCF6D0" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        {/*build brand section*/}
        <section className="flex flex-col justify-start dark:bg-black mt-0 lg:mt-[110px]">
            <div className="max-w-7xl px-4 sm:px-6 xl:px-12 2xl:max-w-screen-2xl 2xl:px-16 mx-auto">
                <div className="2xl:px-0 lg:sm:px-[48px]">
                    <div className="flex flex-wrap items-center scale-90 lg:scale-100 gap-[24px] sm:gap-[60px] lg:gap-[107px]">
                        <h2 className="text-[40px] sm:text-[56px] lg:text-[80px] font-semibold text-[#0d71ba] italic z-10">Build.</h2>
                        <h2 className="text-[40px] sm:text-[56px] lg:text-[80px] font-semibold text-black z-10">Brand.</h2>
                        <h2 className="text-[40px] sm:text-[56px] lg:text-[80px] font-semibold text-black z-10">Boost.</h2>
                    </div>

                </div>
            </div>
            <div className="my-[24px] z-10">
                <div className="py-[28px] hover:bg-[#E3EEF7] transition-all duration-300 group/item w-full border-b border-[#9EA1A2]">
                    <div
                        className="container mx-auto px-5 flex gap-[16px] items-center 2xl:px-9 sm:px-[48px]">
                        <div className="">
                            <div className="flex gap-[8px]">
                                <span className="text-[20px] font-semibold text-[#000305] mt-[27px]">(01)</span>
                                <h3 className="text-[36px] font-semibold text-[#2B3136] group-hover/item:scale-110 origin-left transition-all duration-300">Technology</h3>
                            </div>
                            <p className="font-normal text-[16px] text-[#535556] mt-[16px]">Lorem ipsum dolor sit
                                amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio
                                mattis.
                                Class
                                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos.
                                Curabitur tempus urna at turpis condimentum lobortis.
                            </p>
                        </div>
                        <Link href="/services">
                            <button
                                aria-label="Read more"
                                className="flex items-center justify-center p-[10px] bg-[#0D71BA] rounded-full cursor-pointer hover:bg-[#B6D4EA] hover:shadow-[0_4px_15px_rgba(124,176,218,0.6)] group transition-all duration-300">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.3688 24L17.4915 22.1144L22.2507 17.3341L4.6665 17.3342L4.6665 14.6675L22.2513 14.6674L17.4913 9.88563L19.3687 8L27.3332 16.0005L19.3688 24Z"
                                        className="fill-[#F4D315] group-hover:fill-[#07436F] transition-all duration-200" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                <div
                    className="py-[28px] hover:bg-[#E3EEF7] transition-all duration-300 group/item w-full border-b border-[#9EA1A2]">
                    <div className="container mx-auto flex px-5 gap-[16px] items-center 2xl:px-9 sm:px-[48px]">
                        <div className="">
                            <div className="flex gap-[8px]">
                                <span className="text-[20px] font-semibold text-[#000305] mt-[27px]">(01)</span>
                                <h3 className="text-[36px] font-semibold text-[#2B3136] group-hover/item:scale-110 origin-left transition-all duration-300">Marketing</h3>
                            </div>
                            <p className="font-normal text-[16px] text-[#535556] mt-[16px]">Lorem ipsum dolor sit
                                amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio
                                mattis.
                                Class
                                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos.
                                Curabitur tempus urna at turpis condimentum lobortis.
                            </p>
                        </div>
                        <Link href="/services">
                            <button
                                aria-label="Read more"
                                className="flex items-center justify-center p-[10px] bg-[#0D71BA] rounded-full cursor-pointer hover:bg-[#B6D4EA] hover:shadow-[0_4px_15px_rgba(124,176,218,0.6)] group transition-all duration-300">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.3688 24L17.4915 22.1144L22.2507 17.3341L4.6665 17.3342L4.6665 14.6675L22.2513 14.6674L17.4913 9.88563L19.3687 8L27.3332 16.0005L19.3688 24Z"
                                        className="fill-[#F4D315] group-hover:fill-[#07436F] transition-all duration-200" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>

                <div
                    className="py-[28px] hover:bg-[#E3EEF7] transition-all duration-300 group/item w-full border-b border-[#9EA1A2]">
                    <div className="container mx-auto flex px-5 gap-[16px] items-center 2xl:px-9 sm:px-[48px]">
                        <div className="">
                            <div className="flex gap-[8px]">
                                <span className="text-[20px] font-semibold text-[#000305] mt-[27px]">(01)</span>
                                <h3 className="text-[36px] font-semibold text-[#2B3136] group-hover/item:scale-110 origin-left transition-all duration-300">Design</h3>
                            </div>
                            <p className="font-normal text-[16px] text-[#535556] mt-[16px]">Lorem ipsum dolor sit
                                amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio
                                mattis.
                                Class
                                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos.
                                Curabitur tempus urna at turpis condimentum lobortis.
                            </p>
                        </div>
                        <Link href="/services">
                            <button
                                aria-label="Read more"
                                className="flex items-center justify-center p-[10px] bg-[#0D71BA] rounded-full cursor-pointer hover:bg-[#B6D4EA] hover:shadow-[0_4px_15px_rgba(124,176,218,0.6)] group transition-all duration-300">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.3688 24L17.4915 22.1144L22.2507 17.3341L4.6665 17.3342L4.6665 14.6675L22.2513 14.6674L17.4913 9.88563L19.3687 8L27.3332 16.0005L19.3688 24Z"
                                        className="fill-[#F4D315] group-hover:fill-[#07436F] transition-all duration-200" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        {/*our work*/}
        <section className="mx-auto container my-[60px] lg:my-[110px] px-4 sm:px-9">
            <Project />
        </section>
        <style>{`
          @media (max-width: 1023px) {
            @keyframes story-compact {
              0%, 45%  { opacity: 1; }
              50%, 95% { opacity: 0; }
              100%     { opacity: 1; }
            }
            @keyframes story-expanded {
              0%, 45%  { opacity: 0; }
              50%, 95% { opacity: 1; }
              100%     { opacity: 0; }
            }
            .mobile-compact {
              animation: story-compact 8s ease-in-out infinite;
              transition: none !important;
            }
            .mobile-expanded {
              animation: story-expanded 8s ease-in-out infinite;
              transition: none !important;
              height: 100% !important;
            }
            .mobile-compact-d2 {
              animation: story-compact 8s ease-in-out 0.3s infinite;
              transition: none !important;
            }
            .mobile-expanded-d2 {
              animation: story-expanded 8s ease-in-out 0.3s infinite;
              transition: none !important;
              height: 100% !important;
            }
            .mobile-compact-d3 {
              animation: story-compact 8s ease-in-out 0.6s infinite;
              transition: none !important;
            }
            .mobile-expanded-d3 {
              animation: story-expanded 8s ease-in-out 0.6s infinite;
              transition: none !important;
              height: 100% !important;
            }
            .story-panel-outer {
              overflow: hidden;
            }
          }
        `}</style>
        {/*our story section*/}
        <section className="my-[60px] lg:my-[110px] flex flex-col items-center">
            <div className="container mx-auto px-4 sm:px-9">
                <h2 className="flex flex-col  w-[192px] lg:w-[380px] text-[56px] sm:text-[72px] lg:text-[100px] font-semibold leading-[65px] lg:leading-[88px]">
                    <span className="text-[#000305] font-semibold z-10">Our</span>
                    <span className="text-[#0D71BA] self-end italic font-[650] z-10">Story</span>
                </h2>
                <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-[16px] mt-[28px] 2xl:px-0 lg:sm:px-[48px]">
                    <div className="flex flex-col w-full lg:w-[429px] gap-[24px]">
                        <h3 className="flex flex-col gap-[12px] text-black uppercase text-[32px] sm:text-[48px] lg:text-[64px] font-semibold lg:leading-[76.8px] z-10">
                            <span>One Problem.</span>
                            <span>One Vision.</span>
                            <span>One Bold Fix.</span>
                        </h3>
                        <p className="text-[18px] sm:text-[24px] text-[#535556] font-medium lg:leading-[28.8px] z-10">How a restless crew in Egypt decided to end scattered growth once and for all.</p>
                    </div>
                    <Image
                        className="w-full max-w-[220px] lg:max-w-[380px] mt-[35px] mx-auto lg:me-8 mb-[26px] h-[291px] lg:h-[440px] rounded-[16px] rotate-[-10deg] z-10"
                        src="/maegan-martin1.webp"
                        alt="Our Work" width={380} height={440} />
                </div>
            </div>
            <div className="relative px-6 lg:px-0 w-full min-h-[288px] group/problem bg-[#FDCECE] mt-[26px] z-10 story-panel-outer">
                <div className="absolute inset-0 py-8 bg-[#FDCECE] w-full h-[288px] overflow-hidden opacity-0  group-hover/problem:opacity-100 group-hover/problem:block container mx-auto 2xl:px-0 sm:px-[48px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] mobile-expanded">
                    <div className="flex flex-col justify-between gap-[16px] px-5 2xl:px-9 lg:px-0">
                        <div className="flex items-center gap-[16px] mb-3">
                            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9979 4.39996L3.07791 19.854L20.9209 19.853L11.9979 4.39996ZM2.73191 21.054C2.55637 21.054 2.38393 21.0077 2.23192 20.92C2.0799 20.8322 1.95367 20.706 1.8659 20.5539C1.77814 20.4019 1.73193 20.2295 1.73193 20.0539C1.73193 19.8784 1.77814 19.706 1.86591 19.554L11.1319 3.49996C11.2197 3.34795 11.3459 3.22172 11.4979 3.13396C11.6499 3.0462 11.8224 3 11.9979 3C12.1734 3 12.3459 3.0462 12.4979 3.13396C12.6499 3.22172 12.7761 3.34795 12.8639 3.49996L22.1339 19.553C22.2217 19.705 22.2679 19.8774 22.2679 20.0529C22.2679 20.2285 22.2217 20.4009 22.1339 20.5529C22.0462 20.705 21.9199 20.8312 21.7679 20.919C21.6159 21.0067 21.4434 21.053 21.2679 21.053L2.73191 21.054ZM11.3719 9.95396H12.6269L12.5299 14.676H11.4699L11.3729 9.95396H11.3719ZM11.9979 17.098C11.9057 17.0995 11.814 17.0828 11.7283 17.0486C11.6426 17.0145 11.5646 16.9637 11.4987 16.8991C11.4328 16.8345 11.3804 16.7575 11.3446 16.6725C11.3087 16.5875 11.2902 16.4962 11.2899 16.404C11.2899 16.019 11.6019 15.716 11.9979 15.716C12.3979 15.716 12.7099 16.019 12.7099 16.404C12.7095 16.4965 12.6907 16.5881 12.6546 16.6733C12.6184 16.7585 12.5657 16.8356 12.4994 16.9002C12.4331 16.9648 12.3547 17.0156 12.2686 17.0495C12.1824 17.0835 12.0904 17.0999 11.9979 17.098Z" fill="#000305" />
                            </svg>
                            <h3 className="text-[#000305] text-[22.5px] font-bold leading-[48px]">Problem – The Breaking Point</h3>
                        </div>
                        <h4 className="flex flex-col text-[#393B3C] text-[20px] font-semibold leading-[36.4px]">
                            <span>Great brands were stuck.</span>
                            <span>Too many vendors. No alignment.</span>
                            <span>Ideas got lost. Execution slowed down.</span>
                            <span>We knew there had to be a better way.</span>
                        </h4>
                    </div>
                </div>
                <div className="container inset-0 mx-auto flex justify-between group-hover/problem:absolute top-0 transition-all duration-700 group-hover/problem:opacity-0  ease-[cubic-bezier(0.22,1,0.36,1)] mobile-compact">
                    <div className="flex flex-col gap-[24px] 2xl:px-9 sm:px-[48px]">
                        <div className="flex justify-start items-center gap-[8px] mt-[24px]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9979 4.39996L3.07791 19.854L20.9209 19.853L11.9979 4.39996ZM2.73191 21.054C2.55637 21.054 2.38393 21.0077 2.23192 20.92C2.0799 20.8322 1.95367 20.706 1.8659 20.5539C1.77814 20.4019 1.73193 20.2295 1.73193 20.0539C1.73193 19.8784 1.77814 19.706 1.86591 19.554L11.1319 3.49996C11.2197 3.34795 11.3459 3.22172 11.4979 3.13396C11.6499 3.0462 11.8224 3 11.9979 3C12.1734 3 12.3459 3.0462 12.4979 3.13396C12.6499 3.22172 12.7761 3.34795 12.8639 3.49996L22.1339 19.553C22.2217 19.705 22.2679 19.8774 22.2679 20.0529C22.2679 20.2285 22.2217 20.4009 22.1339 20.5529C22.0462 20.705 21.9199 20.8312 21.7679 20.919C21.6159 21.0067 21.4434 21.053 21.2679 21.053L2.73191 21.054ZM11.3719 9.95396H12.6269L12.5299 14.676H11.4699L11.3729 9.95396H11.3719ZM11.9979 17.098C11.9057 17.0995 11.814 17.0828 11.7283 17.0486C11.6426 17.0145 11.5646 16.9637 11.4987 16.8991C11.4328 16.8345 11.3804 16.7575 11.3446 16.6725C11.3087 16.5875 11.2902 16.4962 11.2899 16.404C11.2899 16.019 11.6019 15.716 11.9979 15.716C12.3979 15.716 12.7099 16.019 12.7099 16.404C12.7095 16.4965 12.6907 16.5881 12.6546 16.6733C12.6184 16.7585 12.5657 16.8356 12.4994 16.9002C12.4331 16.9648 12.3547 17.0156 12.2686 17.0495C12.1824 17.0835 12.0904 17.0999 11.9979 17.098Z" fill="#000305" />
                            </svg>
                            <h3 className="text-[#000305] text-[18px] font-bold">The Problem</h3>
                        </div>
                        <h3 className="flex flex-col gap-[12px]  text-[#000305] capitalize text-[20px] font-semibold leading-[48px]">
                            Scattered Execution
                        </h3>

                        <p className="flex flex-col text-[#393B3C] font-medium text-[20px] leading-[24px]">
                            <span>Brands juggled +5 vendors.</span>
                            <span>Confused strategies.</span>
                            <span>Missed deadlines.</span>
                            <span>Scattered results.</span>
                        </p>
                    </div>
                    <Image
                        className="hidden lg:block"
                        src="/Frame 42.webp"
                        alt="Our Work" width={560} height={440} />
                </div>
            </div>

            <div className="relative px-6 lg:px-0 flex justify-center 2xl:gap-74 w-full bg-[#FCF6D0] min-h-[288px] group/problem z-10 story-panel-outer">

                <div className="container inset-0 mx-auto flex justify-between 2xl:pe-9 group-hover/problem:absolute top-0 transition-all duration-700 group-hover/problem:opacity-0  ease-[cubic-bezier(0.22,1,0.36,1)] mobile-compact-d2">
                    <Image
                        className="hidden lg:block"
                        src="/Frame 43.webp"
                        alt="Our Work" width={560} height={440} />
                    <div className="flex flex-col justify-between gap-[20px] 2xl:px-0 sm:px-[48px]">
                        <div className="flex justify-start items-center gap-[8px] mt-[24px]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.6183 16.0098C15.7219 16.0162 15.8697 16.0325 16.0255 16.0957C16.4997 16.2882 16.797 16.7414 16.8195 17.2305C16.8268 17.3903 16.7976 17.5308 16.7716 17.6318C16.7472 17.7271 16.712 17.838 16.6769 17.9482C16.5548 18.333 16.4273 18.7326 16.2677 18.9961C16.0248 19.3969 15.6769 19.7185 15.2658 19.9268L15.1779 20.3721C15.0869 20.8315 15.0042 21.2469 14.8068 21.5957C14.5042 22.1303 14.0078 22.5431 13.4054 22.7422C13.0103 22.8727 12.4611 22.8719 11.9982 22.8711C11.5354 22.8719 10.9861 22.8726 10.591 22.7422C9.98845 22.5432 9.49124 22.1304 9.18861 21.5957C8.9913 21.2469 8.90947 20.8314 8.8185 20.3721L8.72865 19.9248C8.3193 19.7165 7.9727 19.3956 7.73061 18.9961C7.57106 18.7326 7.44451 18.3329 7.3224 17.9482C7.2873 17.8379 7.25216 17.7272 7.22768 17.6318C7.20172 17.5307 7.17153 17.3904 7.17885 17.2305C7.20133 16.7415 7.49873 16.2882 7.97279 16.0957C8.12847 16.0325 8.27643 16.0162 8.38002 16.0098C8.47704 16.0038 8.59143 16.0039 8.70131 16.0039H15.298C15.4077 16.0039 15.5214 16.0038 15.6183 16.0098ZM10.6779 20.1885C10.7617 20.5937 10.7884 20.684 10.8224 20.7441C10.9101 20.8991 11.0465 21.0054 11.1954 21.0547C11.2554 21.0745 11.3521 21.0869 11.9982 21.0869C12.6435 21.0869 12.74 21.0745 12.7999 21.0547C12.9489 21.0055 13.0852 20.899 13.173 20.7441C13.207 20.6841 13.2337 20.5936 13.3175 20.1885H10.6779Z" fill="#000305" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 6.625C8.9916 6.625 6.5 9.14999 6.5 12.3309C6.5 13.186 6.68072 13.994 7.00304 14.7185C7.22753 15.2231 7.00045 15.8142 6.49585 16.0387C5.99124 16.2632 5.4002 16.0361 5.17571 15.5315C4.74122 14.5548 4.5 13.4701 4.5 12.3309C4.5 8.10466 7.8287 4.625 12 4.625C16.1713 4.625 19.5 8.10466 19.5 12.3309C19.5 13.4701 19.2588 14.5548 18.8243 15.5315C18.5998 16.0361 18.0088 16.2632 17.5042 16.0387C16.9996 15.8142 16.7725 15.2231 16.997 14.7185C17.3193 13.994 17.5 13.186 17.5 12.3309C17.5 9.14999 15.0084 6.625 12 6.625Z" fill="#000305" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.125C12.5523 1.125 13 1.57272 13 2.125V3.125C13 3.67728 12.5523 4.125 12 4.125C11.4477 4.125 11 3.67728 11 3.125V2.125C11 1.57272 11.4477 1.125 12 1.125ZM19.7774 4.34685C20.1679 4.73737 20.1679 5.37054 19.7774 5.76106L19.0703 6.46817C18.6798 6.85869 18.0466 6.85869 17.6561 6.46817C17.2656 6.07764 17.2656 5.44448 17.6561 5.05395L18.3632 4.34685C18.7537 3.95632 19.3869 3.95632 19.7774 4.34685ZM4.22251 4.34726C4.61303 3.95674 5.24619 3.95674 5.63672 4.34726L6.34383 5.05437C6.73435 5.44489 6.73435 6.07806 6.34383 6.46858C5.9533 6.85911 5.32014 6.85911 4.92961 6.46858L4.22251 5.76147C3.83198 5.37095 3.83198 4.73779 4.22251 4.34726ZM1 12.125C1 11.5727 1.44772 11.125 2 11.125H3C3.55228 11.125 4 11.5727 4 12.125C4 12.6773 3.55228 13.125 3 13.125H2C1.44772 13.125 1 12.6773 1 12.125ZM20 12.125C20 11.5727 20.4477 11.125 21 11.125H22C22.5523 11.125 23 11.5727 23 12.125C23 12.6773 22.5523 13.125 22 13.125H21C20.4477 13.125 20 12.6773 20 12.125Z" fill="#000305" />
                            </svg>
                            <h3 className="text-[#000305] text-[18px] font-bold">Idea</h3>
                        </div>
                        <div className="flex flex-col gap-10">
                            <h3 className="text-[#000305] text-[24px] sm:text-[22.5px] lg:text-[44px] font-semibold leading-[48px] capitalize">
                                We fused creativity with Technology
                            </h3>
                            <p className="flex flex-col text-[#393B3C] font-medium text-[20px] leading-[24px] mb-7">
                                <span>One Team, One Flow, </span>
                                <span>One Purpose.</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 py-8 bg-[#FCF6D0] w-full h-[287.88px] overflow-hidden opacity-0  group-hover/problem:opacity-100 group-hover/problem:block container mx-auto 2xl:px-0 sm:px-[48px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] mobile-expanded-d2">
                    <div className="flex flex-col justify-between gap-[16px] px-5 2xl:px-9 lg:px-0">
                        <div className="flex items-center gap-[16px] mb-3">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.6183 16.0098C15.7219 16.0162 15.8697 16.0325 16.0255 16.0957C16.4997 16.2882 16.797 16.7414 16.8195 17.2305C16.8268 17.3903 16.7976 17.5308 16.7716 17.6318C16.7472 17.7271 16.712 17.838 16.6769 17.9482C16.5548 18.333 16.4273 18.7326 16.2677 18.9961C16.0248 19.3969 15.6769 19.7185 15.2658 19.9268L15.1779 20.3721C15.0869 20.8315 15.0042 21.2469 14.8068 21.5957C14.5042 22.1303 14.0078 22.5431 13.4054 22.7422C13.0103 22.8727 12.4611 22.8719 11.9982 22.8711C11.5354 22.8719 10.9861 22.8726 10.591 22.7422C9.98845 22.5432 9.49124 22.1304 9.18861 21.5957C8.9913 21.2469 8.90947 20.8314 8.8185 20.3721L8.72865 19.9248C8.3193 19.7165 7.9727 19.3956 7.73061 18.9961C7.57106 18.7326 7.44451 18.3329 7.3224 17.9482C7.2873 17.8379 7.25216 17.7272 7.22768 17.6318C7.20172 17.5307 7.17153 17.3904 7.17885 17.2305C7.20133 16.7415 7.49873 16.2882 7.97279 16.0957C8.12847 16.0325 8.27643 16.0162 8.38002 16.0098C8.47704 16.0038 8.59143 16.0039 8.70131 16.0039H15.298C15.4077 16.0039 15.5214 16.0038 15.6183 16.0098ZM10.6779 20.1885C10.7617 20.5937 10.7884 20.684 10.8224 20.7441C10.9101 20.8991 11.0465 21.0054 11.1954 21.0547C11.2554 21.0745 11.3521 21.0869 11.9982 21.0869C12.6435 21.0869 12.74 21.0745 12.7999 21.0547C12.9489 21.0055 13.0852 20.899 13.173 20.7441C13.207 20.6841 13.2337 20.5936 13.3175 20.1885H10.6779Z" fill="#000305" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 6.625C8.9916 6.625 6.5 9.14999 6.5 12.3309C6.5 13.186 6.68072 13.994 7.00304 14.7185C7.22753 15.2231 7.00045 15.8142 6.49585 16.0387C5.99124 16.2632 5.4002 16.0361 5.17571 15.5315C4.74122 14.5548 4.5 13.4701 4.5 12.3309C4.5 8.10466 7.8287 4.625 12 4.625C16.1713 4.625 19.5 8.10466 19.5 12.3309C19.5 13.4701 19.2588 14.5548 18.8243 15.5315C18.5998 16.0361 18.0088 16.2632 17.5042 16.0387C16.9996 15.8142 16.7725 15.2231 16.997 14.7185C17.3193 13.994 17.5 13.186 17.5 12.3309C17.5 9.14999 15.0084 6.625 12 6.625Z" fill="#000305" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.125C12.5523 1.125 13 1.57272 13 2.125V3.125C13 3.67728 12.5523 4.125 12 4.125C11.4477 4.125 11 3.67728 11 3.125V2.125C11 1.57272 11.4477 1.125 12 1.125ZM19.7774 4.34685C20.1679 4.73737 20.1679 5.37054 19.7774 5.76106L19.0703 6.46817C18.6798 6.85869 18.0466 6.85869 17.6561 6.46817C17.2656 6.07764 17.2656 5.44448 17.6561 5.05395L18.3632 4.34685C18.7537 3.95632 19.3869 3.95632 19.7774 4.34685ZM4.22251 4.34726C4.61303 3.95674 5.24619 3.95674 5.63672 4.34726L6.34383 5.05437C6.73435 5.44489 6.73435 6.07806 6.34383 6.46858C5.9533 6.85911 5.32014 6.85911 4.92961 6.46858L4.22251 5.76147C3.83198 5.37095 3.83198 4.73779 4.22251 4.34726ZM1 12.125C1 11.5727 1.44772 11.125 2 11.125H3C3.55228 11.125 4 11.5727 4 12.125C4 12.6773 3.55228 13.125 3 13.125H2C1.44772 13.125 1 12.6773 1 12.125ZM20 12.125C20 11.5727 20.4477 11.125 21 11.125H22C22.5523 11.125 23 11.5727 23 12.125C23 12.6773 22.5523 13.125 22 13.125H21C20.4477 13.125 20 12.6773 20 12.125Z" fill="#000305" />
                            </svg>
                            <h3 className="text-[#000305] text-[20px] sm:text-[28px] lg:text-[40px] font-bold leading-tight lg:leading-[48px]">Idea — The Bold Move</h3>
                        </div>
                        <h4 className="flex flex-col text-[#393B3C] text-[18px] sm:text-[24px] lg:text-[28px] font-semibold leading-[36.4px]">
                            <span>We didn&#39;t want to be another agency.</span>
                            <span>We fused two worlds — design + tech — into one team, under one roof.</span>
                            <span>The goal? Kill the chaos and build smarter, faster, better.</span>
                        </h4>
                    </div>
                </div>

            </div>

            <div className="relative px-6 lg:px-0 bg-[#E3EEF7] min-h-[288px] group/problem w-full z-10 story-panel-outer">
                <div className="absolute inset-0 py-8 bg-[#E3EEF7] w-full h-[288px] overflow-hidden opacity-0  group-hover/problem:opacity-100 group-hover/problem:block container mx-auto 2xl:px-0 sm:px-[48px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] mobile-expanded-d3">
                    <div className="flex flex-col justify-between gap-[16px] px-5 2xl:px-9 lg:px-0">
                        <div className="flex items-center gap-[16px] mb-3">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 13C10 12.4477 10.4477 12 11 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H11C10.4477 14 10 13.5523 10 13ZM7 13C7 12.4477 7.44772 12 8 12H8.00898C8.56127 12 9.00898 12.4477 9.00898 13C9.00898 13.5523 8.56127 14 8.00898 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H13C13.5523 16 14 16.4477 14 17C14 17.5523 13.5523 18 13 18H8C7.44772 18 7 17.5523 7 17ZM14.991 17C14.991 16.4477 15.4387 16 15.991 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H15.991C15.4387 18 14.991 17.5523 14.991 17Z" fill="#000305" />
                                <path d="M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V2.44885C5.38032 2.32821 5.78554 2.24208 6.21533 2.17961C6.46328 2.14357 6.72472 2.11476 7 2.09173V2Z" fill="#000305" />
                                <path d="M19 2.44885C18.6197 2.32821 18.2145 2.24208 17.7847 2.17961C17.5367 2.14357 17.2753 2.11476 17 2.09173V2C17 1.44772 17.4477 1 18 1C18.5523 1 19 1.44772 19 2V2.44885Z" fill="#000305" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.0288 2H10.9712C9.02294 1.99997 7.45141 1.99994 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H13.0288C14.9771 23 16.5486 23.0001 17.7847 22.8204C19.0747 22.6329 20.1432 22.2322 20.982 21.3254C21.8105 20.4297 22.1672 19.3073 22.3358 17.9513C22.5 16.6311 22.5 14.9459 22.5 12.8261V12.1739C22.5 10.0541 22.5 8.36895 22.3358 7.04866C22.1672 5.69272 21.8105 4.57031 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 1.99994 14.9771 1.99997 13.0288 2ZM4.49783 9C4.03921 9 3.8099 9 3.66385 9.14417C3.51781 9.28833 3.51487 9.51472 3.509 9.96751C3.50027 10.6407 3.5 11.3942 3.5 12.2432V12.7568C3.5 14.9616 3.50182 16.5221 3.64887 17.7045C3.79327 18.8656 4.06263 19.5094 4.48622 19.9673C4.89956 20.4142 5.4647 20.6903 6.503 20.8412C7.57858 20.9975 9.00425 21 11.05 21H12.95C14.9957 21 16.4214 20.9975 17.497 20.8412C18.5353 20.6903 19.1004 20.4142 19.5138 19.9673C19.9374 19.5094 20.2067 18.8656 20.3511 17.7045C20.4982 16.5221 20.5 14.9616 20.5 12.7568V12.2432C20.5 11.3942 20.4997 10.6407 20.491 9.96751C20.4851 9.51472 20.4822 9.28833 20.3362 9.14417C20.1901 9 19.9608 9 19.5022 9H4.49783Z" fill="#000305" />
                            </svg>
                            <h3 className="text-[#000305] text-[20px] sm:text-[28px] lg:text-[40px] font-bold leading-tight lg:leading-[48px]">Today — The CodeToon Way</h3>
                        </div>
                        <h4 className="flex flex-col text-[#393B3C] text-[18px] sm:text-[24px] lg:text-[28px] font-semibold leading-[36.4px]">
                            <span>One team. One strategy. Real results.</span>
                            <span>From pixel-perfect branding to powerful products — we launch what others can only plan.</span>
                            <span>And our clients? They&#39;re growing faster than ever.</span>
                        </h4>
                    </div>
                </div>
                <div className="container inset-0 mx-auto h-[350px] lg:h-[288px] flex justify-between group-hover/problem:absolute top-0 transition-all duration-700 group-hover/problem:opacity-0 ease-[cubic-bezier(0.22,1,0.36,1)] mobile-compact-d3">
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="flex flex-col pt-[17px] gap-[12px] 2xl:px-9 sm:px-[48px]">
                            <div className="flex justify-start items-center gap-[12px] mt-[24px]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10 13C10 12.4477 10.4477 12 11 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H11C10.4477 14 10 13.5523 10 13ZM7 13C7 12.4477 7.44772 12 8 12H8.00898C8.56127 12 9.00898 12.4477 9.00898 13C9.00898 13.5523 8.56127 14 8.00898 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H13C13.5523 16 14 16.4477 14 17C14 17.5523 13.5523 18 13 18H8C7.44772 18 7 17.5523 7 17ZM14.991 17C14.991 16.4477 15.4387 16 15.991 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H15.991C15.4387 18 14.991 17.5523 14.991 17Z" fill="#000305" />
                                    <path d="M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V2.44885C5.38032 2.32821 5.78554 2.24208 6.21533 2.17961C6.46328 2.14357 6.72472 2.11476 7 2.09173V2Z" fill="#000305" />
                                    <path d="M19 2.44885C18.6197 2.32821 18.2145 2.24208 17.7847 2.17961C17.5367 2.14357 17.2753 2.11476 17 2.09173V2C17 1.44772 17.4477 1 18 1C18.5523 1 19 1.44772 19 2V2.44885Z" fill="#000305" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.0288 2H10.9712C9.02294 1.99997 7.45141 1.99994 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H13.0288C14.9771 23 16.5486 23.0001 17.7847 22.8204C19.0747 22.6329 20.1432 22.2322 20.982 21.3254C21.8105 20.4297 22.1672 19.3073 22.3358 17.9513C22.5 16.6311 22.5 14.9459 22.5 12.8261V12.1739C22.5 10.0541 22.5 8.36895 22.3358 7.04866C22.1672 5.69272 21.8105 4.57031 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 1.99994 14.9771 1.99997 13.0288 2ZM4.49783 9C4.03921 9 3.8099 9 3.66385 9.14417C3.51781 9.28833 3.51487 9.51472 3.509 9.96751C3.50027 10.6407 3.5 11.3942 3.5 12.2432V12.7568C3.5 14.9616 3.50182 16.5221 3.64887 17.7045C3.79327 18.8656 4.06263 19.5094 4.48622 19.9673C4.89956 20.4142 5.4647 20.6903 6.503 20.8412C7.57858 20.9975 9.00425 21 11.05 21H12.95C14.9957 21 16.4214 20.9975 17.497 20.8412C18.5353 20.6903 19.1004 20.4142 19.5138 19.9673C19.9374 19.5094 20.2067 18.8656 20.3511 17.7045C20.4982 16.5221 20.5 14.9616 20.5 12.7568V12.2432C20.5 11.3942 20.4997 10.6407 20.491 9.96751C20.4851 9.51472 20.4822 9.28833 20.3362 9.14417C20.1901 9 19.9608 9 19.5022 9H4.49783Z" fill="#000305" />
                                </svg>
                                <h3 className="text-[#000305] text-[18px] font-semibold">Today</h3>
                            </div>
                            <div>
                                <h3 className="flex flex-col  text-[#000305] font-semibold capitalize text-[30px] sm:text-[40px] xl:text-[72px] leading-tight lg:leading-[70px] xl:leading-[79.2px]">
                                    <span>One Team.</span>
                                    <span>One Strategy.</span>
                                </h3>
                                <h4 className="text-[#393B3C] text-[20px] font-medium leading-[26px] mb-10 lg:mb-12">Real Results.</h4>
                            </div>
                        </div>
                        <div className="lg:flex flex-col justify-end gap-[12px] lg:me-12 mb-10 ps-5">
                            <p className="w-full max-w-[584px] text-[#000305] font-semibold leading-[19.2px]">“Our ROI jumped 50% after just one quarter. We finally found a team that gets both the creative and the technical.”</p>
                            <div className="flex items-center gap-[12px] mt-2">
                                <Image
                                    className="rounded-full"
                                    src="/Ellipse 1591.webp"
                                    alt="Our Work" width={45} height={45} />
                                <p className="text-[#393B3C] text-[16px] font-medium leading-[0.32px]">Ahmed S., Marketing Director at ABC</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[49px] z-10 flex gap-5 flex-col lg:flex-row">
                <div className='flex flex-col justify-center px-[15px] py-[13px]'>
                    <p className="text-[18px] font-semibold leading-[22px] text-center lg:text-start text-[#393B3C]">Frustrated by the chaos? So we are </p>
                    <p className="text-[18px] font-semibold leading-[22px] text-center lg:text-start text-[#393B3C] gap-[7px]">
                        That’s why we set out to build something different
                    </p>
                </div>
                <Link href="#" className="z-20 flex justify-center items-center">
                    <button
                        className="flex items-center gap-[7px] font-bold text-[20px] text-[#0D71BA] border-b-2 border-[#0D71BA] py-[13px] px-[4px] cursor-pointer z-20">
                        Discover the better way
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z"
                                fill="#0D71BA" />
                        </svg>
                    </button>
                </Link>
            </div>
        </section>
        {/*Coool clients section*/}
        <section>
            <div className="container mx-auto px-4 sm:px-9">
                <div className="flex flex-col items-center w-full mb-[44px] 2xl:px-0 lg:sm:px-[48px]">
                    <h2 className="text-[#000305] self-start text-[36px] sm:text-[52px] lg:text-[72px] font-semibold lg:leading-[70.4px] z-10">Cool Clients.</h2>
                    <h3 className="text-[#0D71BA] self-end text-[36px] sm:text-[52px] lg:text-[72px] font-[650] lg:leading-[70.4px] z-10">Even Cooler Projects.</h3>
                </div>
            </div>
            <div className="bg-[#EFF5FB] h-[180px]">
                <LogoScroller />
            </div>
        </section>
        {/*What our clients say about us section*/}
        <section className="container mx-auto my-[60px] lg:my-[110px] px-4 sm:px-6 lg:px-0">
            <TestimonialsSlider />
        </section>
    </>

        ;
}
