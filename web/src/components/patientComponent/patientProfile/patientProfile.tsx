import { useEffect, useState } from "react";
import { DoctorType, PatientType } from "../../../ts/types"
import { useTranslation } from 'react-i18next';
import ImageLoader from "../../loadersComponents/imageLoader/imageLoader";
import DateTimePicker from "../../commonComponents/dateTimePicker/dateTimePicker";

type Props = {
    patient: PatientType | any
}

const PatientProfile = (props: Props) => {
    const [patient, setPatient] = useState<PatientType>();
    const [doctor, setDoctor] = useState<DoctorType>();

    const { t } = useTranslation();

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
    }

    const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {

    }

    const handleDateChange = (date: string) => {
        console.log('handleDateChange')
        console.log(date)
    }

    useEffect(() => {
        if (!props?.patient) return;

        setPatient(props.patient)
    }, [props]);

    if (!props.patient || !patient) return <></>;

    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    {/* Personal doctor */}
                    <div className="row mb-5 justify-content-center">
                        {/* Doctor image */}
                        <div className="col-12">
                            <div className="form-group mb-5 mt-3 text-center user-form--field">
                                <div className="user-form--profile-picture">
                                    <ImageLoader src={doctor?.image || ''} alt={doctor?.full_name}></ImageLoader>
                                </div>
                            </div>
                        </div>

                        {/* Doctor */}
                        <div className="col-12 col-lg-4">
                            <div className="form-floating">
                                <select id="doctor_id"
                                    className="form-select form-select-lg"
                                    aria-label="doctor_id">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                                <label htmlFor="doctor_id">{t('Personal doctor')}</label>

                                <div id="emailHelp" className="form-text text-end cursor--pointer text--primary--hover">{t('Find your doctor')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Height and weight */}
                    <div className="row justify-content-center">
                        {/* Title */}
                        <div className="row mb-3">
                            <div className="col-2"></div>
                            <div className="col-12 col-lg-4">
                                <h6>{t('Personal information')}</h6>
                            </div>
                        </div>

                        {/* Height */}
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="form-floating">
                                <input type="weight"
                                    id="weight"
                                    value={patient?.weight}
                                    placeholder='0'
                                    className="form-control"
                                    onChange={(e) => handleInputChange('weight', e)} />

                                <label htmlFor="weight">{t('Weight')}</label>
                            </div>
                        </div>

                        {/* Weight */}
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="form-floating">
                                <input type="height"
                                    id="height"
                                    value={patient?.height}
                                    placeholder='0'
                                    className="form-control"
                                    onChange={(e) => handleInputChange('height', e)} />

                                <label htmlFor="height">{t('Height')}</label>
                            </div>
                        </div>
                    </div>

                    {/* Gender and date of birth */}
                    <div className="row justify-content-center">
                        {/* Gender */}
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="form-floating">
                                <select id="doctor_id"
                                    className="form-select form-select-lg"
                                    aria-label="doctor_id">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                                <label htmlFor="doctor_id">{t('Gender')}</label>
                            </div>
                        </div>

                        {/* Date if birth */}
                        <div className="col-12 col-lg-4 mb-3">
                            <DateTimePicker
                                title={t('Date of birth')}
                                selectedDate={patient?.date_of_birth}
                                handleDateChange={handleDateChange}></DateTimePicker>
                        </div>
                    </div>

                    {/* Update button */}
                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-lg-4"></div>

                        <div className="col-12 col-lg-4">
                            <button type="submit" className="btn btn-success text-white w-100">
                                {t('Update')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PatientProfile;