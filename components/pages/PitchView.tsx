"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { type Lang } from "@/lib/i18n";
import { useScrollReveal } from "@/components/effects/useScrollReveal";
import { Eyebrow, MaskedWords } from "@/components/design-system/TextReveal";
import { GlassCard } from "@/components/design-system/GlassCard";
import { useModal } from "@/components/modals/ModalSystem";
import {
  MapPin, Phone, Mail, Camera, Clock, Award, Users, Gem, Wrench, Heart,
} from "lucide-react";

const STATS = [
  { value: "15+", labelEn: "Years in Laval", labelFr: "Ans à Laval" },
  { value: "10K+", labelEn: "Pieces sold", labelFr: "Pièces vendues" },
  { value: "500+", labelEn: "Custom designs", labelFr: "Designs sur mesure" },
  { value: "98%", labelEn: "Client satisfaction", labelFr: "Satisfaction client" },
] as const;

const SERVICES = [
  { icon: Gem, titleEn: "Custom Jewelry", titleFr: "Bijoux sur mesure", descEn: "Engagement rings, wedding bands, and one-of-a-kind pieces designed with you.", descFr: "Bagues de fiançailles, alliances et pièces uniques conçues avec vous." },
  { icon: Wrench, titleEn: "Expert Repairs", titleFr: "Réparations expertes", descEn: "From resizing to restoration, we bring your jewelry back to life.", descFr: "Du redimensionnement à la restauration, nous redonnons vie à vos bijoux." },
  { icon: Heart, titleEn: "Personal Service", titleFr: "Service personnalisé", descEn: "One-on-one consultations in a private, welcoming boutique setting.", descFr: "Consultations privées dans un cadre de boutique chaleureux." },
  { icon: Award, titleEn: "Certified Quality", titleFr: "Qualité certifiée", descEn: "GIA-certified diamonds, lab-grown options, and ethically sourced metals.", descFr: "Diamants certifiés GIA, options de laboratoire et métaux sourcés éthiquement." },
] as const;

export function PitchView({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { ref, isInView } = useScrollReveal();
  const { openModal } = useModal();

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Hero */}
        <div className="text-center mb-16 md:mb-24">
          <Eyebrow text={lang === "fr" ? "Présentation" : "Pitch"} className="mb-4" />
          <h1 className="font-serif text-[clamp(2rem,6vw,4rem)] text-ivory leading-tight mb-6">
            {lang === "fr" ? "Bijouterie Ormania" : "Bijouterie Ormania"}
          </h1>
          <p className="text-[1rem] md:text-[1.15rem] text-text-2 leading-relaxed max-w-2xl mx-auto mb-8">
            {lang === "fr"
              ? "Une boutique familiale au cœur de Laval où chaque bijou raconte une histoire. De la création sur mesure à la réparation experte, nous transformons vos moments importants en souvenirs éternels."
              : "A family-owned boutique in the heart of Laval where every piece of jewelry tells a story. From custom design to expert repair, we transform your important moments into lasting memories."
            }
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openModal("contact")}
              className="h-12 px-6 rounded-full bg-gold text-ink font-medium text-[0.9rem] btn-sheen active:scale-[0.97] transition-transform"
            >
              {lang === "fr" ? "Contactez-nous" : "Contact Us"}
            </button>
            <a
              href="tel:+15147377216"
              className="h-12 px-6 rounded-full border border-(--line) text-text-2 font-medium text-[0.9rem] inline-flex items-center gap-2 hover:border-gold/40 hover:text-ivory transition-colors"
            >
              <Phone size={16} /> (514) 737-7216
            </a>
          </div>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="text-center p-6 rounded-2xl border border-(--line) bg-ink"
            >
              <p className="font-serif text-[2.5rem] text-gold leading-none mb-2">{stat.value}</p>
              <p className="text-[0.85rem] text-text-2">{lang === "fr" ? stat.labelFr : stat.labelEn}</p>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-10">
            <Eyebrow text={lang === "fr" ? "Ce que nous offrons" : "What We Offer"} className="mb-3" />
            <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] text-ivory">
              {lang === "fr" ? "Services complets" : "Full-Service Boutique"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.titleEn}
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 md:p-8 h-full">
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold mb-4">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-[1.1rem] text-ivory mb-2">
                      {lang === "fr" ? service.titleFr : service.titleEn}
                    </h3>
                    <p className="text-[0.9rem] text-text-2 leading-relaxed">
                      {lang === "fr" ? service.descFr : service.descEn}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Story */}
        <div className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Eyebrow text={lang === "fr" ? "Notre histoire" : "Our Story"} className="mb-3" />
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] text-ivory mb-4">
                {lang === "fr" ? "Une famille, une passion, une boutique." : "One family, one passion, one boutique."}
              </h2>
              <p className="text-[0.95rem] text-text-2 leading-relaxed mb-4">
                {lang === "fr"
                  ? "Fondée il y a plus de 15 ans, Bijouterie Ormania est née d'une passion pour les bijoux qui racontent une histoire. Située au cœur de Laval, notre boutique est devenue un lieu de confiance pour des milliers de clients qui cherchent des pièces uniques et un service personnalisé."
                  : "Founded over 15 years ago, Bijouterie Ormania was born from a passion for jewelry that tells a story. Located in the heart of Laval, our boutique has become a trusted destination for thousands of customers seeking unique pieces and personalized service."
                }
              </p>
              <p className="text-[0.95rem] text-text-2 leading-relaxed">
                {lang === "fr"
                  ? "De la première bague de fiançailles à la restauration d'un héritage familial, chaque projet est traité avec le même soin et la même attention aux détails."
                  : "From the first engagement ring to the restoration of a family heirloom, every project is treated with the same care and attention to detail."
                }
              </p>
            </div>
            <div className="aspect-[4/3] rounded-2xl bg-ink-2 border border-(--line) flex items-center justify-center">
              <span className="text-text-3 text-[0.9rem]">Boutique photo placeholder</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center p-8 md:p-12 rounded-2xl border border-(--line) bg-ink">
          <Eyebrow text={lang === "fr" ? "Contact" : "Get in Touch"} className="mb-3" />
          <h2 className="font-serif text-[clamp(1.3rem,3vw,2rem)] text-ivory mb-6">
            {lang === "fr" ? "Prêt à créer quelque chose d'unique ?" : "Ready to create something unique?"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="tel:+15147377216" className="flex items-center gap-2 text-[0.9rem] text-text-2 hover:text-gold transition-colors">
              <Phone size={16} /> (514) 737-7216
            </a>
            <a href="mailto:info@ormania.ca" className="flex items-center gap-2 text-[0.9rem] text-text-2 hover:text-gold transition-colors">
              <Mail size={16} /> info@ormania.ca
            </a>
            <span className="flex items-center gap-2 text-[0.9rem] text-text-2">
              <MapPin size={16} /> Laval, QC
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openModal("appointment")}
              className="h-12 px-6 rounded-full bg-gold text-ink font-medium text-[0.9rem] btn-sheen active:scale-[0.97] transition-transform"
            >
              {lang === "fr" ? "Prendre rendez-vous" : "Book Appointment"}
            </button>
            <button
              onClick={() => openModal("contact")}
              className="h-12 px-6 rounded-full border border-(--line) text-text-2 font-medium text-[0.9rem] hover:border-gold/40 hover:text-ivory transition-colors"
            >
              {lang === "fr" ? "Envoyer un message" : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
