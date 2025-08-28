'use client';

import { PatientType, UserHealthFormType } from "@/ts/types";
import { Button, Card, CardBody, CardHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { parseDateAndTime, setNativeValue } from "@/utils/utils";
import { v4 as uuid } from 'uuid';

import UserHealthEditLogic from "./userHealthEditLogic";

type Props = {
    patient: PatientType,
}

const UserHealthEdit = (props: Props) => {
    const [formData, setFormData] = useState<UserHealthFormType>({} as UserHealthFormType);
    const t = useTranslations();
    const patient = props?.patient;
    const logic = UserHealthEditLogic();
    const genders = [t('Female'), t('Male')];

    /**
     * Handle submit
     * 
     * @param e Event
     * @returns void
     */
    const handleSubmit = (e: any) => {
        e?.preventDefault();

        logic.updateHealthDetails(patient.id, formData);
    }

    /**
     * Handle input change
     * 
     * @param inputType key of UserHealthFormType
     * @param event React.FormEvent<HTMLInputElement>
     * @returns void
     */
    const handleInputChange = (inputType: keyof UserHealthFormType, event?: React.FormEvent<HTMLInputElement>, selectValue?: string) => {
        if (!event?.currentTarget?.value) return;

        setFormData((prev: UserHealthFormType) => ({
            ...prev,
            [inputType]: event?.currentTarget?.value || selectValue || ''
        }));
    }

    // Get user data on edit
    useEffect(() => {
        if (!props?.patient?.id) return;

        const parsedData = {
            height: props.patient?.height || 0,
            weight: props.patient?.weight || 0,
            gender: props.patient?.gender,
            date_of_birth: parseDateAndTime(props.patient?.date_of_birth),
            health_details: props.patient?.health_details[props.patient?.health_details?.length - 1]?.health_details || '',
        }

        setFormData(parsedData);

        Object.keys(parsedData).forEach(key => {
            if (!document.getElementById(key)) return;

            setNativeValue(document.getElementById(key), parsedData[key as keyof UserHealthFormType]);
        });
    }, [props]);

    // Check user authenticated
    if (!props.patient?.id) {
        return (
            <Card>
                <CardBody>{t('Unauthenticated')}</CardBody>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="py-2 px-4">
                    <h3>{t('Health information')}</h3>
                </div>
            </CardHeader>

            <CardBody>
                <form >
                    {/* Last updated date */}
                    {props?.patient?.updated_at && (
                        <>
                            <div className="flex px-4 pb-4">
                                <strong>{t('Last updated')}: {new Date(props?.patient?.updated_at).toLocaleDateString()}</strong>
                            </div>
                            <br />
                        </>
                    )}

                    {/* Weight */}
                    <div className="flex px-4 pb-4">
                        <Input type="number"
                            isRequired
                            id="weight"
                            aria-describedby="Weight input"
                            min={10}
                            max={400}
                            label={t('Weight') + ' (' + t('kg') + ')'}
                            color="default"
                            variant="bordered"
                            onChange={(e) => handleInputChange('weight', e)} />
                    </div >

                    <br />

                    {/* Height */}
                    <div className="flex px-4 pb-4">
                        <Input type="number"
                            isRequired
                            id="height"
                            aria-describedby="Height input"
                            label={t('Height') + ' (' + t('cm') + ')'}
                            color="default"
                            variant="bordered"
                            min={10}
                            max={250}
                            onChange={(e) => handleInputChange('height', e)} />
                    </div >

                    <br />

                    <div className="flex pb-4 px-4">
                        {/* Date of birth */}
                        <div className="w-1/2 pr-2">
                            <Input type="date"
                                isRequired
                                id="date_of_birth"
                                aria-describedby="Date of birth input"
                                label={t('Date of birth')}
                                color="default"
                                variant="bordered"
                                defaultValue={props?.patient?.date_of_birth ? new Date(props?.patient?.date_of_birth).toISOString().split('T')[0] : undefined}
                                onChange={(e) => handleInputChange('date_of_birth', e)} />
                        </div >

                        {/* Gender */}
                        <div className="w-1/2 pl-2">
                            <Select
                                label={t('Gender')}
                                isRequired
                                variant="bordered">
                                {
                                    genders?.map((row: string) => (
                                        <SelectItem key={uuid()}
                                            value={row}
                                            onClick={() => handleInputChange('gender', undefined, row)}>
                                            {row}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div >

                    <br />

                    {/* Health details */}
                    <div className="flex px-4 pb-4">
                        <Textarea
                            isRequired
                            id="health_details"
                            label={t('Health details')}
                            min-rows={5}
                            max-rows={10}
                            placeholder={t('Enter general health details, how you feel today and other relevant information')}
                            color="default"
                            variant="bordered"
                            maxLength={1000}
                            onChange={(e) => handleInputChange('health_details', e)}
                        />
                    </div>

                    <div className="pb-7 pt-7 text-center">
                        {/* Button submit */}
                        <div className="col-4">
                            <Button
                                variant="shadow"
                                color="primary"
                                className="cursor-default"
                                onClick={(e) => handleSubmit(e)}>
                                {t('Update')}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default UserHealthEdit;