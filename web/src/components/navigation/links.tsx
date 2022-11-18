import { faHeart, faFileCircleCheck, faUserDoctor, faStaffSnake } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/images/logo.png';

export const Links = () => {
  return [
    {
      title: 'Logo',
      url: '#',
      logo: Logo,
      selected: false,
      icon: faHeart,
      topLink: true,
    },
    {
      title: 'Home',
      url: '#',
      selected: true,
      icon: faHeart,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
    },
    {
      title: 'Check',
      url: '#',
      selected: false,
      icon: faFileCircleCheck,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
    },
    {
      title: 'Contact a doctor',
      url: '#',
      selected: false,
      icon: faUserDoctor,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
    },
    {
      title: 'Recomended',
      url: '#',
      selected: false,
      icon: faStaffSnake,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: true,
    },
    {
      title: 'Forum',
      url: '#',
      selected: false,
      icon: faStaffSnake,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: false,
    },
    {
      title: 'Forum Test',
      url: '#',
      selected: false,
      icon: faStaffSnake,
      context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
      topLink: false,
    },
  ]
}