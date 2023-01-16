import React, { useEffect } from 'react';
import ArticlesSlideshowLogic from './articlesSlideshowLogic';
import { Articles } from '../../ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { SELECTORS } from '../../constants/selectors';

type Props = {
  articles?: Articles,
  pagination?: object
};

const ArticlesSlideshow = (props: Props) => {
  const logic = ArticlesSlideshowLogic();

  useEffect(() => {
    if (props.pagination) {
      logic.init(props)
    }
  }, [props]);

  return (
    <div className="articles-wrapper hide--scroll">
      <div className={SELECTORS.articlesScroll}>
        {logic.formatArticles()}
      </div>

      <div className="articles-controls">
        <div className="articles-controls-right" onClick={() => logic.changeSlide('<')}>
          <FontAwesomeIcon icon={faCaretLeft} size="8x" />
        </div>
        <div className="articles-controls-left" onClick={() => logic.changeSlide('>')}>
          <FontAwesomeIcon icon={faCaretRight} size="8x" />
        </div>
      </div>
    </div>
  )
}

export default ArticlesSlideshow;