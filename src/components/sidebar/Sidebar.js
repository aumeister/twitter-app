import "./sidebar.css";
import { RssFeed, Bookmarks, Group, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<RssFeed></RssFeed>
						<span className="sidebarListItemText">Feed</span>
					</li>
					<li className="sidebarListItem">
						<Bookmarks></Bookmarks>
						<span className="sidebarListItemText">Bookmarks</span>
					</li>
					<Link style={{ textDecoration: "none", color: "#000" }} to={"/group"}>
						<li className="sidebarListItem">
							<Group></Group>
							<span className="sidebarListItemText">Group</span>
						</li>
					</Link>
					<Link
						style={{ textDecoration: "none", color: "#000" }}
						to={"/messenger"}
					>
						<li className="sidebarListItem">
							<Chat></Chat>
							<span className="sidebarListItemText">Chat</span>
						</li>
					</Link>
				</ul>
				<hr className="sidebarHr"></hr>
			</div>
		</div>
	);
}
