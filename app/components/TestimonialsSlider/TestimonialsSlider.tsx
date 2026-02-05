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
    } | null; // 👈 مهم
}

interface GetTestimonialsData {
    allTestimonials: Testimonial[];
}
export default function TestimonialsSlider() {
    const { loading, error, data } = useQuery<GetTestimonialsData>(GET_TESTIMONIALS);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [opacities, setOpacities] = useState<number[]>([]);
    const [details, setDetails] = React.useState<TrackDetails | null>(null)
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
            setDetails(s.track.details)
        },
    });
    function scaleStyle(idx: number) {
        if (!details) return {}
        const slide = details.slides[idx]
        const scale_size = 0.7
        const scale = 1 - (scale_size - scale_size * slide.portion)
        return {
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        }
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
        <div className="flex items-start justify-between px-[48px] w-full">
            {/* Left Section - Title and Navigation */}
            <div className="flex flex-col gap-[39px] items-center w-[384px] shrink-0">
                <h2 className="font-semibold leading-[91.2px] text-[76px] text-black whitespace-pre-wrap w-full z-10">
                    What our clients say about us
                </h2>

                {/* Navigation Arrows */}
                <div className="flex gap-[33px] items-center z-10">
                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            instanceRef.current?.prev();
                        }}
                        disabled={!loaded}
                        className="bg-[#07436f] flex items-center justify-center p-[10px] rounded-full w-[50px] h-[50px] group/buttons hover:scale-105 hover:bg-[#07436FE5] transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <svg className="group-hover/buttons:translate-y-1 transition-all duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M8 19.3693L9.8856 17.4919L14.6659 22.2512L14.6658 4.66699L17.3325 4.66699L17.3326 22.2518L22.1144 17.4918L24 19.3692L15.9995 27.3337L8 19.3693Z" fill="#E6F0F8"/>
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            instanceRef.current?.next();
                        }}
                        className="bg-[#07436f] rotate-180 flex items-center justify-center p-[10px] rounded-full w-[50px] h-[50px] group/buttons hover:scale-105  hover:bg-[#07436FE5] transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <svg className="group-hover/buttons:translate-y-1 transition-all duration-300"
                             xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M8 19.3693L9.8856 17.4919L14.6659 22.2512L14.6658 4.66699L17.3325 4.66699L17.3326 22.2518L22.1144 17.4918L24 19.3692L15.9995 27.3337L8 19.3693Z" fill="#E6F0F8"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Right Section - Slider */}
            <div className="w-[783px] h-[600px] shrink-0 z-10">
                <div  ref={sliderRef}  className="keen-slider zoom-out card" >
                    {testimonials.map((testimonial , idx) => (
                        <div
                            key={testimonial.id}
                            className="keen-slider__slide zoom-out__slide lazy__slide"
                        >
                            <div style={scaleStyle(idx)} className="bg-[#e3eef7] flex flex-col gap-[48px] pb-[24px] pl-[32px] pr-[24px] pt-[28px] rounded-[16px] shadow-[0px_4px_10px_0px_#d6e7f5]">
                                {/* Counter */}
                                <p className="font-medium leading-[24px] text-[18px] text-black">
                                    {currentSlide + 1}/{testimonials.length}
                                </p>

                                {/* Main Content */}
                                <div className="flex gap-[19px] items-center w-full">
                                    {/* Left - Image and Name */}
                                    <div className="flex flex-col w-[344px] shrink-0">
                                        <div className="flex flex-col gap-[13px]">
                                            {/* Image */}
                                            <div className="h-[220px] relative rounded-[20px] shrink-0 w-[300px] overflow-hidden">
                                                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
                                                    <Image
                                                        className="absolute max-w-none w-full"
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


                                            {/* Name and Description */}
                                            <div className="flex flex-col">
                                                <p className="font-semibold leading-[33.6px] text-[24px] text-black">
                                                    {testimonial.name}
                                                </p>
                                                <p className="font-medium leading-[19.8px] text-[#535556] text-[18px]">
                                                    {testimonial.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Quote */}
                                    <div className="flex flex-col gap-[3px] items-end flex-1">
                                        <p className="font-medium self-start italic text-[48px] leading-[48px] text-black h-[25px]">
                                            "
                                        </p>
                                        <div className="flex items-center justify-center px-[28px] w-full">
                                            <p className="font-normal leading-[21.6px] text-[#393b3c] text-[18px] flex-1">
                                                {testimonial.description}
                                            </p>
                                        </div>
                                        <p className="font-medium text-[48px] leading-[48px] italic self-end text-black text-right h-[25px]">
                                            "
                                        </p>
                                    </div>
                                </div>

                                {/* service name */}
                                <div className="font-medium leading-[19.2px] text-[#535556] text-[16px]">
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




