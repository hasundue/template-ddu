import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { stub } from "https://deno.land/std@0.182.0/testing/mock.ts";
import { test } from "https://deno.land/x/denops_test@v1.1.0/mod.ts";
import type { Denops } from "https://deno.land/x/ddu_vim@v2.7.0/deps.ts";
import { Source } from "../denops/@ddu-sources/template.ts";

function denopsStub(denops: Denops) {
  stub(denops, "call", async (name: string, ...args: unknown[]) => {
    if (name === "list") {
      return ["ddu", "template"];
    }
    return await denops.call(name, ...args);
  });
}

test("any", "ensure the connection with denops", (denops) => {
  assertEquals(denops.name, "@denops-test");
});

test("any", "gather", async (denops) => {
  denopsStub(denops);
  const source = new Source();
  const stream = source.gather({
    denops,
    sourceParams: source.params(),
  });
  assertEquals(
    await readAll(stream),
    [{ word: "ddu" }, { word: "template" }],
  );
});

async function readAll<T>(stream: ReadableStream<T[]>): Promise<T[]> {
  const items: T[] = [];
  for await (const chunk of stream) {
    items.push(...chunk);
  }
  return items;
}
