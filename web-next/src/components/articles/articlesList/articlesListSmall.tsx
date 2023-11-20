'use client';
import Link from 'next/link';

import { v4 as uuid } from 'uuid';
import { ArticleType, ArticlesType } from '../../../ts/types';
import { Image, Spinner } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

type Props = {
    articles?: ArticlesType,
};

const ArticlesListSmall = (props: Props) => {
    const t = useTranslations();

    if (!props?.articles?.length) return (<></>);

    return (
        <>
            <strong className="font-bold pb-2">{t('Top news')}:</strong>

            {
                props?.articles?.map((article: ArticleType) => {
                    return (
                        <Link href={`/articles/${article?.id}`}
                            key={uuid()}
                            className="pb-3 flex hover:text-blue-500 w-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                alt={article.title}
                                width={75}
                                height={150}
                                loading='lazy'
                            />

                            <div className="flex flex-col w-2/3 pl-3">
                                <span className="truncate">
                                    {article.title}
                                </span>

                                <span className="truncate text-gray-400">
                                    {article.content}
                                </span>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    );
}

export default ArticlesListSmall;