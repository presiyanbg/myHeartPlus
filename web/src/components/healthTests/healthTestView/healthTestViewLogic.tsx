
import { arrayOrderByProp } from "../../../utils/utils"

const healthTestViewLogic = () => {

  const saveAnswer = (allAnswers: any[], answer: any) => {
    if (!allAnswers?.length) return [answer];

    let checkOldAnswer = false;

    // Update answer for question 
    allAnswers = allAnswers.map(oldAnswer => {
      if (oldAnswer.question_id == answer.question_id) {
        oldAnswer = answer;
        checkOldAnswer = true;
      }
      return oldAnswer;
    });

    // Push new answer for question 
    if (!checkOldAnswer) {
      allAnswers.push(answer)
    }

    console.log(allAnswers)


    return allAnswers;
  }

  const removeAnswer = (allAnswers: any[], question: any) => {
    if (!allAnswers?.length) return [];

    if (!question) return allAnswers;

    return allAnswers.filter(oldAnswer => {
      return oldAnswer.question_id != question.id;
    });
  }

  const getNextQuestion = (questions: any, next_question_id: number) => {
    if (!questions?.length) return {};

    if (!next_question_id) {
      return questions[0];
    }

    return questions.find((question: any) => {
      return question.id == next_question_id
    });
  }

  const getPrevQuestion = (questions: any, answers: any) => {
    console.log(questions)
    console.log(answers)

    if (!questions?.length) return {};

    if (!answers?.length) return questions[0];

    const lastAnswer = arrayOrderByProp(answers, 'prev_question_id', true);

    console.log(lastAnswer)

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