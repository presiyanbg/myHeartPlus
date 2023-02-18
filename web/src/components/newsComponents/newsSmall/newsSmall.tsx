import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../../constants/api';
import { v4 as uuid } from 'uuid';
import { ArticlesType } from '../../../ts/types';
import NewsLogic from '../newsLogic';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ImageLoader from '../../loadersComponents/imageLoader/imageLoader';

type Props = {
  articles?: ArticlesType,
  singleComponent?: boolean,
}

const NewsSmall = (props: Props) => {
  const [articles, setArticles] = useState<ArticlesType>([]);
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
                <ImageLoader src={article.image} alt={article.title}></ImageLoader>
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

                <div className="box--footer">
                  <div className="row">
                    <div className="col-8">
                      <Moment format="DD/MM/YYYY">
                        {article.created_at}
                      </Moment>
                    </div>
                    <div className="col-4">
                      <FontAwesomeIcon icon={faEye} /> | {article.total_views}
                    </div>
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