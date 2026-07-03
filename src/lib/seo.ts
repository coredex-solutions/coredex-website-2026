import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { getDictionary } from "./i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://coredexsolutions.com";
const SITE_NAME = "Coredex Solutions";

interface BuildMetadataOpts {
  locale: Locale;
  page: keyof ReturnType<typeof getDictionary>["meta"];
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({ locale, page, path = "", image, noIndex = false }: BuildMetadataOpts): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta[page];
  const fullTitle = `${meta.title} | ${SITE_NAME}`;
  const desc = meta.description;
  const pagePath = path || `/${locale}`;
  const url = `${SITE_URL}${pagePath}`;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path.replace(`/${locale}`, "")}`,
        ar: `${SITE_URL}/ar${path.replace(`/${locale}`, "")}`,
        "x-default": `${SITE_URL}/en${path.replace(`/${locale}`, "")}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_LB" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_LB"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" as const } },
  };
}

export function organizationJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: dict.meta.home.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "ar"],
  };
}

export function breadcrumbsJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}

export { SITE_URL, SITE_NAME };
