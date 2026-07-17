import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatRelativeTime(date: string | null): string {
  if (!date) return 'unknown date';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Score-based color mapping for SignalScoreBadge.
// 80-100: high signal · 50-79: mid signal · 0-49: rarely rendered, filtered
// from the feed by default (see AI_FILTER_MIN_SCORE on the backend).
export function scoreToColorClass(score: number | null): string {
  if (score === null)
    return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
  if (score >= 80)
    return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 dark:ring-1 dark:ring-teal-800';
  if (score >= 50)
    return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:ring-1 dark:ring-amber-800';
  return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
}

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  post_mortem: 'Post-mortem',
  architecture_decision: 'Architecture',
  benchmark: 'Benchmark',
  tutorial_advanced: 'Advanced tutorial',
  tutorial_basic: 'Tutorial',
  release_announcement: 'Release',
  opinion: 'Opinion',
  research: 'Research',
  repo_highlight: 'Repo highlight',
  other: 'Other',
};
