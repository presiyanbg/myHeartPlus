import { v4 as uuid } from 'uuid';
import StarsRating from '../../commonComponents/starsRatingComponent/starsRating';
import { useEffect, useState } from 'react';
import HealthTestCreateLogic from './healthTestCreateLogic';
import { useTranslation } from 'react-i18next';

type Props = {
  updateData: boolean,
  test: any,
  testQA: any[],
  testAdvices: any[],
}

const HealthTestFinalizeForm = (props: Props) => {
  const logic = HealthTestCreateLogic();

  const { t } = useTranslation();

  if (!props?.test || !props?.testQA?.length || !props?.testAdvices?.length) return (<></>);

  return (
    <form>
      <div className="row">
        {/* Test preview link */}
        <div className="row mb-4">
          <div className="col-12 mb-3s">
            <div className="component--link"
              style={{ "--category-bg-color": props?.test?.category?.bg_color } as React.CSSProperties}>
              <div>
                <h4>{props.test?.title || t('Test title')}</h4>
              </div>

              {/* Test description */}
              <div className="link-description mb-2">
                <p>{props.test?.description || t('Test description')}</p>
              </div>

              {/* Test category and rating */}
              <div className="row">
                <div className="col-6">
                  {
                    props?.test?.category && (
                      <span className="badge rounded-pill"
                        style={{
                          'color': props?.test?.category.font_color,
                          'backgroundColor': props?.test?.category.bg_color,
                        }}>
                        {props?.test?.category.title}
                      </span>
                    )
                  }
                </div>

                <div className="col-6 text-end">
                  <StarsRating rating={5} format={{ starsCol: 'col-12 text-end' }}></StarsRating>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test preview QA */}
        <div className="row mb-4">
          <div className="col-12 mb-3">
            <h4>{t('Questions and answers preview')}</h4>
          </div>

          <div className="col-12 mb-3">
            {
              !!props?.testQA?.length && props.testQA.map((question: any, index: number) => {
                return (
                  <div className="row mb-3" key={uuid()}>
                    <div className="col-12">
                      <strong>
                        {'#' + (index + 1) + ' ' + (question.title || t('Question title'))}
                      </strong>
                    </div>

                    <div className="col-12">
                      <p>
                        {question.description || t('Question description')}
                      </p>
                    </div>

                    <div className="col-12 d-flex flex-wrap">
                      <div className="col-12 d-flex flex-wrap">
                        <div className="col-9">
                          {t('Answer content')}
                        </div>

                        <div className="col-3 text-end">
                          {t('Points')}
                        </div>
                      </div>
                      {
                        !!question?.answers?.length && question?.answers.map((answer: any) => {
                          return (
                            <div className="col-12 d-flex flex-wrap" key={uuid()}>
                              <div className="col-9">
                                {answer?.content || t('Answer')}
                              </div>
                              <div className="col-3 border-start text-end">
                                {answer?.points || 0}
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* Test results/advices preview */}
        <div className="row mb-4">
          <div className="col-12 mb-3">
            <h4>{t('Advices preview')}</h4>
          </div>

          <div className="col-12 mb-3">
            {
              !!props?.testAdvices?.length && props?.testAdvices.map((advice: any, index: number) => {
                return (
                  <div className="row mb-3 pb-3" key={uuid()}>
                    {/* Title and description */}
                    <div className="col-12">
                      <div className="col-12">
                        <strong>
                          {'#' + (index + 1) + ' ' + (advice.title || t('Advice title'))}
                        </strong>
                      </div>

                      <div className="col-12">
                        <p>
                          {advice.content || t('Advice description')}
                        </p>
                      </div>
                    </div>

                    {/* Minimal and maximum points */}
                    <div className="col-12 d-flex flex-wrap">
                      <div className="col-6 d-flex flex-wrap">
                        <div className="col-4 border-end">
                          {t('Minimal points')}

                        </div>
                        <div className="col-6 text-end">
                          {advice.min_points}
                        </div>
                      </div>

                      <div className="col-6 d-flex flex-wrap">
                        <div className="col-4 border-end">
                          {t('Maximum points')}

                        </div>
                        <div className="col-6 text-end">
                          {advice.max_points}
                        </div>
                      </div>
                    </div>

                    {/* Medicament and prescription */}
                    <div className="col-12 d-flex flex-wrap">
                      <div className="col-6 d-flex flex-wrap">
                        <div className="col-4 border-end">
                          {t('Prescription')}
                        </div>
                        <div className="col-6 text-end">
                          {!!(advice?.medicament_id > 0) && (advice?.medicament?.title)}
                        </div>
                      </div>
                      <div className="col-6 d-flex flex-wrap">
                        <div className="col-4 border-end">
                          {t('Medicament')}
                        </div>
                        <div className="col-6 text-end">
                          {!!(advice?.prescription_id > 0) && (advice?.prescription?.title)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </form>
  )
}

export default HealthTestFinalizeForm;