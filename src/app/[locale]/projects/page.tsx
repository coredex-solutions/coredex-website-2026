import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import ProjectsContent from "@/components/pages/ProjectsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "projects", path: `/${locale}/projects` });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              { name: dict.nav.projects, path: "/projects" },
            ])
          ),
        }}
      />
      <ProjectsContent locale={locale as Locale} dict={dict} />
    </>
  );
}
