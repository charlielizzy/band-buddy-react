import React, {useState} from 'react';

export const Menu = (props) => {

  return (
    <div className="flex justify-between flex-col w-full">
     
      <button onClick={() => props.setCardState("songCard")} className={`border-[0.5px] my-1 uppercase p-4 text-xs hover:bg-[#D8D8D8] hover:bg-opacity-20 hover:border-0 ${props.planetState === "overview" ? "bg-[#6D2ED5] border-none hover:bg-[#6D2ED5] hover:bg-opacity-100" : ""}` } >
         <h3 >Song</h3>
       </button>

      <button onClick={() => props.setCardState("artistCard")} className={`border-[0.5px] my-1 uppercase p-4 text-xs hover:bg-[#D8D8D8] hover:bg-opacity-20 hover:border-0 ${props.planetState === "internal" ? "bg-[#6D2ED5] border-none hover:bg-[#6D2ED5] hover:bg-opacity-100" : ""}` } >
        <h3 >Artist</h3>
      </button>

      <button onClick={() => props.setCardState("gigCard")} className={`border-[0.5px] my-1 uppercase p-4 text-xs hover:bg-[#D8D8D8] hover:bg-opacity-20 hover:border-0 ${props.planetState === "geology" ? "bg-[#6D2ED5] border-none hover:bg-[#6D2ED5] hover:bg-opacity-100" : ""}` } >
        <h3 >Gigs</h3>
      </button>
  
    </div>
  );
};
