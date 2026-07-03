import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "terms", path: `/${locale}/terms` });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              { name: dict.meta.terms.title, path: "/terms" },
            ])
          ),
        }}
      />
      
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
          {dict.meta.terms.title}
        </h1>
        <p className="text-text-muted">
          Last updated: July 2026
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-a:text-primary hover:prose-a:text-primary-dark">
        <p className="lead text-xl text-text-muted mb-8">
          {dict.meta.terms.description}
        </p>

        <h2>1. Terms</h2>
        <p>
          By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on Coredex Solutions' website for personal, non-commercial transitory viewing only.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on Coredex Solutions' website are provided on an 'as is' basis. Coredex Solutions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <div className="mt-12 p-6 glass-card rounded-xl">
          <p className="m-0 text-sm">
            For further inquiries regarding our terms, please contact us at {dict.contact.info.email}.
          </p>
        </div>
      </div>
    </div>
  );
}
