import React from "react";
import { img_url } from "../utils/constants";

const RestaurantCard = (props)=>{
  return (
    <div className = "w-[250px] m-5 p-2.5 hover:cursor-pointer hover:shadow-[0px_0px_5px_0px_grey] hover:rounded-[10px]">
      <img className="w-full h-[200px] rounded-[10px]" src={img_url + props.cloudinaryImageId} alt = "res-img"/>
      <h3 className="m-[3px] text-xl font-medium font-sans">{props.name}</h3>
      <p className="m-0.5 text-[15px]">{props.cuisines.join(", ")}</p>
      <p className="m-0.5 text-[15px]">{props.avgRating} stars</p>
    </div>
  )
}

//higher order components(are pure functions, we are not modifying behaviour of RestuarantCard, we are just adding/enhancing on top of it(Example:- passing extra propes, adding label etc)) -> Takes a component and returns another component with additional functionality

// input -> RestaurantCard, Output -> RestaurantCard with promoted label
export const usePromotedlabel = (ResCard)=>{
  return (props)=>{ // a componet basically returns jsx

    return (

    <div>
      <label className="absolute bg-black text-white rounded-lg p-1 m-2">promoted</label>
      <ResCard {...props}/>
    </div>
    )
  }
}
export default RestaurantCard;
