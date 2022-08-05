import React, {useState} from 'react';

export const Menu = (props) => {

  return (
    <div className="flex justify-center w-full ">
     
      <button onClick={() => props.setCardState("songCard")} className="m-5 p-1 bg-gray-900 text-align rounded-lg text-center text-3xl text-white">
         <h3 >Song</h3>
       </button>

      <button onClick={() => props.setCardState("artistCard")} className="m-5 p-1 bg-gray-900 text-align rounded-lg text-center text-3xl text-white" >
        <h3 >Artist</h3>
      </button>

      <button onClick={() => props.setCardState("gigCard")} className="m-5 p-1 bg-gray-900 text-align rounded-lg text-center text-3xl text-white">
        <h3 >Gigs</h3>
      </button>
  
    </div>
  );
};