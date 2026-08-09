import { useState } from "react";

function Sign() {


    return (
        <div className="body1">
            {/* Регистрация*/}
            <div className="loginPage fade1">

                <img
                    className="loginImg"
                    src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800"
                    alt=""
                />

                <div className="containerLogin">

                    <div className="titleBox">
                        <h1>Добро пожаловать 👋</h1>
                        <p>
                            Пожалуйста, введите свои учетные данные ниже, чтобы <b>Зарегистрироваться</b>.
                        </p>
                    </div>

                    <div className="form">

                        <div className="inputBox">
                            <label>Электронная почта / Имя</label>
                            <input type="email" placeholder="Введите ваш адрес электронной почты / имя" />
                        </div>

                        <div className="inputBox">
                            <label>Пароль</label>
                            <input type="password" placeholder="Введите свой пароль" />
                        </div>

                        <div className="inputBox">
                            <label>Подвердите пароль</label>
                            <input type="password" placeholder="Введите свой пароль" />
                        </div>

                        <p className="forgot"></p>

                    </div>


                    <button className="loginBtn" >Зарегистрироваться</button>

                 <a className="ii1" href="/login">  <p className="register">
                        У вас есть аккаунта?
                        <span>Авторизоваться</span>
                    </p></a> 
                </div>

            </div>
        </div>
    );
}

export default Sign;