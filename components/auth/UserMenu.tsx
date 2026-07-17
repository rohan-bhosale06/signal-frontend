'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export function UserMenu() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Show a placeholder while Clerk loads to prevent layout shift
    return <div className="h-8 w-8" />;
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="rounded-xl bg-teal-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 dark:bg-teal-500 dark:text-zinc-950 dark:shadow-none dark:hover:bg-teal-400"
      >
        Sign in
      </Link>
    );
  }

  return <UserButton afterSignOutUrl="/" />;
}
