import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { img_url, resBigImg } from "../utils/constants";
import RatingStar from "../utils/RatingStar";
import ResCategory from "./ResCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const { resInfo, menuData, setMenuData, setResInfo } =  useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

  const setShowIndexHandler = (index) => {
   
      setShowIndex(index === showIndex ? -1 : index);
    };


  console.log(resInfo);
  console.log(menuData);

  if (!resInfo) {
    return <ShimmerCard />;
  }

  return (
    <div className="w-8/12 m-auto my-7 flex flex-col ">
      <p className="text-sm text-gray-400 pb-5">
        Home/Noida1/
        <span className="font-bold text-gray-950">{resInfo.areaName}</span>
      </p>
      <h1 className="font-bold text-2xl mb-5">{resInfo.name}</h1>

      <div>
        <span className="pr-2.5 text-black font-semibold border-b-2 rounded-b-sm border-amber-600">
          order online
        </span>
        <span className="text-gray-400 pl-2.5 pr-2.5">Dineout</span>
      </div>

      <div className="w-9/12 h-74 rounded-[10px] overflow-hidden">
        <img
          src={img_url + resInfo.cloudinaryImageId}
          className="w-full h-full object-cover rounded-[10px]"
          alt="res-img"></img>
      </div>

      {/* <h3>{resInfo.cuisines.join(", ")}</h3> */}

      <p className="flex items-center mt-3 mb-5 font-semibold">
        <RatingStar />
        <span className="ml-1 mr-2.5">
          {resInfo.avgRating}({resInfo.totalRatingsString})
        </span>
        <span>{resInfo.costForTwo}</span>
      </p>

      <div className="">
        <input
          className="w-[90%] p-2.5 rounded-[5px] border border-gray-300 bg-gray-200 flex justify-center"
          type="text"
          placeholder="Search for dishes"
        />
      </div>

      {/* <h2>Menu</h2> */}

      <ul>
        {menuData &&
          menuData.map((item, idx) => {
            return <ResCategory data={item} key={idx} showItem ={idx === showIndex} setShowIndex={()=>{setShowIndexHandler(idx)}}/>;
          })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
