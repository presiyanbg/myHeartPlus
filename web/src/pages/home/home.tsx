import React, { useState, useEffect } from 'react';
import ArticlesSlideshow from '../../components/articlesSlideshow/articlesSlideshow';
import NewsLarge from '../../components/news/newsLarge/newsLarge';
import NewsSmall from '../../components/news/newsSmall/newsSmall';
import HomeLogic from './homeLogic';

type Props = {};

const Home = ({ }: Props) => {
  const logic = HomeLogic();
  const [articles, setArticles] = useState<any>([]);

  useEffect(() => {
    logic.loadArticles().then(data => {
      setArticles(data);
    });
  }, []);

  const data = [
    {
      image: 'images/news/new1.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new7.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new2.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new3.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new4.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new5.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new6.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new1.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new2.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new3.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new4.jpg',
      title: 'Very nice title',
    },
    {
      image: 'images/news/new5.jpg',
      title: 'Very nice title',
    },
  ];

  return (
    <>
      <div className="hero">
        <div className="hero--content">
          <ArticlesSlideshow articles={articles}></ArticlesSlideshow>
        </div>

        <div className="hero--controls">

        </div>
      </div>
      <div className="wrapper">
        <div className="page">
          <div className="row pt-3">
            <div className="col-12 col-md-7">
              <NewsLarge articles={articles}></NewsLarge>
            </div>

            <div className="col-12 col-md-5">
              <NewsSmall articles={articles}></NewsSmall>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
