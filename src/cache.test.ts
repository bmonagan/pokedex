import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test("returns undefined for missing key", () => {
  const cache = new Cache(500);

  const cached = cache.get("https://example.com/missing");
  expect(cached).toBe(undefined);

  cache.stopReapLoop();
});

test("overwrites value for duplicate key", () => {
  const cache = new Cache(500);
  const key = "https://example.com";

  cache.add(key, "first");
  cache.add(key, "second");

  const cached = cache.get<string>(key);
  expect(cached).toBe("second");

  cache.stopReapLoop();
});

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});