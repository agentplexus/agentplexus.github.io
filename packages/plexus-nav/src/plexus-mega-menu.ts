/**
 * PlexusOne Mega Menu Component
 * Desktop mega menu with 4-column category grid and featured products
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { megaMenuStyles } from './styles/mega-menu.styles.js';
import { chevronSmallIcon } from './icons.js';
import { CATEGORY_ORDER, CATEGORY_PATHS, GITHUB_URL } from './constants.js';
import type { ProductsData, Product } from './types.js';

@customElement('plexus-mega-menu')
export class PlexusMegaMenu extends LitElement {
  static override styles = megaMenuStyles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object })
  data: ProductsData | null = null;

  @property({ type: String })
  baseUrl = 'https://plexusone.dev';

  private _handleBackdropClick = () => {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  };

  private _handleLinkClick = () => {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  };

  private _getProductsByCategory(category: string): Product[] {
    if (!this.data) return [];
    return this.data.products
      .filter((p) => p.category === category && p.featured && p.docsUrl)
      .slice(0, 5);
  }

  private _getCategoryCount(category: string): number {
    if (!this.data) return 0;
    return this.data.products.filter((p) => p.category === category && p.docsUrl).length;
  }

  private _getProductUrl(product: Product): string {
    const categoryPath = CATEGORY_PATHS[product.category] || '/products';
    return `${this.baseUrl}${categoryPath}/${product.slug}`;
  }

  private _getCategoryUrl(categoryKey: string): string {
    return `${this.baseUrl}${CATEGORY_PATHS[categoryKey]}`;
  }

  override render() {
    if (!this.data) return nothing;

    const totalProducts = this.data.products.length;
    const totalCategories = Object.keys(this.data.categories).length;

    return html`
      <div class="mega-menu">
        <div class="mega-menu-backdrop" @click=${this._handleBackdropClick}></div>
        <div class="mega-menu-panel">
          <div class="mega-menu-content">
            <div class="mega-menu-grid">
              ${CATEGORY_ORDER.map((categoryKey) => this._renderCategory(categoryKey))}
            </div>
            <div class="mega-menu-footer">
              <div class="footer-links">
                <a
                  href="${this.baseUrl}/#products"
                  class="footer-link"
                  @click=${this._handleLinkClick}
                >
                  All Products
                </a>
                <a
                  href="${this.baseUrl}/integrations"
                  class="footer-link"
                  @click=${this._handleLinkClick}
                >
                  Integrations
                </a>
                <a
                  href="${GITHUB_URL}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link"
                >
                  GitHub
                </a>
                <span class="footer-divider">|</span>
                <a
                  href="${this.baseUrl}/trust/privacy-policy/"
                  class="footer-link footer-link-legal"
                  @click=${this._handleLinkClick}
                >
                  Privacy
                </a>
                <a
                  href="${this.baseUrl}/trust/terms-of-service/"
                  class="footer-link footer-link-legal"
                  @click=${this._handleLinkClick}
                >
                  Terms
                </a>
              </div>
              <span class="mega-menu-stats">
                ${totalProducts} products across ${totalCategories} categories
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderCategory(categoryKey: string) {
    const category = this.data?.categories[categoryKey];
    if (!category) return nothing;

    const products = this._getProductsByCategory(categoryKey);
    const totalCount = this._getCategoryCount(categoryKey);
    const remainingCount = totalCount - products.length;
    const categoryUrl = this._getCategoryUrl(categoryKey);

    return html`
      <div class="category">
        <div class="category-header">
          <h3 class="category-title">
            <a href=${categoryUrl} @click=${this._handleLinkClick}>
              ${category.label}
            </a>
          </h3>
          <p class="category-desc">${category.description}</p>
        </div>
        <ul class="products-list">
          ${products.map(
            (product) => html`
              <li class="product-item">
                <a
                  href=${this._getProductUrl(product)}
                  class="product-link"
                  @click=${this._handleLinkClick}
                >
                  <span class="product-name">${product.name}</span>
                  <p class="product-tagline">${product.tagline}</p>
                </a>
              </li>
            `
          )}
        </ul>
        ${remainingCount > 0
          ? html`
              <a href=${categoryUrl} class="view-more" @click=${this._handleLinkClick}>
                +${remainingCount} more ${category.label.toLowerCase()}
                ${chevronSmallIcon}
              </a>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'plexus-mega-menu': PlexusMegaMenu;
  }
}
