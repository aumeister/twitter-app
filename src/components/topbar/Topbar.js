import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Topbar = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="logo">Twitter</span>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="searchbar">
					<Search className="searchIcon"></Search>
					<input className="searchInput" placeholder="Search for..."></input>
				</div>
			</div>
			<div className="topbarRight">
				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture || PF + "/person/noAvatar.png"}
						alt=""
						className="topbarImg"
					></img>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
