import { Component, useEffect, useState } from "react"
import HealthTestCreateLogic from "./healthTestCreateLogic"
import { v4 as uuid } from 'uuid';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type Props = {
  submitQA: (data: any) => void
}

const HealthTestQAForm = (props: Props) => {
  const [testQA, setTestQA] = useState<any[]>([]);
  const logic = HealthTestCreateLogic();

  const { t } = useTranslation();

  const handleQuestionChange = (inputType: string, event: React.FormEvent<any>, question: any) => {
    if (!inputType || !event || !question) return;
    event.preventDefault();

    setTestQA((prev) => {
      return logic.changeQuestionField(question, prev, inputType, event?.currentTarget?.value);
    })
  }

  const handleAnswerChange = (inputType: string, event: React.FormEvent<any>, question: any, answer: any) => {
    if (!inputType || !event || !question || !answer) return;
    event.preventDefault();

    let value = '';

    switch (inputType) {
      case 'next_question_order_number':
        value = logic.getQuestionByUUID(testQA, event?.currentTarget?.value)?.order_number;
        break;

      default:
        value = event?.currentTarget?.value;
        break;
    }

    setTestQA((prev) => {
      return logic.changeAnswerField(question, answer, prev, inputType, value);
    });
  }

  const handleAddNewQuestion = () => {
    setTestQA((prev: any) => {
      return logic.addNewQuestion(prev);
    });
  }

  const handleAddNewAnswer = (question: any) => {
    if (!question) return;

    setTestQA((prev: any) => {
      return logic.addNewAnswer(question, prev);
    });
  }

  const handleRemoveAnswer = (question: any, answer: any) => {
    if (!question || !answer) return;

    setTestQA((prev: any) => {
      return logic.removeAnswer(question, answer, prev);
    });
  }

  const handleRemoveQuestion = (question: any) => {
    if (!question) return;

    setTestQA((prev: any) => {
      return logic.removeQuestion(question, prev);
    });
  }

  // Set initial question 
  useEffect(() => {
    if (testQA?.length > 0) return;

    setTestQA((prev: any) => {
      return logic.addNewQuestion(prev);
    })
  }, []);

  // Send question and answers data to parent component 
  useEffect(() => {
    if (!props?.submitQA) return;

    props.submitQA(testQA);
  }, [testQA])

  return (
    <form>
      <div className="row mb-3">
        {
          !!testQA?.length && testQA.map((question, questionIndex) => {
            return (
              <div className="col-12 mb-5 card p-3" key={question.uuid}>
                <div className="col-12 mb-3 border-bottom pb-2">
                  <div className="row mb-3">
                    <div className="col-2">
                      #{questionIndex + 1}
                    </div>

                    <div className="col-8">
                      <div className="input-group input-group-sm mb-2">
                        <input type="text"
                          className="form-control text-center"
                          id="title"
                          value={question?.title}
                          onChange={(e) => handleQuestionChange('title', e, question)} />
                      </div>
                    </div>

                    <div className="col-2 text-end">
                      <button type="button" className="btn-close" aria-label="Remove" onClick={() => handleRemoveQuestion(question)}></button>
                    </div>
                  </div>

                  <div className="row justify-content-center mb-3">
                    <div className="col-10">
                      <div className="input-group">
                        <textarea className="form-control"
                          value={question?.description}
                          onChange={(e) => handleQuestionChange('description', e, question)}
                          id="floatingTextarea"></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 d-flex flex-wrap">
                  {
                    !!question?.answers?.length && (
                      question.answers.map((answer: any, answerIndex: number) => {
                        return (
                          <div className="col-4 text-center mb-2" key={answer.uuid}>
                            <div className="card p-2 m-2">
                              <div className="row mb-2">
                                <div className="col-2 text-start">
                                  {answerIndex + 1 + ')'}
                                </div>

                                <div className="col-8 text-center">
                                  {t('Answer')}
                                </div>

                                <div onClick={() => handleRemoveAnswer(question, answer)}
                                  className="col-2 text-end text-danger cursor-pointer">
                                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                </div>
                              </div>

                              {/* Answer content */}
                              <div className="row">
                                <div className="input-group input-group-sm mb-2 ">
                                  <span className="input-group-text w-25">{t('Text')}</span>

                                  <input type="text"
                                    className="form-control"
                                    id="title"
                                    value={answer?.content}
                                    onChange={(e) => handleAnswerChange('content', e, question, answer)} />
                                </div>
                              </div>

                              {/* Answer points */}
                              <div className="row">
                                <div className="input-group input-group-sm mb-2 ">
                                  <span className="input-group-text w-25">{t('Points')}</span>

                                  <input type="number"
                                    className="form-control"
                                    id="title"
                                    value={answer?.points}
                                    onChange={(e) => handleAnswerChange('points', e, question, answer)} />
                                </div>
                              </div>

                              {/* Select next question - visible only when not last question */}
                              {
                                !!(questionIndex + 2 < testQA?.length) && (
                                  <div className="row">
                                    <div className="col-12">
                                      <select
                                        onChange={(event) => handleAnswerChange('next_question_order_number', event, question, answer)}
                                        className="form-select form-select-sm"
                                        aria-label=".form-select-sm example">
                                        {
                                          !!testQA?.length && (
                                            testQA.map((nextQuestion: any, nextQuestionIndex: number) => {
                                              if (nextQuestionIndex > questionIndex) {
                                                return (
                                                  <option key={nextQuestion.uuid + '-option-' + nextQuestionIndex} value={nextQuestion.uuid}>
                                                    {"#" + (nextQuestionIndex + 1) + "  "} {nextQuestion?.title}
                                                  </option>
                                                )
                                              }
                                            })
                                          )
                                        }
                                      </select>
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          </div>
                        )
                      })
                    )
                  }
                </div>

                <div className="col-12 row justify-content-end p-3">
                  <div className="col-3">
                    <div className="btn btn-primary text-white"
                      onClick={() => handleAddNewAnswer(question)}>
                      {t('Add new answer')}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div >

      <div className="row mb-3 justify-content-end p-3">
        <div className="col-3">
          <div className="btn btn-primary text-white" onClick={handleAddNewQuestion}>
            {t('Add new question')}
          </div>
        </div>
      </div>
    </form >
  );
}

export default HealthTestQAForm;