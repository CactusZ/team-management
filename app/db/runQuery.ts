import { TaggedQuery } from "@pgtyped/runtime";
import { getDbClient } from "./client.js";

/**
 * A bottleneck for running pg-typed queries.
 * A good place to potentially add db-specific logging, metrics or custom error handling
 */
export async function runQuery<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TaggedQuery<{ params: any; result: any }>,
>(
  query: T,
  params?: T extends TaggedQuery<infer Z>
    ? Z["params"]
    : { params: unknown; result: unknown },
): Promise<Array<T extends TaggedQuery<infer Z> ? Z["result"] : unknown>> {
  try {
    const client = await getDbClient();
    const result = await query.run(params, client);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
