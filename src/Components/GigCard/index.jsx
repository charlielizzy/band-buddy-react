import React, { useState } from 'react';


export const GigCard = (props) => {
 
    return (
     <div data-automation="gigCard" className="tracking-widest m-5 p-3 bg-gray-900 rounded-lg w-60 text-3xl text-white">
     <p>Artist: {props.artist}</p>
     <br />
     <p>Upcoming shows</p>
     <br />
     <p>Map/locations</p>
     <br />
     <p>Buy tickets here</p>
     </div>
     
    )
}