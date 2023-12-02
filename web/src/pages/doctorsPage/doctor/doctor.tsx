import DoctorsLogic from "../doctorsLogic";
import PageTitle from "../../../components/commonComponents/pageTitle/pageTitle";
import DoctorView from "../../../components/doctorComponents/doctorView/doctorView";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../../context/loadingContext/loadingContextProvider";
import { useTranslation } from 'react-i18next';
import { DoctorType } from "../../../ts/types";
import { SELECTORS } from "../../../constants/selectors";
import { scrollToElement } from "../../../utils/utils";

const Doctor = () => {
    const [doctor, setDoctor] = useState<any | DoctorType>({});

    const logic = DoctorsLogic();

    const { isLoading } = useContext(LoadingContext);
    const { id } = useParams();
    const { t } = useTranslation();

    /**
     * Load doctor data on init
     */
    useEffect(() => {
        if (!id) return;

        logic.loadDoctor(id).then(doctorData => {
            setDoctor(doctorData.doctor);
            scrollToElement(`.${SELECTORS.anchorScroll}`);
        });
    }, [id]);

    /**
     * Return 404 Not found
     */
    if ((!doctor || !doctor.user_id) && !isLoading) return (<>No results found</>);

    return (
        <div className="wrapper">
            <div className="page">
                {/* Empty element used for auto scroll on page change */}
                <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

                <PageTitle title={t('Dr.') + ' ' + doctor.full_name}
                    breadCrumbs={[
                        { url: "/doctors", title: t('Find your doctor') }
                    ]}></PageTitle>

                <div className="page--content doctor-profile--page">
                    <DoctorView doctor={doctor}></DoctorView>
                </div>
            </div>
        </div>
    )
}

export default Doctor;