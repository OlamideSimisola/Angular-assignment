import { Injectable } from '@angular/core';
import { Feature } from '../models/feature';
import { NavItem } from '../models/nav-link';
import { Showcase, ShowcaseCategory } from '../models/showcase';

const SCREENSHOTS = 'https://prium.github.io/Posh/v2.1.0/assets/images/screenshots';

/**
 * Single source of truth for the page's content. Components inject this
 * instead of hardcoding lists in their templates.
 */
@Injectable({ providedIn: 'root' })
export class DemoService {
  /**
   * The navbar as the original template has it: Homes, Pages, Components and
   * Docs, each opening a dropdown. The original's targets are demo pages that
   * don't exist in this rebuild, so each link points at the matching section
   * of this app instead.
   */
  private readonly navItems: NavItem[] = [
    {
      label: 'Homes',
      kind: 'simple',
      links: [
        'Conference',
        'Digital Agency',
        'Education',
        'Hospital',
        'Hotel',
        'Landing NOKIA',
        'Landing Software',
        'Personal',
        'Restaurant',
        'Shop',
        'Travel Agency',
      ].map((label) => ({ label, path: '/', fragment: 'demos' })),
    },
    {
      label: 'Pages',
      kind: 'nested',
      groups: [
        { links: [{ label: 'Starter', path: '/', fragment: 'demos' }] },
        { links: [{ label: 'RTL', path: '/', fragment: 'demos' }] },
        {
          label: 'About',
          links: [
            { label: 'About Company', path: '/about' },
            { label: 'About Team', path: '/about' },
          ],
        },
        {
          label: 'Career',
          links: [
            { label: 'Careers', path: '/', fragment: 'demos' },
            { label: 'Job Details', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Contacts',
          links: [
            { label: 'Contact 1', path: '/contact' },
            { label: 'Contact 2', path: '/contact' },
            { label: 'Contact 3', path: '/contact' },
          ],
        },
        {
          label: 'Pricing',
          links: [
            { label: 'Pricing 1', path: '/', fragment: 'demos' },
            { label: 'Pricing 2', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Services',
          links: [
            { label: 'Services 1', path: '/', fragment: 'demos' },
            { label: 'Services 2', path: '/', fragment: 'demos' },
            { label: 'Services 3', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Accounts',
          links: [
            { label: 'Log in (Simple)', path: '/', fragment: 'demos' },
            { label: 'Log in (With Social)', path: '/', fragment: 'demos' },
            { label: 'Profile', path: '/', fragment: 'demos' },
            { label: 'Settings', path: '/', fragment: 'demos' },
            { label: 'Account Recovery', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Utility',
          links: [
            { label: '404', path: '/', fragment: 'demos' },
            { label: '500', path: '/', fragment: 'demos' },
            { label: 'Maintenance', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Shop',
          links: [
            { label: 'Products List', path: '/', fragment: 'demos' },
            { label: 'Products Grid', path: '/', fragment: 'demos' },
            { label: 'Product Details', path: '/', fragment: 'demos' },
            { label: 'Cart', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Portfolio',
          links: [
            { label: 'List Title Inside', path: '/', fragment: 'demos' },
            { label: 'List Title Outside', path: '/', fragment: 'demos' },
            { label: 'List Title Hover', path: '/', fragment: 'demos' },
            { label: 'Portfolio Details', path: '/', fragment: 'demos' },
            { label: 'Case Study', path: '/', fragment: 'demos' },
          ],
        },
        {
          label: 'Blog',
          links: [
            { label: 'Blog list', path: '/', fragment: 'demos' },
            { label: 'Article', path: '/', fragment: 'demos' },
          ],
        },
      ],
    },
    {
      label: 'Components',
      kind: 'mega',
      promo: {
        title: 'Detailed and organised components',
        image: 'https://prium.github.io/Posh/v2.1.0/assets/images/megamenu.jpg',
        ctaLabel: 'Start Creating',
        ctaPath: '/',
        ctaFragment: 'features',
      },
      /** One flat list — CSS columns decide where it wraps. */
      links: [
        'Accordion',
        'Alerts',
        'Backgrounds',
        'Badge',
        'Border & Radius',
        'Buttons',
        'Cards',
        'Carousel',
        'Colors',
        'Dropdown & Dropup',
        'Filter',
        'Form elements',
        'Form processor',
        'Grid system',
        'Layout helpers',
        'Icons',
        'Lightbox',
        'Maps',
        'Masonry grid',
        'Modal video',
        'Modals',
        'Navigations',
        'Navigation in page',
        'Parallax',
        'Scrollspy',
        'Swiper',
        'Spacing',
        'Tables',
        'Tabs',
        'Tooltips',
        'Typed Text',
        'Typography',
      ].map((label) => ({ label, path: '/', fragment: 'features' })),
    },
    {
      label: 'Docs',
      kind: 'simple',
      links: [
        'Getting Started',
        'File Structure',
        'Customization',
        'Gulp',
        'RTL',
        'Plugins',
        'Changelog',
      ].map((label) => ({ label, path: '/about' })),
    },
  ];

  private readonly showcases: Showcase[] = [
    { id: 1, title: 'Landing NOKIA', inspiration: 'Nokia 5', category: 'Demos', image: `${SCREENSHOTS}/home-landing-nokia.jpg`, ratio: 5.841 },
    { id: 2, title: 'Digital Agency', inspiration: 'Technext, Green Chameleon', category: 'Demos', image: `${SCREENSHOTS}/home-digital-agency.jpg`, ratio: 3.019 },
    { id: 3, title: 'Travel Agency', inspiration: 'ireland.com', category: 'Demos', image: `${SCREENSHOTS}/home-travel-agency.jpg`, ratio: 2.717 },
    { id: 4, title: 'Conference', inspiration: 'Chain React', category: 'Demos', image: `${SCREENSHOTS}/home-conference.jpg`, ratio: 5.361 },
    { id: 5, title: 'Education', inspiration: 'American University, Stanford', category: 'Demos', image: `${SCREENSHOTS}/home-education.jpg`, ratio: 3.251 },
    { id: 6, title: 'Hospital', inspiration: 'Northwestern Medicine', category: 'Demos', image: `${SCREENSHOTS}/home-hospital.jpg`, ratio: 3.053 },
    { id: 7, title: 'Hotel', inspiration: 'The Peninsula, Trump Hotels', category: 'Demos', image: `${SCREENSHOTS}/home-hotel.jpg`, ratio: 3.212 },
    { id: 8, title: 'Landing Software', inspiration: 'Skype, Dropbox', category: 'Demos', image: `${SCREENSHOTS}/home-landing-software-b5.png`, ratio: 3.099 },
    { id: 9, title: 'Personal', category: 'Demos', image: `${SCREENSHOTS}/home-personal.jpg`, ratio: 1.858 },
    { id: 10, title: 'Restaurant', inspiration: 'The Smoke Haus, Yung Kee', category: 'Demos', image: `${SCREENSHOTS}/home-restaurant.jpg`, ratio: 4.187 },
    { id: 11, title: 'Shop', inspiration: 'Aliexpress, Sammy Dress', category: 'Demos', image: `${SCREENSHOTS}/home-shop.jpg`, ratio: 2.764 },

    { id: 12, title: 'About Company', category: 'Pages', image: `${SCREENSHOTS}/page-about-company.jpg`, ratio: 2.892 },
    { id: 13, title: 'About Team', category: 'Pages', image: `${SCREENSHOTS}/page-about-team.jpg`, ratio: 2.288 },
    { id: 14, title: 'Careers', category: 'Pages', image: `${SCREENSHOTS}/page-careers.jpg`, ratio: 2.38 },
    { id: 15, title: 'Contact 1', category: 'Pages', image: `${SCREENSHOTS}/page-contact-1.jpg`, ratio: 1.171 },
    { id: 16, title: 'Contact 2', category: 'Pages', image: `${SCREENSHOTS}/page-contact-2.jpg`, ratio: 1.236 },
    { id: 17, title: 'Contact 3', category: 'Pages', image: `${SCREENSHOTS}/page-contact-3.jpg`, ratio: 0.883 },
    { id: 18, title: 'Pricing 1', category: 'Pages', image: `${SCREENSHOTS}/page-pricing-1.jpg`, ratio: 1.761 },
    { id: 19, title: 'Pricing 2', category: 'Pages', image: `${SCREENSHOTS}/page-pricing-2.jpg`, ratio: 2.567 },
    { id: 20, title: 'Services 1', category: 'Pages', image: `${SCREENSHOTS}/page-services-1.jpg`, ratio: 1.746 },
    { id: 21, title: 'Services 2', category: 'Pages', image: `${SCREENSHOTS}/page-services-2.jpg`, ratio: 1.721 },
    { id: 22, title: 'Services 3', category: 'Pages', image: `${SCREENSHOTS}/page-services-3.jpg`, ratio: 1.673 },
    { id: 23, title: 'Log in (Simple)', category: 'Pages', image: `${SCREENSHOTS}/page-log-in.jpg`, ratio: 0.642 },
    { id: 24, title: 'Log in (With Social)', category: 'Pages', image: `${SCREENSHOTS}/page-log-in-social.jpg`, ratio: 0.642 },
    { id: 25, title: 'Profile', category: 'Pages', image: `${SCREENSHOTS}/page-profile.jpg`, ratio: 1.41 },
    { id: 26, title: 'Settings', category: 'Pages', image: `${SCREENSHOTS}/page-settings.jpg`, ratio: 0.796 },
    { id: 27, title: 'Account Recovery', category: 'Pages', image: `${SCREENSHOTS}/page-recovery.jpg`, ratio: 0.642 },
    { id: 28, title: 'Maintenance', category: 'Pages', image: `${SCREENSHOTS}/page-maintenance.jpg`, ratio: 0.642 },

    { id: 29, title: 'Products List', category: 'Shop', image: `${SCREENSHOTS}/shop-products-list.jpg`, ratio: 1.946 },
    { id: 30, title: 'Products Grid', category: 'Shop', image: `${SCREENSHOTS}/shop-products-grid.jpg`, ratio: 2.017 },
    { id: 31, title: 'Product Details', category: 'Shop', image: `${SCREENSHOTS}/shop-product-details.jpg`, ratio: 2.206 },
    { id: 32, title: 'Cart', category: 'Shop', image: `${SCREENSHOTS}/shop-cart.jpg`, ratio: 1.591 },

    { id: 33, title: 'List Title Inside', category: 'Portfolio', image: `${SCREENSHOTS}/portfolio-1.jpg`, ratio: 1.247 },
    { id: 34, title: 'List Title Outside', category: 'Portfolio', image: `${SCREENSHOTS}/portfolio-2.jpg`, ratio: 1.538 },
    { id: 35, title: 'List Title Hover', category: 'Portfolio', image: `${SCREENSHOTS}/portfolio-3.jpg`, ratio: 1.287 },
    { id: 36, title: 'Portfolio Details', category: 'Portfolio', image: `${SCREENSHOTS}/portfolio-details.jpg`, ratio: 1.269 },
    { id: 37, title: 'Case Study', category: 'Portfolio', image: `${SCREENSHOTS}/portfolio-case-study.jpg`, ratio: 3.668 },

    { id: 38, title: 'Blog List', category: 'Blog', image: `${SCREENSHOTS}/blog-list.jpg`, ratio: 2.646 },
    { id: 39, title: 'Article', category: 'Blog', image: `${SCREENSHOTS}/blog-article.jpg`, ratio: 2.773 },
  ];

  private readonly features: Feature[] = [
    { id: 1, text: 'Optimized for every screen size down to a single pixel.' },
    { id: 2, text: 'The most modular layout system on the planet.' },
    { id: 3, text: 'More powerful than most HTML5 templates.' },
    { id: 4, text: 'Bootstrap 5 takes POSH to a whole new level.' },
  ];

  getNavItems(): NavItem[] {
    return this.navItems;
  }

  getShowcases(): Showcase[] {
    return this.showcases;
  }

  getCategories(): ShowcaseCategory[] {
    return ['Demos', 'Pages', 'Shop', 'Portfolio', 'Blog'];
  }

  getFeatures(): Feature[] {
    return this.features;
  }
}
