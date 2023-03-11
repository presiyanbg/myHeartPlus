import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

import HealthTestsLogic from "../healthTestsLogic";
import { PaginationType } from "../../../ts/types";
import CustomPagination from "../../paginationComponents/customPagination";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import StarsRating from "../../commonComponents/starsRatingComponent/starsRating";

type Props = {
  patientID: number | string,
}

const HealthTestResultsTable = (props: Props) => {
  const [results, setResults] = useState<any[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();

  const logic = HealthTestsLogic();

  const onDataLoad = (response: any) => {
    if (!response?.results?.data) return;

    setResults(response.results.data);
    setPagination(response.results);

    console.log(response.results.data)
  }

  useEffect(() => {
    if (!props.patientID && !results) return;

    logic.loadPatientTestResults(props.patientID).then(response => {
      onDataLoad(response);

    });
  }, [props.patientID])

  if (!props.patientID) return <></>;

  return (
    <div className="row">
      <div className="col-12">
        {results.length && results.map((result: any) => {
          return (
            <Link to={`/health-tests/results/${result.id}`}
              className="row border-bottom mb-4 cursor-pointer text-primary-hover"
              key={uuid()}>
              <div className="col-3 d-flex align-items-center">
                <span className="mb-3 text-ellipsis--2">
                  {result?.test?.title}
                </span>
              </div>

              <div className="col-7">
                <p className="text-ellipsis--2">
                  {result?.test?.description}
                </p>
              </div>

              <div className="col-2 d-flex align-items-center justify-content-end">
                <Moment format="DD/MM/YYYY" className="mb-3">
                  {result.updated_at}
                </Moment>
              </div>
            </Link>
          )
        })}
      </div>

      <CustomPagination url={`health-tests/results/${props.patientID}`} pagination={pagination} onDataLoad={onDataLoad}></CustomPagination>
    </div>
  )
}

export default HealthTestResultsTable;