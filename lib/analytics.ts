/**
 * Analytics-ready event tracking.
 * Events are stored locally and pushed to a GTM/GA4 dataLayer when present.
 * To wire Plausible/PostHog, extend the body of track().
 */

const EVENTS_KEY = "ormania.events.v1";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) ?? "[]") as unknown[];
    events.push({ event, ...data, at: new Date().toISOString() });
    // keep the local log bounded
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-500)));
  } catch {
    /* storage unavailable */
  }
  window.dataLayer?.push({ event, ...data });
}
