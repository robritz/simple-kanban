import { describe, expect, it } from "vitest";
import { linkify } from "./linkify";

const links = (text: string) => linkify(text).filter((s) => s.type === "link");

describe("linkify", () => {
  it("leaves plain text alone", () => {
    expect(linkify("no links here")).toEqual([{ type: "text", text: "no links here" }]);
  });

  it("splits text around a URL", () => {
    expect(linkify("see https://example.com/a?b=1 now")).toEqual([
      { type: "text", text: "see " },
      { type: "link", text: "https://example.com/a?b=1", href: "https://example.com/a?b=1" },
      { type: "text", text: " now" },
    ]);
  });

  it("adds https:// to bare www. hosts", () => {
    expect(links("go to www.example.com")).toEqual([
      { type: "link", text: "www.example.com", href: "https://www.example.com" },
    ]);
  });

  it("finds several links", () => {
    expect(links("http://a.com and https://b.com").map((l) => l.text)).toEqual(["http://a.com", "https://b.com"]);
  });

  it("keeps sentence punctuation and wrapping brackets out of the link", () => {
    expect(links("Read https://example.com.")[0].text).toBe("https://example.com");
    expect(links("(see https://example.com)")[0].text).toBe("https://example.com");
    expect(links("https://example.com/x, then")[0].text).toBe("https://example.com/x");
  });

  it("keeps balanced brackets that are part of the URL", () => {
    expect(links("https://en.wikipedia.org/wiki/Kanban_(development)")[0].text).toBe(
      "https://en.wikipedia.org/wiki/Kanban_(development)",
    );
  });

  it("never links other schemes", () => {
    expect(links("javascript:alert(1) ftp://x.com mailto:a@b.com")).toEqual([]);
  });

  it("round-trips the original text", () => {
    const text = "a https://x.com/(y)). b www.z.org! c";
    expect(linkify(text).map((s) => s.text).join("")).toBe(text);
  });
});
