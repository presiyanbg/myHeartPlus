import Link from "next/link";
import PictureCard from "@/components/common/pictureCard/pictureCard";

import { v4 as uuid } from 'uuid';
import { HealthTestType } from "../../../ts/types";
import { parseDateAndTime } from "@/utils/utils";

type Props = {
    test: HealthTestType
}

const HealthTestLink = (props: Props) => {
    if (!props?.test) return (<></>);

    return (
        <Link href={`/health-tests/${props.test.id}`} key={uuid()}>
            <PictureCard title={props.test?.title}
                subTitle={parseDateAndTime(props.test?.created_at)}
                content={props.test?.description}
                category={props.test?.category}
                rating={props.test?.rating}
            ></PictureCard>
        </Link>
    )
}

export default HealthTestLink;