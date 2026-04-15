type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const inFlightRequests = new Map<string, Promise<unknown>>();
const responseCache = new Map<string, CacheEntry<unknown>>();

/**
 * Deduplica llamadas concurrentes con la misma llave.
 */
export function singleFlight<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const existing = inFlightRequests.get(key) as Promise<T> | undefined;
  if (existing) {
    return existing;
  }

  const promise = factory().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise as Promise<unknown>);
  return promise;
}

/**
 * Deduplica llamadas concurrentes y cachea el resultado por un TTL corto.
 */
export function singleFlightWithTtl<T>(
  key: string,
  factory: () => Promise<T>,
  ttlMs: number
): Promise<T> {
  const cached = responseCache.get(key) as CacheEntry<T> | undefined;
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return Promise.resolve(cached.value);
  }

  return singleFlight<T>(key, async () => {
    const value = await factory();
    responseCache.set(key, { value, expiresAt: now + ttlMs });
    return value;
  });
}

export function clearSingleFlightCache(keyPrefix?: string) {
  if (!keyPrefix) {
    responseCache.clear();
    return;
  }

  for (const key of responseCache.keys()) {
    if (key.startsWith(keyPrefix)) {
      responseCache.delete(key);
    }
  }
}
