import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

type Props = {
  articles: any[];
};

const NewsLarge = (props: Props) => {
  if (!props.articles) return (<></>);

  return (
    <div className="news-display--large">
      {
        props.articles.map(article => {
          return (
            <div className="news-box">
              <div className="box--head">
                <img src={article.image} alt="" />
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
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta pariatur minus nihil natus odio repellendus ipsa id doloribus nam in aliquam distinctio nisi nemo nobis mollitia, ratione quaerat sapiente ipsam.
                  </p>
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