"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import type { IGPost } from "@/lib/data";
import { IG_POSTS } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IgIcon } from "@/components/ui/icons";
import { BlurWords, FadeLines } from "@/components/effects/TextReveal";

export function ProductView({ post, lang }: { post: IGPost; lang: Lang }) {
  const { open } = useLeadModal();
  const related = IG_POSTS.filter((p) => p.cat === post.cat && p.code !== post.code).slice(0, 3);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Link
          href={`/${lang}/collections`}
          className="inline-flex items-center gap-1.5 min-h-11 text-[0.85rem] text-text-2 hover:text-gold transition-colors mb-5"
        >
          <ArrowLeft size={15} aria-hidden />
          {lang === "fr" ? "Retour aux collections" : "Back to collections"}
        </Link>

        <div className="grid md:grid-cols-2 gap-7 md:gap-12 items-start">
          <Reveal className="card-zoom relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {post.type === "reel" && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[0.65rem] tracking-[0.16em] uppercase bg-ink/70 backdrop-blur px-2.5 py-1 rounded-full text-gold border border-(--line)">
                <Play size={9} fill="currentColor" aria-hidden />
                {t(lang, "ig.reel")}
              </span>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow block mb-3">{post.availability}</span>
            <BlurWords
              text={post.title}
              className="font-serif text-[clamp(1.9rem,6vw,3rem)] leading-[1.1] text-ivory"
            />
            <FadeLines className="mt-4" stagger={0.06}>
              <p className="fade-line text-[0.95rem] text-text-2 leading-relaxed">{post.caption}</p>
            </FadeLines>

            <div className="mt-7 flex flex-col gap-3 max-w-sm">
              <Button
                full
                arrow
                onClick={() => {
                  track("product_inquiry_click", { code: post.code, source: "product_page" });
                  open("product", { piece: post.title });
                }}
              >
                {t(lang, "ig.ask")}
              </Button>
              <Button
                variant="secondary"
                full
                href={post.igUrl}
                onClick={() => track("ig_card_click", { code: post.code, source: "product_page" })}
              >
                <IgIcon className="w-4 h-4" />
                {lang === "fr" ? "Voir sur Instagram" : "View on Instagram"}
              </Button>
            </div>

            <p className="mt-6 text-[0.78rem] text-text-3 leading-relaxed">
              {lang === "fr"
                ? "Prix et disponibilité confirmés en boutique ou par votre méthode de contact préférée."
                : "Pricing and availability confirmed in store or via your preferred contact method."}
            </p>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-16 md:mt-24">
            <Reveal>
              <h2 className="font-serif text-[1.6rem] text-ivory mb-6">
                {lang === "fr" ? "Pièces similaires" : "You may also love"}
              </h2>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {related.map((p) => (
                <RevealItem key={p.code}>
                  <Link
                    href={`/${lang}/product/${p.code}`}
                    onClick={() => track("product_card_click", { code: p.code, source: "related" })}
                    className="card-glow card-zoom group block relative rounded-2xl overflow-hidden border border-(--line) aspect-[4/5]"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <h3 className="absolute bottom-3 left-3 right-3 font-serif text-[1rem] md:text-[1.1rem] text-ivory leading-tight">
                      {p.title}
                    </h3>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </div>
  );
}
