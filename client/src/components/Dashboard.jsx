import Gamesgrid from "./games-grid";
import HerodashBoard from "./hero-dashboard";

export default function DashBoard() {
  return (
    <div>
      <HerodashBoard />
      <Gamesgrid title={"Recently added"} showAllGames={false} />
    </div>
  );
}
