import {content}  from "../data/frontPageGrid.js";
import { useEffect, useState } from "react";
import Record from "./Record.jsx";

export default function Gamesgrid() {

    /* Add games to browser */
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
      useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:5050/record/`);
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const records = await response.json();
          setRecords(records);
        }
        getRecords();
        return;
      }, [records.length]);




    //add text center etc.
    const boxStyle = "rounded-box h-80 p-10   flex flex-col items-start bg-base-200  border-base-300 ";

    return (
        <div className="pt-20">
        <h1 className="text-3xl p-2">New and trending</h1>
        <div className="grid md:grid-cols-4 grid-rows-1 gap-4">
        
           {records.map((item, i) => (
            <div className="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.level}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Add to list</button>
    </div>
  </div>
</div>
                       ))}
        </div>

        <h1 className="text-3xl p-2">Coming Soon</h1>
        <div className="grid md:grid-cols-4 grid-rows-1 gap-4">
        
           {content.map((item, i) => (
                           <div  key={i} className={`${boxStyle} bg-[url(${item.imageUrl})]` }>
                               <h2 className="text-3xl font-bold pb-2">{item.title}</h2>
                               <p className="text-lg">{item.text}</p>
                           </div>
                       ))}
        </div>

        </div>
    )
}