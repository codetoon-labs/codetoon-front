'use client';

import React, { useState } from "react";
import {TrackDetails, useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import {useQuery} from "@apollo/client/react";
import {GET_TESTIMONIALS} from "@/lib/graphql/queries";

interface Testimonial {
    id: number;
    name: string;
    description: string;
    position: string;
    title: string;
    image: {
        full_url: string;
    } | null;
}

interface GetTestimonialsData {
    allTestimonials: Testimonial[];
}

export default function TestimonialsSlider() {
    const { loading, error, data } = useQuery<GetTestimonialsData>(GET_TESTIMONIALS);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [details, setDetails] = React.useState<TrackDetails | null>(null);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        mode: "snap",
        dragSpeed: 0.3,
        renderMode: "precision",
        defaultAnimation: {
            duration: 650,
            easing: (t: number) => t,
        },
        slides: {
            perView: 1,
            spacing: 20,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        detailsChanged(s) {
            setDetails(s.track.details);
        },
    });

    function scaleStyle(idx: number) {
        if (!details) return {};
        const slide = details.slides[idx];
        const scale_size = 0.7;
        const scale = 1 - (scale_size - scale_size * slide.portion);
        return {
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        };
    }

    if (loading) {
        return (
            <div className="relative w-full overflow-hidden h-[180px] flex items-center justify-center z-10">
                <div className="animate-spin border-t border-b border-[#0d71ba] rounded-full w-10 h-10"></div>
            </div>
        );
    }

    const testimonials = data?.allTestimonials || [];

    return (
        /* Outer: side-by-side on lg+, stacked on mobile */
        <div className="flex flex-col xl:flex-row xl:items-start lg:items-center xl:justify-between px-4 xl:px-[48px] w-full gap-6 xl:gap-0">

            {/* Left Section — Title + Navigation */}
            <div className="flex flex-row xl:flex-col items-center justify-around xl:justify-start xl:gap-[39px] w-full xl:w-[384px] xl:shrink-0">
                <h2 className="font-semibold leading-tight text-[28px] sm:text-[36px] lg:text-[48px] xl:leading-[91.2px] xl:text-[76px] text-black whitespace-pre-wrap xl:w-full z-10 max-w-[280px] lg:max-w-[360px] xl:max-w-none">
                    What our clients say about us
                </h2>

                {/* Navigation Arrows — beside title on mobile, below on desktop */}
                <div className="flex gap-[16px] xl:gap-[33px] items-center z-10 shrink-0">
                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            instanceRef.current?.prev();
                        }}
                        disabled={!loaded}
                        className="bg-[#07436f] flex items-center justify-center p-[10px] rounded-full w-[42px] h-[42px] xl:w-[50px] xl:h-[50px] group/buttons hover:scale-105 hover:bg-[#07436FE5] transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <svg className="group-hover/buttons:translate-y-1 transition-all duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <path d="M8 19.3693L9.8856 17.4919L14.6659 22.2512L14.6658 4.66699L17.3325 4.66699L17.3326 22.2518L22.1144 17.4918L24 19.3692L15.9995 27.3337L8 19.3693Z" fill="#E6F0F8"/>
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            instanceRef.current?.next();
                        }}
                        className="bg-[#07436f] rotate-180 flex items-center justify-center p-[10px] rounded-full w-[42px] h-[42px] xl:w-[50px] xl:h-[50px] group/buttons hover:scale-105 hover:bg-[#07436FE5] transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <svg className="group-hover/buttons:translate-y-1 transition-all duration-300"
                             xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <path d="M8 19.3693L9.8856 17.4919L14.6659 22.2512L14.6658 4.66699L17.3325 4.66699L17.3326 22.2518L22.1144 17.4918L24 19.3692L15.9995 27.3337L8 19.3693Z" fill="#E6F0F8"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Right Section — Slider */}
            <div className="w-full xl:w-[783px] xl:h-[600px] lg:w-[750px] xl:shrink-0 z-10">
                <div ref={sliderRef} className="keen-slider zoom-out card">
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={testimonial.id}
                            className="keen-slider__slide zoom-out__slide lazy__slide"
                        >
                            <div
                                style={scaleStyle(idx)}
                                className="bg-[#e3eef7] flex flex-col gap-[28px] xl:gap-[48px] pb-[24px] pl-[20px] pr-[16px] xl:pl-[32px] xl:pr-[24px] pt-[20px] xl:pt-[28px] rounded-[16px] shadow-[0px_4px_10px_0px_#d6e7f5]"
                            >
                                {/* Counter */}
                                <p className="font-medium leading-[24px] text-[16px] xl:text-[18px] text-black">
                                    {currentSlide + 1}/{testimonials.length}
                                </p>

                                {/* Main Content: stacked on mobile, side-by-side on lg */}
                                <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[19px] lg:items-start xl:items-center w-full">
                                    {/* Image + Name */}
                                    <div className="flex flex-row lg:flex-col lg:w-[260px] xl:w-[344px] lg:shrink-0 gap-4 lg:gap-0">
                                        <div className="flex flex-col gap-[10px] lg:gap-[13px]">
                                            {/* Image */}
                                            <div className="h-[140px] lg:h-[180px] xl:h-[220px] relative rounded-[16px] lg:rounded-[20px] shrink-0 w-[120px] lg:w-[240px] xl:w-[300px] overflow-hidden">
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px] lg:rounded-[20px]">
                                                    <Image
                                                        className="absolute max-w-none object-cover w-full"
                                                        src={testimonial.image?.full_url || '/testimonial.webp'}
                                                        alt={testimonial.name}
                                                        width={300}
                                                        height={455}
                                                        style={{
                                                            height: '206.59%',
                                                            left: '0',
                                                            top: '-30.35%',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Name and Title beside image on mobile */}
                                        <div className="flex flex-col justify-center lg:mt-3">
                                            <p className="font-semibold leading-tight text-[18px] xl:leading-[33.6px] xl:text-[24px] text-black">
                                                {testimonial.name}
                                            </p>
                                            <p className="font-medium leading-[19.8px] text-[#535556] text-[14px] xl:text-[18px]">
                                                {testimonial.title}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <div className="flex flex-col gap-[3px] items-end flex-1">
                                        <p className="font-medium self-start italic text-[36px] xl:text-[48px] leading-[36px] xl:leading-[48px] text-black h-[20px] xl:h-[25px]">
                                            "
                                        </p>
                                        <div className="flex items-center justify-center px-[12px] xl:px-[28px] w-full">
                                            <p className="font-normal leading-[21.6px] text-[#393b3c] text-[14px] xl:text-[18px] flex-1">
                                                {testimonial.description}
                                            </p>
                                        </div>
                                        <p className="font-medium text-[36px] xl:text-[48px] leading-[36px] xl:leading-[48px] italic self-end text-black text-right h-[20px] xl:h-[25px]">
                                            "
                                        </p>
                                    </div>
                                </div>

                                {/* Position */}
                                <div className="font-medium leading-[19.2px] text-[#535556] text-[14px] xl:text-[16px]">
                                    <p className="mb-0">{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
