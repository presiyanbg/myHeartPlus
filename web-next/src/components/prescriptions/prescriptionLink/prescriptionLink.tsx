import Link from "next/link";
import PictureCard from "@/components/common/pictureCard/pictureCard";

import { v4 as uuid } from 'uuid';
import { PrescriptionType } from "../../../ts/types";
import { parseDateAndTime } from "@/utils/utils";

type Props = {
    prescription: PrescriptionType
}

const PrescriptionLink = (props: Props) => {
    if (!props?.prescription) return (<></>);

    return (
        <Link href={`/prescriptions/${props.prescription.id}`} key={uuid()}>
            <PictureCard title={props.prescription?.title}
                subTitle={parseDateAndTime(props.prescription?.created_at)}
                content={props.prescription?.description}
                category={props.prescription?.category}
                rating={props.prescription?.rating}
            ></PictureCard>
        </Link>
    )
}

export default PrescriptionLink;