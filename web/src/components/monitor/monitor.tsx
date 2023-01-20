import React, { useContext, useState } from 'react';
import Router from '../../router/router';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';
import { CommonContext } from '../../context/commonContext/commonContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {};

const Monitor = ({ }: Props) => {
  const [displayPageLoader, setDisplayPageLoader] = useState(false);
  const { displayLoader } = useContext(LoadingContext);
  const { monitorExpanded, toggleMonitorExpanded } = useContext(CommonContext);

  return (
    <>
      {/* Page loader */}
      {displayLoader &&
        <>
          <div className="page--loader">
            <div className="loader--icon">
              <FontAwesomeIcon icon={faSpinner} spin size="6x" />
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
          <div className="hero--background-gradient"></div>
          {/* <div className="hero--background-image img-shadow img-shadow--left">
            <img src={SERVER_URL + 'images/hero/hero.jpg'} alt="Medicine wallpaper" />
          </div> */}
        </div>
      }

    </>
  )
}

export default Monitor;