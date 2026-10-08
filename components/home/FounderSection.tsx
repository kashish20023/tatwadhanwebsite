interface FounderSectionProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  portraitImage?: string;
  portraitAlt?: string;
  extendedNote?: string;
  signature?: string;
  caption?: string;
}

export function FounderSection({
  eyebrow = "A vision for today",
  heading = "The Man Himself",
  intro = "Vinayak Agarwal’s journey with fashion is rooted in a passion for Indian craftsmanship and contemporary design. With a vision to create clothing that feels timeless yet relevant, he founded Tatvdhan to bring together traditional aesthetics, modern silhouettes, and effortless style.",
  portraitImage = "/images/image_34.webp",
  portraitAlt = "Vinayak Agarwal, founder of Tatvdhan Jaipur",
  extendedNote = "Vinayak Agarwal’s journey with fashion began with a simple belief — that Indian craftsmanship can evolve with the way we live today. Driven by a passion for design, culture, and contemporary style, he founded Tatvdhan to create clothing that feels rooted yet relevant. His vision is to bring together timeless Indian aesthetics with modern silhouettes, thoughtful details, and an effortless sense of style.",
  signature = "Vinayak Agarwal",
  caption = "Founder, Tatvdhan Jaipur",
}: FounderSectionProps) {
  return (
    <section id="the-man-himself" className="founder-section section-wrap" aria-labelledby="founder-heading">
      {/* Column 1: Founder introduction and vision */}
      <div className="founder-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="founder-heading">{heading}</h2>
        <p>{intro}</p>
      </div>

      {/* Column 2: Framed Founder Portrait (image_34.webp) */}
      <figure className="founder-portrait">
        <img
          src={portraitImage}
          alt={portraitAlt}
          loading="lazy"
        />
      </figure>

      {/* Column 3: Extended philosophy note, italic signature, and caption */}
      <div className="founder-note">
        <p>{extendedNote}</p>
        <p className="signature">{signature}</p>
        <span className="founder-caption">{caption}</span>
      </div>
    </section>
  );
}
