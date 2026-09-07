/** A leaf link inside the navbar. */
export interface NavLink {
  label: string;
  /** Router path this link navigates to */
  path: string;
  /** Optional in-page anchor scrolled to after navigation */
  fragment?: string;
}

/** A labelled cluster of links — a submenu under Pages, or a mega-menu column. */
export interface NavGroup {
  label?: string;
  links: NavLink[];
}

/** The image panel that opens the Components mega menu. */
export interface NavPromo {
  title: string;
  image: string;
  ctaLabel: string;
  ctaPath: string;
  ctaFragment?: string;
}

/**
 * One top-level navbar entry. `kind` decides which dropdown shape the
 * template renders — a flat list, a list with submenus, or a wide card.
 */
export interface NavItem {
  label: string;
  kind: 'simple' | 'nested' | 'mega';
  /** kind: 'simple' | 'mega' — the mega menu flows these into CSS columns */
  links?: NavLink[];
  /** kind: 'nested' */
  groups?: NavGroup[];
  /** kind: 'mega' */
  promo?: NavPromo;
}
