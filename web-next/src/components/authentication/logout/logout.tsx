'use client';
import { Button } from "@nextui-org/react";
import LogoutLogic from "./logoutLogic";

import { useTranslations } from "next-intl";

type Props = {
    displayLogin: () => void
}

const Logout = (props: Props) => {
    const logic = LogoutLogic();

    // Translations
    const t = useTranslations();

    /**
     * Handle form submit
     * 
     * @param event HTML Form submit event
     */
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        logic.logout();

        props.displayLogin();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-2">
                <div className="w-full pb-2">
                    <p>{`Saying goodbye is not the end, it's a new beginning filled with the promise of new adventures and opportunities. Farewell, and may our paths cross again on this journey called life!`}</p>
                </div>

                <div className="w-full text-right pb-2">
                    <Button color="primary" onClick={e => handleSubmit(e)}>
                        {t('Logout')}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Logout;