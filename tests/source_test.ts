import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.190.0/testing/bdd.ts";
import { collect } from "https://deno.land/x/streamtools@v0.5.0/collect.ts";
import { Source } from "../denops/@ddu-sources/template.ts";
import { DenopsStub } from "https://deno.land/x/denops_test@v1.4.0/mod.ts";

describe("Source", () => {
  const denops = new DenopsStub({
    call: async (name: string, ...args: unknown[]) => {
      if (name === "list") {
        return ["ddu", "template"];
      }
      return await denops.call(name, ...args);
    },
  });

  const source = new Source();

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
