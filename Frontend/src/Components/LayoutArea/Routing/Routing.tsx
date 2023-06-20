import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Charts from "../../AdminArea/Charts/Charts";


function Routing(): JSX.Element {
    return (
        <Routes>

            {/* Register: */}
            <Route path="/register" element={<Register />} />

            {/* Login: */}
            <Route path="/login" element={<Login />} />

            {/* vacations List */}
            <Route path="/vacations" element={<VacationsList />} />

            {/* vacations Charts */}
            <Route path="/vacations/charts" element={<Charts />} />

            {/* add new vacation vacation */}
            <Route path="/vacations/new" element={<AddVacation />} />

             {/* Edit Vacation Page: */}
             <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />

            <Route path="/" element={<Navigate to="/register" />} />

            <Route path="*" element={<PageNotFound />} />
            
        </Routes>
    );
    
}

export default Routing;
