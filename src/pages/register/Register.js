import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history = useHistory();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity("Passwords do not match");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("/auth/register", user);
				history.push("/login");
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginWrapperLeft">
					<h3 className="loginLogo">Tweeter</h3>
					<span className="loginDesc">
						Connect with your friends and the world around you on Tweeter
					</span>
				</div>
				<div className="loginWrapperRight">
					<form className="registerBox" onSubmit={handleClick}>
						<input
							placeholder="Username"
							required
							ref={username}
							className="loginInput"
						></input>
						<input
							placeholder="Email"
							type="email"
							required
							ref={email}
							className="loginInput"
						></input>
						<input
							placeholder="Password"
							type="password"
							minLength="6"
							required
							ref={password}
							className="loginInput"
						></input>
						<input
							placeholder="Password Again"
							type="password"
							required
							ref={passwordAgain}
							className="loginInput"
						></input>
						<button className="loginButton" type="submit">
							Sign Up
						</button>
						<Link to={"/login"} className="linkButton ">
							<button className="loginButton loginRegisterButton">Login</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
