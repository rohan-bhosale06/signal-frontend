'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const AVAILABLE_TAGS = [
  'nextjs',
  'go',
  'rust',
  'typescript',
  'kubernetes',
  'postgres',
  'redis',
  'llm',
  'react',
  'python',
  'elixir',
  'wasm',
  'zig',
  'c++',
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function OnboardingPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [minScore, setMinScore] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      const token = await getToken();
      await fetch(`${API_BASE}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tagNames: Array.from(selectedTags),
          minSignalScore: minScore,
        }),
      });
      router.push('/');
    } catch (err) {
      console.error('Failed to save preferences:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome to Signal-to-Noise
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Pick the technologies you care about. We&apos;ll filter the noise for
          you.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Your stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {AVAILABLE_TAGS.map((tag) => {
            const isSelected = selectedTags.has(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 text-teal-700 dark:border-teal-600 dark:bg-teal-950 dark:text-teal-300'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Minimum signal score
        </h2>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          Higher = fewer, more in-depth articles. Lower = wider coverage.
        </p>
        <div className="mt-4 inline-flex rounded-xl border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
          {[0, 50, 80].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setMinScore(score)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                minScore === score
                  ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-zinc-950'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              {score === 0 ? 'All' : score === 50 ? 'Mid+ (50+)' : 'High (80+)'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-xl bg-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:opacity-50 dark:bg-teal-500 dark:text-zinc-950 dark:shadow-none dark:hover:bg-teal-400"
        >
          {isSubmitting ? 'Saving…' : 'Start reading'}
        </button>
        <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
          You can change these later in your profile.
        </p>
      </div>
    </main>
  );
}
