import { useParams } from "react-router-dom";

const DoctorsProfile = () => {
  const { id } = useParams();

  return (
    <div className="wrapper">
      <div className="page">
        <div className="page--title">
          Doctor
        </div>
      </div>
    </div>
  )
}

export default DoctorsProfile;