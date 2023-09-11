import CollegePressLogo from "../assets/CollegePressLogo small.png"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const Nav = ({ username }) => {

    return (
        <nav>
            <div className="nav-logo-name">
                <img src={CollegePressLogo} />
                <Link to={`/PaperInventory/${username}`}>
                    <Button variant="text">Paper Inventory</Button>
                </Link>
            </div>
            <div className="nav-user-sign-out">
                <div>User: {username}</div>
                <Link to="/">
                    <Button variant="contained">Sign Out</Button>
                </Link>
            </div>

        </nav>
    )
}

export default Nav