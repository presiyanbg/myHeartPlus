import React, { useContext } from 'react';
import Hero from '../../assets/images/hero__7.jpg';
import Logo from '../../assets/images/logo--white.png';
import Loader from '../../assets/loader--ekg.gif';
import { changeOpacityOnScroll, scrollToElement } from '../../utils/utils';
import SideNavigation from '../navigation/sideNavigation/sideNavigation';
import Router from '../../router/router';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';
import { SELECTORS } from '../../constants/selectors';

type Props = {};

const Monitor = ({ }: Props) => {
  const heroRef = React.createRef<HTMLDivElement>();
  const { isLoading } = useContext(LoadingContext);

  changeOpacityOnScroll(heroRef, false, 'opacity');

  const handleClick = (caller: string) => {
    if (caller === 'logo') {
      scrollToElement(SELECTORS.monitor);
    }
  }

  return (
    <>
      <div className="hero" onClick={e => handleClick('logo')}>
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
              {isLoading &&
                <>
                  <div className="ekg-monitor-panel--loader">
                    <div className="loader--image">
                      <img src={Loader} />
                    </div>
                  </div>
                </>
              }

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