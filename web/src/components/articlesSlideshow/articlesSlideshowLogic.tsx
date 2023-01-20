import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { SERVER_URL } from '../../constants/api';
import { Link } from 'react-router-dom';
import { Articles, Article } from '../../ts/types';
import Moment from 'react-moment';
import { scrollToElement } from '../../utils/utils';
import { SELECTORS } from '../../constants/selectors';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';


const ARTICLES_PER_SLIDE = 5;

type Props = {
  articles?: Articles,
  pagination?: object
};

const ArticlesSlideshowLogic = () => {
  const [articles, setArticles] = useState<Articles>();
  const [pagination, setPagination] = useState<Object>();
  const slideRef = React.createRef<HTMLDivElement>();
  const { isLoading } = useContext(LoadingContext);

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
        {
          isLoading &&
          <div className='slide--loader'>Tet</div>
        }
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

  /**
   * Displaying empty articles while loading data from API
   * 
   * @returns HTML
   */
  const loadingArticles = () => {
    const emptyArticle: Article = {
      content: '',
      id: 0,
      image: '',
      moment_views: 0,
      writer: '',
      shares: 0,
      slug: '',
      title: '',
      total_views: 0,
      created_at: '2023-01-18T20:03:46.000000Z',
      updated_at: '2023-01-18T20:03:46.000000Z',
    }

    const emptyArticles: Articles = [...Array(ARTICLES_PER_SLIDE).fill(0).map(x => (emptyArticle))];

    return buildSlideshows(emptyArticles);
  }

  /**
   * Display loading or real articles when data is loaded 
   * 
   * @returns HTML
   */
  const displayArticles = () => {
    return (
      <>
        {
          isLoading && loadingArticles()
        }
        {
          !isLoading && formatArticles()
        }
      </>
    )
  }

  return {
    init,
    formatArticles,
    changeSlide,
    loadingArticles,
    displayArticles,
  }
}

export default ArticlesSlideshowLogic;