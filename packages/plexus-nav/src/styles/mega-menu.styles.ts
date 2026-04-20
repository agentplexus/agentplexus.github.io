/**
 * PlexusOne Mega Menu Styles
 */

import { css } from 'lit';
import { sharedStyles } from './shared.styles.js';

export const megaMenuStyles = [
  ...sharedStyles,
  css`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .mega-menu {
      display: none;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    :host([open]) .mega-menu {
      display: block;
    }

    @media (max-width: 768px) {
      .mega-menu {
        display: none !important;
      }
    }

    .mega-menu-backdrop {
      position: fixed;
      inset: 64px 0 0 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    .mega-menu-panel {
      position: relative;
      background: var(--plexus-dark-98);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
      box-shadow: var(--shadow-mega);
    }

    .mega-menu-content {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem;
    }

    .mega-menu-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    /* Category */
    .category {
      min-width: 0;
    }

    .category-header {
      margin-bottom: 1rem;
    }

    .category-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .category-title a {
      color: inherit;
      text-decoration: none;
      transition: color 0.15s;
    }

    .category-title a:hover {
      color: var(--plexus-cyan);
    }

    .category-desc {
      font-size: 11px;
      color: var(--text-subtle);
      margin: 0;
    }

    /* Products list */
    .products-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .product-item {
      margin-bottom: 0.75rem;
    }

    .product-link {
      display: block;
      text-decoration: none;
      transition: color 0.15s;
    }

    .product-name {
      font-size: 14px;
      font-weight: 500;
      color: #e5e7eb;
      transition: color 0.15s;
    }

    .product-link:hover .product-name {
      color: var(--plexus-cyan);
    }

    .product-tagline {
      font-size: 11px;
      color: var(--text-subtle);
      margin-top: 2px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* View more link */
    .view-more {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      font-size: 11px;
      color: var(--plexus-cyan);
      text-decoration: none;
      transition: color 0.15s;
    }

    .view-more:hover {
      color: var(--plexus-cyan-light);
    }

    .view-more .icon-chevron-small {
      transform: rotate(-90deg);
    }

    /* Footer */
    .mega-menu-footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-links {
      display: flex;
      gap: 1.5rem;
    }

    .footer-link {
      font-size: 14px;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
    }

    .footer-link:hover {
      color: var(--text-primary);
    }

    .footer-divider {
      color: var(--text-dim);
      margin: 0 0.25rem;
    }

    .footer-link-legal {
      font-size: 12px;
    }

    .mega-menu-stats {
      font-size: 12px;
      color: var(--text-dim);
    }
  `,
];
