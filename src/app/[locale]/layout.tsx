import { notFound } from "next/navigation";
import { locales, isValidLocale, getDirection, getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalAmbient from "@/components/ui/GlobalAmbient";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale as Locale);
  const dict = getDictionary(locale as Locale);

  return (
    <div lang={locale} dir={dir} className="min-h-screen flex flex-col relative overflow-x-hidden">
      <GlobalAmbient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(locale as Locale)),
        }}
      />
      <Navbar locale={locale as Locale} dict={dict} />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
    </div>
  );
}
