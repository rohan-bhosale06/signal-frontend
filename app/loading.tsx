import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    </main>
  );
}
