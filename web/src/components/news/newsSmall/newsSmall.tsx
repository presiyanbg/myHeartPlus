import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../../constants/api';
import { v4 as uuid } from 'uuid';

type Props = {
  articles: any[]
}

const NewsSmall = (props: Props) => {
  if (!props.articles || !props.articles.length) return (<></>);

  // Display only top 5 news
  // @TODO Order by views when DB is ready
  const articles = props.articles.slice(0, 5);

  return (
    <div className="news-display--small">
      <div className="display--title">
        <h5>
          Топ новини
        </h5>
      </div>

      {
        articles.map(article => {
          return (
            <div className="news-box" key={uuid()}>
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
            </div>
          )
        })
      }
    </div>
  )

}

export default NewsSmall;