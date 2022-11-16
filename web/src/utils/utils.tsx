/* Class names function */
export const classNames = (...args: any[]) => {
  return args.filter(Boolean).join(' ')
}

/* Change opacity on scroll */
export const changeOpacityOnScroll = (elem: React.RefObject<HTMLDivElement>, toggle: boolean, mode: string) => {
  window.addEventListener('scroll', () => {
    if (!elem.current) return;

    const scrollTop = window.scrollY;
    const elemHeight = elem.current.clientHeight;

    /* Show element with 0 opacity */
    if (toggle && mode === 'opacity') {
      elem.current.style.opacity = 1 - (elemHeight - scrollTop) / elemHeight + '';
    }

    /* Hide element */
    if (!toggle && mode === 'opacity') {
      elem.current.style.opacity = (elemHeight - scrollTop) / elemHeight + '';
    }

    /* @TODO - Make function that changes background color opacity */
    // if (toggle && mode === 'backgroundColor') {
    //   elem.current.style.backgroundColor = '#fff1' + ((elemHeight - scrollTop) / elemHeight);
    // }
  });
}

