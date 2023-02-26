import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HealthTestAnswerType, HealthTestAnswersType, HealthTestQuestionsType } from "../../../ts/types";
import { calculatePercentage } from "../../../utils/utils";
import { ProgressBar } from "react-bootstrap";

import healthTestViewLogic from "./healthTestViewLogic"
import HealthTestsLogic from "../healthTestsLogic";

type Props = {
  testQA: HealthTestQuestionsType,
  submitTest: (data: any) => void
}

const HealthTestView = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<HealthTestQuestionsType | any>({});
  const [answers, setAnswers] = useState<HealthTestAnswersType | any>([]);

  const { t } = useTranslation();
  const logic = HealthTestsLogic();
  const viewLogic = healthTestViewLogic();

  const submitAnswer = (answer: HealthTestAnswerType) => {
    if (currentQuestion.is_final_question) {
      setAnswers((prev: HealthTestAnswersType) => viewLogic.saveAnswer(prev, answer));
      alert('ananas');

      // Display answers preview ?

      return;
    }

    if (answer?.next_question_order_number) {
      setAnswers((prev: HealthTestAnswersType) => viewLogic.saveAnswer(prev, answer));
      setCurrentQuestion(viewLogic.getNextQuestion(props.testQA, answer.next_question_order_number));
      return;
    }
  }

  const displayPreviousQuestion = () => {
    setAnswers((prev: HealthTestAnswersType) => {
      const newAnswers = viewLogic.removeAnswer(prev, currentQuestion);

      setCurrentQuestion(viewLogic.getPrevQuestion(props.testQA, newAnswers));

      return newAnswers;
    });
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

      <div className="row mb-5">
        <div className="col-12">
          <ProgressBar now={calculatePercentage(props.testQA.length, currentQuestion.order_number - 1)} />
        </div>
      </div>

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