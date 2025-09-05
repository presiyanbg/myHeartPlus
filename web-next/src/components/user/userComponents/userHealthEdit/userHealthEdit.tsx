'use client';

import { PatientType, UserHealthFormType } from "@/ts/types";
import { Button, Card, CardBody, CardHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { parseDateAndTime, setNativeValue } from "@/utils/utils";
import { v4 as uuid } from 'uuid';
import { Calendar, Clock, Pill, Droplets } from "lucide-react";

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

    const healthMetrics = [
        {
            title: "Water Intake",
            icon: Droplets,
            value: "1.2L",
            target: "2.5L",
            progress: 48,
            color: "text-primary"
        },
        {
            title: "Medications",
            icon: Pill,
            value: "2/3",
            target: "Taken today",
            progress: 67,
            color: "text-accent"
        },
        {
            title: "Exercise",
            icon: Calendar,
            value: "30 min",
            target: "45 min goal",
            progress: 67,
            color: "text-success"
        },
        {
            title: "Next Appointment",
            icon: Clock,
            value: "Tomorrow",
            target: "2:30 PM",
            progress: 100,
            color: "text-warning"
        }
    ];

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
        <>
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="font-bold text-foreground text-2xl">Health Tracking</h1>
                    <p className="text-muted-foreground">Monitor your daily health activities</p>
                </div>

                <Card className="bg-success-light/20 dark:bg-success/10 shadow-soft border-success/20 dark:border-success/30 animated-card">
                    <CardBody className="p-6 text-center">
                        <div className="mb-3 text-4xl">🎯</div>
                        <h3 className="mb-2 font-semibold text-success text-lg">Health Goals</h3>
                        <p className="text-muted-foreground">You&#39;re on track with 3 out of 4 daily goals!</p>
                    </CardBody>
                </Card>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    {healthMetrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <Card key={index} className="group hover:shadow-medium rounded-3xl overflow-hidden cursor-pointer animated-card glass-card">
                                <CardHeader className="pb-3">
                                    <div className="flex content-between space-x-3">
                                        <Icon className={`h-5 w-5 ${metric.color}`} />
                                        <span className="text-foreground">{metric.title}</span>
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-foreground text-2xl">{metric.value}</span>
                                        <span className="text-muted-foreground text-sm">{metric.target}</span>
                                    </div>
                                    <div className="bg-muted rounded-full w-full h-2">
                                        <div
                                            className={`h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500`}
                                            style={{ width: `${metric.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-muted-foreground text-xs">
                                        {metric.progress}% of daily goal completed
                                    </p>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-2 pt-10 pb-5 text-center">
                <h3 className="font-bold text-foreground text-2xl">{t('Health information')}</h3>


                {/* Last updated date */}
                {props?.patient?.updated_at && (
                    <>
                        <p className="text-muted-foreground">{t('Last updated')}: {new Date(props?.patient?.updated_at).toLocaleDateString()}</p>
                    </>
                )}

            </div>

            <Card className="group hover:shadow-medium rounded-3xl overflow-hidden cursor-pointer glass-card">
                <CardBody>
                    <form >
                        {/* Spacer */}

                        <div className="pt-4"></div>
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

                        <div className="flex px-4 pb-4">
                            {/* Date of birth */}
                            <div className="pr-2 w-1/2">
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
                            <div className="pl-2 w-1/2">
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

                        <div className="pt-7 pb-7 text-center">
                            {/* Button submit */}
                            <div className="col-4">
                                <Button
                                    variant="shadow"
                                    color="primary"
                                    className="cursor-pointer"
                                    onClick={(e) => handleSubmit(e)}>
                                    {t('Update')}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>

    )
}

export default UserHealthEdit;