'use client';
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionItem, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";

type Props = {
    title: string,
}

const Filter = (props: Props) => {
    const t = useTranslations();

    return (
        <div className="pb-5">
            <Accordion>
                <AccordionItem key="1"
                    aria-label="Accordion 1"
                    subtitle={t('Press to expand')}
                    title={props.title}
                    indicator={({ isOpen }) => (isOpen ? <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> : <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>)}
                >
                    <div className="grid grid-cols-3 gap-4 pb-4">
                        <Input
                            label="Search"
                            variant="bordered"
                            type="text"
                            className="max-w-xs col-span-2"
                            startContent={
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            }
                        />
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Filter;