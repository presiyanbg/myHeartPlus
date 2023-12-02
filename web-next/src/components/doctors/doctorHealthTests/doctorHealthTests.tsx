import StarsRating from "@/components/common/starsRating/starsRating";
import { HealthTestType, HealthTestsType } from "@/ts/types";
import { parseDateAndTime } from "@/utils/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { v4 as uuid } from "uuid";

type Props = {
    tests: HealthTestsType,
}

const DoctorHealthTests = (props: Props) => {
    const t = useTranslations();

    if (!props?.tests?.length) return (<></>);

    return (
        <>
            {
                props?.tests?.map((test: HealthTestType) => {
                    return (
                        <Link href={`/health-tests/${test.id}`}
                            className="flex flex-col border-b-2 pb-2 pt-2"
                            key={uuid()}>
                            <div className="flex">
                                {/* Test title */}
                                <div className="w-2/3 font-bold">
                                    <h5>{test.title}</h5>
                                </div>

                                <div className="w-1/3">
                                    <StarsRating
                                        rating={test.rating}
                                        format={{ starsCol: 'flex justify-end' }}></StarsRating>
                                </div>
                            </div>

                            {/* Test category and rating */}
                            <div className="flex pt-2">
                                <div className="w-1/2">
                                    {
                                        test.category && (
                                            <span className="px-2 py-1 rounded-3xl mr-2"
                                                style={{
                                                    'color': test.category.font_color,
                                                    'backgroundColor': test.category.bg_color,
                                                }}>

                                                {t(test.category.title)}
                                            </span>
                                        )
                                    }

                                    <span>{parseDateAndTime(test.created_at)}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )
}

export default DoctorHealthTests;