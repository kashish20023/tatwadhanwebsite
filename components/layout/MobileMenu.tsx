"use client";

import Link from "next/link";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 top-[72px] bg-[#FBF9F6]/98 backdrop-blur-md z-40 md:hidden flex flex-col justify-between p-8 border-t border-[#ECE7DE] animate-in fade-in duration-200"
      )}
    >
      <nav className="flex flex-col gap-6 pt-4" aria-label="Mobile navigation">
        {mainNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-serif text-2xl text-[#12100E] hover:text-[#93753E] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="pt-8 border-t border-[#ECE7DE] flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#93753E]">Tatvdhan Atelier</p>
        <p className="text-xs text-[#666056]">Jaipur, Rajasthan, India</p>
        <a
          href="mailto:contact@tatvdhan.com"
          className="text-xs text-[#12100E] underline tracking-wide"
        >
          contact@tatvdhan.com
        </a>
      </div>
    </div>
  );
}
