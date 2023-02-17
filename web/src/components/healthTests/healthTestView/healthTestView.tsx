import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faUser, faTimesCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import healthTestViewLogic from "./healthTestViewLogic"

type Props = {
  testQA: any,
  submitTest: (data: any) => void
}

const HealthTestView = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<any>({});
  const [answers, setAnswers] = useState<any>([]);

  const { t } = useTranslation();
  const logic = healthTestViewLogic();

  const submitAnswer = (answer: any) => {
    if (currentQuestion.final_question) {
      setAnswers((prev: any[]) => logic.saveAnswer(prev, answer));
      alert('ananas');

      // Display answers preview ?

      return;
    }

    if (answer?.next_question_id) {
      setAnswers((prev: any[]) => logic.saveAnswer(prev, answer));
      setCurrentQuestion(logic.getNextQuestion(props.testQA, answer.next_question_id));
      return;
    }
  }

  const displayPreviousQuestion = () => {
    setAnswers((prev: any) => {
      const newAnswers = logic.removeAnswer(prev, currentQuestion);

      setCurrentQuestion(logic.getPrevQuestion(props.testQA, newAnswers));

      return newAnswers;
    });
  }

  // Load initial question
  useEffect(() => {
    if (props?.testQA) {
      setCurrentQuestion(logic.getNextQuestion(props.testQA, 0));
    }
  }, []);

  // Return 404 error
  if (!currentQuestion?.answers?.length) {
    return (<>404</>)
  }

  return (
    <div className="row col-12 p-5 health-check--view">
      {/* Title and description */}
      <div className="row col-12 text-center mb-4">
        <div className="col-12 mb-2">
          <h5>{currentQuestion?.title}</h5>
        </div>

        <div className="col-12">
          <p>{currentQuestion.description}</p>
        </div>
      </div>

      {/* Answers buttons */}
      <div className="row answers--wrapper mb-5">
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
      <div className="row">
        <div className="col-4 cursor-pointer text-primary-hover"
          onClick={() => displayPreviousQuestion()}>
          <span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>

          <span className="ms-3">
            {t('Previous question')}
          </span>
        </div>
        <div className="col-4 text-center">
          {currentQuestion.id} / {props.testQA.length}
        </div>
      </div>
    </div>
  )
}

export default HealthTestView;