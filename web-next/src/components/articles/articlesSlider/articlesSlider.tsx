'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { ArticleType, ArticlesType, PaginationType } from "@/ts/types";
import { PaginationClass } from '@/ts/classes';
import { v4 as uuid } from 'uuid';
import { SELECTORS } from '@/constants/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import ArticlesSlideshowLogic from './articlesSlideshowLogic';

type Props = {
    articles?: ArticlesType,
    pagination?: PaginationType,
}

const ArticlesSlider = (props: Props) => {
    const [articles, setArticles] = useState<ArticlesType>(props?.articles || []);
    const logic = ArticlesSlideshowLogic();

    useEffect(() => {
        if (props.pagination) {
            logic.init(props, true);
        }
    }, [props]);

    if (!articles?.length) return (<></>);

    return (
        <div className="articles__wrapper scroll--hide">
            <div className={SELECTORS.articlesScroll}>
                {logic.displayArticles()}
            </div>

            <div className="articles__controls">
                <div className="articles__controls--right" onClick={() => logic.changeSlide('<')}>
                    <FontAwesomeIcon icon={faCaretLeft} size="8x" />
                </div>
                <div className="articles__controls--left" onClick={() => logic.changeSlide('>')}>
                    <FontAwesomeIcon icon={faCaretRight} size="8x" />
                </div>
            </div>
        </div>
    )
}

export default ArticlesSlider;