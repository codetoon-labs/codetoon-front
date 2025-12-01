import React from 'react';
import Link from "next/link";
import Image from 'next/image'
import hero from '../public/bg-hero.svg'

export  function Background() {
    return (
        <Image
            alt="Mountains"
            src={hero}
            quality={100}
            fill
            sizes="100vw"
            style={{
                objectFit: 'none',
                transform: 'scale(1)',
                marginTop: '25px',
                opacity: 0.7
            }}
        />
    )
}

export default function Home() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f5fbfe] font-sans dark:bg-black">
        <Background/>
        <div className="flex flex-col items-center z-9 text-center relative top-[100px] gap-7">
            <div className="flex start items-start justify-center gap-[26px] px-[48px]">
                <p className="w-[278px] font-semibold text-[20px] leading-6 text-start text-[#535556]">Delivering the WOW factor—through code, design, and strategy.</p>
                <h1 className="flex flex-col w-[624px] text-[108px] font-[600] leading-[77px] uppercase">
                    <span className="self-start mb-8">Change</span>
                    <span className="self-end mb-8 bg-gradient-to-r from-[#000] via-[#0d71ba] to-[#0B65A7] bg-clip-text text-transparent">The world</span>
                    <span className="self-start mb-7">cause</span>
                    <span className="self-center relative right-10 mb-8 p-1 bg-gradient-to-r  from-[#000] via-[#0d71ba] to-[#F4D315] bg-clip-text text-transparent">we can</span>
                </h1>
                <div className="flex flex-col items-end gap-[339px]">
                    <p className="w-[180px] text-[20px] leading-6 font-semibold text-[#535556]">From idea to “OMG that’s awesome!”</p>
                    <p className="w-[240px] text-[20px] leading-6 font-semibold text-[#0D71BA]">Full service digital agency, crafting tech and design solutions based in Egypt</p>
                </div>
            </div>
            <div>
                <Link href='/'>
                    <button className="cursor-pointer bg-[#0d71ba] px-5 py-2 rounded-[8px] font-bold text-[18px] flex items-center justify-center gap-[10px] text-[#F4D315]">
                        Let&#39;s Build Together
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z" fill="#F4D315"/>
                        <path d="M17.2444 5.28982C17.5251 5.37173 17.9065 5.51534 18.1956 5.80444C18.4847 6.09355 18.6284 6.47497 18.7103 6.75566C18.8008 7.06599 18.8606 7.41701 18.9018 7.77008C18.9846 8.4788 19.0051 9.31068 18.9991 10.0842C18.993 10.8637 18.9594 11.6122 18.9277 12.1639C18.9118 12.4403 18.8962 12.6688 18.8846 12.8288C18.8788 12.908 18.8686 13.0376 18.8651 13.0822L18.865 13.0834C18.8186 13.6338 18.3348 14.0429 17.7845 13.9965C17.2342 13.9501 16.8257 13.4664 16.872 12.9161C16.8751 12.8765 16.8844 12.7595 16.8899 12.6838C16.9009 12.5323 16.9157 12.314 16.931 12.0489C16.9616 11.5176 16.9934 10.8042 16.9991 10.0685C17.0049 9.32682 16.984 8.59001 16.9153 8.002C16.8808 7.7067 16.8116 7.39695 16.7645 7.23556C16.6031 7.18846 16.2934 7.11924 15.9981 7.08476C15.41 7.01611 14.6732 6.99512 13.9315 7.00092C13.1958 7.00668 12.4825 7.03846 11.9511 7.06904C11.686 7.0843 11.4677 7.09917 11.3163 7.11017C11.2406 7.11567 11.124 7.12485 11.0844 7.12797C10.5341 7.17431 10.05 6.76584 10.0036 6.21554C9.9572 5.6652 10.3657 5.18146 10.9161 5.13507L10.9183 5.13489C10.9639 5.1313 11.0926 5.12115 11.1713 5.11543C11.3313 5.1038 11.5598 5.08825 11.8362 5.07234C12.3878 5.0406 13.1363 5.00709 13.9159 5.00099C14.6894 4.99493 15.5213 5.01551 16.23 5.09826C16.5831 5.13948 16.9341 5.19925 17.2444 5.28982Z" fill="#F4D315"/>
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    </section>
  );
}
