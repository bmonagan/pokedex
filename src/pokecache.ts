export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval:number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

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

  #reap() {
    for (const [key, object] of this.#cache) {
      if (object.createdAt <= Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }
  #startReapLoop() {
    const intervalId = setInterval(() => this.#reap(), this.#interval);
    this.#reapIntervalId = intervalId;
  }
}
