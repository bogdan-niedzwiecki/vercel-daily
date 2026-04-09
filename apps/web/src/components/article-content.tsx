import type { ContentBlock } from "@/lib/server/vercel-daily-api";
import Image from "next/image";

export function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <article className="space-y-2 text-sm leading-relaxed text-zinc-700">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;

          case "heading":
            return block.level === 2 ? (
              <h2
                key={index}
                className="text-base font-extrabold tracking-tight text-zinc-900"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={index}
                className="text-sm font-bold tracking-tight text-zinc-900"
              >
                {block.text}
              </h3>
            );

          case "blockquote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-zinc-300 pl-3 italic text-zinc-700"
              >
                {block.text}
              </blockquote>
            );

          case "unordered-list":
            return (
              <ul key={index} className="list-disc space-y-1 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={index} className="list-decimal space-y-1 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ol>
            );

          case "image":
            return (
              <figure key={index} className="space-y-1">
                {block.src ? (
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={767}
                    height={288}
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 767px"
                    className="h-auto w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                ) : null}
                {block.caption ? (
                  <figcaption className="text-xs text-zinc-500">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}
