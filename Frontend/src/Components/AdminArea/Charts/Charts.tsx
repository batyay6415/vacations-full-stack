import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import vacationService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/VacationModel";
import { Bar } from "react-chartjs-2";
import {} from "chart.js/auto";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router-dom";

function Charts(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAdmin()) {
      navigate("/vacations");
    }
  }, []);

  const getAllVacations = async () => {
    const vacations = await vacationService.getAllVacations();
    return vacations;
  };

  const [vacation, setVacations] = useState<VacationModel[]>([]);
  useEffect(() => {
    getAllVacations()
      .then((vacations) => setVacations(vacations))
      .catch((err) => console.log(err.message));
  }, []);

  const [vacationFollowers, setVacationFollowers] = useState<number>(0);
  useEffect(() => {
    let sum = 0;
    vacation.forEach((v) => (sum += v.followersCount));
    setVacationFollowers(sum);
  }, [vacation]);

  const data = {
    labels: vacation.map((v) => v.destination),
    datasets: [
      {
        label: "Followers Count",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,)",
        data: vacation.map((v) => v.followersCount),
      },
    ],
  };

  // CSV data configuration
  const csvData = vacation.map((v) => ({
    Destination: v.destination,
    Followers: v.followersCount,
  }));

  // CSV filename
  const csvFilename = "vacation_data.csv";

  return (
    <div className="Charts">
      <div className="chartContainer">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            layout: {
              padding: {
                top: 50,
                left: 100,
                right: 100,
                bottom: 0,
              },
            },
          }}
        />

        <div className="chartInfo">
          <h1>Imported information:</h1>
          <p>Total number of vacations: {vacation.length}</p>
          <p>Total number of followers: {vacationFollowers}</p>
          <br />
          <CSVLink data={csvData} filename={csvFilename}>
            Download CSV
          </CSVLink>
          <br />
          <br />
          <NavLink to="/vacations">Back</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Charts;
