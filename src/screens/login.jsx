import { useEffect, useState } from "react";
import { users } from "../data/users" 

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    function SignIn() {
        const user = users.find((u) => u.email === email);

        if (!user) {
            setErrorMessage('Пользователь с таким Email не найден');
        } else if (user.password !== password) {
            setErrorMessage('Неверный пароль');
        } else {
            setErrorMessage('');
            localStorage.setItem('id', JSON.stringify(user.id));
            window.location.href = '/home';
        }
    }

    useEffect(() => {
        const local = localStorage.getItem('id');
        if (local) {
            const id = JSON.parse(local);
            const user = users.find((user) => user.id === id);
            if (user !=undefined && user != null) {
                window.location.href = '/home';
            }
        }
    }, []);

    return (
        <div className="body1">
            {/* 3 страница */}
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
                                Пожалуйста, введите свои учетные данные ниже, чтобы получить доступ к своему аккаунту.
                            </p>
                        </div>

                        <div className="form">

                            <div className="inputBox">
                                <label>Электронная почта / Имя</label>
                                <input onChange={(e) => setEmail(e.target.value)}   type="email" placeholder="Введите ваш адрес электронной почты / имя" />
                            </div>

                            <div className="inputBox">
                                <label>Пароль</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Введите свой пароль" />
                            </div>

                            {errorMessage  && (
                                  <p className="forgot1">{errorMessage}</p>
                            )}

                            <p className="forgot">Забыли пароль?</p>

                        </div>

                        <button className="loginBtn" onClick={SignIn}>Авторизоваться</button>

                        <p className="register">
                            У вас нет аккаунта?
                            <span> Зарегистрироваться</span>
                        </p>
                    </div>

                </div>
        </div>
    );
}

export default Login;