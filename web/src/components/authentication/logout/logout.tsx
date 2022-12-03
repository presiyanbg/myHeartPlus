import LogoutLogic from "./logoutLogic";

const Logout = () => {
  const logic = LogoutLogic();

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
            Log out
          </button>
        </div>
      </div>
    </form>
  )
}

export default Logout;