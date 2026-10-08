"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mainNavLinks } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  menuOpen?: boolean;
  onToggleMenu?: () => void;
  onCloseMenu?: () => void;
}

export function Header({
  menuOpen: controlledMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: HeaderProps) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;

  const handleToggle = () => {
    if (onToggleMenu) {
      onToggleMenu();
    } else {
      setInternalMenuOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    if (onCloseMenu) {
      onCloseMenu();
    } else {
      setInternalMenuOpen(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="masthead">
          <span aria-hidden="true" />
          <Link className="brand-mark" href="/" aria-label="Tatvdhan Jaipur home">
            <Image
              src="/images/image_01.png"
              alt="Tatvdhan Jaipur"
              width={140}
              height={36}
              priority
              className="h-auto w-auto"
            />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={handleToggle}
          >
            <span />
            <span />
          </button>
        </div>
        <nav className={"main-nav" + (isMenuOpen ? " is-open" : "")} aria-label="Main navigation">
          {mainNavLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={handleClose}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Synchronized accessible mobile overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={handleClose} />
    </>
  );
}
