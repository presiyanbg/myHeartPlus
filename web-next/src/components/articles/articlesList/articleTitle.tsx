'use client';
import { useTranslations } from 'next-intl';
import { Tooltip } from "@nextui-org/react";
import { ArticleType } from '@/ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEye, faShare, faUser } from '@fortawesome/free-solid-svg-icons';
import { parseDateAndTime } from '../../../utils/utils';

type Props = {
    article: ArticleType
}

const ArticleTitle = (props: Props) => {
    const t = useTranslations();

    return (
        <div className={"flex " + (props?.article?.text_color || 'text-black')}>
            {/* Writer icon */}
            <div className="flex align-middle justify-center pr-4 text-black">
                <Tooltip content={props?.article?.writer?.length ? (t('Author') + ': ' + props?.article?.writer) : ''}>
                    <div className="bg-white w-14 h-14 flex items-center justify-center rounded-md">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </Tooltip>
            </div>

            {/* Article content */}
            <div className="flex flex-col">
                {/* Article title */}
                <span>
                    {props?.article?.title}
                </span>

                {/* Article statistics */}
                <p className={"text-small flex gap-4 pt-3 " + (props?.article?.text_color || 'text-black')}>
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
                    <Tooltip content={t('Date published') + ': ' + parseDateAndTime(props?.article?.created_at)}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </Tooltip>
                </p>
            </div>
        </div>
    )
}

export default ArticleTitle;