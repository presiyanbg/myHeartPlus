
import PageTitle from "../../components/commonComponents/pageTitle/pageTitle";
import ArticleLogic from "./articleLogic";
import Comments from "../../components/commentsComponents/comments";
import NewsSmall from "../../components/newsComponents/newsSmall/newsSmall";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../constants/api";
import { SELECTORS } from "../../constants/selectors";
import { useTranslation } from 'react-i18next';
import { scrollToElement } from '../../utils/utils';
import { ArticleType } from "../../ts/types";

const Article = () => {
  const [article, setArticle] = useState<ArticleType | any>({});
  const [articleHTML, setArticleHTML] = useState({ __html: "" });
  const logic = ArticleLogic();

  const { id } = useParams();
  const { t } = useTranslation();

  /**
   * Load article on id change 
   */
  useEffect(() => {
    if (!id) return;

    logic.loadArticle(id).then(articleData => {
      setArticle(articleData.article);
      setArticleHTML({ __html: articleData.page });
      scrollToElement(`.${SELECTORS.anchorScroll}`);
    });
  }, [id]);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <PageTitle title={article.title}
          breadCrumbs={[
            { url: "/", title: t('Home') }
          ]}
        ></PageTitle>

        <div className="row mb-3">
          <div className="col-8">
            <div className="col-12">
              {/* Article image */}
              <div className="article--image">
                <img src={SERVER_URL + article.image} alt={article.title} />
              </div>

              {/* Article content */}
              <div className="col-12">
                <div dangerouslySetInnerHTML={articleHTML}></div>
              </div>
            </div>
          </div>

          {/* Small side news */}
          <div className="col-4">
            <NewsSmall singleComponent={true}></NewsSmall>
          </div>
        </div>

        {/* Article comments */}
        <div className="row mb-3">
          <div className="col-sm-12">
            <Comments parentUrl="article" parentId={id}></Comments>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article;