import React from "react";
import { ApiRoutes } from "../routes";
import StatBox from "../components/StatBox";
import useRequest from "../api/apiUtil.js";
import LoadingSpinner from "../common/LoadingSpinner";
import { DashboardTable, formatDate } from "../components/Tables";

function DashboardHome() {
  const { apiData } = useRequest({
    url: ApiRoutes.dashboard,
  });
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          {!apiData && LoadingSpinner()}
          {apiData && (
            <div className="row">
              <StatBox
                dataName="New Clients"
                reportDate={apiData.reportDate}
                dataValue={apiData.newClients}
                dataColor="bg-warning"
                dataIcon="ion ion-person-add"
                dataLink="/clients"
              />
              <StatBox
                dataName="Upcoming Bookings"
                reportDate={apiData.reportDate}
                dataValue={apiData.totalUpcomingBookings}
                dataColor={"bg-info"}
                dataIcon="ion ion-cash"
                dataLink="/bookings"
              />
              <StatBox
                dataName="Confirmed Bookings"
                reportDate={apiData.reportDate}
                dataValue={apiData.totalConfirmedBookings}
                dataColor="bg-success"
                dataIcon="ion ion-stats-bars"
                dataLink="/bookings"
              />
              <StatBox
                dataName="Canceled Bookings"
                reportDate={apiData.reportDate}
                dataValue={apiData.totalCanceledBookings}
                dataColor="bg-danger"
                dataIcon="ion ion-stats-bars"
                dataLink="/bookings"
              />
            </div>
          )}
          <div className="card">
            <div className="card-header border-transparent">
              {apiData && (
                <h3 className="card-title">
                  {formatDate({ date: apiData.reportDate, option: "MONTH" })}{" "}
                  Bookings
                </h3>
              )}
            </div>
            {apiData && <DashboardTable tableData={apiData.bookingList} />}

            <div className="card-footer">
              <a href="/search" className="btn btn-sm btn-info float-left">
                Add New Booking
              </a>
              <a
                href="/bookings"
                className="btn btn-sm btn-secondary float-right"
              >
                View All Bookings
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
