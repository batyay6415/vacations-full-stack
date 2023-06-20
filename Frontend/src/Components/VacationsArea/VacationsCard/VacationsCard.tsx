import VacationModel from "../../../Models/VacationModel";
import "./VacationsCard.css";
import followService from "../../../Services/FollowService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";

interface VacationsCardProps {
  vacation: VacationModel;
}

function VacationsCard(props: VacationsCardProps): JSX.Element {
  function formatDate(dateStr: string) {
    const dateObj = new Date(dateStr);
    const dateString = dateObj.toLocaleDateString("en-GB");
    return `${dateString}`;
  }

  function addFollow() {
    followService.AddFollow(props.vacation.vacationId);
  }

  function deleteFollow() {
    followService.deleteFollow(props.vacation.vacationId);
  }

  return (
    <div className="VacationsCard">
      <div className="CheckboxDiv">
        <label className="Switch">
          {props.vacation.isFollowing ? (
            <span className="Follow" onClick={deleteFollow}>
              ❤ Like
            </span>
          ) : (
            <span className="unFollow" onClick={addFollow}>
              ❤ Like
            </span>
          )}
        </label>
        <div className="DivFollowCount">
          <span className="TextCountFollow">
            {props.vacation.followersCount}
          </span>
        </div>
      </div>
      <img src={props.vacation.imageUrl} alt="" />

      <p className="Destination">{props.vacation.destination}</p>
      <span className="Dates">
        <CalendarMonthIcon fontSize="small" />
        {formatDate(props.vacation.startDate)} -{" "}
        {formatDate(props.vacation.endDate)}
      </span>

      <textarea defaultValue={props.vacation.description}></textarea>
      <p className="Price">${props.vacation.price}</p>
    </div>
  );
}

export default VacationsCard;
