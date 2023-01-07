import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

type Props = {
  articles: any[]
}

const NewsSmall = (props: Props) => {
  if (!props.articles) return (<></>);

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
            <div className="news-box">
              <div className="box--head">
                <img src={article.image} alt="" />
              </div>

              <div className="box--body">
                <div className="box--title">
                  <h6>
                    {article.title}
                  </h6>
                </div>

                <div className="box--content">
                  <p className="text-ellipsis">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta pariatur minus nihil natus odio repellendus ipsa id doloribus nam in aliquam distinctio nisi nemo nobis mollitia, ratione quaerat sapiente ipsam.
                  </p>
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