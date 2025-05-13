"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowCard from "./Glowcard";
import { taglines } from "../constants/taglines"; // adjust path as per file structure

gsap.registerPlugin(ScrollTrigger);

const KnowMore = () => {
  useGSAP(() => {
    gsap.utils.toArray(".knowmorecard").forEach((card: any) => {
      gsap.from(card, {
        xPercent: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      className="w-full bg-black text-white py-16 px-4 md:px-12 mt-0"
      id="knowmore"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          What Makes VidyaGPT Special?
        </h2>
        <p className="text-gray-400 text-lg">
          Explore our mission-driven tagline ideas that define our purpose and
          passion.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {taglines.map((card, idx) => (
          <div key={idx} className="knowmorecard exp-card-wrapper">
            <GlowCard card={card} index={idx}>
              <div>{card.emoji}</div>
            </GlowCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KnowMore;
