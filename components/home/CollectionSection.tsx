import Link from "next/link";
import { occasionLooks } from "@/data/occasions";

interface CollectionSectionProps {
  topEyebrow?: string;
  topTitle?: string;
  topSubtitle?: string;
  featureEyebrow?: string;
  featureTitle?: string;
  featureDescription?: string;
  featureSubDescription?: string;
  featureCtaText?: string;
  featureCtaHref?: string;
}

export function CollectionSection({
  topEyebrow = "Made for the moments you remember",
  topTitle = "Lorem Lipsum",
  topSubtitle = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  featureEyebrow = "The art of dressing well",
  featureTitle = "Lorem Lipsum",
  featureDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  featureSubDescription = "Lorem Ipsum is simply dummy text",
  featureCtaText = "Show More",
  featureCtaHref = "/occasions",
}: CollectionSectionProps) {
  return (
    <section id="discover" className="collection-story section-wrap" aria-labelledby="discover-heading">
      <div className="center-heading">
        <p className="eyebrow">{topEyebrow}</p>
        <h2 id="discover-heading">{topTitle}</h2>
        <p>{topSubtitle}</p>
      </div>

      <div id="occasions" className="look-row" aria-label="Occasion looks showcase">
        {occasionLooks.map((look, index) => (
          <figure className={"look-card look-card-" + (index + 1)} key={look.file}>
            <img src={look.file} alt={look.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="feature-copy">
        <div>
          <p className="eyebrow">{featureEyebrow}</p>
          <h3>{featureTitle}</h3>
          <p>{featureDescription}</p>
          <p className="copy-small">{featureSubDescription}</p>
          <Link className="text-link" href={featureCtaHref}>
            {featureCtaText} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure>
          <img
            src="/images/image_02.webp"
            alt="A model in traditional couture seated in a Jaipur palace"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
