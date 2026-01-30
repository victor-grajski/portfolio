export function HeroSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="w-full lg:w-2/3">
        <div className="space-y-4 my-16 min-h-[12rem]">
          <div className="h-8 bg-[#454545] rounded animate-pulse w-full"></div>
          <div className="h-8 bg-[#454545] rounded animate-pulse w-5/6"></div>
          <div className="h-8 bg-[#454545] rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    </section>
  );
}
