"use client";

import { useState } from "react";
import Link from "next/link";
import { footerColumns } from "@/data/navigation";
import { contactDetails, siteConfig } from "@/data/site";

interface FooterProps {
  storeCountText?: string;
  storeLinkText?: string;
  storeLinkHref?: string;
  copyrightText?: string;
}

export function Footer({
  storeCountText = contactDetails.storeCountText,
  storeLinkText = contactDetails.storeLinkText,
  storeLinkHref = "/our-story",
  copyrightText = `© ${siteConfig.year} ${siteConfig.name}`,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSignupMessage("Thank you for subscribing to Tatvdhan exclusives.");
    setEmail("");
    setAgreed(false);
  };

  return (
    <footer id="footer" className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Tatvdhan Jaipur Footer
      </h2>

      <div className="footer-main">
        {/* Column 1: Newsletter & Worldwide Stores */}
        <div className="newsletter">
          <p className="eyebrow">Stay in the know</p>
          <h2>Sign up for our newsletter to get exclusive updates and surprise launch events pass.</h2>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">
              Sign up <span aria-hidden="true">↗</span>
            </button>
          </form>

          <label className="consent">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>agree with privacy policy</span>
          </label>

          {signupMessage && (
            <p className="signup-message" role="status">
              {signupMessage}
            </p>
          )}

          <p className="store-count whitespace-pre-line">{storeCountText}</p>
          <Link className="footer-underlined" href={storeLinkHref}>
            {storeLinkText} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Dynamic Navigation Columns */}
        {footerColumns.map((col) => (
          <div className="footer-column" key={col.title}>
            <h3>{col.title}</h3>
            {col.links.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <p>{copyrightText}</p>

        <div className="currency flex items-center gap-1.5 justify-self-end" aria-label="Currency: INR">
          <span>{contactDetails.currency}</span>
        </div>
      </div>
    </footer>
  );
}
