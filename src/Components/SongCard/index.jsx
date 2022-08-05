import React, { useState } from 'react';


export const SongCard = (props) => {
 
    return (
     <div data-automation="songCard" className="tracking-widest m-5 p-3 bg-gray-900 rounded-lg w-60 text-3xl text-white">
     <img src={props.artwork}/>

     <p>Title: {props.title} </p>
     <br />
     <p>Artist: {props.artist}</p>
     <br />
     <p>Album: {props.album}</p>
     </div>
     
    )
}