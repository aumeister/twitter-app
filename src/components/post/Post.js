import { Delete } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import "./post.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (err) {
			console.log(err);
		}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};
	const deletePost = async () => {
		try {
			await axios.delete("/posts/" + post._id, {
				data: {
					userId: currentUser._id
				}
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`profile/${user.username}`}>
							<img
								src={user.profilePicture || PF + "/person/noAvatar.png"}
								alt=""
								className="postProfileImg"
							></img>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					{(post.userId === currentUser._id) && (<div className="postTopRight">
						<span><Delete title='Delete post' onClick={deletePost}></Delete></span>
					</div>)
					}

				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={post.img} alt=""></img>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							className="postLikeIcon"
							onClick={likeHandler}
							src={PF + "/person/like.png"}
							alt=""
						></img>
						<span className="likeCounter">{like} people like it</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}
