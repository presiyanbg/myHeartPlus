import DoctorServicesClientServices from "@/services/doctorsServices/doctorServicesClientServices";
import DoctorsServices from "@/services/doctorsServices/doctorsServices";
import { DoctorFormType, DoctorType } from "@/ts/types";

const DoctorFormLogic = () => {
    const doctorClientServices = DoctorServicesClientServices();

    /**
     * Load doctor information 
     * 
     * @param doctorId number - Id of doctor
     * @returns API response 
     */
    const doctorShow = async (doctorId: number) => {
        const doctorData: any = await DoctorsServices().doctorShow(doctorId);
        const doctor: DoctorType = await doctorData?.doctor || {};

        return doctor;
    }

    /**
     * Update doctor information
     * 
     * @param doctorId number - Id of doctor
     * @param params DoctorFormType - Data for update
     * @returns API response
     */
    const doctorUpdate = async (doctorId: number, params: DoctorFormType) => {
        let formData = new FormData();

        formData.append('organization_id', params.organization_id || '');
        formData.append('specialty', params.specialty);
        formData.append('contact_email', params.contact_email || '');
        formData.append('mobile_number', params.mobile_number);
        formData.append('office_number', params.office_number || '');
        formData.append('address_1', params.address_1);
        formData.append('address_2', params.address_2);
        formData.append('address_3', params.address_3);
        formData.append('address_4', params.address_4 || '');
        formData.append('address_5', params.address_5 || '');
        formData.append('description', params.description);

        return await doctorClientServices.update(doctorId, formData);
    }

    return {
        doctorShow,
        doctorUpdate,
    }
}

export default DoctorFormLogic;