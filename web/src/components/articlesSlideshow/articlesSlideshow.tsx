import ArticlesSlideshowLogic from './articlesSlideshowLogic';
import { Articles } from '../../ts/types';

type Props = {
  articles?: Articles
};

const ArticlesSlideshow = (props: Props) => {
  if (!props.articles || !props.articles.length) return (<></>);

  const logic = ArticlesSlideshowLogic();

  return (
    <div className="articles-wrapper hide--scroll">
      <div className="articles-scroll">
        {logic.formatArticles(props.articles)}
      </div>
    </div>
  )
}

export default ArticlesSlideshow;