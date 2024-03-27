import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/doctorAppointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setAppointments(response.data.data);
        message.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/updateStatus",
        {
          appointmentId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        message.success(response.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {record.date} &nbsp;
          {record.time}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex ">
          {record.status === "pending" && (
            <div>
              <button
                className="p-2 bg-colorFour mx-1"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="p-2 bg-colorOne"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Appointments of Doctors</h1>
      <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  );
};

export default DoctorAppointments;
