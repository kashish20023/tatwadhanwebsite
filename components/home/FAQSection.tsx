"use client";

import { useState } from "react";
import { faqItems } from "@/data/occasions";
import type { FAQItem } from "@/types/occasion";

interface FAQSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  intro?: string;
  faqs?: FAQItem[];
  imageSrc?: string;
  imageAlt?: string;
}

export function FAQSection({
  eyebrow = "Here to help",
  title = "Got Questions?",
  subtitle = "We’ve Got Answers",
  intro = "Everything you need to know before getting started.",
  faqs = faqItems,
  imageSrc = "/images/image_02.webp",
  imageAlt = "Indian heritage architecture and couture",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq-section section-wrap" aria-labelledby="faq-heading">
      <div className="faq-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="faq-heading">
          {title}
          <br />
          <span>{subtitle}</span>
        </h2>
        <p className="faq-intro">{intro}</p>

        <div className="faq-list" role="region" aria-label="Frequently Asked Questions list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-title-${index}`;
            const contentId = `faq-content-${index}`;

            return (
              <div className={"faq-item" + (isOpen ? " active" : "")} key={faq.question}>
                <button
                  type="button"
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-symbol" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="faq-answer" id={contentId} role="region" aria-labelledby={headingId}>
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <figure className="faq-image">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
        />
      </figure>
    </section>
  );
}
