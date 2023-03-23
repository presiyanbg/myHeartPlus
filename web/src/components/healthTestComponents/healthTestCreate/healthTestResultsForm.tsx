import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import HealthTestCreateLogic from "./healthTestCreateLogic";

type Props = {
  results: any[],
}

const RESULTS_PER_ROL = 12;
const BACKGROUND_OPACITY = '15';

const HealthTestResultsForm = (props: Props) => {
  const [resultGroups, setResultGroups] = useState<any[]>([]);
  const [advices, setAdvices] = useState<any[]>([]);

  const { t } = useTranslation();

  const logic = HealthTestCreateLogic();

  const handleAdviceChange = (inputType: string, event: React.FormEvent<any>, question: any) => {
    if (!inputType || !event || !question) return;
  }

  const handleRemoveAdvice = (question: any) => {
    if (!question) return;
  }

  const handleAddNewAdvice = () => {
    setAdvices((prev: any) => {
      return logic.addNewAdvice(prev, 0, 0);;
    });
  }

  const getResultStyle = (result: any) => {
    if (!advices?.length) return {};

    let styleObject: any = {};

    advices.forEach((advice: any) => {
      if (!styleObject.backgroundColor && advice.min_points <= result && result <= advice.max_points) {
        styleObject = {
          backgroundColor: advice.color + BACKGROUND_OPACITY,
        }
      }
    });

    return styleObject;
  }

  useEffect(() => {
    if (!props.results.length) return;

    let resultGroupTemp = [];

    for (let i = 0; i < props.results.length; i += RESULTS_PER_ROL) {
      const chunk = props.results.slice(i, i + RESULTS_PER_ROL);

      resultGroupTemp.push(chunk)
    }

    setResultGroups(resultGroupTemp);
  }, [props.results]);

  // Set initial advices 
  useEffect(() => {
    if (advices?.length > 0) return;

    setAdvices(() => {
      let tempAdvices: any[] = [];

      tempAdvices = logic.addNewAdvice(tempAdvices, 0, 30);
      tempAdvices = logic.addNewAdvice(tempAdvices, 30, 75);
      tempAdvices = logic.addNewAdvice(tempAdvices, 75, 100);

      return tempAdvices;
    });
  }, []);

  if (!props?.results?.length) return (<></>);

  return (
    <>
      {/* Possible results */}
      <div className="row mb-3">
        <div className="col-12">
          <h5>{t('Possible results')}:</h5>
        </div>

        <div className="col-12">
          <table className="table table-bordered">
            <tbody>
              {
                !!resultGroups?.length && resultGroups.map((group: any) => {
                  return (
                    <tr key={uuid()}>
                      {
                        !!group?.length && group.map((result: any) => {
                          const resultStyle = getResultStyle(result);

                          return (
                            <td style={resultStyle} className="text-center p-1" key={uuid()}>
                              {result}
                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Advices form */}
      <form>
        <div className="row">
          {
            !!advices?.length && advices.map((advice: any, index: number) => {
              const adviceStyle = {
                backgroundColor: advice.color + BACKGROUND_OPACITY,
              }

              return (
                <div className="col-12 mb-5 card p-3" key={advice.uuid}>
                  {/* Title and content */}
                  <div className="col-12 mb-3 border-bottom pb-2">
                    <div className="row mb-3">
                      <div className="col-2">
                        #{index + 1}
                      </div>

                      <div className="col-8">
                        <div className="input-group input-group-sm mb-2">
                          <input type="text"
                            className="form-control text-center"
                            id="title"
                            placeholder={t('Advice title') || ''}
                            value={advice?.title}
                            onChange={(e) => handleAdviceChange('title', e, advice)} />
                        </div>
                      </div>

                      <div className="col-2 text-end">
                        <button type="button" className="btn-close" aria-label="Remove" onClick={() => handleRemoveAdvice(advice)}></button>
                      </div>
                    </div>

                    <div className="row justify-content-center mb-3">
                      <div className="col-10">
                        <div className="input-group">
                          <textarea className="form-control"
                            value={advice?.content}
                            placeholder={t('Content') || ''}
                            onChange={(e) => handleAdviceChange('description', e, advice)}
                            id="floatingTextarea"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Max and min points */}
                  <div className="col-12 border-bottom mb-3">
                    <div className="row mb-2 justify-content-center">
                      <div className="col-5">
                        <div className="input-group input-group-sm mb-2">
                          <span className="input-group-text w-25">{t('Min')}</span>

                          <input type="text"
                            className="form-control text-center"
                            style={adviceStyle}
                            id="min_points"
                            placeholder={t('Minimal points') || ''}
                            value={advice?.min_points}
                            onChange={(e) => handleAdviceChange('min_points', e, advice)} />
                        </div>
                      </div>

                      <div className="col-5">
                        <div className="input-group input-group-sm mb-2">
                          <span className="input-group-text w-25">{t('Max')}</span>

                          <input type="number"
                            className="form-control text-center"
                            style={adviceStyle}
                            id="max_points"
                            placeholder={t('Maximum Points') || ''}
                            value={advice?.max_points}
                            onChange={(e) => handleAdviceChange('max_points', e, advice)} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medicament and prescription */}
                  <div className="col-12">
                    <div className="row mb-2 justify-content-center">
                      <div className="col-5">
                        <div className="input-group input-group-sm mb-2">
                          <div className="form-floating">
                            <select id="medicament_id"
                              className="form-select form-select-lg"
                              aria-label="medicament_id">
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>

                            <label htmlFor="medicament_id">{t('Medicament')}</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="input-group input-group-sm mb-2">
                          <div className="form-floating">
                            <select id="prescription_id"
                              className="form-select form-select-lg"
                              aria-label="prescription_id">
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>

                            <label htmlFor="prescription_id">{t('Prescription')}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        {/* Add new advice button */}
        <div className="row mb-3 justify-content-end p-3">
          <div className="col-3">
            <div className="btn btn-primary text-white" onClick={handleAddNewAdvice}>
              {t('Add new advice')}
            </div>
          </div>
        </div>
      </form>
    </>);
}

export default HealthTestResultsForm;