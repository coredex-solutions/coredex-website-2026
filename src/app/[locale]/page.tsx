import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import StatsSection from "@/components/home/StatsSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "home", path: `/${locale}` });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbsJsonLd(locale as Locale, [{ name: dict.nav.home, path: "" }])
          ),
        }}
      />
      <Hero locale={locale as Locale} dict={dict} />
      <ServicesPreview locale={locale as Locale} dict={dict} />
      <StatsSection locale={locale as Locale} dict={dict} />
      <FeaturedProjects locale={locale as Locale} dict={dict} />
      <WhyUs locale={locale as Locale} dict={dict} />
      <Testimonials locale={locale as Locale} dict={dict} />
      <CtaBanner locale={locale as Locale} dict={dict} />
    </>
  );
}
