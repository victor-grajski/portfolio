import { getHeadline } from '@/lib/contentful/api';
import { HeroTextLoader } from '@/components/HeroTextLoader';

export async function HeroSection() {
  // Lightweight query - just fetches the headline (fast)
  const headline = await getHeadline();

  return (
    <section className="py-16 md:py-24">
      <div className="w-full lg:w-2/3">
        <HeroTextLoader>{headline}</HeroTextLoader>
      </div>
    </section>
  );
}
