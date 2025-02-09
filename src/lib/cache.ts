import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(
  cb: T, // call back function
  keyParts: string[],
  option: { revalidate?: number | false; tags?: string[] }
) {
  return nextCache(reactCache(cb), keyParts, option);
}
