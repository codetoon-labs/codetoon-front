import Image from 'next/image';
import type { BlogAuthor } from '@/lib/blog-data';

export default function AuthorBox({ author, label }: { author: BlogAuthor; label: string }) {
    return (
        <aside className="mt-14 flex items-start gap-4 rounded-[20px] bg-[#EFF5FB] p-6">
            {author.image?.full_url && (
                <Image src={author.image.full_url} alt={author.name ?? ''} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
            )}
            <div>
                <p className="text-[13px] font-semibold uppercase text-[#718096]">{label}</p>
                <p className="text-[18px] font-bold text-[#000305]">{author.name}</p>
                {author.title && <p className="text-[15px] text-[#0d71ba]">{author.title}</p>}
                {author.bio && <p className="mt-2 text-[15px] leading-7 text-[#535556]">{author.bio}</p>}
            </div>
        </aside>
    );
}
