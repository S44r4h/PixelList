import { useEffect, useState } from "react";
import GameListSection from "./GamesListSection";

export default function UserGameList() {
  const [gameList, setgameList] = useState([]);

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
      const data = await response.json();
      setgameList(data);
    }
    getWishList();
    return;
  }, [gameList.length]);

  console.log(gameList);

  /* DELETE METHOD WISHLIST & PLAYEDLIST*/
  const handleDelete = async (id, list) => {
    console.log(list);
    const response = await fetch(
      `http://localhost:5050/usergames/${list}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const json = await response.json();

    if (response.ok) {
      //dispatch({ type: "DELETE_GAME", payload: json });
      console.log("nyt poistuu " + id);
    }
  };

  return (
    <div>
      <GameListSection
        title="Wishlist"
        listName="wishList"
        games={gameList.wishList}
        onDelete={handleDelete}
      />
      <GameListSection
        title="PlayedList"
        listName="playedList"
        games={gameList.playedList}
        onDelete={handleDelete}
      />
    </div>
  );
}
