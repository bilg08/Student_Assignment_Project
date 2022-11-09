import {useEffect, useState } from 'react'
import loginStyles from '../styles/login.module.css'
import axios from 'axios'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    const [userInput, setUserInput] = useState({});
  function takeUserInput(e:any) {
      setUserInput({ ...userInput, [e.target.name]: e.target.value })
      console.log(userInput)
  }
  async function login() {
    // await axios
    //   .post("http://localhost:8000/user/login", userInput)
    //   .then((response) => {
    //     console.log(response)
    //   }).catch(err => alert('iim hereglegc baihgui'));
  }
   
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('success');
        // await axios
        // .post("http://localhost:8000/user/register",userInput)
        // .then((response) => {
        //   console.log(response)
        // });
        
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
                {isLogin &&
                        <div className={loginStyles.container}>
                        <div className={loginStyles.form}>
                            <h2>Нэвтрэх</h2>
                            <form>
                                <div className={loginStyles.inputBox}>
                                    <input onChange={takeUserInput} type="text" placeholder="Нэр" name='name'/>
                                </div>
                                <div className={loginStyles.inputBox}>
                                    <input onChange={takeUserInput} name="password" type="password" placeholder="Нууц үг"/>
                                </div>
                                <div className={loginStyles.inputBox}>
                                    <input onClick={() => login()} type="submit" value="Нэвтрэх"/>
                                </div>
                            <p className={loginStyles.forget}>Нууц үгээ мартсан
                                </p>
                                <p onClick={() => setIsLogin(false)} className={loginStyles.forget}>Шинэ хэрэглэгч? <button style={{ color: '#804fb3' }}>Бүртгүүлэх</button>
                                </p>
                            </form>
                        </div>
                    </div>}
    
                    {!isLogin &&
                        <div className={loginStyles.container}>
                        <div className={loginStyles.form}>
                            <h2>Бүртгүүлэх</h2>
                            <form onSubmit={(e)=>{handleSubmit(e)}}>
                                <div className={loginStyles.inputBox}>
                                    <input onChange={takeUserInput} type="text" placeholder="Таны нэр"/>
                                </div>
                                <div className={loginStyles.inputBox}>
                                    <input onChange={takeUserInput} name="text" type="text" placeholder="Сургууль"/>
                                </div>
                                <div className={loginStyles.inputBox}>
                                    <input onChange={takeUserInput} name="email" type='email' placeholder="И-мэйл" />
                                </div>
                                <div className={loginStyles.inputBox}>
                                    <input onChange={takeUserInput} name="password" type="password" placeholder="Нууц үг" />
                                </div>
                                <div className={loginStyles.inputBox}>
                                    <input  type="submit" value="Бүртгүүлэх" />
                                </div>
                            <p onClick={()=>setIsLogin(true)}  className={loginStyles.forget}>Би өмнө нь бүртгүүлчихсэн <button style={{color:'#804fb3'}}>Нэвтрэх</button>
                                </p>
                            </form>
                        </div>
                    </div>}
                
            </div>
        </div>
    )
}
export default LoginPage