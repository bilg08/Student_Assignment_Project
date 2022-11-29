import { setCookie } from "cookies-next";
import { useState } from "react";
import { instance } from "../components/Layout";
import {
	useIsAgainGetDatas,
	useIsUserLoggedContext,
	useUserContext
} from "../context";
import loginStyles from "../styles/login.module.css";
import UserProfile from "./profile";

const LoginPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [userInput, setUserInput] = useState({});
	const { isLoggedIn, setIsLoggedIn } = useIsUserLoggedContext();
	const { setIsAgainGetDatas } = useIsAgainGetDatas();
	const { setUser, user } = useUserContext();
	if (isLoggedIn) return <UserProfile />;
	function takeUserInput(e: any) {
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	}
	async function login() {
		await instance
      .post("/users/login", userInput)
      .then(async (response) => {
        await setUser(response.data.data);
        setCookie("userId", response.data.data._id);
        await setCookie("token", response.data.token);
        await setIsAgainGetDatas((e: any) => !e);

        setIsLoggedIn(true);
		location.reload()
      });
	}

	async function signUp() {
		try {
			await instance.post("/users/register", userInput)
        .then(async (response) => {
          await setUser(response.data.data);
          await setCookie("token", response.data.token);
          setCookie("userId", response.data.data._id);
          await setIsAgainGetDatas((e: any) => !e);
          setIsLoggedIn(true);
		location.reload()

        });
		} catch (error) {}
	}
	return (
		<div className={loginStyles.section}>
			<div className={loginStyles.color}>
				<div className={loginStyles.color1}></div>
				<div className={loginStyles.color2}></div>
				<div className={loginStyles.color3}></div>
			</div>
			<div className={loginStyles.box}>
				<div className={loginStyles.square}>
					<div className={loginStyles.square1}></div>
					<div className={loginStyles.square2}></div>
					<div className={loginStyles.square3}></div>
					<div className={loginStyles.square4}></div>
					<div className={loginStyles.square5}></div>
				</div>
				{isLogin && (
					<div className={loginStyles.container}>
						<div className={loginStyles.form}>
							<h2>Нэвтрэх</h2>
							<form onSubmit={(e) => e.preventDefault()}>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										type='text'
										placeholder='ИМайл'
										name='email'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										name='password'
										type='password'
										placeholder='Нууц үг'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onClick={(e) => {
											login();
										}}
										type='submit'
										value='Нэвтрэх'
									/>
								</div>
								<p className={loginStyles.forget}>Нууц үгээ мартсан</p>
								<p
									onClick={() => {
										setUserInput({});
										setIsLogin(false);
									}}
									className={loginStyles.forget}>
									Шинэ хэрэглэгч?{" "}
									<button style={{ color: "#804fb3" }}>Бүртгүүлэх</button>
								</p>
							</form>
						</div>
					</div>
				)}

				{!isLogin && (
					<div className={loginStyles.container}>
						<div className={loginStyles.form}>
							<h2>Бүртгүүлэх</h2>
							<form onSubmit={(e) => e.preventDefault()}>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										type='text'
										placeholder='Таны Овог'
										name='FirstName'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										type='text'
										placeholder='Таны нэр'
										name='LastName'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<select
										placeholder='Сургууль'
										style={{
											width: "100%",
											background: "rgba(255,255,255,0.2)",
											border: "none",
											outline: "none",
											padding: "10px 20px",
											borderRadius: "35px",
											borderWidth: "1px",
											borderStyle: "solid",
											borderColor: "rgba(255,255,255,0.5)",
											borderRight: "1px solid rgba(255,255,255,0.2)",
											borderBottom: "1px solid rgba(255,255,255,0.2)",
											fontSize: "16px",
											letterSpacing: "1px",
											color: "#fff",
											boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
										}}
										name='School'
										id=''
										onChange={takeUserInput}>
										<option value=''>Сургууль</option>
										<option value='NUM'>NUM</option>
										<option value='UFE'>UFE</option>
										<option value='MUST'>MUST</option>
									</select>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										type='text'
										placeholder='Түвшин'
										name='level'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										name='email'
										type='email'
										placeholder='И-мэйл'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onChange={takeUserInput}
										name='password'
										type='password'
										placeholder='Нууц үг'
									/>
								</div>
								<div className={loginStyles.inputBox}>
									<input
										onClick={(e) => {
											signUp();
										}}
										type='submit'
										value='Бүртгүүлэх'
									/>
								</div>
								<p
									onClick={() => setIsLogin(true)}
									className={loginStyles.forget}>
									Би өмнө нь бүртгүүлчихсэн{" "}
									<button style={{ color: "#804fb3" }}>Нэвтрэх</button>
								</p>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default LoginPage;
