'use client';
import HealthTestQuizAndResultLogic from "./healthTestQuizAndResultLogic";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HealthTestAnswerType, HealthTestAnswersType, HealthTestQuestionType, HealthTestQuestionsType } from "../../../ts/types";
import { calculatePercentage } from "../../../utils/utils";
import { Button, Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

type Props = {
    testID: number | string,
    testQA: HealthTestQuestionsType,
    submitTest: (result: number, questions_and_answers: any[]) => void
}

const HealthTestQuiz = (props: Props) => {
    const [currentQuestion, setCurrentQuestion] = useState<HealthTestQuestionsType | any>({});
    const [answers, setAnswers] = useState<HealthTestAnswersType | any>([]);
    const [finalQA, setFinalQA] = useState<any[]>([]);
    const [displayPreview, setDisplayPreview] = useState<boolean>(false);

    const t = useTranslations();
    const logic = HealthTestQuizAndResultLogic();

    /**
     * Submit answer
     * 
     * @param answer HealthTestAnswerType
     */
    const submitAnswer = (answer: HealthTestAnswerType) => {
        // Save final answer and display all answers
        if (currentQuestion.is_final_question) {
            setAnswers((prev: HealthTestAnswersType) => {
                const finalAnswers = logic.saveAnswer(answers, answer)

                setAnswers((prev: HealthTestAnswersType) => finalAnswers);
                setFinalQA(() => logic.getFinalQuestionsAndAnswers(finalAnswers, props.testQA));
                setDisplayPreview(true);

                return finalAnswers;
            });

            return;
        }

        // Save answer
        if (answer?.next_question_order_number) {
            setAnswers((prev: HealthTestAnswersType) => logic.saveAnswer(prev, answer));
            setCurrentQuestion(logic.getNextQuestion(props.testQA, answer.next_question_order_number));
            return;
        }
    }

    /**
     * Display previous question
     */
    const displayPreviousQuestion = () => {
        // Display final question 
        if (displayPreview) {
            setDisplayPreview(false);

            return;
        }

        // Display regular questions 
        setAnswers((prev: HealthTestAnswersType) => {
            const newAnswers = logic.removeAnswer(prev, currentQuestion);
            setCurrentQuestion(logic.getPrevQuestion(props.testQA, newAnswers));

            return newAnswers;
        });
    }

    /**
     * Submit test result
     */
    const submitTestResult = () => {
        if (!props?.submitTest || !finalQA?.length) return;

        const result = logic.calculateResult(answers);

        props.submitTest(result, finalQA);
    }

    // Load initial question
    useEffect(() => {
        if (!props?.testQA) return;

        setCurrentQuestion(logic.getNextQuestion(props.testQA, 0));
    }, [props.testQA]);

    // Return 404 error
    if (!currentQuestion?.answers?.length) return (<></>);

    return (
        <div className="row col-12 p-5 health-test--view">
            {/* Questions and answers */}
            {
                !displayPreview && (
                    <>
                        {/* Title */}
                        <div className="w-full pb-2 text-center">
                            <h3>{currentQuestion?.title}</h3>
                        </div>

                        {/* Description */}
                        <div className="w-full pb-3 text-center">
                            <p>{currentQuestion.description}</p>
                        </div>

                        {/* Answers buttons */}
                        <div className="flex gap-4 justify-center pt-2 pb-3">
                            {
                                currentQuestion?.answers?.map((answer: HealthTestAnswerType) => {
                                    return (
                                        <Button color="primary"
                                            variant="bordered"
                                            onClick={() => submitAnswer(answer)}
                                            key={uuid()}>
                                            {answer.content}
                                        </Button>
                                    )
                                })
                            }
                        </div>

                        {/* Questions progress bar */}
                        <div className="py-5">
                            <Progress value={calculatePercentage(props.testQA.length, currentQuestion.order_number - 1)}
                                aria-label={`${calculatePercentage(props.testQA.length, currentQuestion.order_number - 1)}%`} />
                        </div>
                    </>
                )
            }

            {/* Preview */}
            {
                displayPreview && (
                    <>
                        <div className="py-3 text-center">
                            <h3>{t('Answers preview')}</h3>
                        </div>

                        <div className="py-2">
                            <Table removeWrapper aria-labelledby="Table with final answers">
                                <TableHeader>
                                    <TableColumn>{t('Question')}</TableColumn>
                                    <TableColumn>{t('Answer')}</TableColumn>
                                </TableHeader>

                                <TableBody items={finalQA}>
                                    {(item) => (
                                        <TableRow key={uuid()}>
                                            <TableCell>{item?.title}</TableCell>
                                            <TableCell>{item?.final_answer?.content}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Submit test final answers */}
                        <div className="flex w-full justify-center">
                            <Button color="primary"
                                variant="shadow"
                                onClick={() => submitTestResult()}>
                                {t('Calculate result')}
                            </Button>
                        </div>
                    </>
                )
            }

            {/* Pagination */}
            <div className="flex w-full pt-3">
                {/* Check to display previous button  */}
                {
                    !!(currentQuestion?.id > 1) && (
                        <Button color="primary" variant="light"
                            startContent={<FontAwesomeIcon icon={faArrowLeft} />}
                            onClick={() => displayPreviousQuestion()}>
                            {t('Previous question')}
                        </Button>

                    )
                }
            </div>
        </div>
    )
}

export default HealthTestQuiz;