import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="p-2 cursor-pointer flex justify-center flex-col items-center w-full"
        onClick={() => navigate(`/doctor/booking/${doctor._id}`)}
      >
        <div className="w-full text-center font-bold text-xl text-colorThree mt-2">
          {doctor.firstName} {doctor.lastName}
        </div>
        <div className="w-full text-center mt-2">
          <p className="text-md font-semibold text-colorThree">{doctor.specialization}</p>
        </div>

        <div className="w-full text-center mt-2">
          <p className="text-md font-semibold text-colorThree">
            {doctor.timingOne} - {doctor.timingTwo}
          </p>
        </div>

        <div className="w-full text-center mt-2">
          <p className="text-md font-semibold text-colorThree">{doctor.experience}</p>
        </div>
        <div className="w-full text-center mt-2">
          {" "}
          <p className="text-md font-semibold text-colorThree">{doctor.email}</p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
