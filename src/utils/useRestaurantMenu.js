import React, { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [menuData, setMenuData] = useState(null);
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch menu");
      }

      const json = await response.json();
      console.log(json);
      setResInfo(json?.data.cards[2]?.card?.card?.info);
      const menuItems =
        json?.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (card) =>
            card.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
        );
      console.log("Menu Items:", menuItems);
      setMenuData(menuItems);
    } catch (err) {
      console.error(err);
    }
  };

  return { resInfo, menuData, setMenuData, setResInfo };
};

export default useRestaurantMenu;
