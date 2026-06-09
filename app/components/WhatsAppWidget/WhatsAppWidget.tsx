'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '+201149996247';
const WHATSAPP_MESSAGE = 'Hi CodeToon! I\'d like to learn more about your services.';
const PHONE_NUMBER = '+201156167758';
const PHONE_DISPLAY = '01156167758';

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function WhatsAppIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.523 5.854L.057 23.882a.5.5 0 0 0 .614.625l6.218-1.634A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.901 0-3.678-.528-5.19-1.444l-.372-.22-3.853 1.013 1.03-3.762-.241-.384A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
    );
}

function PhoneIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
    );
}

export default function WhatsAppWidget() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Close on outside click (mobile)
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [mobileMenuOpen]);

    const handleAction = () => setMobileMenuOpen(false);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
        >
            {/* ── Mobile expanded menu ── */}
            <AnimatePresence>
                {isMobile && mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.92 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="flex flex-col gap-2 items-end"
                    >
                        {/* WhatsApp action */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleAction}
                            aria-label="Chat on WhatsApp"
                            className="flex items-center gap-3 bg-white text-[#0d71ba] font-semibold text-[14px] px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(13,113,186,0.18)] hover:shadow-[0_6px_28px_rgba(13,113,186,0.28)] hover:scale-[1.03] transition-all duration-200 whitespace-nowrap"
                        >
                            <span className="text-[#0d71ba]">
                                <WhatsAppIcon size={20} />
                            </span>
                            Chat on WhatsApp
                        </a>

                        {/* Call action */}
                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            onClick={handleAction}
                            aria-label={`Call us at ${PHONE_DISPLAY}`}
                            className="flex items-center gap-3 bg-white text-[#0d71ba] font-semibold text-[14px] px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(13,113,186,0.18)] hover:shadow-[0_6px_28px_rgba(13,113,186,0.28)] hover:scale-[1.03] transition-all duration-200 whitespace-nowrap"
                        >
                            <span className="text-[#0d71ba]">
                                <PhoneIcon size={20} />
                            </span>
                            {PHONE_DISPLAY}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main floating button ── */}
            <div className="group relative flex items-center justify-end">
                {/* Desktop tooltip pill */}
                <AnimatePresence>
                    <motion.span
                        key="tooltip"
                        initial={{ opacity: 0, x: 8, scale: 0.95 }}
                        whileHover={{ opacity: 1, x: 0, scale: 1 }}
                        className="hidden lg:flex pointer-events-none absolute right-[68px] items-center bg-[#0d71ba] text-white text-[14px] font-semibold px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(13,113,186,0.3)] whitespace-nowrap
                        opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2
                        transition-all duration-250 ease-out"
                        aria-hidden="true"
                    >
                        Chat on WhatsApp
                    </motion.span>
                </AnimatePresence>

                <motion.button
                    aria-label="Chat on WhatsApp"
                    aria-expanded={isMobile ? mobileMenuOpen : undefined}
                    aria-haspopup={isMobile ? 'menu' : undefined}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (isMobile) {
                            setMobileMenuOpen((v) => !v);
                        } else {
                            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                        }
                    }}
                    className="relative flex items-center justify-center w-14 h-14 bg-[#0d71ba] hover:bg-[#0a5a95] text-white rounded-full shadow-[0_6px_24px_rgba(13,113,186,0.40)] cursor-pointer transition-colors duration-200"
                >
                    <WhatsAppIcon size={26} />

                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full bg-[#0d71ba]/30 animate-ping" style={{ animationDuration: '2.4s' }} aria-hidden="true" />
                </motion.button>
            </div>
        </div>
    );
}
