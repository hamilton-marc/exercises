import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { APIError } from "@typesafe-ai/sdk";
import { afternoonPlan } from "./afternoon-plan.ts";
import { ConsoleReporter } from "./console-reporter.ts";
import { JevClient } from "./jev-client.ts";

async function main(): Promise<void> {
  // Node loads .env without replacing variables already provided by your shell.
  if (existsSync(".env")) {
    loadEnvFile(".env");
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey?.trim()) {
    throw new Error("Set OPENROUTER_API_KEY in .env or your shell before running npm start.");
  }

  const client = new JevClient(apiKey);
  const reporter = new ConsoleReporter();

  reporter.printExample(afternoonPlan);

  const evaluation = await client.evaluate(afternoonPlan);

  reporter.printEvaluation(evaluation);
}

main().catch((error: unknown) => {
  if (error instanceof APIError) {
    // Report status without dumping SDK error objects or request headers.
    console.error(`OpenRouter request failed (HTTP ${error.status}).`);
    console.error("Check your key and credits for 401/402, or try again later for 429/5xx.");
  } else {
    console.error(error instanceof Error ? error.message : "An unexpected error occurred.");
  }

  process.exitCode = 1;
});
