import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { message } from "antd";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/getDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="m-3 text-center font-semibold text-colorFour leading-normal tracking-normal text-lg">
        Available Interviewers Now
      </h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => <DoctorList key={doctor} doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default Dashboard;
