'use cleint';
import { HealthCategoryType } from "@/ts/types";
import { useTranslations } from "next-intl";

type Props = {
    category?: HealthCategoryType,
}

const Category = (props: Props) => {
    const t = useTranslations();

    if (!props?.category?.title?.length) return (<></>);

    return (
        <span className="px-2 py-1 rounded-3xl mr-2"
            style={{
                'color': props?.category?.font_color,
                'backgroundColor': props?.category?.bg_color,
            }}>

            {t(props?.category?.title)}
        </span>
    )
}

export default Category;