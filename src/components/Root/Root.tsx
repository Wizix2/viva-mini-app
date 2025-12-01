'use client';

import { type PropsWithChildren } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';

import './styles.css';

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      {props.children}
    </ErrorBoundary>
  ) : (
    <div className="root__loading flex items-center justify-center min-h-screen bg-dark-300">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-primary-400">Загрузка...</p>
      </div>
    </div>
  );
}
