import React, { useEffect, useState , useContext} from "react";
import RestaurantCard, { usePromotedlabel } from "./RestaurantCard";
import resData from "../utils/mockdata";
import { API_URL } from "../utils/constants";
import ShimmerCard from "./ShimmerCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/userContext";
const Body = () => {
  const [resList, setResList] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [noResultFound, setNoResultFound] = useState(false);
  const [nextOffset, setNextOffset] = useState("");
  const userData = useContext(userContext);

  const RestaurantCardLabelled = usePromotedlabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (searchText.trim() === "") {
      setResList(allRestaurants);
      return;
    }

    const filteredList = allRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setResList(filteredList);
  }, [searchText, allRestaurants]);

  // const searchClickHandler = () => {
  //   if (searchText.trim() === "") {
  //     setResList(allRestaurants);
  //     return;
  //   }
  //   const filteredList = allRestaurants.filter((res) =>
  //     res.info.name.toLowerCase().includes(searchText.toLowerCase()),
  //   );
  //   setResList(filteredList);
  // };
  const fetchData = async () => {
    const data = await fetch("https://namastedev.com/api/v1/listRestaurants");
    const json = await data.json();
    console.log(json);
    setResList(
      json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setAllRestaurants(
      json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    // setNextOffset(json?.data?.pageOffset?.nextOffset);
  };

  const  isOnline  = useOnlineStatus();

  if(!isOnline) {
    return (
      <div className="offline">
        <h2>⚠️ You are offline</h2>
        <p>Please check your internet connection.</p>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="search" style={{ padding: "10px" }}>
        <input
          className="w-[30%] p-2.5 rounded-[5px] border border-gray-300"
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     searchClickHandler();
          //   }
          // }}
        />
        <button className="py-2.5 px-5 ml-2.5 rounded-[5px] border-1 border-gray-50 text-black cursor-pointer hover:bg-orange-400 hover:text-white" 
        // onClick={searchClickHandler}
        onClick={() => {
          if (searchText.trim() === "") {
            setResList(allRestaurants);
            return;
          }
        }}>
          🔍
        </button>
        <button
          className="py-2.5 px-5 ml-2.5 rounded-[5px] border border-gray-50 bg-green-100 hover:bg-green-200 text-black cursor-pointer"
          onClick={() => {
            const filteredList = allRestaurants.filter(
              (res) => res.info.avgRating > 4.5,
            );
            setResList(filteredList);
          }}>
          Top Rated
        </button>

        <input
          className="w-[30%] p-2.5 ml-2 rounded-[5px] border border-gray-300"
          type="text"
          placeholder="Change name through Context API"
          value={userData.loggedInUser}
          onChange={(e) => {
            userData.setLoggedInUser(e.target.value);
          }}
        />
      </div>

      {resList.length === 0 && searchText.trim() !== "" ? (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <h2 className="text-[28px] mb-2.5">🔍 Oops! No results found</h2>
          <p className="text-gray-500 text-lg">Try searching with another keyword.</p>
        </div>
      ) : resList.length === 0 ? (
        
        <ShimmerCard />
      ) : (
        <div className="flex flex-wrap w-[90%] mx-auto">
          {resList.map((res) => (
            <Link
              key={res.info.id}
              to={`/restaurants/${res.info.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {res.info.avgRating < 4.5 ? <RestaurantCardLabelled {...res.info}/> : <RestaurantCard {...res.info} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Body;
