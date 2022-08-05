import React, { useState } from 'react';


export const ArtistCard = (props) => {
 
    return (
     <div data-automation="artistCard" className="tracking-widest m-5 p-3 bg-gray-900 rounded-lg w-60 text-3xl text-white">
     <p>Artist: {props.artist}</p>
     <br />
     <p>Top Tracks: 1. 2. 3. 4. 5. </p>
     <br />
     <p>Social Media</p>
     </div>
     
    )
}