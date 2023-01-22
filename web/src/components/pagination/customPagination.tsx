import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationType } from '../../ts/types';
import { useTranslation } from 'react-i18next';
import CustomPaginationLogic from './customPaginationLogic';
import { LoadingContext } from '../../context/loadingContext/loadingContextProvider';

type Props = {
  url: string,
  pagination: PaginationType | undefined,
  onDataLoad: (data: PaginationType, autoScroll?: boolean) => any
}

const CustomPagination = (props: Props) => {
  const [pagination, setPagination] = useState<PaginationType>();
  const logic = CustomPaginationLogic();
  const { isLoading } = useContext(LoadingContext);
  const { t } = useTranslation();


  /**
   * Handle click
   * 
   * @param type string -- Function to call
   * @param data any -- Data for function 
   */
  const handleClick = (type: string, data?: any) => {
    switch (type) {
      case 'changePage':
        if (data && pagination && props.url) {
          logic.changePage(props.url, data, pagination).then(response => {
            props.onDataLoad(response, true)
          });
        }
        break;

      default:
        break;
    }
  }

  /**
   * Load pagination
   */
  useEffect(() => {
    props.pagination && setPagination(props.pagination)
  }, [props]);

  return (
    <div className="custom-pagination">
      {/* Back button */}
      {/* Show back button only when current page is not the first one */}
      {
        !!(pagination?.current_page && pagination.current_page > 1) &&
        <div className="pagination--left" onClick={() => handleClick('changePage', '<')}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t('Back')}
        </div>
      }

      {/* Current page */}
      <div className="pagination--current-page">
        {!!pagination?.current_page && pagination.current_page}
      </div>

      {/* Next button */}
      {
        !!(pagination?.current_page && pagination.current_page != pagination.last_page) &&
        <div className="pagination--right" onClick={() => handleClick('changePage', '>')}>
          {t('Next+Page')} <FontAwesomeIcon icon={faArrowRight} />
        </div>
      }
    </div>
  )
}

export default CustomPagination;