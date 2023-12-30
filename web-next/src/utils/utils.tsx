/**
 * Get element classes conditionally 
 * 
 * @param args boolean
 * @returns string
 */
export const classNames = (...args: any[]): string => {
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
export const changeOpacityOnScroll = (elem: React.RefObject<HTMLDivElement>, toggle: boolean, mode: 'opacity' | 'background', maxOpacity?: number): void => {
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
export const scrollToElement = (elemSelector: string, horizontal?: number): void => {
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
 * @returns array
 */
export const arrayOrderByProp = (array: any[], key: string, reverse: boolean = false): any[] => {

    /** Compare function */
    const compare = (a: any, b: any) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
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
 * @returns object
 */
export const copyObject = (object: any): any => {
    return JSON.parse(JSON.stringify(object));
}

/**
 * Build address to string 
 * 
 * @param addresses array of string -- Example: [...address_1, address_2]
 * @param divider string -- Divider used to join the array of addresses
 * @returns string
 */
export const buildAddress = (addresses: string[], divider: string = ','): string => {
    let build = '';

    addresses.forEach(address => {
        if (address?.length) {
            build += address + divider + ' ';
        }
    });

    return build;
}

/**
 * Calculate percentage 
 * 
 * @param total number | any 
 * @param current number | any
 * @returns number
 */
export const calculatePercentage = (total: number | any, current: number | any): number => {
    total = Number(total);
    current = Number(current);

    return Number(((current / total) * 100).toFixed(2));
}

/**
 * Filter only unique objects in array
 * 
 * @param array any[] 
 * @param sort boolean - Flag if you want array to be sorted 
 * @returns any[]
 */
export const arraySimpleUnique = (array: any[], sort: boolean = false): any[] => {
    if (!array || !array.length) return [];

    array = array.filter((value: any, index: number) => {
        return array.indexOf(value) === index;
    });

    if (sort) {
        return array.sort(arraySimpleSort);
    }

    return array;
}

/**
 * Sort simple array
 * 
 * @param a any
 * @param b any
 * @returns number
 */
export const arraySimpleSort = (a: any, b: any): number => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

/**
 * Generate random color 
 * 
 * @returns string 
 */
export const generateColor = (): string => {
    return '#' + Math.random().toString(16).substr(-6);
}

/**
 * Parse date from database 
 * 
 * @param dateString string
 * @param format string | undefined : D - Date, T - Time, DT - Date and time
 * @returns string
 */
export const parseDateAndTime = (dateString: string, format?: string): string => {
    const dateObj = new Date(dateString);
    let parsedDate = '';

    if (!(dateObj instanceof Date)) return '';

    switch (format) {
        case 'D':
            parsedDate = '' + dateObj?.toLocaleDateString();
            break;
        case 'T':
            parsedDate = '' + dateObj?.toLocaleTimeString();
            break;
        case 'DT':
            parsedDate = '' + dateObj?.toLocaleDateString() + ' ' + dateObj?.toLocaleTimeString();
            break;

        default:
            parsedDate = '' + dateObj?.toLocaleDateString();
            break;
    }

    return parsedDate;
}

/**
 * Format number to locale price format 
 * 
 * @param value string | number - Price to be formatted
 * @returns string - Formatted price
 */
export const formatCurrency = (value: string | number): string => {
    if (!value) {
        value = Number(0);
    }

    if (typeof value == 'string') {
        value = Number(value);
    }

    value = (value).toLocaleString("en-US", { style: "currency", currency: "USD" });

    return value;
}

/**
 * 
 * @param element Input element
 * @param value - Value to be inserted into the input
 */
export const setNativeValue = (element: any, value: any): void => {
    if (!element?.dispatchEvent) return;

    if (!value || value == undefined || value == null) {
        value = '';
    }

    const lastValue = element.value;
    const tracker = element._valueTracker;
    const event: any = new Event("input", { target: element, bubbles: true } as EventInit);

    element.value = value;
    event.simulated = true;

    if (tracker) {
        tracker.setValue(lastValue);
    }

    element.dispatchEvent(event);
}

/**
 * Check if two objects are the same
 * 
 * @param objA any - Object A 
 * @param objB any - Object B
 * @returns boolean
 */
export const checkSameObjects = (objA: any, objB: any): boolean => {
    if (!objA || !objB) return false;

    let same = true;

    Object.keys(objA).forEach((key: string) => {
        if (objA[key] != objB[key]) {
            same = false;
        }
    });

    return same;
}