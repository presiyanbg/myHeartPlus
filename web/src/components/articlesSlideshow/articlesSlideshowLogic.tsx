import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { SERVER_URL } from '../../constants/api';
import { Link } from 'react-router-dom';
import { Articles, Article, Pagination } from '../../ts/types';
import Moment from 'react-moment';
import { scrollToElement, checkElementCanScroll, arrayFilterUnique } from '../../utils/utils';
import { SELECTORS } from '../../constants/selectors';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';
import PaginationServices from '../../services/paginationServices/paginationServices';


const ARTICLES_PER_SLIDE = 5;

type Props = {
  articles?: Articles,
  pagination?: Pagination
};

const ArticlesSlideshowLogic = () => {
  const [articles, setArticles] = useState<Articles>();
  const [pagination, setPagination] = useState<Pagination>();
  const { isLoading, displayLoader } = useContext(LoadingContext);
  const slideRef = React.createRef<HTMLDivElement>();
  const paginationServices = PaginationServices();

  /**
   * Initialize states
   * 
   * @param data object { articles, pagination }
   */
  const init = (data: Props, fromParent: boolean = false) => {
    if (data.articles && data.articles.length) {
      setArticles((prev) => {
        // Combine previous data with new
        if (prev && data.articles) {
          // Removed loading articles 
          const combine = [...prev, ...data.articles].filter(article => article.id > 0);

          // Remove duplicates
          return arrayFilterUnique(combine, 'id');
        }

        return data.articles;
      })
    }

    if (!fromParent && data.pagination) {
      setPagination(data.pagination)
    }

    // Get pagination from parent only on load
    if (!pagination && fromParent && data.pagination) {
      setPagination(data.pagination)
    }

  }

  /**
  * Change slide
  * 
  * @param direction string - < for left, > for right
  * @param autoScroll boolean - when called after articles load
  * @returns void
  */
  const changeSlide = (direction: string, autoScroll: boolean = false) => {
    const slideWidth = slideRef.current?.offsetWidth;

    // Check if no articles is displayed 
    if (!slideWidth) return;

    // Check if users has scrolled to the end and load more articles
    if (!autoScroll && !checkElementCanScroll(`.${SELECTORS.articlesScroll}`)) {
      loadArticles(direction);
    }

    // Scroll
    if (direction == '<') {
      scrollToElement(`.${SELECTORS.articlesScroll}`, -slideWidth)
    }

    if (direction == '>') {
      scrollToElement(`.${SELECTORS.articlesScroll}`, slideWidth)
    }
  }

  /**
   * Load articles from api
   * 
   * @param direction string - < for left, > for right
   * @returns void
   */
  const loadArticles = (direction?: string) => {
    if (isLoading) return;
    if (!pagination || !pagination.next_page_url) return;
    if (pagination.to == pagination.total) return;

    paginationServices.load(pagination?.next_page_url).then(response => {
      if (response.articles) {
        init({
          articles: response.articles.data,
          pagination: response.articles
        });
      }
    });
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
          isLoading && !pagination &&
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
      id: -1,
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

    const emptyArticles: Articles = [...Array(10).fill(0).map(x => (emptyArticle))];

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
          displayLoader && loadingArticles()
        }
        {
          !displayLoader && formatArticles()
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