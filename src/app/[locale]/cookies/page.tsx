import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "cookies", path: `/${locale}/cookies` });
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 max-w-4xl mx-auto px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbsJsonLd(locale as Locale, [
              { name: dict.nav.home, path: "" },
              { name: dict.meta.cookies.title, path: "/cookies" },
            ])
          ),
        }}
      />
      
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
          {dict.meta.cookies.title}
        </h1>
        <p className="text-text-muted">
          Last updated: July 2026
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-a:text-primary hover:prose-a:text-primary-dark">
        <p className="lead text-xl text-text-muted mb-8">
          {dict.meta.cookies.description}
        </p>

        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies to improve your browsing experience by remembering your preferences, such as your language choice (English or Arabic). We may also use essential cookies to authenticate users and prevent fraudulent use of user accounts.
        </p>

        <h2>3. Your Choices Regarding Cookies</h2>
        <p>
          If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
        </p>

        <div className="mt-12 p-6 glass-card rounded-xl">
          <p className="m-0 text-sm">
            If you have questions about our use of cookies, contact us at {dict.contact.info.email}.
          </p>
        </div>
      </div>
    </div>
  );
}
