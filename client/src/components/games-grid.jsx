import { content } from "../data/frontPageGrid.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Gamesgrid() {
  /* Add games to browser */
  const [games, setGames] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getGames() {
      const response = await fetch(`http://localhost:5050/editgames/`);
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
    const response = await fetch(`http://localhost:5050/usergames/${e}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    } else {
      toast.dark(`game added to WishList`);
    }
  };

  //add text center etc.
  const boxStyle =
    "rounded-box h-80 p-10   flex flex-col items-start bg-base-200  border-base-300 ";

  return (
    <div className="pt-20">
      <h1 className="text-3xl p-2">Recently added</h1>
      <div className="grid md:grid-cols-4 grid-rows-2 gap-3">
        {[...games]
          .reverse()
          .slice(0, 4)
          .map((item, i) => (
            <div className="card bg-base-100 shadow-sm">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title"> {item.title}</h2>
                <div className="flex flex-wrap gap-1">
                  {item.platform.map((platform, i) => (
                    <div key={i} className="badge badge-outline">
                      {platform}
                    </div>
                  ))}
                </div>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => {
                      addToWishList(item._id);
                    }}
                    className="btn btn-primary"
                  >
                    Add to wishList
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <h1 className="text-3xl p-2">Coming Soon</h1>
      <div className="grid md:grid-cols-4 grid-rows-1 gap-4">
        {content.map((item, i) => (
          <div key={i} className={`${boxStyle} bg-[url(${item.imageUrl})]`}>
            <h2 className="text-3xl font-bold pb-2">{item.title}</h2>
            <p className="text-lg">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
