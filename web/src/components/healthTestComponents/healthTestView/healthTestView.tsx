import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HealthTestAnswersType, HealthTestQAType, HealthTestQuestionType } from "../../../ts/types";

import healthTestViewLogic from "./healthTestViewLogic"
import HealthTestsLogic from "../healthTestsLogic";

type Props = {
  testQA: HealthTestQAType,
  submitTest: (data: any) => void
}

const HealthTestView = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<HealthTestQuestionType | any>({});
  const [answers, setAnswers] = useState<HealthTestAnswersType | any>([]);

  const { t } = useTranslation();
  const logic = HealthTestsLogic();
  const viewLogic = healthTestViewLogic();

  const submitAnswer = (answer: any) => {
    if (currentQuestion.final_question) {
      setAnswers((prev: HealthTestAnswersType) => viewLogic.saveAnswer(prev, answer));
      alert('ananas');

      // Display answers preview ?

      return;
    }

    if (answer?.next_question_id) {
      setAnswers((prev: HealthTestAnswersType) => viewLogic.saveAnswer(prev, answer));
      setCurrentQuestion(viewLogic.getNextQuestion(props.testQA.questions_and_answers_array, answer.next_question_id));
      return;
    }
  }

  const displayPreviousQuestion = () => {
    setAnswers((prev: any) => {
      const newAnswers = viewLogic.removeAnswer(prev, currentQuestion);

      setCurrentQuestion(viewLogic.getPrevQuestion(props.testQA.questions_and_answers_array, newAnswers));

      return newAnswers;
    });
  }

  // Load initial question
  useEffect(() => {
    if (props?.testQA) {
      setCurrentQuestion(viewLogic.getNextQuestion(props.testQA.questions_and_answers_array, 0));
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
          currentQuestion?.answers?.map((answer: any) => {
            return (
              <div className="btn btn-answer"
                onClick={() => submitAnswer(answer)}
                key={uuid()}>
                {answer.text}
              </div>
            )
          })
        }
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