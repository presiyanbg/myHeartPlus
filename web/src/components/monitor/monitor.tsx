import React, { useState } from 'react';
import Hero from '../../assets/images/hero__7.jpg';
import Logo from '../../assets/images/logo--white.png';
import Loader from '../../assets/loader--ekg.gif';
import { changeOpacityOnScroll } from '../../utils/utils';
import SideNavigation from '../navigation/sideNavigation/sideNavigation';
import Router from '../../router/router';

type Props = {};

const Monitor = ({ }: Props) => {
  let heroRef = React.createRef<HTMLDivElement>();

  changeOpacityOnScroll(heroRef, false, 'opacity');

  return (
    <>
      <div className="hero" >
        <div className="hero--head">
          <div className="hero--head-logo" ref={heroRef}>
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="page">
          <div className="ekg-monitor-panel">
            <div className="ekg-monitor-panel--body">
              {/* <div className="ekg-monitor-panel--loader">
                <div className="loader--image">
                  <img src={Loader} />
                </div>
              </div> */}

              <div className="ekg-monitor-panel--content">
                <Router></Router>
              </div>
            </div>

            <div className="ekg-monitor-panel--controls">
              <SideNavigation></SideNavigation>
            </div>
          </div>
        </div>
      </div>

      <div className="hero--background">
        <div className="hero--background-image img-shadow img-shadow--left">
          <img src={Hero} alt="Medicine wallpaper" />
        </div>
      </div>
    </>
  )
}

export default Monitor;