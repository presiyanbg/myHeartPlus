
import { v4 as uuid } from 'uuid';

const HealthTestCreateLogic = () => {

  const addNewQuestion = (questionsAndAnswers: any) => {
    if (!questionsAndAnswers) {
      questionsAndAnswers = [];
    }

    return questionsAndAnswers.concat([
      getNewQuestion(questionsAndAnswers?.length + 1)
    ]);
  }

  const addNewAnswer = (selectedQuestion: any, allQuestions: any) => {
    if (!allQuestions) return [];
    if (!selectedQuestion) return allQuestions;

    // Add new answer to selected question 
    return allQuestions.map((question: any) => {
      if (question.uuid === selectedQuestion.uuid) {
        question.answers = question.answers.concat([
          getNewAnswer(question.order_number)
        ]);
      }

      return question;
    });
  }


  const getNewQuestion = (orderNumber: number) => {
    return {
      uuid: uuid(),
      order_number: orderNumber,
      title: 'Question title',
      description: 'Description',
      is_final_question: false,
      answers: [
        getNewAnswer(orderNumber),
        getNewAnswer(orderNumber),
        getNewAnswer(orderNumber)
      ],
    }
  }

  const getNewAnswer = (orderNumber: number) => {
    const prevQuestionOrderNumber = orderNumber > 1 ? orderNumber - 1 : orderNumber;

    return {
      uuid: uuid(),
      question_id: orderNumber,
      next_question_order_number: orderNumber + 1,
      prev_question_order_number: prevQuestionOrderNumber,
      points: 0,
      content: 'Answer',
    }
  }

  const changeQuestionField = (selectedQuestion: any, allQuestions: any, fieldKey: string, value: any) => {
    if (!allQuestions) return [];
    if (!selectedQuestion || !fieldKey) return allQuestions;

    return allQuestions.map((question: any) => {
      if (question.uuid === selectedQuestion.uuid) {
        question[fieldKey] = value;
      }

      return question;
    });
  }

  const changeAnswerField = (selectedQuestion: any, selectedAnswer: any, allQuestions: any, fieldKey: string, value: any) => {
    if (!allQuestions) return [];

    return allQuestions.map((question: any) => {
      if (question.uuid === selectedQuestion.uuid && question?.answers?.length) {

        question.answers = question?.answers.map((answer: any) => {
          if (answer.uuid === selectedAnswer.uuid) {
            answer[fieldKey] = value;
          }

          return answer;
        });

      }

      return question;
    });
  }

  const getQuestionByUUID = (allQuestions: any, questionUUID: string) => {
    if (!allQuestions) return 0;
    if (!questionUUID) return allQuestions[0]?.order_number;

    return allQuestions.find((question: any) => {
      return question.uuid == questionUUID;
    });
  }

  const removeQuestion = (selectedQuestion: any, allQuestions: any) => {
    if (!allQuestions) return [];
    if (allQuestions.length <= 1) return allQuestions;
    if (!selectedQuestion) return allQuestions;

    return allQuestions.filter((question: any) => {
      return question?.uuid != selectedQuestion?.uuid;
    })
  }

  const removeAnswer = (selectedQuestion: any, selectedAnswer: any, allQuestions: any) => {
    if (!allQuestions) return [];
    if (!selectedQuestion || !selectedAnswer) return allQuestions;

    // Add new answer to selected question 
    return allQuestions.map((question: any) => {
      if (question.uuid === selectedQuestion.uuid) {
        question.answers = question.answers.filter((answer: any) => answer?.uuid !== selectedAnswer?.uuid)
      }

      return question;
    });
  }

  const calculateResults = () => {

  }

  return {
    addNewQuestion,
    addNewAnswer,
    changeQuestionField,
    changeAnswerField,
    getQuestionByUUID,
    removeQuestion,
    removeAnswer,
    calculateResults,
  }
}

export default HealthTestCreateLogic;