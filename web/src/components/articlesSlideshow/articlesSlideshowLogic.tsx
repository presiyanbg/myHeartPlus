import React, { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { SERVER_URL } from '../../constants/api';
import { Link } from 'react-router-dom';
import { Articles, Article } from '../../ts/types';
import Moment from 'react-moment';
import { scrollToElement } from '../../utils/utils';
import { SELECTORS } from '../../constants/selectors';

const ARTICLES_PER_SLIDE = 5;

type Props = {
  articles?: Articles,
  pagination?: object
};

const ArticlesSlideshowLogic = () => {
  const [articles, setArticles] = useState<Articles>();
  const [pagination, setPagination] = useState<Object>();
  const slideRef = React.createRef<HTMLDivElement>();

  /**
   * Initialize states
   * 
   * @param data object { articles, pagination }
   */
  const init = (data: Props) => {
    if (data.articles && data.articles.length) {
      setArticles(data.articles)
    }

    if (data.pagination) {
      setPagination(data.articles)
    }
  }

  /**
   * Change slide
   * 
   * @param direction string - < for left, > for right
   */
  const changeSlide = (direction: string) => {
    const slideWidth = slideRef.current?.offsetWidth;

    if (!slideWidth) return;

    if (direction == '<') {
      scrollToElement(`.${SELECTORS.articlesScroll}`, -slideWidth)
    }

    if (direction == '>') {
      scrollToElement(`.${SELECTORS.articlesScroll}`, slideWidth)
    }
  }

  /**
   * Build article HTML
   * 
   * @param article object - Article object
   * @param index number - Index of article in chunk
   * @returns HTML
   */
  const buildArticleBox = (article: Article, index: number) => {
    let styles = 'slide' + ' article-' + Number(index + 1);

    return (
      <Link to={`article/` + article.id} className={styles} key={uuid()}>
        <div className="slide--head">
          <img src={SERVER_URL + article.image} alt="Medicine wallpaper" />
        </div>

        <div className="slide--body">
          <div className="slide-title">
            <h5>{article.title}</h5>
          </div>

          <div className="slide-subtitle">
            {article.writer},&nbsp;
            <Moment format="DD/MM/YYYY">
              {article.created_at}
            </Moment>
          </div>
        </div>
      </Link>
    )
  }

  /**
   * Build slide HTML
   * 
   * @param articles array - Chunk of articles to display in slide
   * @returns HTML
   */
  const buildSlideshows = (articles: Articles) => {
    return (
      <div className="articles-slideshow" key={uuid()} ref={slideRef}>
        {
          articles.map((article, index) => {
            return buildArticleBox(article, index);
          })
        }
      </div>
    );
  }

  /**
   * Format articles data into HTML
   * 
   * @param articles array - Articles data 
   * @returns HTML
   */
  const formatArticles = () => {
    if (!articles || !articles.length) return (<></>);

    let slidesHTML = [];

    for (let i = 0; i < articles.length; i += ARTICLES_PER_SLIDE) {
      const chunk = articles.slice(i, i + ARTICLES_PER_SLIDE);

      // Check length to prevent empty spaces
      if (chunk && (chunk.length == ARTICLES_PER_SLIDE)) {
        slidesHTML.push(buildSlideshows(chunk))
      }
    }

    return slidesHTML;
  }

  return {
    init,
    formatArticles,
    changeSlide
  }
}

export default ArticlesSlideshowLogic;