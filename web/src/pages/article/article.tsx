
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleLogic from "./articleLogic";
import Comments from "../../components/comments/comments";
import NewsSmall from "../../components/news/newsSmall/newsSmall";
import { SERVER_URL } from "../../constants/api";
import { SELECTORS } from "../../constants/selectors";
import { scrollToElement } from '../../utils/utils';
import { ArticleType } from "../../ts/types";

type Props = {};

const Article = ({ }: Props) => {
  const [article, setArticle] = useState<ArticleType | any>({});
  const [articleHTML, setArticleHTML] = useState({ __html: "" });
  const logic = ArticleLogic();
  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      logic.loadArticle(id).then(articleData => {
        setArticle(articleData.article);
        setArticleHTML({ __html: articleData.page });
        scrollToElement(`.${SELECTORS.anchorScroll}`);
      });
    }
  }, [id]);

  return (
    <div className="wrapper">
      <div className="page article-page">
        {/* Empty element used for auto scroll on page change */}
        <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

        <div className="row mb-3">
          <div className="col-7">
            <div className="row">
              <div className="col-12 article--title">
                <h1>{article.title}</h1>
              </div>

              <div className="col-12">
                <div className="article--content">
                  <div className="article--image">
                    <img src={SERVER_URL + article.image} alt={article.title} />
                  </div>

                  <div dangerouslySetInnerHTML={articleHTML} ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <NewsSmall singleComponent={true}></NewsSmall>
          </div>
        </div>

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