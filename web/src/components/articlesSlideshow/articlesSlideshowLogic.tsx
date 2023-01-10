import { v4 as uuid } from 'uuid';
import { SERVER_URL } from '../../constants/api';
import { Link } from 'react-router-dom';
import { Articles, Article } from '../../ts/types';

const ARTICLES_PER_SLIDE = 7;

const ArticlesSlideshowLogic = () => {

  /**
   * Build article HTML
   * 
   * @param article object - Article object
   * @param index number - Index of article in chunk
   * @returns HTML
   */
  const buildArticleBox = (article: Article, index: number, slideSize: number) => {
    let styles = 'slide' + ' article-' + Number(index + 1);

    // Display bigger article if slide is has less articles 
    if (slideSize == 5 && Number(index + 1) == 5) {
      styles += ' article-5-xl';
    }

    return (
      <Link to={`article/` + article.id} className={styles} key={uuid()} >
        <img src={SERVER_URL + article.image} alt="Medicine wallpaper" />

        <div className="slide-title">
          <h5>{article.title}</h5>
        </div>
      </Link>
    )
  }

  /**
   * Build slide HTML
   * 
   * @param articles array - Chunk of articles to display in slide
   * @returns HTML
   */
  const buildSlideshows = (articles: Articles) => {
    return (
      <div className="articles-slideshow" key={uuid()}>
        {
          articles.map((article, index) => {
            return buildArticleBox(article, index, articles.length);
          })
        }
      </div>
    );
  }

  /**
   * Format articles data into HTML
   * 
   * @param articles array - Articles data 
   * @returns HTML
   */
  const formatArticles = (articles: Articles) => {
    if (!articles || !articles.length) return (<></>);

    let slidesHTML = [];

    for (let i = 0; i < articles.length; i += ARTICLES_PER_SLIDE) {
      const chunk = articles.slice(i, i + ARTICLES_PER_SLIDE);

      // Check length to prevent empty spaces
      if (chunk && (chunk.length == 5 || chunk.length == 7)) {
        slidesHTML.push(buildSlideshows(chunk))
      }
    }

    return slidesHTML;
  }

  return {
    formatArticles
  }
}

export default ArticlesSlideshowLogic;