import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import AboutContent from "@/components/pages/AboutContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "about", path: `/${locale}/about` });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbsJsonLd(locale as Locale, [
              { name: dict.nav.home, path: "" },
              { name: dict.nav.about, path: "/about" },
            ])
          ),
        }}
      />
      <AboutContent locale={locale as Locale} dict={dict} />
    </>
  );
}
