import react from "react";
import "./style.css";
import TemporaryDrawer from "./drawer";
import Button from "../Button";
import { Link } from "react-router-dom";
function Header(){
    return(
        <div className="navbar">
            <h1 className="logo">
                CryptoTracker<span style={{color:"var(--blue)"}}>.</span>
            </h1>
            <div className="links">
                <Link to="/">
                    <p className="link">Home</p>
                </Link>
                <Link to="compare">
                    <p className="link">Compare</p>
                </Link>
                <Link to="/watchlist">
                    <p className="link">WatchList</p>
                </Link>
                <Link to="/dashboard">
                    {/* <p className="link">Dashboard</p> */}
                    <Button 
                    text={"Dashboard"} 
                    // outlined = {true}
                    onClick={()=>console.log("Btn click")}/>
                </Link>
            </div>
            <div className="mobile-drawer">
                <TemporaryDrawer />
            </div>
        </div>
    );
}

export default Header;