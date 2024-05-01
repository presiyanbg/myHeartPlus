'use client';
import DoctorFormLogic from "./doctorFormLogic";
import { DoctorFormType, DoctorType } from "@/ts/types";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { setNativeValue } from "@/utils/utils";

type Props = {
    doctorId: number,
    userId: number,
}

const DoctorForm = (props: Props) => {
    const [doctor, setDoctor] = useState<DoctorType>();
    const [formValid, setFormValid] = useState<boolean>(true);
    const [formData, setFormData] = useState<DoctorFormType>({} as DoctorFormType);
    const logic = DoctorFormLogic();
    const t = useTranslations();

    /**
     * Handle input change
     * 
     * @param inputType string
     * @param event HTML input element event
     */
    const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>): void => {
        if (!props) return;

        const data: any = event?.currentTarget?.value;

        setFormData((prev) => {
            prev = prev || {};

            prev[inputType] = data;

            return prev;
        });

        validateFormData();
    }

    /**
     * Handle form submit 
     * 
     * @param event React.SyntheticEvent
     */
    const handleSubmit = (event: React.SyntheticEvent): void => {
        setDoctor({} as DoctorType);

        logic.doctorUpdate(props.doctorId, formData).then(response => {
            updateFormData(response?.doctor);
        });
    }

    /**
     * Update doctor object and form data
     * 
     * @param doctor DoctorType - Doctor data from API
     */
    const updateFormData = (doctor: DoctorType): void => {
        if (!doctor.id) return;

        setDoctor(doctor);

        setFormData({
            specialty: doctor.specialty,
            office_number: doctor.office_number,
            mobile_number: doctor.mobile_number,
            address_1: doctor.address_1,
            address_2: doctor.address_2,
            address_3: doctor.address_3,
            address_4: doctor.address_4,
            address_5: doctor.address_5,
            description: doctor.description,
        });

        Object.keys(doctor).forEach(key => {
            if (!document.getElementById(key) || !doctor) return;

            setNativeValue(document.getElementById(key), doctor[key as keyof DoctorType]);
        });
    }

    /**
     * Validate form data
     */
    const validateFormData = (): void => {
        const fieldsToCheck = [
            'specialty',
            'mobile_number',
            'address_1',
            'address_2',
            'address_3',
            'description',
        ];

        let checkIsValid = true;

        fieldsToCheck.forEach(checkKey => {
            if (formData[checkKey] == null || formData[checkKey] == undefined || !formData[checkKey]?.trim()?.length) {
                checkIsValid = false;
            }
        });

        setFormValid(checkIsValid);
    }

    // Load doctor information 
    useEffect(() => {
        if (props.doctorId <= 0) return;

        setTimeout(() => {
            logic.doctorShow(props.doctorId).then(doctor => {
                updateFormData(doctor as DoctorType);
            });
        })
    }, []);

    // Check if form data is valid 
    useEffect(() => {
        validateFormData();
    }, [formData]);

    // Check if user is doctor 
    if (props.doctorId <= 0) return (<></>);

    return (
        <>
            {/* Display loader */}
            <div className={!doctor?.id ? 'h-96 flex justify-center items-center' : 'hidden'}>
                <Spinner></Spinner>
            </div>

            {/* Display form */}
            <div className={!doctor?.id ? 'hidden' : ''}>
                <div className="py-2"></div>

                {/* Specialty */}
                <div className="flex flex-wrap sm:grid grid-cols-2 gap-4">
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            isRequired
                            id="specialty"
                            aria-describedby="Specialty number input"
                            label="Specialty number"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('specialty', e)} />
                    </div>
                </div >

                <div className="py-6"></div>

                {/* Numbers */}
                <div className="flex flex-wrap sm:grid grid-cols-2 gap-4">
                    {/* Mobile */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            isRequired
                            id="mobile_number"
                            aria-describedby="Mobile number input"
                            label="Mobile number"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('mobile_number', e)} />
                    </div>

                    {/* Office */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            id="office_number"
                            aria-describedby="Office number input"
                            label="Office number"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('office_number', e)} />
                    </div>
                </div >

                <div className="py-6"></div>

                {/* Addresses */}
                <div className="flex flex-wrap sm:grid grid-cols-2 gap-4">
                    {/* Street */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            isRequired
                            id="address_1"
                            aria-describedby="Street input"
                            label="Street"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('address_1', e)} />
                    </div>

                    {/* City */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            isRequired
                            id="address_2"
                            aria-describedby="City input"
                            label="City"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('address_2', e)} />
                    </div>

                    {/* County */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            isRequired
                            id="address_3"
                            aria-describedby="County input"
                            label="County"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('address_3', e)} />
                    </div>

                    {/* Country */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            id="address_4"
                            aria-describedby="Country input"
                            label="Country"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('address_4', e)} />
                    </div>

                    {/* Post code */}
                    <div className="w-full sm:w-auto">
                        <Input type="text"
                            id="address_5"
                            aria-describedby="Post code input"
                            label="Post code"
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('address_5', e)} />
                    </div>
                </div >

                <div className="py-6"></div>

                {/* Description */}
                <div className="w-full sm:w-auto">
                    <Textarea type="text"
                        isRequired
                        id="description"
                        aria-describedby="Description input"
                        label="Description"
                        color="default"
                        variant="bordered"
                        onChange={(e) => handleInputChange('description', e)} />
                </div>

                <div className="py-6"></div>

                <div className="text-center">
                    {/* Button submit */}
                    <div className="col-4">
                        <Button
                            variant="shadow"
                            color={formValid ? 'primary' : 'default'}
                            className={!formValid ? 'cursor-default' : ''}
                            onClick={(e) => handleSubmit(e)}>
                            Update
                        </Button>
                    </div>
                </div>

                <div className="py-6"></div>
            </div>
        </>
    )
}

export default DoctorForm;