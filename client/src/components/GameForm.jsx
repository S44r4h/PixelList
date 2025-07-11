import Select from "react-select";
import { useState } from "react";
import { UseGamesContext } from "../hooks/useGamesContext";
import { genreOptions } from "../data/genreOptions";
import { toast } from "react-toastify";

export default function GameForm() {
  const { dispatch } = UseGamesContext();

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#2a2e37",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#d1d5db" // valittu
        : state.isFocused
        ? "#f3f4f6" // hover
        : "#e5e6e6", // normaali
      color: "#1f2937",
    }),
  };

  const [Gameform, SetGameform] = useState({
    title: "",
    platform: [],
    genre: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    response = await fetch("http://localhost:5050/editgames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Gameform),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      SetGameform({
        title: "",
        platform: [],
        genre: "",
      });
      dispatch({ type: "CREATE_GAME", payload: json });
      toast.dark("game added");
    }
  };

  const handleChange = (selected) => {
    SetGameform({ ...Gameform, genre: selected });
  };

  const handlecheckBox = (selected) => {
    const value = selected.target.value;
    const isChecked = selected.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      SetGameform({ ...Gameform, platform: [...Gameform.platform, value] });
    } else {
      //Remove unchecked item from checkList
      SetGameform({
        ...Gameform,
        platform: Gameform.platform.filter((item) => item !== value),
      });
    }
  };

  return (
    <div>
      <form className="h-100 grid place-items-center" onSubmit={handleSubmit}>
        {/* Form component */}
        <fieldset className="fieldset w-full max-w-md bg-base-300 border border-base-300 p-6 rounded-box">
          <legend className="fieldset-legend">Add games</legend>

          <label className="fieldset-label">Name</label>
          <input
            name="title"
            type="text"
            className="input w-full"
            placeholder="title"
            required="required"
            maxlength="20"
            value={Gameform.title}
            onChange={(e) =>
              SetGameform({ ...Gameform, title: e.target.value })
            }
          />

          <label className="fieldset-label">Platform</label>
          <div class="flex items-center">
            <input
              type="checkbox"
              name="PC"
              className="checkbox checkbox-primary"
              value="PC"
              checked={Gameform.platform.includes("PC")}
              onChange={handlecheckBox}
            />
            <label for="default-checkbox-1" class="ms-2 text-sm">
              PC
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              name="ps5"
              className="checkbox checkbox-primary"
              value="ps5"
              checked={Gameform.platform.includes("ps5")}
              onChange={handlecheckBox}
            />
            <label for="default-checkbox-2" class="ms-2 text-sm">
              Playstation 5
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              name="switch_2"
              className="checkbox checkbox-primary"
              value="switch_2"
              checked={Gameform.platform.includes("switch_2")}
              onChange={handlecheckBox}
            />
            <label for="default-checkbox-2" class="ms-2 text-sm">
              Nintendo Switch 2
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              name="xboxone"
              className="checkbox checkbox-primary"
              value="xboxone"
              checked={Gameform.platform.includes("xboxone")}
              onChange={handlecheckBox}
            />
            <label for="default-checkbox-2" class="ms-2 text-sm">
              Xbox One
            </label>
          </div>

          <label className="fieldset-label">genre</label>
          <Select
            isMulti
            name="colors"
            options={genreOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
            value={Gameform.genre}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary mt-4">
            Add game
          </button>
        </fieldset>
      </form>
    </div>
  );
}
