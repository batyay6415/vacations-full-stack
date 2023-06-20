import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import { Button } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import authService from "../../../Services/AuthService";

function EditVacation(): JSX.Element {
  authService.isAdmin();

  const params = useParams();
  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const [vacation, setVacation] = useState<VacationModel>();

  useEffect(() => {
    const id = +params.vacationId;
    vacationService
      .getOneVacation(id)
      .then((responseVacation) => {
        const startDate = new Date(responseVacation.startDate);

        // Extract the date parts from the start date
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, "0");
        const day = String(startDate.getDate()).padStart(2, "0");

        const formattedStartDate = `${year}-${month}-${day}`; // "yyyy-MM-dd"
        const endDate = new Date(responseVacation.endDate);

        // Extract the date parts from the start date
        const yearE = endDate.getFullYear();
        const monthE = String(endDate.getMonth() + 1).padStart(2, "0");
        const dayE = String(endDate.getDate()).padStart(2, "0");

        const formattedEndDate = `${yearE}-${monthE}-${dayE}`; // "yyyy-MM-dd"

        setValue("vacationId", responseVacation.vacationId);
        setValue("destination", responseVacation.destination);
        setValue("description", responseVacation.description);
        setValue("startDate", formattedStartDate);
        setValue("endDate", formattedEndDate);
        setValue("price", responseVacation.price);
        setVacation(responseVacation);
      })

      .catch((err) => notifyService.error(err));
  }, []);

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];

      await vacationService.updateVacation(vacation);
      notifyService.success("Vacation has been updated");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="EditVacation">
      <form onSubmit={handleSubmit(send)}>

        <h2>Edit Vacation</h2>

        <input type="hidden" {...register("vacationId")} />

        <label>destination:</label>
        <input type="text" className="EditInput"{...register("destination")}/>

        <label>description:</label>
        <textarea maxLength={300} className="EditTextarea" {...register("description")}/>

        <label>start on</label>
        <input type="date" className="EditInput" {...register("startDate")}/>

        <label>end on</label>
        <input type="date" className="EditInput" {...register("endDate")}/>

        <label>price</label>
        <input type="number" className="EditInput" {...register("price")}
          min={0} max={10000} step="0.01"/>

        <label>Image</label>
        <input type="file" accept="image/*" {...register("image")}/>

        <img src={vacation?.imageUrl} alt="" />

        <Button type="submit" className="BtnAdd" startIcon={<DriveFileRenameOutlineIcon />}>
          Edit</Button>

        <div>
          <NavLink to="/vacations">Cancel</NavLink>
        </div>
      </form>
    </div>
  );
}

export default EditVacation;
