'use client';
import { ArticleType } from "@/ts/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEye, faShare, faUser } from '@fortawesome/free-solid-svg-icons';
import { parseDateAndTime } from '../../../utils/utils';
import { Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";

type Props = {
    article: ArticleType,
}

const ArticleStatistics = (props: Props) => {
    const t = useTranslations();

    if (!props?.article) return;

    return (
        <>
            {/* Current number of viewers */}
            <Tooltip content={t('Current readers') + ': ' + props?.article?.moment_views || '0'}>
                <FontAwesomeIcon icon={faEye} />
            </Tooltip>

            {/* Total views */}
            <Tooltip content={t('Total readers') + ': ' + props?.article?.total_views || '0'}>
                <FontAwesomeIcon icon={faUser} />
            </Tooltip>

            {/* Total shares */}
            <Tooltip content={t('Total shares') + ': ' + props?.article?.shares || '0'}>
                <FontAwesomeIcon icon={faShare} />
            </Tooltip>

            {/* Date created */}
            <Tooltip suppressHydrationWarning content={t('Date published') + ': ' + parseDateAndTime(props?.article?.created_at)}>
                <FontAwesomeIcon icon={faCalendar} />
            </Tooltip>
        </>
    )
}

export default ArticleStatistics;