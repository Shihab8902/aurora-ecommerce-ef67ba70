import { useEffect, createContext, useContext, useState } from 'react';
import { configService } from '../../services/configService';
import { SubscriptionBlocked } from '../SubscriptionBlocked';
import type { SiteConfig } from '../../types/index';

const ThemeContext = createContext<SiteConfig | null>(null);

export const useConfig = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useConfig must be used within ThemeProvider');
  }
  return context;
};

const DEFAULT_CONFIG: SiteConfig = {
  template_id: 'local-dev',
  brand: {
    name: 'Local Dev Store',
    logo: '/assets/logo.svg',
    logoWhite: '/assets/logo-white.svg'
  },
  theme: {
    colors: {
      primary: '#4F46E5',
      primaryHover: '#4338CA',
      secondary: '#0F172A',
      accent: '#FB7185',
      surface: '#FFFFFF',
      text: '#0F172A',
      textMuted: '#64748B'
    },
    borderRadius: '0.5rem',
    shadows: {
      luxe: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)'
    }
  },
  layout: {
    containerMaxWidth: '1280px',
    sectionGap: '100px',
    heroHeight: '60vh'
  },
  features: {
    productImageCycleInterval: 4000,
    categorySliderItems: 6
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [subscriptionValid, setSubscriptionValid] = useState(true);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bypass = import.meta.env.VITE_BYPASS_SUBSCRIPTION === 'true';

    if (bypass) {
      // Bypass Mode: Use defaults and skip validation
      setConfig(DEFAULT_CONFIG);
      setSubscriptionValid(true);
      setLoading(false);

      const root = document.documentElement;
      const { colors, borderRadius, shadows } = DEFAULT_CONFIG.theme;
      const { containerMaxWidth, sectionGap } = DEFAULT_CONFIG.layout;

      root.style.setProperty('--brand-primary', colors.primary);
      root.style.setProperty('--brand-primary-hover', colors.primaryHover);
      root.style.setProperty('--brand-secondary', colors.secondary);
      root.style.setProperty('--brand-accent', colors.accent);
      root.style.setProperty('--brand-surface', colors.surface);
      root.style.setProperty('--radius-brand', borderRadius);
      root.style.setProperty('--shadow-luxe', shadows.luxe);
      root.style.setProperty('--container-max-width', containerMaxWidth);
      root.style.setProperty('--section-gap', sectionGap);
      document.title = DEFAULT_CONFIG.brand.name;
      return;
    }

    const loadConfig = async () => {
      try {
        const templateId = import.meta.env.VITE_TEMPLATE_ID || 'ecommerce-001';
        const websiteId = import.meta.env.VITE_WEBSITE_ID || undefined;

        const response = await configService.getConfig(templateId, websiteId);

        setConfig(response.config);
        setSubscriptionValid(response.subscription.valid);
        setSubscriptionMessage(response.subscription.message);

        // Apply CSS variables
        const root = document.documentElement;
        const { colors, borderRadius, shadows } = response.config.theme;
        const { containerMaxWidth, sectionGap } = response.config.layout;

        root.style.setProperty('--brand-primary', colors.primary);
        root.style.setProperty('--brand-primary-hover', colors.primaryHover);
        root.style.setProperty('--brand-secondary', colors.secondary);
        root.style.setProperty('--brand-accent', colors.accent);
        root.style.setProperty('--brand-surface', colors.surface);
        root.style.setProperty('--radius-brand', borderRadius);
        root.style.setProperty('--shadow-luxe', shadows.luxe);
        root.style.setProperty('--container-max-width', containerMaxWidth);
        root.style.setProperty('--section-gap', sectionGap);

        // Update document title
        document.title = response.config.brand.name;

        // Update favicon
        if (response.config.brand.favicon) {
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = response.config.brand.favicon;
        }
      } catch (error) {
        setSubscriptionValid(false);
        setSubscriptionMessage('Unable to connect to configuration server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" data-jc-id="SNJCHI">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" data-jc-id="SNJBSI"/>
      </div>
    );
  }

  if (!subscriptionValid) {
    return <SubscriptionBlocked message={subscriptionMessage} data-jc-id="SNJADQ"/>;
  }

  if (!config) {
    return null;
  }

  return (
    <ThemeContext.Provider value={config} data-jc-id="SNIU1H">
      {children}
    </ThemeContext.Provider>
  );
}
