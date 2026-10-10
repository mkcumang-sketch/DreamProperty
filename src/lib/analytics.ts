type GtagFn = (...args: unknown[]) => void;

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: GtagFn }).gtag) {
    (window as unknown as { gtag: GtagFn }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${category} -> ${action}${label ? ` (${label})` : ''}`);
  }
}
