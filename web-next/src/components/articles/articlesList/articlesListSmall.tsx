'use client';
import Link from 'next/link';

import { v4 as uuid } from 'uuid';
import { ArticleType, ArticlesType } from '../../../ts/types';
import { Image } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

type Props = {
    articles?: ArticlesType,
};

const ArticlesListSmall = (props: Props) => {
    const t = useTranslations();

    if (!props?.articles?.length) return (<></>);

    // Display top 5 news articles
    const articles = props?.articles?.splice(0, 5);

    return (
        <>
            <strong className="font-bold pb-2">{t('Top news')}:</strong>

            {
                articles?.map((article: ArticleType) => {
                    return (
                        <Link href={`/articles/${article?.id}`}
                            key={uuid()}
                            className="pb-3 flex hover:text-blue-500 w-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                alt={article.title}
                                width={75}
                                height={150} />

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