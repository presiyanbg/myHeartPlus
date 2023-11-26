'use client';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { LINKS } from "../../constants/links";
import { Link } from '@nextui-org/react';
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

const NavigationLinksDropdown = () => {
    const t = useTranslations();

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

            <DropdownMenu aria-label="Dynamic Actions" items={LINKS}>
                {(item) => (
                    <DropdownItem
                        key={uuid()}
                        textValue={item.title}>
                        <Link href={item.url}
                            className="text-gray-800">
                            {t(item.title)}
                        </Link>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default NavigationLinksDropdown;