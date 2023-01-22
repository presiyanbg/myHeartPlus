import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../../constants/api';
import { v4 as uuid } from 'uuid';
import { Articles } from '../../../ts/types';
import Moment from 'react-moment';
import ImageLoader from '../../loaders/imageLoader/imageLoader';

type Props = {
  articles?: Articles;
};

const NewsLarge = (props: Props) => {
  if (!props.articles || !props.articles.length) return (<></>);

  return (
    <div className="news-display--large">
      {
        props.articles.map(article => {
          return (
            <div className="news-box" key={uuid()}>
              <div className="box--head">
                <ImageLoader src={article.image} alt={article.title}></ImageLoader>
              </div>

              <div className="box--body">
                <div className="box--title">
                  <h4>
                    {article.title}
                  </h4>
                </div>

                <div className="box--content text-ellipsis--3">
                  <p>{article.content}</p>
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
            </div>
          )

        })
      }
    </div>
  )
}

export default NewsLarge;