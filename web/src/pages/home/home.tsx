import React from 'react';
import ArticlesSlideshow from '../../components/articlesSlideshow/articlesSlideshow';
import NewsLarge from '../../components/news/newsLarge/newsLarge';
import NewsSmall from '../../components/news/newsSmall/newsSmall';

import New1 from '../../assets/images/temp/new1.jpg';
import New2 from '../../assets/images/temp/new2.jpg';
import New3 from '../../assets/images/temp/new3.jpg';
import New4 from '../../assets/images/temp/new4.jpg';
import New5 from '../../assets/images/temp/new5.jpg';
import New6 from '../../assets/images/temp/new6.jpg';
import New7 from '../../assets/images/temp/new7.jpg';
import Hero1 from '../../assets/images/hero__6.jpg';
import Hero2 from '../../assets/images/hero__2.jpg';
import Hero3 from '../../assets/images/hero__3.jpg';
import Hero4 from '../../assets/images/hero__4.jpg';
import Hero5 from '../../assets/images/hero__5.jpg';

type Props = {};

const Home = ({ }: Props) => {
  const data = [
    {
      image: New1,
      title: 'Very nice title',
    },
    {
      image: New2,
      title: 'Very nice title',
    },
    {
      image: New3,
      title: 'Very nice title',
    },
    {
      image: New4,
      title: 'Very nice title',
    },
    {
      image: New5,
      title: 'Very nice title',
    },
    {
      image: New6,
      title: 'Very nice title',
    },
    {
      image: New7,
      title: 'Very nice title',
    },
    {
      image: Hero1,
      title: 'Very nice title',
    },
    {
      image: Hero2,
      title: 'Very nice title',
    },
    {
      image: Hero3,
      title: 'Very nice title',
    },
    {
      image: Hero4,
      title: 'Very nice title',
    },
    {
      image: Hero5,
      title: 'Very nice title',
    },
  ];
  return (
    <>
      <div className="hero">
        <div className="hero--content">
          <ArticlesSlideshow articles={data}></ArticlesSlideshow>
        </div>

        <div className="hero--controls">

        </div>
      </div>
      <div className="wrapper">
        <div className="page">
          <div className="row pt-3">
            <div className="col-12 col-md-7">
              <NewsLarge articles={data}></NewsLarge>
            </div>

            <div className="col-12 col-md-5">
              <NewsSmall articles={data}></NewsSmall>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
