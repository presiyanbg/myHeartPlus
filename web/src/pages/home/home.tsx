import React, { useState, useEffect } from 'react';
import ArticlesSlideshow from '../../components/articlesSlideshow/articlesSlideshow';
import NewsLarge from '../../components/news/newsLarge/newsLarge';
import NewsSmall from '../../components/news/newsSmall/newsSmall';
import HomeLogic from './homeLogic';
import { Articles, Pagination } from '../../ts/types';

type Props = {};

const Home = ({ }: Props) => {
  const logic = HomeLogic();
  const [articles, setArticles] = useState<Articles>();
  const [pagination, setPagination] = useState<Pagination>();

  useEffect(() => {
    logic.loadArticles().then(response => {
      setArticles(response.data);
      setPagination(response);
    });
  }, []);

  return (
    <>
      <div className="hero">
        <div className="hero--content">
          <ArticlesSlideshow articles={articles} pagination={pagination}></ArticlesSlideshow>
        </div>

        <div className="hero--controls">

        </div>
      </div>
      <div className="wrapper">
        <div className="page">
          <div className="row pt-3">
            <div className="col-12 col-md-8">
              <NewsLarge articles={articles}></NewsLarge>
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
