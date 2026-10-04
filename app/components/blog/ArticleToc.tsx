import type { TocItem } from '@/lib/blog';

export default function ArticleToc({ items, title }: { items: TocItem[]; title: string }) {
    return (
        <nav aria-label={title} className="rounded-[20px] border border-[#E6E7E8] bg-[#F8FBFE] p-6">
            <p className="mb-3 text-[15px] font-bold text-[#000305]">{title}</p>
            <ol className="flex flex-col gap-2 text-[15px]">
                {items.map((item) => (
                    <li key={item.id}>
                        <a href={`#${item.id}`} className="text-[#0d71ba] hover:underline">{item.text}</a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
