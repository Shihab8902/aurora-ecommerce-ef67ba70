const EDGE_FUNCTION_URL = import.meta.env.VITE_EDGE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export interface SiteConfig {
  template_id: string;
  brand: {
    name: string;
    logo: string;
    logoWhite: string;
    favicon?: string;
  };
  theme: {
    colors: Record<string, string>;
    borderRadius: string;
    shadows: Record<string, string>;
  };
  layout: Record<string, string>;
  features: Record<string, number>;
}

export interface ConfigResponse {
  config: SiteConfig;
  subscription: {
    valid: boolean;
    message: string;
  };
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
    return fetchWithRetry(url, retries - 1);
  }
}

export const configService = {
  async getConfig(templateId: string, websiteId?: string): Promise<ConfigResponse> {
    const url = new URL(`${EDGE_FUNCTION_URL}/template-validator`);
    url.searchParams.set('template_id', templateId);
    if (websiteId) {
      url.searchParams.set('website_id', websiteId);
    }

    const response = await fetchWithRetry(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`);
    }

    return response.json();
  },

  async updateConfig(
    templateId: string,
    websiteId: string,
    config: SiteConfig,
    token: string
  ): Promise<{ success: boolean; config: SiteConfig }> {
    const url = new URL(`${EDGE_FUNCTION_URL}/template-validator`);
    url.searchParams.set('template_id', templateId);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ config, website_id: websiteId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update config');
    }

    return response.json();
  },
};
