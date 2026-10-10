# Hello World with Jev and OpenRouter

A small TypeScript console application exploring TypeSafe Jev 1.13 through OpenRouter. One request asks three independent questions about a rainy afternoon:

| Primitive | Example | Output |
| --- | --- | --- |
| Choice | Pick an afternoon activity | Selected label, probabilities for all options, and confidence |
| Score | Rate outdoor comfort | Position on an ordered scale, probabilities for each level, legend, and confidence |
| Noul | Would an umbrella be useful? | Probability of yes, from 0 to 1 |

Jev returns structured decisions rather than generated prose. The application prints the state, questions, original API response body, and each decision with its distribution.

## Setup and execution

Use **Node.js 22.18 or newer** and npm. Node runs this TypeScript directly; no build step or separate runner is needed.

Run the following commands from this project folder (`jev-hello-world`):

```bash
npm ci
cp .env.example .env
```

Edit `.env` locally and enter your OpenRouter API key:

```dotenv
OPENROUTER_API_KEY=your_key_here
```

Alternatively, use an existing `OPENROUTER_API_KEY` environment variable. Shell variables take precedence over `.env`; the file is optional when the variable is already set. The application never prints the key, and `.env` is ignored by Git.

```bash
npm run check
npm start
```

Run these commands from the project folder so `.env` is found. Each run sends one real, billed request to OpenRouter. You need an OpenRouter key with access and sufficient credits; no separate TypeSafe key is required. Requests time out after 30 seconds, with automatic retries disabled. Missing configuration or request failures result in a nonzero exit code.

## Project structure

```text
src/
  main.ts              Load configuration, connect the components, handle errors
  afternoon-plan.ts    Editable state and questions
  jev-client.ts        JevClient: call OpenRouter and preserve the raw response
  console-reporter.ts  ConsoleReporter: display decisions and distributions
```

`main.ts` creates a `JevClient` and a `ConsoleReporter`. It prints the example, asks the client to evaluate it, and passes the evaluation to the reporter. The client handles API communication; the reporter handles console output and the illustrative Noul threshold.

The example stays a plain data object because it needs no behavior of its own. The client's generic `evaluate` method preserves the SDK's inferred answer types, including Choice labels. The reporter handles each primitive by its `type`, so adding or removing questions in the example automatically changes the output.

## How the integration works

The only runtime dependency is the official `@typesafe-ai/sdk` (0.6.0). TypeScript and Node type declarations are development dependencies. Node's built-in `loadEnvFile` loads `.env`.

The `JevClient` class configures the SDK in `src/jev-client.ts`:

```typescript
const client = new TypeSafeClient({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api",
});
```

`client.systemOne({ model: "typesafe/jev-1.13", state, questions })` sends an authenticated POST to **`https://openrouter.ai/api/v1/systemone`**. The SDK adds the `/v1/systemone` path and the Bearer authorization header. This is OpenRouter's TypeSafe-compatible endpoint. Its separate Decisions API uses `/api/alpha/decisions`; this example uses the SDK's System One API.

The response contains `model`, `answers`, and `usage`, along with OpenRouter metadata such as request ID, provider, and cost. The returned model ID can identify a dated snapshot of Jev 1.13. The code clones the HTTP response before SDK parsing to print its original body without making a second request.

## Reading the results

- **Choice:** `activity.choice` is the selected option. `activity.probabilities` shows how probability is distributed across the three choices.
- **Score:** levels are indexed from zero. This example has three levels, so `outdoor_comfort.score` lies between 0 and 2 and may be fractional. It is the probability-weighted mean of the level indices, rather than an integer rating.
- **Noul:** `bring_umbrella.noul` is the probability of yes. The API does not return a separate no probability; the application displays `1 - noul` for no. It also applies an illustrative `>= 0.5` rule to produce a yes/no decision. That threshold is chosen by our code.

Choice and Score confidence summarize how concentrated their probability distributions are. They are not guarantees of correctness, and Noul has no separate confidence field. The actual numbers depend on the model response; none are hard-coded.

A live verification run returned HTTP 200 with these results:

```text
Choice: indoor_reading
Probabilities: park_walk=0, indoor_reading=1, outdoor_picnic=0
Score: 0 (on the 0–2 outdoor comfort scale)
Probabilities: level 0=1, level 1=0, level 2=0
Noul: 0.94 probability of yes; application decision: yes
```

Both Choice and Score reported confidence 1. The API reported a cost of $0.000020748 for that request. These are observed example results, not assertions about future responses or pricing.

## Experiment

Edit the `state` and `questions` in [src/afternoon-plan.ts](src/afternoon-plan.ts), then run `npm start` again:

1. Change the weather to dry and sunny, and express a preference for walking.
2. Add an activity to the Choice criteria.
3. Change the Score level descriptions or add a fourth level.
4. Change the Noul question, or change `yesThreshold` in `src/console-reporter.ts`.

All questions see the same state and are evaluated independently. One answer does not become context for another question. Keep each question focused on one judgment and describe Score levels in words.

## Documentation

Verified against the official documentation on October 10, 2026:

- [OpenRouter: TypeSafe SDK integration](https://openrouter.ai/docs/guides/community/typesafe-sdk) — base URL, authentication, model IDs, endpoint, and response format.
- [OpenRouter: Jev 1.13](https://openrouter.ai/typesafe/jev-1.13) — model listing and current pricing.
- [TypeSafe: JavaScript SDK](https://docs.typesafe.ai/sdk/javascript) — official package and usage.
- [TypeSafe: primitives](https://docs.typesafe.ai/primitives) — Choice, Score, and Noul semantics.
- [TypeSafe: Score](https://docs.typesafe.ai/primitives/score) — levels and probability-weighted scoring.

This remains an exploratory console exercise with four small source modules and no additional dependencies.
