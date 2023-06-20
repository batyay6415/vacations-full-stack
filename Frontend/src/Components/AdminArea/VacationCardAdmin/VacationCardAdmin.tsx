import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeIcon from "@mui/icons-material/Mode";
import "./VacationCardAdmin.css";
import { Button } from "@mui/material";

interface VacationCardAdminProps {
  vacation: VacationModel;
}

function VacationCardAdmin(props: VacationCardAdminProps): JSX.Element {
  function formatDate(dateStr: string) {
    const dateObj = new Date(dateStr);
    const dateString = dateObj.toLocaleDateString("en-GB");
    return `${dateString}`;
  }

  const navigate = useNavigate();

  async function deleteMe(id: number) {
    try {
      const ok = window.confirm("Are you sure?");
      if (!ok) return;

      await vacationService.deleteVacation(id);
      notifyService.success("Vacation has been deleted");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="VacationCardAdmin">
      <NavLink to={"/vacations/edit/" + props.vacation?.vacationId}>
        Edit
        <ModeIcon fontSize="small" />
      </NavLink>
      <span> </span>
      <Button
        size="small"
        onClick={() => {
          deleteMe(props.vacation.vacationId);
        }}
      >
        <DeleteSweepIcon fontSize="small" />
        Delete
      </Button>
      <img src={props.vacation.imageUrl} alt="" />
      <div className="Details">
        <p className="Destination">{props.vacation.destination}</p>
        <span className="Dates">
          <CalendarMonthIcon fontSize="small" />
          {formatDate(props.vacation.startDate)} -{" "}
          {formatDate(props.vacation.endDate)}
        </span>
        <textarea defaultValue={props.vacation.description}></textarea>
        <p className="Price">${props.vacation.price}</p>
      </div>
    </div>
  );
}

export default VacationCardAdmin;
