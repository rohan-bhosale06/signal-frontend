export function Skeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-100 p-4">
      <div className="flex items-center gap-2">
        <div className="h-5 w-12 rounded-full bg-gray-200" />
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        <div className="ml-auto h-4 w-16 rounded bg-gray-200" />
      </div>
      <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-full rounded bg-gray-200" />
      <div className="mt-1 h-4 w-5/6 rounded bg-gray-200" />
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-14 rounded-full bg-gray-200" />
        <div className="h-5 w-14 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
