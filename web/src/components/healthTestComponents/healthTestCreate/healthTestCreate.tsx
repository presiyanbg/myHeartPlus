import { useEffect, useState } from "react";
import HealthTestCreateLogic from "./healthTestCreateLogic";
import { HealthTestType } from "../../../ts/types";
import { HealthTestClass } from "../../../ts/classes";
import { Nav, Tab } from "react-bootstrap";
import HealthTestDataForm from "./healthTestDataForm";
import { useTranslation } from "react-i18next";
import HealthTestQAForm from "./healthTestQAForm";
import HealthTestResultsForm from "./healthTestResultsForm";
import HealthTestFinalizeForm from "./healthTestFinalizeForm";

type Props = {
  doctorID: number
}

const HealthTestCreate = (props: Props) => {
  // Test data objects
  const [test, setTest] = useState<HealthTestType>(new HealthTestClass());
  const [testQA, setTestQA] = useState<any>([]);
  const [testAdvices, setAdvices] = useState<any>([]);

  // Detect updates in complex object
  const [detectUpdate, setDetectUpdate] = useState<boolean>(false);

  const logic = HealthTestCreateLogic();

  const { t } = useTranslation();

  const getTestData = (data: any) => {
    if (!data) return;

    setTest(data);
    setDetectUpdate((prev: boolean) => !prev);
  }

  const getQAData = (data: any) => {
    if (!data) return;

    setTestQA(data);
    setDetectUpdate((prev: boolean) => !prev);

    logic.calculateResults(data);
  }

  const getAdvices = (data: any) => {
    if (!data) return;

    setAdvices(data);
    setDetectUpdate((prev: boolean) => !prev);
  }

  // Update doctor id from props 
  useEffect(() => {
    if (!props.doctorID) return;

    setTest((prev: HealthTestType) => {
      prev.doctor_id = props.doctorID;

      return prev
    })
  }, [props.doctorID])

  // Check missing doctor id 
  if (!props?.doctorID) {
    return (<></>)
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="#test-data">
            <div className="row mb-3">
              <div className="col-12">
                <Nav variant="pills" className="flex-column">
                  <div className="row text-center text-black">
                    <div className="col-3">
                      <Nav.Item>
                        <Nav.Link eventKey="#test-data">
                          {t('About')}
                        </Nav.Link>
                      </Nav.Item>
                    </div>

                    <div className="col-3">
                      <Nav.Item>
                        <Nav.Link eventKey="#test-qa">
                          {t('Q / A')}
                        </Nav.Link>
                      </Nav.Item>
                    </div>

                    <div className="col-3">
                      <Nav.Item>
                        <Nav.Link eventKey="#test-results">
                          {t('Suggestions')}
                        </Nav.Link>
                      </Nav.Item>
                    </div>

                    <div className="col-3">
                      <Nav.Item>
                        <Nav.Link eventKey="#test-finalize">
                          {t('Finalize')}
                        </Nav.Link>
                      </Nav.Item>
                    </div>
                  </div>
                </Nav>
              </div>
            </div>

            <div className="row mt-3 mb-3">
              <div className="col-12 pt-5 pb-5">
                <Tab.Content>
                  <Tab.Pane eventKey="#test-data">
                    <HealthTestDataForm submitTest={getTestData}></HealthTestDataForm>
                  </Tab.Pane>

                  <Tab.Pane eventKey="#test-qa">
                    <div className="mb-3 p-3">
                      <HealthTestQAForm submitQA={getQAData}></HealthTestQAForm>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="#test-results">
                    <div className="mb-3 p-3">
                      <HealthTestResultsForm results={logic?.results} submitAdvices={getAdvices}></HealthTestResultsForm>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="#test-finalize">
                    <HealthTestFinalizeForm updateData={detectUpdate} test={test} testQA={testQA} testAdvices={testAdvices}></HealthTestFinalizeForm>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>

          <div className="row mb-3 mt-3">
            <div className="col-12">
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              Prev step
            </div>
            <div className="col-6">
              Next step
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthTestCreate;