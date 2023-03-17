import { useEffect, useState } from "react";
import DoctorLogic from "../doctorLogic";
import MedicalProfilesList from "../../medicalProfilesComponents/medicalProfilesList/medicalProfilesList";
import { DoctorType, PaginationType } from "../../../ts/types";
import CustomPagination from "../../paginationComponents/customPagination";


type Props = {
  doctorID: number | string
}

const DoctorPatients = (props: Props) => {
  const [doctor, setDoctor] = useState<DoctorType | any>();
  const [patients, setPatients] = useState<any>();
  const [pagination, setPagination] = useState<PaginationType | any>();

  const logic = DoctorLogic();

  const onDataLoad = (data: any) => {
    if (!data?.doctor || !data?.patients) return;

    setDoctor(data.doctor)
    setPagination(data.patients)
    setPatients(data.patients.data)
  }

  useEffect(() => {
    if (!props.doctorID) return;

    logic.loadDoctorPatients(props.doctorID).then((response: any) => {
      onDataLoad(response);
    });
  }, [props.doctorID])

  return (
    <div className="row">
      <div className="col-12">
        <MedicalProfilesList records={patients} type='patients'></MedicalProfilesList>

        <CustomPagination url={`doctors/${props.doctorID}/showPatients`} pagination={pagination} onDataLoad={onDataLoad}></CustomPagination>
      </div>
    </div>
  )
}

export default DoctorPatients;