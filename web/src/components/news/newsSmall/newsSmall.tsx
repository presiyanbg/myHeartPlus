import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../../constants/api';
import { v4 as uuid } from 'uuid';
import { Articles } from '../../../ts/types';
import NewsLogic from '../newsLogic';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
  articles?: Articles,
  singleComponent?: boolean,
}

const NewsSmall = (props: Props) => {
  const [articles, setArticles] = useState<Articles>([]);
  const logic = NewsLogic();
  const { t } = useTranslation();

  // Get articles from props 
  useEffect(() => {
    if (props.articles && props.articles.length >= 6) {
      setArticles(props.articles.slice(0, 5));
      return;
    }

    if (props.articles && props.articles.length <= 6) {
      setArticles(props.articles);
      return;
    }
  }, [props]);

  // Get articles from API when component is used as single 
  useEffect(() => {
    if (props.singleComponent) {
      logic.loadArticles().then(data => {
        setArticles(data)
      });
    }
  }, [])

  return (
    <div className="news-display--small">
      <div className="display--title">
        <h5>{t('Top news')}</h5>
      </div>

      {
        articles.map(article => {
          return (
            <Link to={`/article/${article.id}`} className="news-box" key={uuid()}>
              <div className="box--head">
                <img src={SERVER_URL + article.image} alt="" />
              </div>

              <div className="box--body">
                <div className="box--title">
                  <h6>
                    {article.title}
                  </h6>
                </div>

                <div className="box--content">
                  <p className="text-ellipsis">{article.content}</p>
                </div>

                <div className="box--icons">
                  <div className="box--icon">
                    <FontAwesomeIcon icon={faEye} /> | 10
                  </div>

                  <div className="box--icon">
                    <FontAwesomeIcon icon={faComment} /> | 550
                  </div>

                  <div className="box--icon">
                    <FontAwesomeIcon icon={faShare} /> | 71
                  </div>
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )

}

export default NewsSmall;