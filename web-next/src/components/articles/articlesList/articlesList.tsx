'use client';
import Link from 'next/link';
import Image from 'next/image'
import Pagination from '@/components/pagination/pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import { ArticlesType, PaginationType } from '../../../ts/types';
import { parseDateAndTime, scrollToElement } from '../../../utils/utils';
import { useState } from 'react';
import { SELECTORS } from '@/constants/selectors';
import { PaginationClass } from '../../../ts/classes';

type Props = {
    articles?: ArticlesType,
    pagination?: PaginationType,
};

const ArticlesList = (props: Props) => {
    const [articles, setArticles] = useState<ArticlesType>(props?.articles || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination || new PaginationClass());

    /**
     * Load articles data
     * 
     * @param data PaginationType data 
     * @param autoScroll boolean -- Used on page change 
     */
    const onDataLoad = (data: any, autoScroll: boolean = false): void => {
        if (!data?.articles?.data) return;

        setArticles(data.articles.data);
        setPagination(data.articles);
        autoScroll && scrollToElement(`.${SELECTORS.anchorScroll}`);
    }

    return (
        <div className="p-5">
            {
                articles?.map(article => {
                    return (
                        <Link href={`/articles/${article?.id}`} className="pb-4 block" key={uuid()}>
                            <div className="pb-2">
                                <Image
                                    className="h-96"
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                    alt={article.title}
                                    width={500}
                                    height={100} />
                            </div>

                            <div className="box__body">
                                <div>
                                    <h4 className="text-lg font-bold pb-1">
                                        {article?.title}
                                    </h4>
                                </div>

                                <div className="box--content text--ellipsis--3">
                                    <p>{article?.content}</p>
                                </div>

                                <div className="box--footer">
                                    <div className="row">
                                        <div className="col-8">
                                            {parseDateAndTime(article?.created_at)}
                                        </div>
                                        <div className="col-4">
                                            <FontAwesomeIcon icon={faEye} /> | {article?.total_views}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )

                })
            }

            <Pagination pagination={pagination} url='articles' onDataLoad={onDataLoad}></Pagination>
        </div>
    )
}

export default ArticlesList;