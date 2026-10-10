import { TypeSafeClient } from "@typesafe-ai/sdk";
import type { Questions, SystemOneRequest, SystemOneResult } from "@typesafe-ai/sdk";

export interface JevEvaluation<Q extends Questions> {
  status: number;
  rawBody: string;
  result: SystemOneResult<Q>;
}

export class JevClient {
  private readonly client: TypeSafeClient;

  constructor(apiKey: string) {
    this.client = new TypeSafeClient({
      apiKey,
      baseURL: "https://openrouter.ai/api",
      timeout: 30_000,
      retry: { maxRetries: 0 },
      logLevel: "off",
    });
  }

  async evaluate<Q extends Questions>(example: SystemOneRequest<Q>): Promise<JevEvaluation<Q>> {
    const request = this.client.systemOne({
      ...example,
      model: "typesafe/jev-1.13",
    });

    // Clone before SDK parsing to preserve the original body without a second API call.
    const response = await request.asResponse();
    const rawBody = await response.clone().text();
    const result = await request;

    return { status: response.status, rawBody, result };
  }
}
