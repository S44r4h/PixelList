import {content}  from "../data/frontPageGrid.js";


export default function Gamesgrid() {
    //add text center etc.
    const boxStyle = "rounded-box h-80 p-10   flex flex-col items-start bg-base-200  border-base-300 ";

    return (
        <div className="pt-20">
        <h1 className="text-3xl p-2">New and trending</h1>
        <div className="grid md:grid-cols-4 grid-rows-1 gap-4">
        
           {content.map((item, i) => (
                           <div  key={i} className={`${boxStyle} bg-[url(${item.imageUrl})]` }>
                               <h2 className="text-3xl font-bold pb-2">{item.title}</h2>
                               <p className="text-lg">{item.text}</p>
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