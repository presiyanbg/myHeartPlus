
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SERVER_URL } from '../../../constants/api';

type Props = {
  src: string,
  alt?: string
}

const ImageLoader = (props: Props) => {
  return (
    <LazyLoadImage
      src={SERVER_URL + props.src}
      alt={props.alt || 'Photo'}
      height="100%"
      width="100%"
      effect="opacity" />
  );
}

export default ImageLoader;