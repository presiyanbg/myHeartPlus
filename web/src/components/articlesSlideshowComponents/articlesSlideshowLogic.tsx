import React, { useState, useContext, useEffect } from 'react';
import Moment from 'react-moment';
import PaginationServices from '../../services/paginationServices/paginationServices';
import ImageLoader from '../loadersComponents/imageLoader/imageLoader';

import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { ArticlesType, ArticleType, PaginationType } from '../../ts/types';
import { scrollToElement, checkElementCanScroll, arrayFilterUnique } from '../../utils/utils';
import { SELECTORS } from '../../constants/selectors';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';

const ARTICLES_PER_SLIDE = 5;

type Props = {
    articles?: ArticlesType,
    pagination?: PaginationType
};

const ArticlesSlideshowLogic = () => {
    const [articles, setArticles] = useState<ArticlesType>();
    const [pagination, setPagination] = useState<PaginationType>();
    const [slideLoaded, setSlideLoaded] = useState<boolean>(false);

    const { isLoading, displayLoader } = useContext(LoadingContext);

    const slideRef = React.createRef<HTMLDivElement>();
    const paginationServices = PaginationServices();

    /**
     * Automatically change slide after loading new articles
     */
    useEffect(() => {
        // Check if slide was loaded and slide HTML is rendered 
        if (slideLoaded && slideRef.current) {
            changeSlide('>', true);

            setSlideLoaded(false);
        }
    }, [articles])

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
            loadArticles();
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
     */
    const loadArticles = () => {
        if (isLoading) return;
        if (!pagination || !pagination.next_page_url) return;
        if (pagination.to == pagination.total) return;

        paginationServices.load('articles', pagination.current_page + 1).then(response => {
            if (response.articles) {
                init({
                    articles: response.articles.data,
                    pagination: response.articles
                });

                setSlideLoaded(true);
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
    const buildArticleBox = (article: ArticleType, index: number) => {
        let styles = 'articles__slide' + ' article-' + Number(index + 1);

        return (
            <Link to={`articles/` + article.id} className={styles} key={uuid()}>
                {
                    displayLoader && !pagination &&
                    <div className='articles__slide__loader'>Tet</div>
                }
                <div className="articles__slide__head">
                    <ImageLoader src={article.image} alt={article.title}></ImageLoader>
                </div>

                <div className="articles__slide__body">
                    <div className="articles__slide__title">
                        <h5>{article.title}</h5>
                    </div>

                    <div className="articles__slide__subtitle">
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
    const buildSlideshows = (articles: ArticlesType) => {
        return (
            <div className="articles__slide-show" key={uuid()} ref={slideRef} >
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
        const emptyArticle: ArticleType = {
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

        const emptyArticles: ArticlesType = [...Array(10).fill(0).map(x => (emptyArticle))];

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