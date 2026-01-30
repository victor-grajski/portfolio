export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero Skeleton */}
      <section className="py-16 md:py-24">
        <div className="w-full lg:w-2/3">
          <div className="space-y-4 my-16 min-h-[12rem]">
            <div className="h-8 bg-[#454545] rounded animate-pulse w-full"></div>
            <div className="h-8 bg-[#454545] rounded animate-pulse w-5/6"></div>
            <div className="h-8 bg-[#454545] rounded animate-pulse w-4/6"></div>
          </div>
        </div>
      </section>

      {/* Project Cards Skeleton */}
      <section className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-black rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              <div className="order-2 lg:order-1 lg:w-1/2 mt-6 lg:mt-0">
                <div className="h-8 bg-[#454545] rounded animate-pulse w-3/4 mb-3"></div>
                <div className="h-4 bg-[#454545] rounded animate-pulse w-full"></div>
              </div>
              <div className="order-1 lg:order-2 lg:w-1/2">
                <div className="w-full aspect-[4/3] bg-[#454545] rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
