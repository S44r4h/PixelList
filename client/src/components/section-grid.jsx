import {content}  from "../data/frontPageGrid.js";

export default function Section() {
    //add text center etc.
    const boxStyle = "rounded-box h-80 p-10   flex flex-col items-start bg-base-200  border-base-300 ";

    return (
     
        <div className="grid md:grid-cols-3 grid-rows-2 gap-4">
        
            {content.map((item, i) => (
                <div  key={i} className={`${boxStyle} bg-[url(${item.imageUrl})]  ${i === 0 || i === 3 ? 'md:col-span-2' : ''}` }>
                    <h2 className="text-3xl font-bold pb-2">{item.title}</h2>
                    <p className="text-lg">{item.text}</p>
                </div>
            ))}
        </div>
    
    )
}