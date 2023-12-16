'use client';

import Link from "next/link";
import PictureCard from "@/components/common/pictureCard/pictureCard";

import { v4 as uuid } from 'uuid';
import { DoctorType, HealthCategoryType } from "../../../ts/types";

type Props = {
    doctor: DoctorType
}

const DoctorLink = (props: Props) => {
    if (!props?.doctor) return (<></>);

    const doctorCategory: HealthCategoryType = {
        id: 10000,
        title: props.doctor?.specialty,
        description: props.doctor?.specialty,
        font_color: '#fff',
        bg_color: '#34D399',
        created_at: '',
        updated_at: '',
    }

    return (
        <Link href={`/doctors/${props.doctor.id}`} key={uuid()}>
            <PictureCard title={props.doctor?.full_name}
                category={doctorCategory}
                content={props.doctor?.description}
                rating={props.doctor?.rating}
                imageSrc={props.doctor?.image}
            ></PictureCard>
        </Link>
    )
}

export default DoctorLink;