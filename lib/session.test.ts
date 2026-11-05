import { describe, expect, it } from "vitest";
import { SESSION_TTL_MS, createSessionToken, safeEqual, verifySessionToken } from "./session";

describe("session tokens", () => {
  const now = 1_700_000_000_000;

  it("accepts a token signed with the same password before it expires", async () => {
    const token = await createSessionToken("hunter2", now);
    expect(await verifySessionToken(token, "hunter2", now + 1000)).toBe(true);
  });

  it("rejects a token after the password changes", async () => {
    const token = await createSessionToken("hunter2", now);
    expect(await verifySessionToken(token, "new-password", now)).toBe(false);
  });

  it("rejects an expired token", async () => {
    const token = await createSessionToken("hunter2", now);
    expect(await verifySessionToken(token, "hunter2", now + SESSION_TTL_MS)).toBe(false);
  });

  it("rejects a token whose expiry was extended", async () => {
    const [, mac] = (await createSessionToken("hunter2", now)).split(".");
    expect(await verifySessionToken(`${now + SESSION_TTL_MS * 10}.${mac}`, "hunter2", now)).toBe(false);
  });

  it("rejects missing and malformed tokens", async () => {
    for (const token of [undefined, "", "abc", "123", "123.", "x.y", "1.2.3"]) {
      expect(await verifySessionToken(token, "hunter2", now)).toBe(false);
    }
  });
});

describe("safeEqual", () => {
  it("compares strings of any length", () => {
    expect(safeEqual("abc", "abc")).toBe(true);
    expect(safeEqual("abc", "abd")).toBe(false);
    expect(safeEqual("abc", "abcd")).toBe(false);
    expect(safeEqual("", "")).toBe(true);
  });
});
