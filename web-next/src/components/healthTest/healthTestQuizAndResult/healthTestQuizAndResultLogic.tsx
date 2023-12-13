
'use client';
import HealthTestsServices from "@/services/healthTestsServices/healthTestsServices";
import HealthTestsClientServices from "@/services/healthTestsServices/healthTestsClientServices";
import { HealthTestAnswerType, HealthTestAnswersType, HealthTestQuestionType, HealthTestQuestionsType, HealthTestSubmitParamsType } from "../../../ts/types";
import { arrayOrderByProp, copyObject } from "../../../utils/utils"
import { useContext } from "react";
import { UserContext } from "@/context/userContext/userContextProvider";


const HealthTestQuizAndResultLogic = () => {
    const healthTestsServices = HealthTestsServices();
    const healthTestsClientServices = HealthTestsClientServices();
    const { user } = useContext(UserContext);

    /**
     * Save answer
     * 
     * Used when viewing next question.
     * 
     * @param answers HealthTestAnswersType
     * @param answer HealthTestAnswerType
     * @returns HealthTestAnswersType
     */
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

    /**
     * Remove answer 
     * 
     * Used when viewing previous question.
     * 
     * @param answers HealthTestAnswersType
     * @param question HealthTestQuestionType
     * @returns HealthTestAnswersType
     */
    const removeAnswer = (answers: HealthTestAnswersType, question: HealthTestQuestionType): HealthTestAnswersType | any => {
        if (!answers?.length) return [];
        if (!question) return answers;

        return answers.filter(oldAnswer => {

            return oldAnswer.question_id != question.id;
        });
    }

    /**
     * Get next question 
     * 
     * @param questions HealthTestQuestionsType
     * @param next_question_order_number number
     * @returns HealthTestQuestionType
     */
    const getNextQuestion = (questions: HealthTestQuestionsType, next_question_order_number: number): HealthTestQuestionType | any => {
        if (!questions?.length) return {};

        if (!next_question_order_number) {
            return questions[0];
        }

        return questions.find((question: HealthTestQuestionType) => {
            return question.order_number == next_question_order_number
        });
    }

    /**
     * Get previous question
     * 
     * @param questions HealthTestQuestionsType
     * @param answers HealthTestAnswersType
     * @returns HealthTestQuestionType
     */
    const getPrevQuestion = (questions: HealthTestQuestionsType, answers: HealthTestAnswersType): HealthTestQuestionType | any => {
        if (!questions?.length) return {};

        if (!answers?.length) return questions[0];

        const lastAnswer = arrayOrderByProp(copyObject(answers), 'prev_question_order_number', true);

        return questions.find((question: HealthTestQuestionType) => question.id == lastAnswer[0].question_id)
    }

    /**
     * Calculate test result from answer points
     * 
     * @param answers HealthTestAnswersType
     * @returns number
     */
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

    /**
     * Load health test
     * 
     * @param test_id ID of test
     * @returns API response
     */
    const loadHealthTest = async (test_id: number | string) => {
        const data = await healthTestsServices.healthTestShow(test_id);

        return data;
    }

    /**'
     * Load health tests
     * 
     * @returns API paginated response
     */
    const loadHealthTestList = async () => {
        const data = await healthTestsServices.healthTestsList();

        return data;
    }

    const loadHealthTestResult = async (result_id: number | string) => {
        const data = await healthTestsServices.healthTestResultShow(result_id);

        return data;
    }

    /**
     * Save test result and get advice
     * 
     * @param test_id number - ID of test
     * @param result number - result calculated from answers points
     * @param questions_and_answers HealthTestQuestionsType
     * @returns API response 
     */
    const saveHealthTestResult = async (test_id: number | string, result: number, questions_and_answers: HealthTestQuestionsType) => {
        let params: HealthTestSubmitParamsType = {
            user_id: undefined,
            test_id,
            result,
            questions_and_answers: JSON.stringify(questions_and_answers),
        }

        // Save test result to user profile 
        if (user && user?.id > 0) {
            params.user_id = user.id;
        }

        const data = await healthTestsClientServices.healthTestSubmitResult(params);

        return data;
    }

    return {
        saveAnswer,
        removeAnswer,
        getNextQuestion,
        getPrevQuestion,
        calculateResult,
        getFinalQuestionsAndAnswers,
        loadHealthTest,
        loadHealthTestList,
        saveHealthTestResult,
        loadHealthTestResult,
    }
}

export default HealthTestQuizAndResultLogic;