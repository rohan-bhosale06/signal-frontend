import { scoreToColorClass } from '@/lib/utils';

export function SignalScoreBadge({ score }: { score: number | null }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${scoreToColorClass(score)}`}
    >
      {score === null ? 'Unscored' : score}
    </span>
  );
}
