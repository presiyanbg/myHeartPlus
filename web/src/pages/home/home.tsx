import React, { useState } from 'react';
import Hero from '../../assets/images/hero__7.jpg';
import Logo from '../../assets/images/logo--white.png';

type Props = {};

const Home = ({ }: Props) => {

  return (
    <>
      <div className='hero'>
        <div className="hero--head">
          <div className="hero--head-logo">
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="page">
          <div className="box box-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem libero repellendus sit ipsa deleniti, deserunt sapiente facilis omnis, aut beatae suscipit, alias eum veniam in repudiandae odit asperiores molestias fuga?
          </div>
        </div>
      </div>

      <div className='hero--background'>
        <div className="hero--background-image img-shadow img-shadow--left">
          <img src={Hero} alt="Medicine wallpaper" />
        </div>
      </div>
    </>
  )
}

export default Home;