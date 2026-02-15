import * as React from "react";

import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import styles from "./HeroTiltedLinks.module.css";

export type HeroLinkVariant = "linkBackstage" | "linkCollection" | "linkCraft";

export interface HeroLink {
  label: string;
  href: string;
  variant?: HeroLinkVariant;
}

export interface HeroTiltedLinksProps {
  links?: readonly HeroLink[];
}

const defaultLinks: readonly HeroLink[] = [
  {
    label: "Backstage",
    href: "/info",
    variant: "linkBackstage",
  },
  {
    label: "Collection",
    href: "/shop",
    variant: "linkCollection",
  },
  {
    label: "Our Craft",
    href: "/work",
    variant: "linkCraft",
  },
];

const HeroTiltedLinks: React.FC<HeroTiltedLinksProps> = ({ links }) => {
  const resolvedLinks = React.useMemo(
    () => (links && links.length > 0 ? links : defaultLinks),
    [links]
  );

  return (
    <nav className={styles.container} aria-label="Featured site sections">
      {resolvedLinks.map((link) => (
        <a
          key={`${link.href}-${link.label}`}
          className={cn(
            styles.link,
            link.variant ? styles[link.variant] : null
          )}
          href={link.href}
        >
          <Badge className={styles.linkBadge}>{link.label}</Badge>
        </a>
      ))}
    </nav>
  );
};

export default HeroTiltedLinks;
