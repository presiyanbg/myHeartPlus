'use client';
import Link from 'next/link';
import Image from 'next/image'
import Pagination from '@/components/pagination/pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import { ArticleType, ArticlesType, PaginationType } from '../../../ts/types';
import { parseDateAndTime, scrollToElement } from '../../../utils/utils';
import { useState } from 'react';
import { SELECTORS } from '@/constants/selectors';
import { PaginationClass } from '../../../ts/classes';

type Props = {
    articles?: ArticlesType,
};

const ArticlesTop = (props: Props) => {
    let articles: ArticlesType = props?.articles || [];

    if (!articles?.length) return (<></>);

    // Display 1 article
    if (articles?.length <= 2) {
        return (
            <>
                2
            </>
        )
    }

    // Display 3 article
    if (articles?.length <= 5) {
        articles = articles.slice(0, 3);

        return (
            <div className="grid grid-rows-2 grid-flow-col gap-4 bg-white pb-3">
                {
                    articles?.map((article: ArticleType, index: number) => {
                        const backgroundUrl = `url(${process.env.NEXT_PUBLIC_API_URL}/${article?.image})`;
                        let articlesClass = 'relative bg-cover bg-no-repeat bg-center overflow-hidden';

                        if (index == 0) {
                            articlesClass += ' h-auto overflow-hidden row-span-2';
                        }

                        if (index != 0) {
                            articlesClass += ' h-80';
                        }

                        return (
                            <Link href={`/articles/${article?.id}`}
                                className={articlesClass}
                                style={{ backgroundImage: backgroundUrl }}
                                key={uuid()}>
                                <div className="absolute bg-white p-3 w-full bottom-0 bg-opacity-25 flex justify-between">
                                    <div className="text-white font-black">
                                        {article?.title}
                                    </div>

                                    <div className="text-white font-italic">
                                        {article?.writer} / {parseDateAndTime(article?.created_at)}
                                    </div>
                                </div>
                            </Link>
                        )

                    })
                }
            </div >
        )
    }

    // Display 10 article
    if (articles?.length > 5) {
        articles = articles.slice(0, 10);

        return (
            <div className="grid grid-rows-3 grid-flow-col  pb-3">
                {
                    articles?.map((article: ArticleType, index: number) => {
                        const backgroundUrl = `url(${process.env.NEXT_PUBLIC_API_URL}/${article?.image})`;
                        let articlesClass = 'relative bg-cover bg-no-repeat bg-center overflow-hidden';

                        if (index == 0) {
                            articlesClass += ' h-auto overflow-hidden row-span-2 col-span-3';
                        }

                        if (index != 0) {
                            articlesClass += ' h-56';
                        }

                        return (
                            <Link href={`/articles/${article?.id}`}
                                className={articlesClass}
                                style={{ backgroundImage: backgroundUrl }}
                                key={uuid()}>
                                <div className="absolute bg-white p-3 w-full bottom-0 bg-opacity-25 flex justify-between">
                                    <div className="text-white font-black">
                                        {article?.title}
                                    </div>

                                    <div className="text-white font-italic">
                                        {article?.writer} / {parseDateAndTime(article?.created_at)}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div >
        )
    }
}

export default ArticlesTop;