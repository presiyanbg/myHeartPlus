
import { HealthTestAnswerType, HealthTestAnswersType, HealthTestQuestionType, HealthTestQuestionsType } from "../../../ts/types";
import { arrayOrderByProp, copyObject } from "../../../utils/utils"

const HealthTestViewLogic = () => {

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

  const removeAnswer = (answers: HealthTestAnswersType, question: HealthTestQuestionType): HealthTestAnswersType | any => {
    if (!answers?.length) return [];
    if (!question) return answers;

    return answers.filter(oldAnswer => {

      return oldAnswer.question_id != question.id;
    });
  }

  const getNextQuestion = (questions: HealthTestQuestionsType, next_question_order_number: number): HealthTestQuestionType | any => {
    if (!questions?.length) return {};

    if (!next_question_order_number) {
      return questions[0];
    }

    return questions.find((question: HealthTestQuestionType) => {
      return question.order_number == next_question_order_number
    });
  }

  const getPrevQuestion = (questions: HealthTestQuestionsType, answers: HealthTestAnswersType): HealthTestQuestionType | any => {
    if (!questions?.length) return {};

    if (!answers?.length) return questions[0];

    const lastAnswer = arrayOrderByProp(copyObject(answers), 'prev_question_order_number', true);

    return questions.find((question: HealthTestQuestionType) => question.id == lastAnswer[0].question_id)
  }

  const calculateResult = (answers: HealthTestAnswersType) => {
    if (!answers?.length) return 0;

    let result = 0;

    answers.forEach((answer: HealthTestAnswerType) => {
      result += answer.points;
    });

    return result;
  }

  /**
   * Add final answer to question 
   * 
   * @param answers HealthTestAnswersType -- Answers by user  
   * @param questions HealthTestQuestionsType -- Questions 
   * @returns questions HealthTestQuestionsType
   */
  const getFinalQuestionsAndAnswers = (answers: HealthTestAnswersType, questions: HealthTestQuestionsType): HealthTestQuestionsType | [] => {
    if (!answers?.length || !questions?.length) return [];

    const finalQuestionsAndAnswers: HealthTestQuestionsType | any = answers.map((answer: HealthTestAnswerType) => {
      const findQuestion = questions.find((question: HealthTestQuestionType) => answer.question_id === question.id);

      if (findQuestion) {
        findQuestion.final_answer = answer;
      }

      return findQuestion;
    });

    return finalQuestionsAndAnswers || [];
  }

  return {
    saveAnswer,
    removeAnswer,
    getNextQuestion,
    getPrevQuestion,
    calculateResult,
    getFinalQuestionsAndAnswers,
  }

}

export default HealthTestViewLogic;