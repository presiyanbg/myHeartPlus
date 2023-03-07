import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HealthTestAnswerType, HealthTestAnswersType, HealthTestQuestionType, HealthTestQuestionsType } from "../../../ts/types";
import { calculatePercentage, copyObject } from "../../../utils/utils";
import { ProgressBar } from "react-bootstrap";

import HealthTestViewLogic from "./healthTestViewLogic"
import HealthTestsLogic from "../healthTestsLogic";

type Props = {
  testID: number | string,
  testQA: HealthTestQuestionsType,
  submitTest: (result: number, questions_and_answers: any[]) => void
}

const HealthTestView = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<HealthTestQuestionsType | any>({});
  const [answers, setAnswers] = useState<HealthTestAnswersType | any>([]);
  const [finalQA, setFinalQA] = useState<any[]>([]);
  const [displayPreview, setDisplayPreview] = useState<boolean>(false);

  const { t } = useTranslation();
  const logic = HealthTestsLogic();
  const viewLogic = HealthTestViewLogic();

  const submitAnswer = (answer: HealthTestAnswerType) => {
    if (currentQuestion.is_final_question) {
      setAnswers((prev: HealthTestAnswersType) => {
        const finalAnswers = viewLogic.saveAnswer(answers, answer)

        setAnswers((prev: HealthTestAnswersType) => finalAnswers);
        setFinalQA(() => viewLogic.getFinalQuestionsAndAnswers(finalAnswers, props.testQA));
        setDisplayPreview(true);

        return finalAnswers;
      });


      return;
    }

    if (answer?.next_question_order_number) {
      setAnswers((prev: HealthTestAnswersType) => viewLogic.saveAnswer(prev, answer));
      setCurrentQuestion(viewLogic.getNextQuestion(props.testQA, answer.next_question_order_number));
      return;
    }
  }

  const displayPreviousQuestion = () => {
    // Display final question 
    if (displayPreview) {
      setDisplayPreview(false);

      return;
    }

    // Display regular questions 
    setAnswers((prev: HealthTestAnswersType) => {
      const newAnswers = viewLogic.removeAnswer(prev, currentQuestion);
      setCurrentQuestion(viewLogic.getPrevQuestion(props.testQA, newAnswers));

      return newAnswers;
    });
  }

  const saveTestResult = () => {
    if (!props?.submitTest || !finalQA?.length) return;

    const result = viewLogic.calculateResult(answers);

    props.submitTest(result, finalQA);
  }

  // Load initial question
  useEffect(() => {
    if (props?.testQA) {
      setCurrentQuestion(viewLogic.getNextQuestion(props.testQA, 0));
    }
  }, [props.testQA]);

  // Return 404 error
  if (!currentQuestion?.answers?.length) {
    return (<>404</>)
  }

  return (
    <div className="row col-12 p-5 health-test--view">
      {/* Questions and answers */}
      {
        !displayPreview && (
          <>
            {/* Title and description */}
            <div className="row col-12 question--wrapper">
              <div className="col-12 mb-2">
                <h5>{currentQuestion?.title}</h5>
              </div>

              <div className="col-12">
                <p>{currentQuestion.description}</p>
              </div>
            </div>

            {/* Answers buttons */}
            <div className="row answers--wrapper">
              {
                currentQuestion?.answers?.map((answer: HealthTestAnswerType) => {
                  return (
                    <div className="btn btn-answer"
                      onClick={() => submitAnswer(answer)}
                      key={uuid()}>
                      {answer.content}
                    </div>
                  )
                })
              }
            </div>

            {/* Questions progress bar */}
            <div className="row mb-5">
              <div className="col-12">
                <ProgressBar now={calculatePercentage(props.testQA.length, currentQuestion.order_number - 1)}
                  label={`${calculatePercentage(props.testQA.length, currentQuestion.order_number - 1)}%`} />
              </div>
            </div>
          </>
        )
      }

      {/* Preview */}
      {
        displayPreview && (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <h5>{t('Answers preview')}</h5>
              </div>
            </div>

            <div className="row mb-5">
              <ul className="list-group">
                {
                  !!finalQA?.length && finalQA.map((question: HealthTestQuestionType) => {
                    return (
                      <li className="list-group-item d-flex px-3" key={uuid()}>
                        <div className="col-6">
                          {question.title}
                        </div>
                        <div className="col-6 text-end">
                          {question.final_answer?.content}
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            {/* Submit test final answers */}
            <div className="row mb-5 justify-content-center">
              <button className="col-4 btn btn-success text-white" onClick={() => saveTestResult()}>
                {t('Calculate result')}
              </button>
            </div>
          </>
        )
      }


      {/* Pagination */}
      <div className="custom-pagination row">
        {/* Check to display previous button  */}
        {
          !!(currentQuestion?.id > 1) && (
            <div className="pagination--left col-4 m-0"
              onClick={() => displayPreviousQuestion()}>
              <span>
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>

              <span className="ms-2">
                {t('Previous question')}
              </span>
            </div>
          )
        }
        {
          !(currentQuestion?.id > 1) && (<div className="col-4"></div>)
        }

        <div className="col-8"></div>
      </div>
    </div>
  )
}

export default HealthTestView;