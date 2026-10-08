import Link from "next/link";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export function Navigation({ className, onItemClick }: NavigationProps) {
  return (
    <nav className={cn("hidden md:flex items-center gap-8 lg:gap-10", className)} aria-label="Main navigation">
      {mainNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onItemClick}
          className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#12100E] hover:text-[#93753E] transition-colors font-medium"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
