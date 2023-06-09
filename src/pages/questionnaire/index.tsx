import {
  QuestionsResponseType,
  RiskLevelType,
  SaveQuestionnaireAnswersRequest,
  fetchQuestions,
  saveQuestionnaireAnswers,
} from "@app-api/questionnaire";
import { useState } from "react";
import { ComponentProps } from "src/types/component";

const questions = fetchQuestions();
const defaultAnswers: string[] = [];
for (let i = 0; i < questions.length; i++) {
  defaultAnswers.push("");
}

const EmptyQuestion = () => {
  return <div>No Question</div>;
};

const QuestionnairePage = () => {
  return (
    <div className="grid w-full h-full py-4 px-2 justify-center pt-40">
      <h1 className="text-white-300 font-bold text-3xl text-center">
        Wealth Risk Test
      </h1>
      <FormCard />
    </div>
  );
};

const FormCard = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState(defaultAnswers);
  const [isLoading, setIsLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevelType | undefined>(
    undefined
  );

  const isNextActive = answers[activeQuestionIndex] !== "";

  const onNextClick = () => {
    if (!isNextActive) return;

    setActiveQuestionIndex((prev) => prev + 1);
  };
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) =>
      prev.map((answer, index) => {
        if (index === activeQuestionIndex) return event.target.value;
        return answer;
      })
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const body: SaveQuestionnaireAnswersRequest[] = [];

    for (let i = 0; i < questions.length; i++) {
      body.push({
        questionID: questions[i].id,
        answerID: +answers[i],
      });
    }
    try {
      const response = await saveQuestionnaireAnswers(body);
      setRiskLevel(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (questions.length === 0) return <EmptyQuestion />;
  if (riskLevel)
    return (
      <div className="text-white-300 font-bold text-center">
        <div className="mt-4">
          Your risk tolerant level is <b>{riskLevel.text}</b>
        </div>
        <div className="o">{riskLevel.description}</div>
      </div>
    );

  if (isLoading) return <div>Loading ...</div>;

  const isFinalQuestion = questions.length === activeQuestionIndex + 1;
  return (
    <div className="bg-white-300 w-fit h-fit py-4 px-6 rounded-xl mt-4">
      <h2>Question {activeQuestionIndex + 1}</h2>

      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          isActive={activeQuestionIndex === index}
          handleAnswerChange={handleAnswerChange}
        />
      ))}

      <div className="w-full flex justify-end">
        <button
          className={`${
            isNextActive ? "" : "opacity-20 cursor-not-allowed"
          } bg-primary-100 text-white-100 font-bold py-2 px-4 rounded mt-4`}
          onClick={isFinalQuestion ? handleSubmit : onNextClick}
        >
          {isFinalQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

type QuestionProps = ComponentProps & {
  question: QuestionsResponseType;
  isActive: boolean;
  handleAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Question = ({
  question,
  isActive,
  handleAnswerChange,
}: QuestionProps) => {
  return (
    <div className={`${isActive ? "block" : "hidden"} w-80 mt-2`}>
      {question.text}
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
          {question.choices.map((choice) => {
            return (
              <label className="inline-flex items-center mt-3" key={choice.id}>
                <input
                  type="radio"
                  name={`question_${question.id}_answer`}
                  className="form-radio h-5 w-5 text-gray-600"
                  value={choice.id}
                  onChange={handleAnswerChange}
                />
                <span className="ml-2 text-gray-700">{choice.text}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
