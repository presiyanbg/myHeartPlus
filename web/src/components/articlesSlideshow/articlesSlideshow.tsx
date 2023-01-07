import ArticlesSlideshowLogic from './articlesSlideshowLogic';

type Props = {
  articles: {}[]
};

const ArticlesSlideshow = (props: Props) => {
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