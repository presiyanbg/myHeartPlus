'use client';
import LogoutLogic from "./logoutLogic";

import { useTranslations } from "next-intl";

const Logout = () => {
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12 text-center">
                    <button type="submit" className="btn bg-primary btn-lg text-white">
                        {t('Logout')}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Logout;