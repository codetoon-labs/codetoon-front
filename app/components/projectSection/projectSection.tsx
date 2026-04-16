'use client'

import { useQuery } from '@apollo/client/react';
import { GET_PROJECTS } from '@/lib/graphql/queries';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
    description: string;
    id: string | number;
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
}

interface GetProjectsData {
    projects: {
        data: Project[];
    };
}

export default function ProjectSection({ activeFilter = "All Projects" }: { activeFilter?: string }) {
    const { loading, error, data } = useQuery<GetProjectsData>(GET_PROJECTS);

    const filteredProjects = React.useMemo(() => {
        if (!data?.projects?.data) return [];
        
        let projects = data.projects.data;

        // Filter by Category (activeFilter)
        if (activeFilter === "All Projects") return projects;
        
        // Handle "Featured" - if there's no specific logic, we'll return the current selection
        if (activeFilter === "Featured") return projects; 

        return projects.filter(project => 
            project.title.toLowerCase() === activeFilter.toLowerCase() ||
            project.categories?.some(cat => cat.title.toLowerCase() === activeFilter.toLowerCase()) ||
            project.services?.some(service => service.title.toLowerCase() === activeFilter.toLowerCase())
        );
    }, [data, activeFilter]);

    return (
        <div>
            
                <div className="my-[40px]">
                    {loading && (
                        <div className="relative w-full overflow-hidden h-[180px] flex items-center justify-center z-10">
                            <div className="animate-spin border-t border-b border-[#0d71ba] rounded-full w-10 h-10"></div>
                        </div>  
                    )}
                    {error && (
                        <div className="flex justify-center items-center py-20">
                            <p className="text-xl text-red-500 font-semibold">Oops! Failed to load projects.</p>
                        </div>
                    )}

                    <AnimatePresence mode='popLayout'>
                        {!loading && !error && filteredProjects.map((project, index) => {
                            const isEven = index % 2 === 0;

                            const projectImageSection = (
                                <div className="z-10">
                                    <div className="relative group overflow-hidden rounded-[32px]">
                                        <Image
                                            className="relative w-full object-cover h-[380px] lg:h-auto max-w-[748px] group xl:max-w-[748px] 2xl:max-w-[900px]"
                                            src={project.main_image?.full_url || '/frame 14.webp'}
                                            alt={project.title || "Our Work"} width={752} height={380} />
                                        <div className='absolute inset-0 bg-black/25'></div>
                                        <Link className='lg:hidden' href={`/projects/${project.id}`}>
                                            <button className="absolute bottom-5 left-5 z-10 flex justify-center w-fit items-center text-[#ffffff] text-[18px] font-semibold border border-[#E6F0F866] bg-[rgba(255,255,255,0.10)] backdrop-blur-[10px] rounded-[15px] px-[16px] py-[8px]">
                                                view project
                                            </button>
                                        </Link>
                                        <div className="absolute top-5 right-5 flex gap-2">
                                            <span className="z-10 flex justify-center w-fit items-center text-[#ffffff] text-[16px] font-semibold border border-[#E6F0F866] bg-[rgba(255,255,255,0.10)] backdrop-blur-[10px] rounded-[8px] shadow-md px-[16px] py-[8px]">
                                                2025
                                            </span>
                                            {project.country && (
                                                <span className="z-10 flex gap-2 justify-center w-fit items-center text-[#ffffff] text-[16px] font-semibold border border-[#E6F0F866] bg-[rgba(255,255,255,0.10)] backdrop-blur-[10px] rounded-[8px] shadow-md px-[16px] py-[8px]">
                                                    {project.country.image?.full_url && (
                                                        <Image 
                                                            src={project.country.image.full_url} 
                                                            alt={project.country.name} 
                                                            width={28} 
                                                            height={20} 
                                                            className="rounded-sm object-cover w-[28px] h-[20px]" 
                                                        />
                                                    )}
                                                
                                                    {project.country.name}
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className="absolute inset-0 hidden bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:flex justify-center items-center">
                                            <Link href={`/projects/${project.id}`}>
                                                <button
                                                    className="px-[40px] h-[48px] border border-[#FFFFFF] cursor-pointer text-white font-medium rounded-3xl transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                                    View project
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );

                            const projectDetailsSection = (
                                <div className="flex flex-col gap-[30px] lg:gap-[80px]">
                                    <div className="flex flex-col gap-[16px]">
                                        <h3 className="text-[22px] font-medium leading-[28.2px] ps-[16px] text-[#0D71BA] z-10">{project.title}</h3>
                                        <p className="text-[16px] text-[#0D71BA] font-normal ps-[16px] leading-[25px] max-w-full lg:max-w-[376px] xl:max-w-[376px] 2xl:max-w-[420px] z-10">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-[11px] mt-[16px] ps-[16px] z-10">
                                        {project.services?.map((service) => (
                                            <span key={service.id} className="flex justify-center w-fit items-center text-[#0D71BA] text-[14px] font-semibold border border-[#86B8DC] rounded-[8px] px-[16px] py-[6px] capitalize">
                                                {service.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );

                            return (
                                <motion.div 
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className={`flex ${isEven ? 'flex-col lg:flex-row' : 'flex-col-reverse lg:flex-row'} gap-[16px] lg:items-center ${index > 0 ? 'mt-[48px]' : ''}`}
                                >
                                    {isEven ? (
                                        <>
                                            {projectImageSection}
                                            {projectDetailsSection}
                                        </>
                                    ) : (
                                        <>
                                            {projectDetailsSection}
                                            {projectImageSection}
                                        </>
                                    )}
                                </motion.div>
                            );
                        })}
                        {!loading && !error && filteredProjects.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-center items-center py-20 w-full"
                            >
                                <p className="flex justify-center items-center text-xl h-80 text-[#0D71BA] font-semibold italic">No projects found in this category.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-[34px] flex flex-col lg:flex-row items-center justify-center gap-[7px]">
                    <p className="text-[#535556] text-[16px] font-medium z-10">Smart design. Sharp code. Real results.</p>
                    <Link href="#" className="z-20">
                        <button
                            className="flex items-center gap-[7px] font-bold text-[20px] text-[#0D71BA] border-b-2 border-[#0D71BA] py-[13px] px-[4px] cursor-pointer z-20">
                            View All Projects
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z"
                                    fill="#0D71BA" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
    );
}