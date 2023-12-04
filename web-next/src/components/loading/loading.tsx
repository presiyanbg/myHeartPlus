'use client';
import { Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const Loading = () => {
    const t = useTranslations();

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen gap-4">
            <Spinner color="primary" />

            <span className="text-foreground">{t('Loading')}...</span>
        </div>
    )
}

export default Loading;