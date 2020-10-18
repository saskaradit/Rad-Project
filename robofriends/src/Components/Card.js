import React from 'react';


const card = ({name,email,id}) => {
  return(
    // <h1>Robofriends</h1>
    <div className="bg-light-green dib br3 pa3 ma2 grow shadow-5 tc">
      <img src={`https://robohash.org/${id}?200x200`} alt={name}></img>
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}
export default card;