import { UseGamesContext } from "../../hooks/useGamesContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function UserManagement() {
  const { games, dispatch } = UseGamesContext();

  /* GET USERS */
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/usermanagement`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const json = await response.json();
      dispatch({ type: "SET_GAMES", payload: json });
    }
    getRecords();
    return;
  }, []);

  /* DELETE USER */

  const deleteUser = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usermanagement/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      dispatch({ type: "DELETE_GAME", payload: json });
      toast.success("user deleted");
    }
  };

  /* Change role */

  const changeRole = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usermanagement/${id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const json = await response.json();
    if (response.ok) {
      console.log(json);
      dispatch({ type: "UPDATE_GAME", payload: json });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>delete user</th>
            <th>switch role</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((g, i) => {
              return (
                <tr key={i}>
                  <th>{g._id}</th>
                  <td>{g.name}</td>
                  <td>{g.email}</td>

                  {g.role === "user" ? (
                    <>
                      <td className="bg-primary text-primary-content">
                        {g.role}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="bg-secondary text-primary-content ">
                        {g.role}
                      </td>
                    </>
                  )}
                  <td>
                    <button
                      aria-label="delete user"
                      className=" btn btn-error"
                      onClick={() => deleteUser(g._id)}
                    >
                      DELETE
                    </button>
                  </td>
                  <td>
                    <label className="flex items-center gap-2">
                      <span className="text-sm">User</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={g.role === "admin"}
                        onChange={() => changeRole(g._id)}
                      />
                      <span className="text-sm">Admin</span>
                    </label>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
