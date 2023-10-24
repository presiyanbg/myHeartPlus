import Moment from 'react-moment';
import ImageLoader from '../../loadersComponents/imageLoader/imageLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import { ArticlesType } from '../../../ts/types';
import { Link } from 'react-router-dom';

type Props = {
    articles?: ArticlesType;
};

const NewsLarge = (props: Props) => {
    if (!props.articles || !props.articles.length) return (<></>);

    return (
        <div className="news-display--large">
            {
                props.articles.map(article => {
                    return (
                        <Link to={`/articles/${article.id}`} className="box--ml" key={uuid()}>
                            <div className="box__head">
                                <ImageLoader src={article.image} alt={article.title}></ImageLoader>
                            </div>

                            <div className="box__body">
                                <div className="box__title">
                                    <h4>
                                        {article.title}
                                    </h4>
                                </div>

                                <div className="box--content text--ellipsis--3">
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
                        </Link>
                    )

                })
            }
        </div>
    )
}

export default NewsLarge;