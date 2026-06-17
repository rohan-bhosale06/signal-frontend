export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 px-4 py-16 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
