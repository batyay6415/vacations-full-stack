import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import VacationCardAdmin from "../../AdminArea/VacationCardAdmin/VacationCardAdmin";
import { NavLink } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { vacationsStore } from "../../../Redux/VacationsState";

function VacationsList(): JSX.Element {
  const navigate = useNavigate();

  // State for all vacations original:from back-end
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const [activeNow, setActiveNow] = useState<boolean>(false); // It is check if user click him to get only active vacations

  const [activeVacations, setActiveVacations] = useState<VacationModel[]>([]); // new array only active vacations

  const [checked, setChecked] = useState<boolean>(false);

  const [filterMyVacations, setFilterMyVacations] = useState<VacationModel[]>([]);

  const [vacationsNotStart, setVacationsNotStart] = useState<VacationModel[]>([]); // new array only not start

  const [notStart, setNotStart] = useState<boolean>(false);

  //pagination:
  const [currentPage, setCurrentPage] = useState<number>(1);

  const vacationsPerPage = 9;

  const indexOfLastVacation = currentPage * vacationsPerPage;

  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;

  const displayedVacations = vacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const displayFilterVacations = filterMyVacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const displayVacationsNotStart = vacationsNotStart.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const displayVacationsActive = activeVacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const totalPages = Math.ceil(vacations.length / vacationsPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const [numOfPage, setNumOfPage] = useState<number>();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Get all vacations only to login-- original array
  useEffect(() => {
    if (!authService.isLoggedIn()) {
      navigate("/login");
      return;
    } else {
      vacationService
        .getAllVacations()
        .then((dbVacations) => setVacations(dbVacations))
        .catch((err) => notifyService.error(err));

      const unsubscribe = vacationsStore.subscribe(() => {
        const duplicatedVacations = [...vacationsStore.getState().vacations];
        setVacations(duplicatedVacations);
      });

      setNumOfPage(Math.ceil(vacations.length / vacationsPerPage));
      if (checked) {
        setNumOfPage(Math.ceil(filterMyVacations.length / vacationsPerPage));
      }
      if (activeNow) {
        setNumOfPage(Math.ceil(activeVacations.length / vacationsPerPage));
      }
      if (notStart) {
        setNumOfPage(Math.ceil(vacationsNotStart.length / vacationsPerPage));
      }

      return () => unsubscribe();
    }
  }, []);

  async function handleActiveNowChange(event: any) {
    if (event.target.checked) {
      vacationService
        .getVacationsActive()
        .then((activeVacations) => {
          setActiveVacations(activeVacations);
          setActiveNow(true);
        })
        .catch((err) => notifyService.error(err));
    } else {
      vacationService
        .getAllVacations()
        .then((vacations) => {
          setVacations(vacations);
          setActiveNow(false);
        })
        .catch((err) => notifyService.error(err));
    }
  }

  async function filterVacations(event: any) {
    if (event.target.checked) {
      vacationService
        .getMyVacations()
        .then((filterMyVacations) => {
          setFilterMyVacations(filterMyVacations);
          setChecked(true);
        })
        .catch((err) => notifyService.error(err));
    } else {
      vacationService
        .getAllVacations()
        .then((vacations) => {
          setVacations(vacations);
          setChecked(false);
        })
        .catch((err) => notifyService.error(err));
    }
  }

  async function notStartVacation(event: any) {
    if (event.target.checked) {
      vacationService
        .getVacationsNotStart()
        .then((vacationsNotStart) => {
          setVacationsNotStart(vacationsNotStart);
          setNotStart(true);
        })
        .catch((err: any) => notifyService.error(err));
    } else {
      setNotStart(false);
      vacationService
        .getAllVacations()
        .then((vacations) => setVacations(vacations))
        .catch((err: any) => notifyService.error(err));
    }
  }

  return (
    <div className="VacationsList">
      {!authService.isAdmin() && (
        <>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            color="secondary"
            checkedIcon={<Favorite />}
            checked={checked}
            onChange={filterVacations}
            className="CheckBoxFilter"
          />
          <p className="MyVacations">My Vacations</p>

          <label className="vacationNotStart">
            <input
              type="checkbox"
              checked={notStart}
              onChange={notStartVacation}
            />
            Vacations Not-Start
          </label>

          {
            <div className="filterButton">
              <label className="vacationsActive">
                <input
                  type="checkbox"
                  checked={activeNow}
                  onChange={handleActiveNowChange}
                />
                Vacations Active Now
              </label>
            </div>
          }

          {activeNow &&
            displayVacationsActive.map((vac) => (
              <VacationsCard key={vac.vacationId} vacation={vac} />
            ))}

          {notStart &&
            displayVacationsNotStart.map((vac) => (
              <VacationsCard key={vac.vacationId} vacation={vac} />
            ))}

          {checked &&
            displayFilterVacations.map((v) => (
              <VacationsCard key={v.vacationId} vacation={v} />
            ))}

          {!activeNow &&
            !checked &&
            !notStart &&
            displayedVacations.map((v) => (
              <VacationsCard key={v.vacationId} vacation={v} />
            ))}

          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {authService.isAdmin() && (
        <>
          <NavLink to="/vacations/new" className="nav-link">
            <AddIcon className="nav-link" />
            Add Vacation
          </NavLink>

          <NavLink to="/vacations/charts" className="nav-link">
            <AssessmentIcon className="nav-link" fontSize="medium" />
            Reports
          </NavLink>

          {displayedVacations.map((v) => (
            <VacationCardAdmin key={v.vacationId} vacation={v} />
          ))}

          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VacationsList;
