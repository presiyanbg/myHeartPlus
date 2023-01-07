import React, { useContext, useEffect, useState } from 'react';
import Hero from '../../assets/images/hero__7.jpg';
import { changeOpacityOnScroll, scrollToElement } from '../../utils/utils';
import Router from '../../router/router';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';
import { SELECTORS } from '../../constants/selectors';
import { CommonContext } from '../../context/commonContext/commonContextProvider';
import { classNames } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/userContext/userContextProvider';

type Props = {};

const Monitor = ({ }: Props) => {
  const [displayPageLoader, setDisplayPageLoader] = useState(false);
  const heroRef = React.createRef<HTMLDivElement>();
  const { isLoading } = useContext(LoadingContext);
  const { monitorExpanded, toggleMonitorExpanded } = useContext(CommonContext);
  const { user, isAuth } = useContext(UserContext);

  changeOpacityOnScroll(heroRef, false, 'opacity');

  const monitorClasses = classNames('ekg-monitor-panel', monitorExpanded && 'expanded');

  /**
   * Handle element click
   * 
   * @param caller string 
   */
  const handleClick = (caller: string) => {
    if (caller === 'logo') {
      scrollToElement(SELECTORS.monitor);
    }

    if (caller === 'toggleMonitor') {
      toggleMonitorExpanded(undefined);
      togglePageLoader(350);
    }
  }

  /**
   * Toggle page loader - display over all content
   * 
   * @param time number - Time for loaded to appear
   */
  const togglePageLoader = (time: number) => {
    setDisplayPageLoader(true);

    const timer = setTimeout(() => {
      setDisplayPageLoader(false);
    }, time);

    return () => clearTimeout(timer);
  }

  // Scroll to monitor after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToElement(SELECTORS.monitor);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page loader */}
      {isLoading &&
        <>
          <div className="page--loader">
            <div className="loader--image">
              <FontAwesomeIcon icon={faSpinner} spin size="6x" color="white" />
            </div>
          </div>
        </>
      }

      {/* Pages */}
      <Router></Router>

      {/* Background */}
      {
        (!monitorExpanded || displayPageLoader) &&
        <div className="hero--background">
          <div className="hero--background-image img-shadow img-shadow--left">
            <img src={Hero} alt="Medicine wallpaper" />
          </div>
        </div>
      }

    </>
  )
}

export default Monitor;