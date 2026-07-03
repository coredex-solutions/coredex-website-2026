import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "privacy", path: `/${locale}/privacy` });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  
  // Note: For a production app, the actual legal content should be pulled from translation files.
  // We're using placeholder structure here to demonstrate the layout.

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 max-w-4xl mx-auto px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbsJsonLd(locale as Locale, [
              { name: dict.nav.home, path: "" },
              { name: dict.meta.privacy.title, path: "/privacy" },
            ])
          ),
        }}
      />
      
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
          {dict.meta.privacy.title}
        </h1>
        <p className="text-text-muted">
          Last updated: July 2026
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-a:text-primary hover:prose-a:text-primary-dark">
        <p className="lead text-xl text-text-muted mb-8">
          {dict.meta.privacy.description}
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us when you fill out a form, request a quote, or communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to respond to your requests, and to communicate with you about our services.
        </p>

        <h2>3. Data Security</h2>
        <p>
          We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
        </p>
        
        {/* Placeholder for more sections */}
        <div className="mt-12 p-6 glass-card rounded-xl">
          <p className="m-0 text-sm">
            If you have any questions about this Privacy Policy, please contact us at {dict.contact.info.email}.
          </p>
        </div>
      </div>
    </div>
  );
}
