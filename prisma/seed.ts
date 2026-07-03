import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.project.deleteMany();
  await prisma.testimonial.deleteMany();

  // Create Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        titleEn: "Bloom E-Commerce Platform",
        titleAr: "منصة بلوم للتجارة الإلكترونية",
        slug: "bloom-ecommerce",
        descriptionEn: "A full-featured e-commerce platform built for high scale.",
        descriptionAr: "منصة تجارة إلكترونية متكاملة الميزات مبنية للتوسع الكبير.",
        category: "webDev",
        imageUrl: "/projects/bloom.jpg",
        client: "Bloom Inc.",
        featured: true,
      },
    }),
    prisma.project.create({
      data: {
        titleEn: "TechVentures Social Campaign",
        titleAr: "حملة تك فينتشرز الرقمية",
        slug: "techventures-campaign",
        descriptionEn: "A comprehensive social media strategy that doubled engagement.",
        descriptionAr: "استراتيجية شاملة لوسائل التواصل الاجتماعي ضاعفت التفاعل.",
        category: "socialMedia",
        imageUrl: "/projects/techventures.jpg",
        client: "TechVentures",
        featured: true,
      },
    }),
  ]);

  console.log(`Created ${projects.length} projects`);

  // Create Testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        nameEn: "Ahmad Khoury",
        nameAr: "أحمد الخوري",
        roleEn: "CEO, TechVentures",
        roleAr: "المدير التنفيذي، تك فينتشرز",
        textEn: "Coredex Solutions transformed our entire digital presence. Their web development team delivered a platform that exceeded all expectations.",
        textAr: "كورديكس سوليوشنز حوّلت وجودنا الرقمي بالكامل. فريق تطوير المواقع قدّم منصة فاقت كل التوقعات.",
      },
    }),
    prisma.testimonial.create({
      data: {
        nameEn: "Sarah Haddad",
        nameAr: "سارة حدّاد",
        roleEn: "Marketing Director, Bloom",
        roleAr: "مديرة التسويق، بلوم",
        textEn: "Their social media strategy doubled our engagement in just three months. The team truly understands the regional market.",
        textAr: "استراتيجيتهم على وسائل التواصل ضاعفت تفاعلنا في ثلاثة أشهر فقط. الفريق يفهم السوق الإقليمي بعمق.",
      },
    }),
  ]);

  console.log(`Created ${testimonials.length} testimonials`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
