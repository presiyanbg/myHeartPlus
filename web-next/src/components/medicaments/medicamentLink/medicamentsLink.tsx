import Link from "next/link";
import { MedicamentType } from "../../../ts/types";
import { parseDateAndTime } from "@/utils/utils";
import PictureCard from "@/components/common/pictureCard/pictureCard";

type Props = {
    medicament: MedicamentType,
}

const MedicamentLink = (props: Props) => {
    if (!props?.medicament) return (<></>);

    return (
        <Link href={`/medicaments/${props.medicament.id}`}>
            <PictureCard title={props.medicament?.title}
                subTitle={parseDateAndTime(props.medicament?.created_at)}
                content={props.medicament?.description}
                imageSrc={props.medicament?.image}
                category={props.medicament?.category}
                rating={props.medicament?.rating}
            ></PictureCard>
        </Link>
    )
}

export default MedicamentLink;