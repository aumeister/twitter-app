import "./sidebar.css";
import { RssFeed, Bookmarks, Group, Chat } from "@material-ui/icons";

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
					<li className="sidebarListItem">
						<Group></Group>
						<span className="sidebarListItemText">Group</span>
					</li>
					<li className="sidebarListItem">
						<Chat></Chat>
						<span className="sidebarListItemText">Chat</span>
					</li>
				</ul>
				<hr className="sidebarHr"></hr>
			</div>
		</div>
	);
}
