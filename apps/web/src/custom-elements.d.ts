/**
 * Type declarations for PlexusOne web components
 */

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'plexus-nav': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          config?: {
            baseUrl?: string;
            productsUrl?: string;
            currentProduct?: string;
          };
        },
        HTMLElement
      >;
      'plexus-mega-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          data?: unknown;
          baseUrl?: string;
        },
        HTMLElement
      >;
      'plexus-mobile-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          data?: unknown;
          baseUrl?: string;
        },
        HTMLElement
      >;
    }
  }
}
