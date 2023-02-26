import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../constants/api";
import { SELECTORS } from "../../constants/selectors";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../utils/utils';
import { ArticleType } from "../../ts/types";

import PageTitle from "../../components/commonComponents/pageTitle/pageTitle";

const ProfilePage = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      // logic.loadArticle(id).then(articleData => {
      //   setArticle(articleData.article);
      //   setArticleHTML({ __html: articleData.page });
      // });
      scrollToElement(`.${SELECTORS.anchorScroll}`);
    }
  }, [id]);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

      </div>
    </div>
  )
}

export default ProfilePage;