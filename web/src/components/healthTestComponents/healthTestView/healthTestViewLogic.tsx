
import { HealthTestAnswerType, HealthTestAnswersType, HealthTestQAType, HealthTestQuestionType, HealthTestQuestionsType } from "../../../ts/types";
import { arrayOrderByProp } from "../../../utils/utils"

const healthTestViewLogic = () => {

  const saveAnswer = (answers: HealthTestAnswersType, answer: HealthTestAnswerType): HealthTestAnswersType | any => {
    if (!answers?.length) return [answer];

    let checkOldAnswer = false;

    // Update answer for question 
    answers = answers.map((oldAnswer: HealthTestAnswerType) => {
      if (oldAnswer.question_id == answer.question_id) {
        oldAnswer = answer;
        checkOldAnswer = true;
      }

      return oldAnswer;
    });

    // Push new answer for question 
    if (!checkOldAnswer) {
      answers.push(answer)
    }

    return answers;
  }

  const removeAnswer = (answers: HealthTestAnswersType, question: HealthTestAnswerType): HealthTestAnswersType | any => {
    if (!answers?.length) return [];

    if (!question) return answers;

    return answers.filter(oldAnswer => {
      return oldAnswer.question_id != question.id;
    });
  }

  const getNextQuestion = (questions: HealthTestQuestionsType, next_question_id: number): HealthTestQuestionType | any => {
    if (!questions?.length) return {};

    if (!next_question_id) {
      return questions[0];
    }

    return questions.find((question: any) => {
      return question.id == next_question_id
    });
  }

  const getPrevQuestion = (questions: HealthTestQuestionsType, answers: HealthTestAnswersType): HealthTestQuestionType | any => {
    if (!questions?.length) return {};

    if (!answers?.length) return questions[0];

    const lastAnswer = arrayOrderByProp(answers, 'prev_question_id', true);

    return questions.find((question: any) => question.id == lastAnswer[0].question_id)
  }

  const calculateResult = (answers: any[]) => {

  }

  return {
    saveAnswer,
    removeAnswer,
    getNextQuestion,
    getPrevQuestion,
    calculateResult
  }

}

export default healthTestViewLogic;