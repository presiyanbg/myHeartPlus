import { useParams } from "react-router-dom";

const DoctorsProfile = () => {
  const { id } = useParams();
  console.log(id);

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