import SideNav from "../components/SideNav";
import Gamesgrid from "./games-grid";
import HerodashBoard from "./hero-dashboard";

export default function DashBoard() {
    return (
        <div>
        <HerodashBoard />
        <Gamesgrid />
        </div>
    )
}