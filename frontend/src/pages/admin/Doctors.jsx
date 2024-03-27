import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import { useState, useEffect } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Getting the Response");
      if (response.data.status) {
        setDoctors(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        message.success(response.data.message);
        // window.location.reload();
        console.log(response.data.message);
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" ? (
            <button
              className="p-2 bg-colorFour rounded-lg font-semibold text-white text-center"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="p-2 bg-colorOne rounded-lg font-semibold text-white text-center">
              Decline
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="m-3 text-center font-semibold text-colorThree leading-normal tracking-normal text-lg">All Interviewers</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
