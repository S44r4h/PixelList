import { useEffect } from "react";
import GameListSection from "./GamesListSection";
import { UseGamesContext } from "../../hooks/useGamesContext";
import { toast } from "react-toastify";

export default function UserGameList() {
  const { games, dispatch } = UseGamesContext();

  /* GET ALL GAME-LISTS */
  useEffect(() => {
    async function getWishList() {
      const response = await fetch(`http://localhost:5050/usergames`, {
        credentials: "include",
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const json = await response.json();
      dispatch({ type: "SET_GAMES", payload: json });
    }
    getWishList();
    return;
  }, []);

  /* DELETE METHOD WISHLIST & PLAYEDLIST*/
  const handleDelete = async (id, list) => {
    const response = await fetch(
      `http://localhost:5050/usergames/${list}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: `DELETE_FROM_${list}`, payload: json });
      toast.success("game deleted");
    }
  };

  const handleEdit = async (id, list) => {
    const response = await fetch(
      `http://localhost:5050/usergames/${list}/${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: `SWITCH_FROM_${list}`, payload: json });
      toast.success(`game switched from ${list}`);
    } else {
      toast.error(json.message);
    }
  };

  return (
    <div>
      {games && (
        <GameListSection
          title="Wishlist"
          listName="wishList"
          games={games.wishList}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {games && (
        <GameListSection
          title="PlayedList"
          listName="playedList"
          games={games.playedList}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
