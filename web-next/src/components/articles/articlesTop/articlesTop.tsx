'use client';
import Link from 'next/link';

import { v4 as uuid } from 'uuid';
import { ArticleType, ArticlesType, PaginationType } from '../../../ts/types';
import { parseDateAndTime, scrollToElement } from '../../../utils/utils';
import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react';

type Props = {
    articles?: ArticlesType,
};

const ArticlesTop = (props: Props) => {
    if (!props?.articles?.length) return (<></>);

    const articles: ArticlesType = props?.articles || [];
    const firstArticle: ArticleType = articles[0];

    return (
        <>
            {/* Small text   */}
            <div className="lg:hidden">
                <Link href={`/articles/${firstArticle?.id}`}
                    key={uuid()}>

                    <Card className="col-span-12 sm:col-span-4 h-full-dynamic relative rounded-none">
                        <Image
                            removeWrapper
                            alt={firstArticle?.title}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${firstArticle?.image}`}
                            className="z-0 w-full h-full object-cover rounded-none"
                        />

                        <CardHeader className="absolute bottom-0 z-10 flex-col !items-start bg--shadow-gradient">
                            <h1 className="text-white font-medium pb-2">
                                {firstArticle?.title}
                            </h1>

                            <div className=" pb-2">
                                <div className="text-tiny text-white/60 uppercase font-bold text--3-lies">
                                    {firstArticle?.content}
                                </div>
                            </div>

                            <p className="text-tiny text-white/60 uppercase">
                                <span className='pr-2'>
                                    {firstArticle?.writer}
                                </span>

                                <span>
                                    {parseDateAndTime(firstArticle?.created_at)}
                                </span>
                            </p>
                        </CardHeader>
                    </Card>
                </Link>
            </div>

            {/* Large screen */}
            <div className="hidden lg:grid grid-rows-3 grid-flow-col pb-3">
                {
                    articles?.map((article: ArticleType, index: number) => {
                        const backgroundUrl = `url(${process.env.NEXT_PUBLIC_API_URL}/${article?.image})`;
                        let articlesClass = 'relative bg-cover bg-no-repeat bg-center overflow-hidden transition duration-500 cursor-pointer hover:z-10 hover:shadow-lg';
                        let articleTitleClass = 'absolute bg-black p-3 w-full bottom-0 bg-opacity-25 flex justify-between';

                        if (index == 0) {
                            articlesClass += ' h-auto overflow-hidden row-span-2 col-span-3 hover:scale-105';
                        }

                        if (index != 0) {
                            articlesClass += ' h-56 hover:scale-110';
                            articleTitleClass += ' flex-col '
                        }

                        return (
                            <Link href={`/articles/${article?.id}`}
                                className={articlesClass}
                                style={{ backgroundImage: backgroundUrl }}
                                key={uuid()}>
                                <div className={articleTitleClass}>
                                    <div className="text-white font-black">
                                        {article?.title}
                                    </div>

                                    <div className="text-white text-small flex flex-col">
                                        <span className='pr-2'>
                                            {article?.writer}
                                        </span>

                                        <span>
                                            {parseDateAndTime(article?.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div >
        </>
    )
}

export default ArticlesTop;