/* Class names function */
export const classNames = (...args: any[]) => {
  return args.filter(Boolean).join(' ')
}

/**
 * Change opacity on scroll
 * 
 * @param elem HTML Div -- Element that will get its opacity changed based on scroll
 * @param toggle Boolean -- If true element will be showed, If false element will be hidden
 * @param mode string 'opacity' or 'background'
 * @param maxOpacity number -- Max opacity that will be set on the object
 */
export const changeOpacityOnScroll = (elem: React.RefObject<HTMLDivElement>, toggle: boolean, mode: 'opacity' | 'background', maxOpacity?: number) => {
  window.addEventListener('scroll', () => {
    if (!elem.current) return;

    const scrollTop = window.scrollY;
    const elemHeight = elem.current.clientHeight;
    let maxOpacityInt = 1;

    if (typeof maxOpacity === 'number') {
      maxOpacityInt = maxOpacity;
    }

    /* Show element with 0 opacity */
    if (toggle && mode === 'opacity') {
      let opacity = 1 - (elemHeight - scrollTop) / elemHeight;

      if (opacity > maxOpacityInt) {
        opacity = maxOpacityInt;
      }

      elem.current.style.opacity = opacity + '';
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

/**
 * Scroll to element by string HTML selector
 * 
 * @param elemSelector string -- HTML Element selector 
 */
export const scrollToElement = (elemSelector: string) => {
  const elem = document.querySelector(elemSelector);

  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth' });
  }
}

