import {
  BaseSource,
  BaseSourceParams,
  Item,
} from "https://deno.land/x/ddu_vim@v2.7.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v2.7.0/deps.ts";

type Params = BaseSourceParams;

export class Source extends BaseSource<Params> {
  override kind = "file";

  override gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item[]> {
    return new ReadableStream({
      async start(controller) {
        const words = await args.denops.call("list") as string[];
        const items = words.map((word) => ({ word }));
        controller.enqueue(items);
        controller.close();
      },
    });
  }

  override params(): Params {
    return {};
  }
}
