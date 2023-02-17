import React, { useEffect } from 'react';
import PageTitle from '../../../components/common/pageTitle/pageTitle';

import { useTranslation } from 'react-i18next';
import { SELECTORS } from '../../../constants/selectors';
import { scrollToElement } from '../../../utils/utils';

type Props = {};

const HealthTestsList = ({ }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    scrollToElement(`.${SELECTORS.anchorScroll}`);
  }, []);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={t('Health checks')}></PageTitle>

      </div>
    </div>
  );
}

export default HealthTestsList;
