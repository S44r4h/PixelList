export default function GameListSection({
  title,
  games,
  onDelete,
  listName,
  onEdit,
}) {
  console.log(games);
  const trashCanIcon =
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0";
  const editIcon =
    "M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5";
  return (
    <div className="m-8">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">{title}</li>
        <div className="divider divider-neutral"></div>
        {/* games list käänteisessä järjestyksessä */}
        {games &&
          games.map((item, i) => (
            <li className="list-row" key={i}>
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://cdn-icons-png.flaticon.com/512/8952/8952199.png"
                />
              </div>
              <div>
                <div>{item.game.title}</div>
                <div className="text-xs text-gray-500">
                  date: {new Date(item.addedAt).toLocaleDateString()}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {item.game.platform.join(", ")}
                </div>
                <div className="font-semobold flex flex-wrap gap-1">
                  {item.game.genre.map((g, i) => (
                    <div className="badge badge-soft badge-primary" key={i}>
                      {g.label}
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  onDelete(item.game._id, listName);
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
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  onEdit(item.game._id, listName);
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
            </li>
          ))}
      </ul>
    </div>
  );
}
