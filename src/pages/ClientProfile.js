import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import FormProfileModify from "./components/FormProfileModify";
import UpcomingBookingsProfile from "./components/UpcomingBookingsProfile";
import { useHistory } from "react-router-dom";
import BookingsProfile from "./components/BookingsProfile";
import FormProfileAddBooking from "./components/FormProfileAddBooking";

function ClientProfile() {
  const { id } = useParams();
  const [clientData, setClientData] = useState([]);
  const [clientDataBookings, setClientDataBookings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataClientResponse = await axios.get(apiRoute.clients + `/${id}`);
        setClientData(dataClientResponse.data);
        const dataBookingsResponse = await axios.get(
          apiRoute.bookings + `/history/${id}`
        );
        setClientDataBookings(dataBookingsResponse.data);
      } catch (error) {
        console.log(error);
        // error message notification
      }
    }
    fetchData();
  }, [id]);

  const handleDeleteClient = () => {
    deleteClient(clientData.clientId)
      .then(() => {
        history.push("/clients");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src="../../dist/img/avatar5.png"
                      alt="Userprofile"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {clientData.firstName} - {clientData.lastName}
                  </h3>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>E-mail</b> {clientData.email}
                    </li>
                    <li className="list-group-item">
                      <b>Phone</b> {clientData.phoneNo}
                    </li>
                  </ul>
                  <button
                    onClick={handleDeleteClient}
                    className="btn btn-danger btn-block"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card card-primary"></div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Bookings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#upcoming-bookings"
                        data-toggle="tab"
                      >
                        Upcoming Bookings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#add-booking"
                        data-toggle="tab"
                      >
                        Add Booking
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#modify-profile"
                        data-toggle="tab"
                      >
                        Modify Profile
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      <BookingsProfile
                        clientDataBookings={clientDataBookings}
                      />
                    </div>
                    <div className="tab-pane" id="upcoming-bookings">
                      <UpcomingBookingsProfile
                        clientDataUpcomingBookings={clientDataBookings.filter(
                          (items) => items.bookingStatus === "UPCOMING"
                        )}
                      />
                    </div>
                    <div className="tab-pane" id="modify-profile">
                      <FormProfileModify clientData={clientData} />
                    </div>
                    <div className="tab-pane" id="add-booking">
                      <FormProfileAddBooking clientId={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientProfile;

async function deleteClient(dataId) {
  try {
    let dataResponse = await axios.delete(apiRoute.clients, {
      data: { clientId: dataId },
    });
    return dataResponse.data;
  } catch (error) {
    console.log(error);
  }
}
