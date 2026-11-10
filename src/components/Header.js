import { useState , useContext} from "react";
import { logo_url } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/userContext";
import { useSelector } from "react-redux";
import SwiggyLogo from "../utils/SwiggyLogo";

const Header = (props)=>{
  
  const cartItems = useSelector((store) => store.cart.items);
  console.log("Cart items:", cartItems);

  const [LoginBtn, setLoginBtn] = useState("Login");
  const isOnline  = useOnlineStatus();
  console.log("isOnline:", isOnline);
   console.log("component rendered");
  console.log("LoginBtn:", LoginBtn);
  const data = useContext(userContext);
  
  return (
    <div className="px-[2%] flex justify-between items-center shadow-sm sticky top-0 bg-white z-50">
      <div className = "logoContainer">
        <SwiggyLogo/>
      </div>
      <div className="navItems">
        <ul className="flex py-6 ">
          <li className="px-5 py-2.5 text-xl cursor-pointer"><Link to="/">Home</Link></li>
          <li className="px-5 py-2.5 text-xl cursor-pointer"><Link to="/about">About</Link></li>
          <li className="px-5 py-2.5 text-xl cursor-pointer"><Link to="/contact">Contact</Link></li>
          <li className="px-5 py-2.5 text-xl cursor-pointer"><Link to="/cart">Cart({cartItems.length})</Link></li>
          <li className="px-5 py-2.5 text-xl cursor-pointer" onClick={() => {
            setLoginBtn(LoginBtn === "Login" ? "Logout" : "Login");
          }}>
            {LoginBtn}
          </li>
          <li className="px-5 py-2.5 text-xl cursor-pointer"><Link to="/instamart">Instamart</Link></li>
          <li className="px-5 py-2.5 text-xl cursor-pointer">{data.loggedInUser}</li>
          <li className="px-5 py-2.5 text-xl cursor-pointer">{isOnline ? "✅" : "🔴"}</li>
        </ul>
        
    </div>
    </div>
  );
}

export default Header;