import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.190.0/testing/bdd.ts";
import { collect } from "https://deno.land/x/streamtools@v0.5.0/collect.ts";
import { Source } from "../denops/@ddu-sources/template.ts";
import { DenopsStub } from "https://raw.githubusercontent.com/vim-denops/deno-denops-test/7c6500cc94c861ad1a2e13fbc8fa018081499bc9/denops_test/mod.ts";

describe("Source", () => {
  const denops = new DenopsStub({
    call: async (name: string, ...args: unknown[]) => {
      if (name === "list") {
        return ["ddu", "template"];
      }
      return await denops.call(name, ...args);
    },
  });

  let source = new Source();

  beforeEach(() => {
    source = new Source();
  });

  describe("gather", () => {
    const stream = source.gather({
      denops,
      sourceParams: source.params(),
    });

    it("should list all words", async () => {
      assertEquals(
        await collect(stream),
        [[{ word: "ddu" }, { word: "template" }]],
      );
    });
  });
});
