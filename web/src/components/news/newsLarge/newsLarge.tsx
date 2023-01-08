import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../../constants/api';
import { v4 as uuid } from 'uuid';

type Props = {
  articles: any[];
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
                <img src={SERVER_URL + article.image} alt="" />
              </div>

              <div className="box--body">
                <div className="box--title">
                  <h3>
                    {article.title}
                  </h3>
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

                <div className="box--content">
                  <p className="text-ellipsis">{article.content}</p>
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