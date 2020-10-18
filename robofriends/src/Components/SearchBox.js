import React from 'react';

const searchBox = ({searchField,searchChange})=>{
  return (
    <div className="pa2">
      <input type="search" placeholder="Search Robots"
      className="pa3 ba" onChange={searchChange}/>
    </div>
  );
}
export default searchBox;