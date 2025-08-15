'use client';
import UserStatistics from "../userStatistics/userStatistics";

import { DoctorType, UserType } from "@/ts/types";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faKitMedical, faNewspaper, faPrescription, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DoctorForm from "@/components/doctors/doctorForm/doctorForm";
import UserLocations from "../userLocations/userLocations";

type Props = {
    user: UserType,
    doctor?: DoctorType,
    role: string,
}

const UserControlPanel = (props: Props) => {
    const t = useTranslations();
    const [currentControl, setCurrentControl] = useState<any>({});
    const [controls, setControls] = useState<any>([]);

    /**
     * Handle click on control
     * 
     * @param selectedControl any - Selected control to be displayed
     * @returns void
     */
    const handleClick = (selectedControl: any): void => {
        if (!selectedControl?.id) return;

        setControls((prev: any) => {
            return prev.map((control: any) => {
                control.selected = false;

                if (control.id == selectedControl.id) {
                    control.selected = true;
                }

                return control;
            });
        })

        setCurrentControl(selectedControl);
    }

    // Update controls on first render
    useEffect(() => {
        // Manager controls
        if (props?.role == 'manager' || props?.role == 'admin') {
            setControls((prev: any) => {
                if (!prev?.find((control: any) => control.id == 'centres')) {
                    prev.push(
                        {
                            id: "centres",
                            order: 0,
                            label: t("Locations"),
                            content: (<UserLocations userId={props.user?.id}></UserLocations>),
                            icon: <FontAwesomeIcon icon={faHospital}></FontAwesomeIcon>,
                            selected: false,
                        }
                    );
                }

                if (!prev?.find((control: any) => control.id == 'articles')) {
                    prev.push(
                        {
                            id: "articles",
                            order: 50,
                            label: t("Articles"),
                            content: (<UserStatistics userId={props.user?.id}></UserStatistics>),
                            icon: <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>,
                            selected: false,
                        }
                    );
                }

                return prev;
            })
        }

        // Doctor controls
        if (props?.role == 'doctor' || props?.role == 'admin') {
            setControls((prev: any) => {
                if (!prev?.find((control: any) => control.id == 'doctorInfo')) {
                    prev.push(
                        {
                            id: "doctorInfo",
                            order: 10,
                            label: t("Work info"),
                            content: (<><DoctorForm doctorId={props.doctor?.id || 0} userId={props.user?.id}></DoctorForm></>),
                            icon: <FontAwesomeIcon icon={faUserDoctor}></FontAwesomeIcon>,
                            selected: true,
                        },
                    );
                }

                if (!prev?.find((control: any) => control.id == 'treatments')) {
                    prev.push(
                        {
                            id: "treatments",
                            order: 30,
                            label: t("Тreatments"),
                            content: (<UserStatistics userId={props.user?.id}></UserStatistics>),
                            icon: <FontAwesomeIcon icon={faPrescription}></FontAwesomeIcon>,
                            selected: false,
                        },
                    );
                }

                if (!prev?.find((control: any) => control.id == 'healthTests')) {
                    prev.push(
                        {
                            id: "healthTests",
                            order: 40,
                            label: t("Health checks"),
                            content: (<UserStatistics userId={props.user?.id}></UserStatistics>),
                            icon: <FontAwesomeIcon icon={faKitMedical}></FontAwesomeIcon>,
                            selected: false,
                        },
                    );
                }

                return prev;
            })
        }

        // Sort by order
        setControls((prev: any) => {
            return prev.sort((a: any, b: any) => parseFloat(a.order) - parseFloat(b.order));
        });

        if (!controls?.length) return;

        handleClick(controls[0]);
    }, []);

    return (
        <Card>
            <CardBody>
                <div className="gap-4 flex min-h-96">
                    <div className="flex flex-col border-r-1 pr-2">
                        {
                            (controls).map((control: any) => {
                                return (
                                    <Button key={uuid()}
                                        isIconOnly
                                        variant="light"
                                        color={control.selected ? 'primary' : 'default'}
                                        onClick={() => handleClick(control)}>
                                        {control.icon}
                                    </Button>
                                )
                            })
                        }
                    </div>

                    <div className="w-full">
                        <h3>{currentControl?.label}</h3>

                        <div className="py-2"></div>

                        {currentControl?.content}
                    </div>
                </div>
            </CardBody>
        </Card>

    );
}

export default UserControlPanel;