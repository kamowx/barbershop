import { branches } from "../data/branches";
import { masters } from "../data/masters";
import { services } from "../data/services";
import { useEffect, useState } from "react";
import Bottomnav from "../components/bottomnav";

function Booking() {

    // ФИЛИАЛ

    const local = localStorage.getItem("branchId");
    const id = JSON.parse(local);

    const [branch, setBranch] = useState({});

        useEffect(() => {
        const id = localStorage.getItem("id");

        if (!id) {
            window.location.href = "/";
        }
    }, []);



    // ВСЕ ТАЛОНЫ

    const localTickets = localStorage.getItem("tickets");

    const tickets = localTickets
        ? JSON.parse(localTickets)
        : [];


    // ПОЛУЧ ТЕКУЩ ФИЛИАЛ

    useEffect(() => {

        const data = branches.find(
            (item) => item.id === id
        );

        if (!data) {
            window.location.href = "/home";
            return;
        }

        setBranch(data);

    }, []);

 const Install = (ticketId) => {

    const localTickets = localStorage.getItem("tickets");

    const tickets = localTickets
        ? JSON.parse(localTickets)
        : [];

    // Удаляем только выбранный талон
    const newTickets = tickets.filter(
        (ticket) => ticket.id !== ticketId
    );

    // Сохраняем оставшиеся талоны
    localStorage.setItem(
        "tickets",
        JSON.stringify(newTickets)
    );

    // Обновляем страницу
    window.location.reload();
};


    return (

        <div className="body1">

            <div className="homePage fade1">


                <h2>
                    {branch.branch}
                </h2>


                <img
                    className="photo-branch"
                    src={branch.avatar}
                    alt={branch.branch}
                />


                <p>
                    {branch.city}
                </p>


                <h2 className="queueTitle">
                    Моя очередь
                </h2>


                <a href="/getqueue">

                    <button className="getQueue">
                        Получить очередь
                    </button>

                </a>


                {/*
                    ВСЕ ТАЛОНЫ
             */}

                {tickets.map((ticket) => {

                    // МАСТЕР ЭТОГО ТАЛОНА

                    const master = masters.find(
                        (item) => item.id === ticket.masterId
                    );


                    // ФИЛИАЛ ЭТОГО ТАЛОНА

                    const ticketBranch = branches.find(
                        (item) => item.id === ticket.branchId
                    );


                    // УСЛУГИ ЭТОГО ТАЛОНА

                    const selectedServiceList = services.filter(
                        (item) =>
                            (ticket.services || []).includes(item.id)
                    );


                    // ЦЕНА ЭТОГО оДного  ТАЛОНА

                    const totalPrice = selectedServiceList.reduce(
                        (sum, item) => sum + item.price,
                        0
                    );


                    return (

                        <div
                            className="ticket"
                            key={ticket.id}
                        >


                            <div className="ticketTop">

                                <h3>
                                    Ваш талон
                                </h3>

                                <div className="number">
                                    A-{ticket.id}
                                </div>

                            </div>


                            <div className="line"></div>


                            <div className="info">


                                {/* 
                                    ДАТА
                               */}

                                <div>

                                    <span>

                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >

                                            <path
                                                d="M1.6665 10.0002C1.6665 6.85747 2.64281 4.30981 3.61913 3.3335C5.19047 3.3335 8.33317 3.3335H11.6665C14.8092 3.3335 16.3805 3.3335 17.3569 4.30981C18.3332 5.28612 18.3332 6.85747 18.3332 10.0002V11.6668C18.3332 14.8095 18.3332 16.3809 17.3569 17.3572C16.3805 18.3335 14.8092 18.3335 11.6665 18.3335H8.33317C5.19047 18.3335 3.61913 18.3335 2.64281 17.3572C1.6665 16.3809 1.6665 14.8095 1.6665 11.6668V10.0002Z"
                                                stroke="#363062"
                                                strokeWidth="1.5"
                                            />

                                        </svg>

                                        Дата

                                    </span>

                                    <b>
                                        2026
                                    </b>

                                </div>


                                {/* 
                                    ВРЕМЯ
                            */}

                                <div>

                                    <span>
                                         Время
                                    </span>

                                    <b>
                                        {ticket.time || "Не выбрано"}
                                    </b>

                                </div>


                                {/* 
                                    МАСТЕР
                                */}

                                <div>

                                    <span>
                                         Мастер
                                    </span>

                                    <b>
                                        {master?.name || "Не выбран"}
                                    </b>

                                </div>


                                {/* 
                                    УСЛУГИ
                               */}

                                <div>

                                    <span>
                                         Услуга
                                    </span>

                                    <div>

                                        {selectedServiceList.map((item) => (

                                            <p key={item.id}>

                                                <b>
                                                    {item.name}
                                                </b>

                                                <span>
                                                    {item.price} сом
                                                </span>

                                            </p>

                                        ))}

                                    </div>

                                </div>


                                {/* 
                                    МЕСТО
                                 */}

                                <div>

                                    <span>
                                         Место
                                    </span>

                                    <b>
                                        {ticketBranch?.branch || "Не выбран"}
                                    </b>

                                </div>


                                {/* 
                                    ЦЕНА
                              */}

                                <div>

                                    <span>
                                         Цена
                                    </span>

                                    <big>
                                        <big>

                                            <b>
                                                {totalPrice} сом
                                            </b>

                                        </big>
                                    </big>

                                </div>


                            </div>


                            <div className="status">
                                Ваша
                            </div>

                            <button onClick={() => Install(ticket.id)} className="logout">
                                Отменить
                            </button>



                        </div>

                    );

                })}


                {/*
                    СЛЕД ИНФОРМАЦИЯ
            */}

                <div className="queueCard">

                    <h3>
                        Текущая очередь
                    </h3>

                    <p>
                        Сейчас обслуживается: <b>A-021</b>
                    </p>

                    <p>
                        Перед вами: <b>3 человека</b>
                    </p>

                </div>


                <Bottomnav />

            </div>

        </div>

    );
}

export default Booking;
