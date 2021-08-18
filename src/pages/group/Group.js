import "./group.css";
import Topbar from "../../components/topbar/Topbar";
import Group from "../../components/group/Group";
import Message from "../../components/message/Message";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
	const [groups, setGroups] = useState([{}]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const socket = useRef();
	const { user } = useContext(AuthContext);
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getGroupMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);
	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user._id);
	}, [user]);

	useEffect(() => {
		const getGroups = async () => {
			try {
				const res = await axios.get("/group/" + user?._id);
				setGroups(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGroups();
	}, [user?._id]);
	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/messages/" + currentChat?._id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat?._id]);
	const createGroup = async () => {
		try {
			const groupName = prompt("Your group name?", "");
			await axios.post("/group", {
				senderId: user._id,
				groupName: groupName,
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	const joinGroup = async () => {
		try {
			const groupName = prompt("Group you want to join?", "");
			await axios.post("/group/add/" + user._id, {
				groupName: groupName,
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			coversationId: currentChat._id,
		};
		socket.current.emit("sendGroupMessage", {
			sender: user._id,
			text: newMessage,
			group: currentChat,
		});
		try {
			const res = await axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);
	return (
		<>
			<Topbar></Topbar>
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<button className="createGroup" onClick={createGroup}>
							Create a chat room
						</button>
						<button className="createGroup" onClick={joinGroup}>
							Join a chat room
						</button>
						{groups.map((group) => (
							<div key={group._id} onClick={() => setCurrentChat(group)}>
								<Group
									key={group._id}
									currentUser={group.groupName}
									group={group}
								></Group>
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages.map((message) => (
										<div key={message._id} ref={scrollRef}>
											<Message
												sender={message.sender}
												key={message._id}
												message={message}
												own={message.sender === user._id}
											></Message>
										</div>
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										className="chatMessageInput"
										placeholder="Write something"
										onChange={(e) => setNewMessage(e.target.value)}
										value={newMessage}
									></textarea>
									<button className="chatSubmitButton" onClick={handleSubmit}>
										Send
									</button>
								</div>
							</>
						) : (
							<span className="noConversationText">
								Open a conversation to start a chat ...
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
