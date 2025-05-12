
import Select from 'react-select'
import { useState } from "react";

export default function gameForm() {

    const customStyles = {
        control: (base) => ({
          ...base,
          backgroundColor: '#2a2e37',
        }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? '#d1d5db' // valittu
              : state.isFocused
              ? '#f3f4f6' // hover
              : '#e5e6e6', // normaali
            color: '#1f2937',
          }),
          
      };




      const options = [
        { value: 'action', label: 'Action' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'rpg', label: 'RPG' },
        { value: 'fps', label: 'First-Person Shooter' },
        { value: 'strategy', label: 'Strategy' },
        { value: 'simulation', label: 'Simulation' },
        { value: 'sports', label: 'Sports' },
        { value: 'racing', label: 'Racing' },
        { value: 'platformer', label: 'Platformer' },
        { value: 'horror', label: 'Horror' },
        { value: 'puzzle', label: 'Puzzle' },
        { value: 'multiplayer', label: 'Multiplayer' },
        { value: 'sandbox', label: 'Sandbox' },
        { value: 'indie', label: 'Indie' }
      ];

      const [Gameform, SetGameform] = useState({
          title: "",
          platform: [],
          genre: "",
        });

  
      //const [checked, setChecked] = useState(false) // Checkbox toggle

      const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('toimiiko?')

        let response;

        response = await fetch("http://localhost:5050/editgames", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Gameform),
           
          }
        );

        const data = await response.json();
        console.log(Gameform)
        console.log(data)
        window.location.reload();
      }

      const handleChange = (selected) => {
        SetGameform({...Gameform, genre: selected})}
    

      const handlecheckBox = (selected) => {
        const value = selected.target.value
        const isChecked = selected.target.checked

        if(isChecked) {
          //Add checked item into checkList
          SetGameform({...Gameform, platform: [...Gameform.platform, value]})
        } else {
          //Remove unchecked item from checkList
          SetGameform({...Gameform, platform: Gameform.platform.filter((item) => item !== value)});
        }
      }


      

    return (
      <div>
        <form className="h-100 grid place-items-center" onSubmit={handleSubmit}>
           

      {/* Form component */}
        <fieldset className="fieldset w-full max-w-md bg-base-200 border border-base-300 p-6 rounded-box">
          <legend className="fieldset-legend">Add games</legend>

          <label className="fieldset-label">Name</label>
          <input name="title"  type="text" className="input w-full" placeholder="title" required="required" onChange={(e) => SetGameform({...Gameform, title: e.target.value})} />

          <label className="fieldset-label">Platform</label>
          <div class="flex items-center">
          <input type="checkbox" name="PC" className="checkbox checkbox-primary" value="PC" onChange={handlecheckBox} />
            <label for="default-checkbox-1" class="ms-2 text-sm">PC</label>
          </div>
          <div class="flex items-center">
          <input type="checkbox" name="ps5" className="checkbox checkbox-primary" value="ps5" onChange={handlecheckBox}/>
          <label for="default-checkbox-2" class="ms-2 text-sm">Playstation 5</label>
         </div>
         <div class="flex items-center">
          <input type="checkbox" name="switch" className="checkbox checkbox-primary" value="switch"  onChange={handlecheckBox}/>
          <label for="default-checkbox-2" class="ms-2 text-sm">Nintendo Switch</label>
         </div>
         <div class="flex items-center">
          <input type="checkbox" name="xboxone" className="checkbox checkbox-primary" value="xboxone" onChange={handlecheckBox}/>
          <label for="default-checkbox-2" class="ms-2 text-sm">Xbox One</label>
         </div>
          

          <label className="fieldset-label">genre</label>
          <Select
     
           
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
            onChange={handleChange}
            
            />

          <button type="submit" className="btn btn-primary mt-4">Add game</button>

         

                


        </fieldset>
        </form>   
        </div>
    )
    
}