import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://warnastudio.com"

  const staticRoutes = [
    { url: `${baseUrl}/`, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/work`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/courses`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/mpt`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/login`, changeFrequency: "monthly" as const, priority: 0.5 },
  ]

  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const courses = await prisma.course.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const dynamicRoutes = [
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...courses.map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: course.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
