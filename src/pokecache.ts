export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();

  constructor() {}

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }
  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return undefined;
    return entry.val;

    }
  }
