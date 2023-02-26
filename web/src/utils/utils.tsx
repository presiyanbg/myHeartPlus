/**
 * Get element classes conditionally 
 * 
 * @param args boolean
 * @returns 
 */
export const classNames = (...args: any[]) => {
  return args.filter(Boolean).join(' ')
}

/**
 * Change opacity on scroll
 * 
 * @param elem HTML Div -- Element that will get its opacity changed based on scroll
 * @param toggle Boolean -- If true element will be showed, If false element will be hidden
 * @param mode string -- 'opacity' or 'background'
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
 * @param horizontal number -- Scroll horizontally 
 */
export const scrollToElement = (elemSelector: string, horizontal?: number) => {
  const elem = document.querySelector(elemSelector);

  if (elem && !horizontal) {
    elem.scrollIntoView({ behavior: 'smooth', });
  }

  if (elem && horizontal) {
    elem.scrollTo({
      left: elem.scrollLeft + horizontal,
      behavior: "smooth"
    });
  }
}


/**
 * Check if element can scroll more
 * 
 * Used to load more data on scroll
 * 
 * @param elemSelector string -- HTML Element selector
 * @returns boolean
 */
export const checkElementCanScroll = (elemSelector: string): boolean => {
  const elem = document.querySelector(elemSelector);

  if (elem) {
    // Add +1 to prevent dividing by 0
    const scrollLeft = elem.scrollLeft + 1;
    const clientWidth = elem.clientWidth + 1;

    // Check if less then 2 percent is left for scroll
    return (clientWidth / scrollLeft) >= 2;
  }

  return false;
}

/**
 * Filter only unique objects in array by key;
 * 
 * @param array array -- Array with objects to be filtered
 * @param key string -- Key for the object property  
 * 
 * @returns array
 */
export const arrayFilterUnique = (array: any[], key: string): any[] => {
  if (!array.length) return [];

  const filter = [...array].map(article => article[key])
    .filter((value, index, self) => self.indexOf(value) === index);

  const filteredArray = filter.map(el => {
    return array.find(item => item[key] == el);
  });

  return filteredArray;
}

/**
 * Order array by property
 * 
 * @param array array -- Array with object to be ordered by property
 * @param key string -- Property key
 * 
 * @returns array
 */
export const arrayOrderByProp = (array: any[], key: string, reverse: boolean = false): any[] => {

  /** Compare function */
  const compare = (a: any, b: any) => {
    if (a[key] < a[key]) {
      return -1;
    }
    if (a[key] > a[key]) {
      return 1;
    }
    return 0;
  }

  if (reverse) {
    return array.sort(compare).reverse();
  }

  return array.sort(compare);
}

/**
 * Copy object and remove reference to main object
 * 
 * @param object object -- Object to make a copy from
 * 
 * @returns object
 */
export const copyObject = (object: any) => {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Build address to string 
 * 
 * @param addresses array of string -- Example: [...address_1, address_2]
 * @param divider string -- Divider used to join the array of addresses
 * @returns string
 */
export const buildAddress = (addresses: string[], divider: string = ',') => {
  let build = '';

  addresses.forEach(address => {
    if (address?.length) {
      build += address + divider + ' ';
    }
  });

  return build;
}


export const calculatePercentage = (total: any, current: any) => {
  total = Number(total);
  current = Number(current);

  return Number(((current / total) * 100).toFixed(2));
}