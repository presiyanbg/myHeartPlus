'use client';
import { useTranslations } from 'next-intl';
import { Tooltip } from "@nextui-org/react";
import { ArticleType } from '@/ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ArticleStatistics from './articleStatistics';

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
                    <ArticleStatistics article={props?.article}></ArticleStatistics>
                </p>
            </div>
        </div>
    )
}

export default ArticleTitle;