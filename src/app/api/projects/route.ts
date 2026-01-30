import { getPortfolio } from '@/lib/contentful/api';
import { NextResponse } from 'next/server';
import { ProjectData } from '@/types/contentful';

export async function GET() {
  try {
    const portfolio = await getPortfolio();

    const projects: ProjectData[] =
      portfolio?.projectsCollection?.items
        .filter((project) => project?.slug)
        .map((project) => ({
          sys: { id: project!.sys!.id },
          title: project!.title ?? undefined,
          slug: project!.slug!,
          subtitle: project!.subtitle ?? undefined,
          shortDescription: project!.shortDescription ?? undefined,
          mainImage: project!.mainImage?.url
            ? {
                url: project!.mainImage.url,
                width: project!.mainImage.width ?? undefined,
                height: project!.mainImage.height ?? undefined,
              }
            : undefined,
          role: project!.role ?? undefined,
          duration: project!.duration ?? undefined,
          year: project!.year ?? undefined,
          tools: project!.tools?.filter((tool): tool is string => tool !== null) ?? undefined,
          isPasswordProtected: project!.isPasswordProtected ?? undefined,
        })) || [];

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json([], { status: 500 });
  }
}
