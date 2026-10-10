'use client';

import { useI18n } from './provider';

export function useT() {
  const { t, locale, toggleLocale, setLocale } = useI18n();
  return { t, locale, toggleLocale, setLocale };
}
