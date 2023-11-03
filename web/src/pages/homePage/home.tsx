import React, { useState, useEffect } from 'react';
import ArticlesSlideshow from '../../components/articlesSlideshowComponents/articlesSlideshow';
import NewsLarge from '../../components/newsComponents/newsLarge/newsLarge';
import NewsSmall from '../../components/newsComponents/newsSmall/newsSmall';
import HomeLogic from './homeLogic';
import CustomPagination from '../../components/paginationComponents/customPagination';

import { ArticlesType, PaginationType } from '../../ts/types';
import { scrollToElement } from '../../utils/utils';
import { SELECTORS } from '../../constants/selectors';

type Props = {};

const Home = ({ }: Props) => {
    const logic = HomeLogic();
    const [articles, setArticles] = useState<ArticlesType>();
    const [pagination, setPagination] = useState<PaginationType>();

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

    /**
     * Load articles on mount
     */
    useEffect(() => {
        logic.loadArticles().then(response => {
            onDataLoad(response)
        });
    }, []);

    return (
        <>
            {/* Page hero */}
            <div className="hero">
                <div className="hero--content">
                    <ArticlesSlideshow articles={articles} pagination={pagination}></ArticlesSlideshow>
                </div>
            </div>

            {/* Page content */}
            <div className="wrapper">
                <div className="page">
                    {/* Empty element used for auto scroll on page change */}
                    <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

                    <div className="row pt-3">
                        <div className="col-12 col-md-8" id="NewsLagerWrapper">
                            <NewsLarge articles={articles}></NewsLarge>

                            <CustomPagination pagination={pagination} url='articles' onDataLoad={onDataLoad}></CustomPagination>
                        </div>

                        <div className="col-12 col-md-4">
                            <NewsSmall articles={articles}></NewsSmall>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
