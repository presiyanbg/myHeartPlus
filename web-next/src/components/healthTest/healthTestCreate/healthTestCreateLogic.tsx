
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { arrayOrderByProp, arraySimpleSort, arraySimpleUnique, generateColor } from '../../../utils/utils';
import CommonServices from '../../../services/commonServices/commonServices';

const HealthTestCreateLogic = () => {
  const [results, setResults] = useState<any>([]);

  const commonServices = CommonServices();

  // # START: Questions and answers 
  const addNewQuestion = (questionsAndAnswers: any) => {
    if (!questionsAndAnswers) {
      questionsAndAnswers = [];
    }

    // Remove final question flag from all questions
    // New question is final
    questionsAndAnswers = questionsAndAnswers.map((question: any) => {
      question.is_final_question = false;

      return question;
    });

    // Add new question
    return questionsAndAnswers.concat([
      getNewQuestion(questionsAndAnswers.length + 1)
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
      title: '',
      description: '',
      is_final_question: true,
      answers: [
        getNewAnswer(orderNumber, 10),
        getNewAnswer(orderNumber, 25),
        getNewAnswer(orderNumber, 50)
      ],
    }
  }

  const getNewAnswer = (orderNumber: number, points: number = 0) => {
    const prevQuestionOrderNumber = orderNumber > 1 ? orderNumber - 1 : orderNumber;

    return {
      uuid: uuid(),
      question_id: orderNumber,
      next_question_order_number: orderNumber + 1,
      prev_question_order_number: prevQuestionOrderNumber,
      points: points,
      content: '',
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
    if (!selectedQuestion) return allQuestions;
    if (allQuestions.length <= 1) return allQuestions;

    allQuestions = allQuestions.filter((question: any) => {
      return question?.uuid != selectedQuestion?.uuid;
    });

    allQuestions = fixQuestionsAndAnswersOrder(allQuestions);

    return allQuestions;
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

  const fixQuestionsAndAnswersOrder = (allQuestions: any) => {
    if (!allQuestions?.length) return [];

    allQuestions = arrayOrderByProp(allQuestions, 'order_number');

    return allQuestions.map((question: any, index: number) => {
      question.order_number = index + 1;

      if (question?.answers?.length) {
        const prevQuestionOrderNumber = question.order_number > 1 ? question.order_number - 1 : question.order_number;

        // Reset answer questions ids
        question.answers = question.answers.map((answer: any) => {
          answer.question_id = question.order_number;
          answer.next_question_order_number = question.order_number + 1;
          answer.prev_question_order_number = prevQuestionOrderNumber;

          return answer;
        });
      }

      return question;
    });
  }
  // # END: Questions and answers 


  // # START: Results 
  const calculateResults = (questionsAndAnswers: any) => {
    if (!questionsAndAnswers || !questionsAndAnswers[0]) return;

    // Reset results when new data is passed 
    setResults([]);

    // Calculate result options starting with first answers
    questionsAndAnswers[0]?.answers.forEach((answer: any) => {
      calculateResultsGroup(answer, questionsAndAnswers);
    });
  }

  const calculateResultsGroup = (answer: any, questionsAndAnswers: any, currentPoints: number = 0) => {
    if (!answer || !questionsAndAnswers) return;

    currentPoints = currentPoints + answer.points;

    questionsAndAnswers.forEach((question: any, index: number) => {
      // Check if wrong question
      if (question.order_number != answer.next_question_order_number) return;

      // If final question => add total points to results array
      if (question.is_final_question || (index + 1) == questionsAndAnswers.length) {
        let results: number[] = [];

        // Calculate result points 
        question?.answers.forEach((qAnswer: any) => {
          if (qAnswer.uuid == answer.uuid) return;

          results.push(currentPoints + qAnswer?.points);
        });

        setResults((prev: number[]) => {
          return arraySimpleUnique(prev.concat(results), true);
        });

        return;
      }

      // Calculate with next questions and answers  
      if (question.order_number == answer.next_question_order_number) {

        question?.answers.forEach((qAnswer: any) => {
          if (qAnswer.uuid == answer.uuid) return;

          // Loop function until final question 
          calculateResultsGroup(qAnswer, questionsAndAnswers, currentPoints);
        });

        return;
      }
    });
  }
  // # END: Results 


  // # START: Advices
  const addNewAdvice = (advices: any[], minPoints: number = 0, maxPoints: number = 100) => {
    if (!advices) {
      advices = [];
    }

    // Add new advice
    return advices.concat([
      getNewAdvice(minPoints, maxPoints)
    ]);
  }

  const getNewAdvice = (minPoints: number = 0, maxPoints: number = 100) => {
    return {
      uuid: uuid(),

      title: '',
      content: '',

      medicament_id: '',
      prescription_id: '',

      min_points: minPoints,
      max_points: maxPoints >= minPoints ? maxPoints : minPoints,

      color: generateColor(),
    }
  }

  const changeAdviceField = (selectedAdvice: any, allAdvices: any[], fieldKey: string, value: any) => {
    if (!allAdvices) return [];
    if (!selectedAdvice || !fieldKey) return allAdvices;

    return allAdvices.map((advice: any) => {
      if (advice.uuid === selectedAdvice.uuid) {
        advice[fieldKey] = value;
      }

      return advice;
    });
  }

  const removeAdvice = (selectedAdvice: any, allAdvices: any[]) => {
    if (!allAdvices) return [];
    if (!selectedAdvice) return allAdvices;
    if (allAdvices.length <= 1) return allAdvices;

    return allAdvices.filter((advice: any) => {
      return advice?.uuid != selectedAdvice?.uuid;
    });
  }
  // # END: Advices 

  // # START: Common
  const loadCategory = async (categoryID: number | string) => {
    const data = await commonServices.healthCategoryShow(categoryID);

    return data;
  }
  // # END: Common

  return {
    results,

    addNewQuestion,
    addNewAnswer,
    changeQuestionField,
    changeAnswerField,
    getQuestionByUUID,
    removeQuestion,
    removeAnswer,

    calculateResults,

    addNewAdvice,
    changeAdviceField,
    removeAdvice,

    loadCategory,
  }
}

export default HealthTestCreateLogic;