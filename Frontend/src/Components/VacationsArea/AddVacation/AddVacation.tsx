import VacationModel from "../../../Models/VacationModel";
import "./AddVacation.css";
import vacationService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


function AddVacation(): JSX.Element {
  const { register, handleSubmit } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function add(vacation: VacationModel) {
    try {
      const now = new Date().toISOString().slice(0, 10);
      if (vacation.startDate < now) {
        notifyService.error("The Date passed");
        return;
      }
      if (vacation.endDate < vacation.startDate) {
        notifyService.error("Start Date must be early than End Date");
        return;
      }
      vacation.image = (vacation.image as unknown as FileList)[0];
      await vacationService.addNewVacation(vacation);
      notifyService.success("Vacation has been added");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="AddVacation Box">
      <form onSubmit={handleSubmit(add)}>
        <h1>Add Vacation</h1>

        <label>Destination</label>
        <input
          type="text"
          {...register("destination")}
          required
          minLength={3}
          maxLength={50}
        />

        <label>Description</label>
        <textarea
          maxLength={300}
          className="AddTextarea"
          {...register("description")}
          required
        />

        <label>Start On</label>
        <input type="date" {...register("startDate")} required />

        <label>End On</label>
        <input type="date" {...register("endDate")} required />

        <label>Price</label>
        <input
          type="number"
          {...register("price")}
          required
          min={0}
          max={10000}
          step="0.01"
        />

        <label>Image</label>
        <input type="file" accept="image/*" {...register("image")} required />

        <button>Add Vacation </button>
        <br />

        <div>
          <NavLink to="/vacations">Cancel</NavLink>
        </div>
      </form>
    </div>
  );
}

export default AddVacation;
