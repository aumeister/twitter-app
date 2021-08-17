import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);

	const handleClick = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
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
					<form className="loginBox" onSubmit={handleClick}>
						<input
							required
							ref={email}
							type="email"
							placeholder="Email"
							className="loginInput"
						></input>
						<input
							required
							minLength="6"
							ref={password}
							type="password"
							placeholder="Password"
							className="loginInput"
						></input>
						<button disabled={isFetching} className="loginButton">
							{isFetching ? (
								<CircularProgress color="#fff" size="20px"></CircularProgress>
							) : (
								"Log In"
							)}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<Link to={"/register"} className="linkButton">
							<button className="loginButton loginRegisterButton">
								{isFetching ? (
									<CircularProgress color="#fff" size="20px"></CircularProgress>
								) : (
									"Create a new account"
								)}
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
