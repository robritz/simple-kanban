export type Segment = { type: "text"; text: string } | { type: "link"; text: string; href: string };

const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"]+/gi;
const TRAILING_PUNCTUATION = /[.,;:!?'*]+$/;

/**
 * Split text into plain and link segments. Only http(s) URLs and bare `www.`
 * hosts become links (bare `www.` gets `https://`), so a Ticket can never
 * produce a `javascript:` or other unsafe href.
 */
export function linkify(text: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(URL_PATTERN)) {
    const url = trimUrl(match[0]);
    const start = match.index;
    if (start > last) segments.push({ type: "text", text: text.slice(last, start) });
    segments.push({ type: "link", text: url, href: /^www\./i.test(url) ? `https://${url}` : url });
    last = start + url.length;
  }
  if (last < text.length) segments.push({ type: "text", text: text.slice(last) });
  return segments;
}

/** Drop sentence punctuation and unbalanced closing brackets from the end of a URL. */
function trimUrl(url: string): string {
  let out = url;
  for (;;) {
    const before = out;
    out = out.replace(TRAILING_PUNCTUATION, "");
    for (const [open, close] of [["(", ")"], ["[", "]"]]) {
      if (out.endsWith(close) && count(out, close) > count(out, open)) out = out.slice(0, -1);
    }
    if (out === before) return out;
  }
}

function count(s: string, ch: string): number {
  return s.split(ch).length - 1;
}
