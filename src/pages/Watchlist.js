import { Link } from "react-router-dom";
import Header from "../component/Common/Header";
import Button from "../component/Common/Button";

function Watchlist() {
 
  return (
    <div>
      <Header />
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <Link to="/dashboard">
                <Button 
                text={"Dashboard"}
                onClick={()=>console.log("Btn click")}/>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Watchlist;
