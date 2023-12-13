'use client';
import Link from 'next/link';
import Pagination from '@/components/pagination/pagination';
import ArticleTitle from '../articleParts/articleTitle';

import { v4 as uuid } from 'uuid';
import { ArticlesType, PaginationType } from '../../../ts/types';
import { scrollToElement } from '../../../utils/utils';
import { useState } from 'react';
import { SELECTORS } from '@/constants/selectors';
import { PaginationClass } from '../../../ts/classes';
import { Card, CardBody, CardFooter, Image, Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl';

type Props = {
    articles?: ArticlesType,
    pagination?: PaginationType,
};

const ArticlesList = (props: Props) => {
    const [articles, setArticles] = useState<ArticlesType>(props?.articles || []);
    const [pagination, setPagination] = useState<PaginationType>(props?.pagination || new PaginationClass());
    const t = useTranslations();

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
        <>
            {
                articles?.map(article => {
                    return (
                        <div className="pb-4" key={uuid()}>
                            <Card isFooterBlurred
                                radius="lg"
                                className="border-none">
                                <Link href={`articles/${article?.id}`}>
                                    <Image
                                        className="h-96 hover:scale-125 transition duration-500 cursor-pointer"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${article?.image}`}
                                        alt={article.title}
                                        width={1500}
                                        height={100} />
                                </Link>

                                <CardFooter className="more-blur justify-between before:bg-white/10 border-white/30 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <Accordion className={article.text_color || 'text-black'}>
                                        <AccordionItem key={uuid()}
                                            aria-label={article?.title}
                                            title={<ArticleTitle article={article}></ArticleTitle>}>

                                            <CardBody className="px-3 py-0 max-h-54">
                                                <div className="text-default-400 max-h-32 overflow-y-auto">
                                                    <p className={article.text_color || 'text-black'}>{article?.content}</p>
                                                </div>

                                                <p className="text-right pt-4">
                                                    <Link href={`articles/${article?.id}`}>
                                                        <Button>
                                                            {t('Read full story')}
                                                        </Button>
                                                    </Link>
                                                </p>
                                            </CardBody>
                                        </AccordionItem>
                                    </Accordion>
                                </CardFooter>
                            </Card>
                        </div>
                    )

                })
            }

            <Pagination pagination={pagination} url='articles' onDataLoad={onDataLoad}></Pagination>
        </ >
    )
}

export default ArticlesList;

