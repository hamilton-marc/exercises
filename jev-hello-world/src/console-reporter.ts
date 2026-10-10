import type {
  ChoiceResponse,
  NoulResponse,
  Questions,
  ScoreResponse,
  SystemOneRequest,
} from "@typesafe-ai/sdk";
import type { JevEvaluation } from "./jev-client.ts";

export class ConsoleReporter {
  private readonly yesThreshold = 0.5;

  printExample(example: SystemOneRequest): void {
    console.log("Hello world from Jev!\n");
    console.log(
      "This example sends a rainy afternoon plan to Jev through OpenRouter. " +
        "Jev will choose an activity (Choice), rate outdoor comfort (Score), " +
        "and estimate whether an umbrella would be useful (Noul).",
    );
    console.log("The console will show the raw API response, decisions, and probabilities.\n");

    console.log("State:", example.state);
    console.log("Questions:\n", JSON.stringify(example.questions, null, 2));
  }

  printEvaluation(evaluation: JevEvaluation<Questions>): void {
    const { status, rawBody, result } = evaluation;

    console.log(`\nRaw API response (HTTP ${status}):\n${rawBody}`);

    for (const [name, answer] of Object.entries(result.answers)) {
      console.log(`\n${name} (${answer.type}):`);

      switch (answer.type) {
        case "choice":
          this.printChoice(answer);
          break;

        case "score":
          this.printScore(answer);
          break;

        case "noul":
          this.printNoul(answer);
          break;
      }
    }
  }

  private printChoice(answer: ChoiceResponse): void {
    console.log("Decision:", answer.choice);
    console.log("Confidence:", answer.confidence);
    console.log("Probability distribution:");
    console.table(answer.probabilities);
  }

  private printScore(answer: ScoreResponse): void {
    console.log("Score:", answer.score);
    console.log("Confidence:", answer.confidence);
    console.log("Levels:", answer.legend);
    console.log("Probability distribution:");
    console.table(answer.probabilities);
  }

  private printNoul(answer: NoulResponse): void {
    // This threshold is our application rule; Jev returns a probability, not a boolean.
    const decision = answer.noul >= this.yesThreshold ? "yes" : "no";

    console.log("Probability of yes:", answer.noul);
    console.log(`Decision at a ${this.yesThreshold} threshold:`, decision);
    console.log("Probability distribution (no is derived as 1 − yes):");
    console.table({ yes: answer.noul, no: 1 - answer.noul });
  }
}
