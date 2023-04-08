import {
  BaseFilter,
  BaseFilterParams,
  DduItem,
} from "https://deno.land/x/ddu_vim@v2.7.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v2.7.0/deps.ts";

type Params = BaseFilterParams;

export class Filter extends BaseFilter<Params> {
  // deno-lint-ignore require-await
  override async filter(args: {
    denops: Denops;
    filterParams: Params;
    input: string;
    items: DduItem[];
  }): Promise<DduItem[]> {
    return args.items;
  }

  override params() {
    return {};
  }
}
