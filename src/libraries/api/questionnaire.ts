export type QuestionAnswerChoiceType = {
  id: number;
  text: string;
};
export type QuestionsResponseType = {
  id: number;
  text: string;
  choices: QuestionAnswerChoiceType[];
};

export const fetchQuestions = (): QuestionsResponseType[] => {
  return [
    {
      id: 1,
      text: "I have previously put money in a risky investment.",
      choices: [
        {
          id: 1,
          text: "Strongly Agree",
        },
        {
          id: 2,
          text: "Agree",
        },
        {
          id: 3,
          text: "Neither Agree nor Disagree",
        },
        {
          id: 4,
          text: "Disagree",
        },
        {
          id: 5,
          text: "Strongly Disagree",
        },
      ],
    },
    {
      id: 2,
      text: "I prefer my money to be safe from risk.",
      choices: [
        {
          id: 6,
          text: "Strongly Agree",
        },
        {
          id: 7,
          text: "Agree",
        },
        {
          id: 8,
          text: "Neither Agree nor Disagree",
        },
        {
          id: 9,
          text: "Disagree",
        },
        {
          id: 10,
          text: "Strongly Disagree",
        },
      ],
    },
    {
      id: 3,
      text: "Your friends would say that you are cautious.",
      choices: [
        {
          id: 11,
          text: "Strongly Agree",
        },
        {
          id: 12,
          text: "Agree",
        },
        {
          id: 13,
          text: "Neither Agree nor Disagree",
        },
        {
          id: 14,
          text: "Disagree",
        },
        {
          id: 15,
          text: "Strongly Disagree",
        },
      ],
    },
  ];
};

export type SaveQuestionnaireAnswersRequest = {
  questionID: number;
  answerID: number;
};

export const saveQuestionnaireAnswers = async (
  body: SaveQuestionnaireAnswersRequest[]
) => {
  const answerWeight = body.reduce(
    (sum, answer) => sum + (answer.answerID % 6),
    0
  );
  for (let i = riskLevels.length - 1; i > 0; i--) {
    const riskLevel = riskLevels[i];
    if (answerWeight >= riskLevel.weight) return riskLevel;
  }
  return riskLevels[0];
};
type RiskLevelCategoryType = "LOW" | "MEDIUM" | "HIGH";
export type RiskLevelType = {
  id: number;
  category: RiskLevelCategoryType;
  text: string;
  description: string;
  weight: number;
};

const riskLevels: RiskLevelType[] = [
  {
    id: 1,
    category: "LOW",
    text: "Low",
    description:
      "A conservative set of investments designed to result in slow growth over time",
    weight: 0,
  },
  {
    id: 2,
    category: "MEDIUM",
    text: "Medium",
    description:
      "A mix of investments designed to result in average growth over time",
    weight: 5,
  },
  {
    id: 3,
    category: "HIGH",
    text: "High",
    description: "Stocks only. No bonds or cash",
    weight: 10,
  },
];
