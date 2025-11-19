
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  schema?: object | null;
}

const SITE_NAME = 'Praia: AI Prompt Suite';
const DEFAULT_DESCRIPTION = 'Master AI with Praia. The all-in-one suite featuring Vibe Coding for rapid development, a curated prompt hub, and AI-powered enhancement tools for Gemini & ChatGPT.';
const DEFAULT_IMAGE = 'https://i.imgur.com/gU8m4Lq.png';

export const useSEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = window.location.href,
  type = 'website',
  schema = null
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title === 'Home' ? `${SITE_NAME} & Vibe Coding` : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', ['AI', 'Prompt Engineering', 'Vibe Coding', 'Gemini', 'LLM', 'PRO-SPEC', ...keywords].join(', '));

    setProperty('og:title', fullTitle);
    setProperty('og:description', description);
    setProperty('og:type', type);
    setProperty('og:url', url);
    setProperty('og:image', image);
    setProperty('og:site_name', SITE_NAME);

    setProperty('twitter:card', 'summary_large_image');
    setProperty('twitter:title', fullTitle);
    setProperty('twitter:description', description);
    setProperty('twitter:image', image);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    let script = document.querySelector('#json-ld-schema') as HTMLScriptElement;
    if (schema) {
        if (!script) {
            script = document.createElement('script');
            script.id = 'json-ld-schema';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);
    } else if (script) {
        script.textContent = ''; // Clear rather than remove to keep ID stable for other pages if needed
    }

  }, [title, description, keywords, image, url, type, schema]);
};
