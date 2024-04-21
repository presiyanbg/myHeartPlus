import { faHeart, faFileCircleCheck, faUserDoctor, faStaffSnake, faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/images/logo.png';

export const LINKS = [
    {
        title: 'Home',
        url: '/',
        selected: true,
        icon: faHeart,
        context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
        topLink: true,
        onClick: () => { },
    },
    {
        title: 'Articles',
        url: '/articles',
        selected: true,
        icon: faNewspaper,
        context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
        topLink: true,
        onClick: () => { },
    },
    {
        title: 'Health checks',
        url: '/health-tests',
        selected: false,
        icon: faFileCircleCheck,
        context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
        topLink: true,
        onClick: () => { },
    },
    {
        title: 'Тreatments',
        url: '/prescriptions',
        selected: false,
        icon: faUserDoctor,
        context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
        topLink: true,
        onClick: () => { },
    },
    {
        title: 'Medicaments',
        url: '/medicaments',
        selected: false,
        icon: faUserDoctor,
        context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
        topLink: true,
        onClick: () => { },
    },
    {
        title: 'Contact a doctor',
        url: '/doctors',
        selected: false,
        icon: faUserDoctor,
        context: 'Redundant alt attribute. Screen-readers already announce `img` tags as an image.',
        topLink: true,
        onClick: () => { },
    },
];

export const LOGO_LINK = {
    title: 'Logo',
    url: `${process.env.NEXT_PUBLIC_API_URL}/images/logo/logo.png`,
    logo: Logo,
    selected: false,
    icon: faHeart,
    topLink: true,
    onClick: () => { },
};