import React, { useEffect } from 'react';
import ArticlesSlideshowLogic from './articlesSlideshowLogic';

import { ArticlesType, PaginationType } from '../../ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { SELECTORS } from '../../constants/selectors';

type Props = {
    articles?: ArticlesType,
    pagination?: PaginationType
};

const ArticlesSlideshow = (props: Props) => {
    const logic = ArticlesSlideshowLogic();

    useEffect(() => {
        if (props.pagination) {
            logic.init(props, true);
        }
    }, [props]);

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

export default ArticlesSlideshow;