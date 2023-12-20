'use client';
import Link from 'next/link';

import { v4 as uuid } from 'uuid';
import { Image } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { SidePanelItemType, SidePanelListType } from '@/ts/types';

type Props = {
    title: string,
    url: string
    data: SidePanelListType,
};

const SidePanelSmallList = (props: Props) => {
    const t = useTranslations();

    if (!props?.data?.length) return (<></>);

    return (
        <>
            <strong className="font-bold pb-2">{t(props.title)}:</strong>

            {
                props?.data?.map((item: SidePanelItemType) => {
                    return (
                        <Link href={`${props.url}/${item?.id}`}
                            key={uuid()}
                            className="pb-3 flex hover:text-blue-500 w-full">
                            {
                                !!(item?.image?.length) && (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
                                        alt={item.title}
                                        width={75}
                                        height={150}
                                        loading='lazy'
                                    />
                                )
                            }

                            <div className={!!(item?.image?.length) ? 'flex flex-col w-2/3 pl-3' : 'flex flex-col w-full'}>
                                <span className="truncate">
                                    {item.title}
                                </span>

                                <span className="truncate text-gray-400">
                                    {item.content}
                                </span>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    );
}

export default SidePanelSmallList;