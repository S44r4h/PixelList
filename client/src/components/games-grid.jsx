import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Gamesgrid({ title, showAllGames }) {
  /* Add games to browser */
  const [games, setGames] = useState([]);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getGames() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/editgames/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const games = await response.json();
      setGames(games);
    }
    getGames();
    return;
  }, [games.length]);

  /* ADD SELECTED GAME TO WISHLIST */
  const addToWishList = async (e) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usergames/addwishlist/${e}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    } else {
      toast.success(`game added to WishList`);
    }
  };

  /* ADD SELECTED GAME TO playedList */
  const addToPlayedList = async (e) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usergames/addplayed/${e}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    } else {
      toast.success(`game added to PlayedList`);
    }
  };

  let gamesSize = showAllGames ? games.length : 4;

  return (
    <div className="pt-20">
      <h1 className="text-3xl p-2">{title}</h1>
      <div className="divider divider-primary"></div>
      <div className="grid md:grid-cols-4 grid-rows-2 gap-3">
        {[...games]
          .reverse()
          .slice(0, gamesSize)
          .map((item) => (
            <div className="card bg-base-300 shadow-sm">
              <figure>
                <img
                  src="../assets/Placeholder_600x400.webp"
                  alt="game-image"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title"> {item.title}</h2>
                <div className="flex flex-wrap gap-1">
                  {item.platform.map((platform, i) => (
                    <div key={i} className="badge badge-soft badge-primary">
                      {platform}
                    </div>
                  ))}
                </div>

                <div className="card-actions justify-end">
                  <details className="dropdown">
                    <summary className="btn btn-primary m-1">
                      Add to list
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li>
                        <a
                          onClick={() => {
                            addToWishList(item._id);
                          }}
                        >
                          wishlist
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            addToPlayedList(item._id);
                          }}
                        >
                          played
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
