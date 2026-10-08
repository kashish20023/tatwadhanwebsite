import Link from "next/link";

interface EditorialSectionProps {
  title?: string;
  description?: string;
  subDescription?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function EditorialSection({
  title = "Lorem Lipsum",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Industry's",
  subDescription = "Lorem Ipsum is simply dummy text",
  ctaText = "Show More",
  ctaHref = "/collection",
}: EditorialSectionProps) {
  return (
    <section id="collection" className="editorial-grid-section section-wrap" aria-labelledby="editorial-heading">
      {/* 1. Top-Left: Text Block */}
      <div className="editorial-text-card">
        <h2 id="editorial-heading">{title}</h2>
        <p>{description}</p>
        <p className="copy-small">{subDescription}</p>
        <div>
          <Link className="editorial-btn" href={ctaHref}>
            {ctaText}
          </Link>
        </div>
      </div>

      {/* 2. Top-Middle: Detail Collage (image_22) */}
      <figure className="editorial-img-detail">
        <img
          src="/images/image_22.webp"
          alt="Hand-embroidered floral textile and couture details"
          loading="lazy"
        />
      </figure>

      {/* 3. Top-Right: Lying Down Portrait (image_19) */}
      <figure className="editorial-img-lying">
        <img
          src="/images/image_19.webp"
          alt="A model wearing a blush embroidered sherwani lying on carpet"
          loading="lazy"
        />
      </figure>

      {/* 4. Bottom-Left: Standing Portrait (image_21) */}
      <figure className="editorial-img-standing">
        <img
          src="/images/image_21.webp"
          alt="A model in embroidered sherwani standing in front of heritage carpet"
          loading="lazy"
        />
      </figure>

      {/* 5. Bottom-Right: Wide Palace Architecture (image_02) */}
      <figure className="editorial-img-palace">
        <img
          src="/images/image_02.webp"
          alt="Couture look seated in a Jaipur palace pavilion overlooking domes"
          loading="lazy"
        />
      </figure>
    </section>
  );
}
