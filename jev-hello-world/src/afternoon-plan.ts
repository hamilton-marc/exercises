import { choice, noul, score } from "@typesafe-ai/sdk";

// Edit the state and questions here to experiment. All questions see the same state.
export const afternoonPlan = {
  state:
    "Hello world! I want to spend the afternoon outside. " +
    "It is raining steadily, and the park paths are muddy. " +
    "I would enjoy reading a book somewhere dry.",

  questions: {
    activity: choice("Which activity best fits this person's preferences and the weather?", {
      park_walk: "Take a walk along the park paths.",
      indoor_reading: "Read a book indoors, sheltered from the rain.",
      outdoor_picnic: "Have a picnic outside in the park.",
    }),

    outdoor_comfort: score("How comfortable would spending this afternoon outside be?", [
      "Uncomfortable: steady rain or muddy conditions make staying outside unpleasant.",
      "Somewhat comfortable: minor weather inconveniences, but being outside is still pleasant.",
      "Comfortable: dry, pleasant conditions for spending time outside.",
    ]),

    bring_umbrella: noul("Would an umbrella be useful if this person goes outside this afternoon?"),
  },
};
