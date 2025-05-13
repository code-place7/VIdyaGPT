import React, { useRef, MouseEvent } from "react";

interface CardData {
  description: string;
}

interface GlowCardProps {
  card: CardData;
  children: React.ReactNode;
  index: number;
}

const GlowCard: React.FC<GlowCardProps> = ({ card, children, index }) => {
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleMouseMove =
    (index: number) => (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRefs.current[index];
      if (!(card instanceof HTMLElement)) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      let angle = Math.atan2(mouseX, mouseY) * (180 / Math.PI);
      angle = (angle + 360) % 360;

      card.style.setProperty("--start", `${angle + 60}deg`);
    };

  return (
    <div
      className=" card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
      ref={(el) => {
        cardRefs.current[index] = el;
      }}
      onMouseMove={handleMouseMove(index)}
    >
      <div className="glow" />
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img src="/images/star.png" alt="star" className="size-5" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.description}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
