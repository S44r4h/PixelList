import { useEffect, useState } from "react";
import { UseGamesContext } from "../../hooks/useGamesContext";
import UpdateGameForm from "./UpdateGameForm";
import { toast } from "react-toastify";

export default function GameList() {
  /* LIST ICONS PATH INFO */
  /* https://heroicons.com/ */
  const trashCanIcon =
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0";
  const editIcon =
    "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10";

  const { games, dispatch } = UseGamesContext();
  const [currentGame, setCurrentgame] = useState(null);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/editgames/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const json = await response.json();
      console.log(typeof json);
      console.log(json);
      dispatch({ type: "SET_GAMES", payload: json });
    }
    getRecords();
  }, []); // useEffect reagoi pelkkään games muutokseen

  /* DELETE */
  const handleDelete = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/editgames/${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      dispatch({ type: "DELETE_GAME", payload: json });
      toast.success("game deleted");
    }
  };

  /* UPDATE */

  const onEdit = async (game) => {
    setCurrentgame(game);
  };

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">Game List</li>
      {/* games list käänteisessä järjestyksessä */}
      {games &&
        [...games].reverse().map((item, i) => (
          <li className="list-row" key={i}>
            <div>
              <img
                alt="game-icon"
                className="size-10 rounded-box"
                src="https://cdn-icons-png.flaticon.com/512/8952/8952199.png"
              />
            </div>
            <div>
              <div>{item.title}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {item.platform && item.platform.join(",")}
              </div>
              <div className="font-semobold flex flex-wrap gap-1">
                {item.genre &&
                  item.genre.map((g, i) => (
                    <div className="badge badge-soft badge-primary" key={i}>
                      {g.label}
                    </div>
                  ))}
              </div>
            </div>
            <div class="tooltip" data-tip="delete">
              <button
                aria-label="delete"
                className="btn btn-square btn-ghost"
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d={trashCanIcon}></path>
                  </g>
                </svg>
              </button>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div class="tooltip" data-tip="edit">
              <button
                aria-label="edit"
                className="btn btn-square btn-ghost"
                onClick={() => {
                  document.getElementById("my_modal_3").showModal();
                  onEdit(item);
                }}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d={editIcon}></path>
                  </g>
                </svg>
              </button>
            </div>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <h1></h1>
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Edit game</h3>
                <UpdateGameForm
                  currentGame={currentGame}
                  setCurrentgame={setCurrentgame}
                />
                <p className="py-4">click on ✕ button to close</p>
              </div>
            </dialog>
          </li>
        ))}
    </ul>
  );
}
