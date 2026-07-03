import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import ServicesContent from "@/components/pages/ServicesContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "services", path: `/${locale}/services` });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
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
              { name: dict.nav.services, path: "/services" },
            ])
          ),
        }}
      />
      <ServicesContent locale={locale as Locale} dict={dict} />
    </>
  );
}
