import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesLoading() {
  return (
    <div className="pt-18">
      <div className="mx-auto max-w-4xl px-5 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-44" />
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border">
              <Skeleton className="aspect-[4/3] rounded-none" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="mt-3 h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
