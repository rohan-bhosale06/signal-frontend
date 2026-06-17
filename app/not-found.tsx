import { EmptyState } from '@/components/layout/EmptyState';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <EmptyState message="That article couldn't be found." />
    </main>
  );
}
