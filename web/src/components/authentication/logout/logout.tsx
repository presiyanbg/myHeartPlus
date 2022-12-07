import { useEffect } from "react";
import LogoutLogic from "./logoutLogic";
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const logic = LogoutLogic();

  // Translations
  const { t } = useTranslation();

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