'use client';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { LINKS } from "../../constants/links";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const NavigationLinksDropdown = () => {
    const t = useTranslations();
    const router = useRouter();

    // Change page
    const handleClick = (e: any, link: string) => {
        e.preventDefault();
        router.push(link);
    }

    /**
     * Display only links marked with topLink flag
     */
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button color="default" isIconOnly aria-label="user-menu" variant="bordered">
                    <FontAwesomeIcon icon={faBars} />
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="User dropdown" items={LINKS}>
                {(item) => (
                    <DropdownItem
                        key={uuid()}
                        textValue={item.title}
                        onClick={e => handleClick(e, item.url)}>
                        <span className="text-gray-800" >
                            {t(item.title)}
                        </span>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default NavigationLinksDropdown;