import Link from "next/link";
import { journalStories } from "@/data/occasions";
import type { JournalStory } from "@/types/occasion";

interface JournalSectionProps {
  eyebrow?: string;
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
  stories?: JournalStory[];
  campaignTitle?: string;
  campaignImage?: string;
  campaignHref?: string;
}

export function JournalSection({
  eyebrow = "From the house",
  heading = "News & collections",
  ctaText = "Discover Tatvdhan",
  ctaHref = "/media",
  stories = journalStories,
  campaignTitle = "Explore the Wedding Chapter",
  campaignImage = "/images/image_04.webp",
  campaignHref = "/collection",
}: JournalSectionProps) {
  return (
    <section id="media" className="journal-section" aria-labelledby="journal-heading">
      <div className="section-wrap">
        <div className="journal-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="journal-heading">{heading}</h2>
          </div>
          <Link className="text-link" href={ctaHref}>
            {ctaText} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div id="journal" className="journal-grid" aria-label="House journals and news updates">
          {stories.map((story, index) => (
            <Link
              className="journal-card"
              href={story.href || (index < 2 ? "/collection" : "/our-story")}
              key={story.title + index}
            >
              <figure>
                <img src={story.file} alt={story.alt} loading="lazy" />
              </figure>
              <p className="journal-date">{story.date || "Tatvdhan Journal · Jaipur"}</p>
              <h3>{story.title}</h3>
              <p>
                {story.description ||
                  "News write-ups offer a great way to let clients know about new products and services, events, awards, and more!"}
              </p>
              <span className="journal-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>

        <Link className="campaign-image" href={campaignHref} aria-label={campaignTitle}>
          <img src={campaignImage} alt={campaignTitle} loading="lazy" />
          <span>
            {campaignTitle} <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
