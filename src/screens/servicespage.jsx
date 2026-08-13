import { useState } from "react";
import { services } from "../data/services";
import { masters } from "../data/masters";
import { users } from "../data/users";

function Servicespage() {

    const [selectedServices, setSelectedServices] = useState([]);


    // =========================
    // ПОЛЬЗОВАТЕЛЬ
    // =========================

    const localUser =
        localStorage.getItem("id");

    const userId =
        JSON.parse(localUser);

    const currentUser =
        users.find(
            (user) => user.id === userId
        );

    const bookingId =
        currentUser?.bookingId;


    // =========================
    // МАСТЕР
    // =========================

    const localMaster =
        localStorage.getItem("selectedMaster");

    const masterId =
        JSON.parse(localMaster);


    // =========================
    // ФИЛИАЛ
    // =========================

    const localBranch =
        localStorage.getItem("branchId");

    const branchId =
        JSON.parse(localBranch);


    // =========================
    // ДАТА
    // =========================

    const dateKey =
        `selectedDate_${bookingId}_${masterId}_${branchId}`;

    const selectedDate =
        localStorage.getItem(dateKey);


    // =========================
    // ВРЕМЯ
    // =========================

    const timeKey =
        selectedDate
            ? `selectedTime_${bookingId}_${masterId}_${branchId}_${selectedDate}`
            : "";


    const selectedTime =
        timeKey
            ? localStorage.getItem("selectedTime")
            : "";


    // =========================
    // МАСТЕР
    // =========================

    const selectedMaster =
        masters.find(
            (item) => item.id === masterId
        );


    // =========================
    // УСЛУГИ МАСТЕРА
    // =========================

    const branchServices =
        services.filter(
            (item) =>
                item.masterId === masterId
        );


    // =========================
    // ВЫБОР УСЛУГИ
    // =========================

    function SelectService(serviceId) {

        // Если услуга уже выбрана
        if (selectedServices.includes(serviceId)) {

            setSelectedServices([]);

        } else {

            // Можно выбрать только одну услугу
            setSelectedServices([
                serviceId
            ]);

        }

    }


    // =========================
    // СОЗДАНИЕ ТАЛОНА
    // =========================

    function GetTicket() {

        if (!bookingId) {

            alert(
                "Пользователь не найден"
            );

            return;
        }


        if (!selectedDate) {

            alert(
                "Дата не выбрана"
            );

            return;
        }


        if (!selectedTime) {

            alert(
                "Время не выбрано"
            );

            return;
        }


        if (selectedServices.length === 0) {

            alert(
                "Выберите услугу"
            );

            return;
        }


        // =========================
        // ПОЛУЧАЕМ СТАРЫЕ ТАЛОНЫ
        // =========================

        const localTickets =
            localStorage.getItem("tickets");


        const tickets =
            localTickets
                ? JSON.parse(localTickets)
                : [];


        // =========================
        // НОВЫЙ ТАЛОН
        // =========================

        const newTicket = {

            id: Date.now(),

            bookingId: bookingId,

            userId: userId,

            masterId: masterId,

            branchId: branchId,

            date: selectedDate,

            time: selectedTime,

            services: selectedServices,

            status: "Ваша"
        };


        // =========================
        // ДОБАВЛЯЕМ ТАЛОН
        // =========================

        tickets.push(newTicket);


        // =========================
        // СОХРАНЯЕМ
        // =========================

        localStorage.setItem(
            "tickets",
            JSON.stringify(tickets)
        );


        alert(
            "Талон успешно получен!"
        );


        // Очищаем выбранную услугу
        // чтобы можно было получить
        // следующий талон

        setSelectedServices([]);


        // Переходим в Booking

        window.location.href =
            "/booking";

    }


    // =========================
    // JSX
    // =========================

    return (

        <div className="body1">

            <div className="homePage fade1">

                <h2 className="getTitle2">
                    Выберите услугу
                </h2>


                <p className="getSubtitle2">
                    Доступные услуги мастера
                </p>


                {/* МАСТЕР */}

                <div className="masterCard2">

                    <img
                        src={selectedMaster?.avatar}
                        alt={selectedMaster?.name}
                    />


                    <div className="masterInfo2">

                        <h3>
                            {selectedMaster?.name}
                        </h3>


                        <p>
                            {selectedMaster?.role}
                        </p>

                    </div>

                </div>


                {/* УСЛУГИ */}

                <div className="timeBlock2">

                    <label className="formLabel2">
                        Выберите услугу
                    </label>


                    <div className="timeList2">

                        {branchServices.map(
                            (item) => (

                                <div

                                    key={item.id}

                                    className={
                                        selectedServices.includes(
                                            item.id
                                        )
                                            ? "timeCard2 selected"
                                            : "timeCard2"
                                    }

                                    onClick={() =>
                                        SelectService(
                                            item.id
                                        )
                                    }

                                >

                                    <span>
                                        {item.name}
                                    </span>


                                    <b>
                                        {item.price} сом
                                    </b>

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* ПРЕДПРОСМОТР */}

                <div className="previewTicket2">

                    <h3>
                        Ваша запись
                    </h3>


                    <div className="previewRow2">

                        <span>
                            Мастер
                        </span>


                        <b>
                            {
                                selectedMaster?.name ||
                                "Не выбран"
                            }
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Дата
                        </span>


                        <b>
                            {
                                selectedDate ||
                                "Не выбрана"
                            }
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Время
                        </span>


                        <b>
                            {
                                selectedTime ||
                                "Не выбрано"
                            }
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Услуга
                        </span>


                        <b>

                            {
                                selectedServices.length > 0

                                    ? branchServices.find(
                                        (item) =>
                                            item.id ===
                                            selectedServices[0]
                                    )?.name

                                    : "Не выбрано"
                            }

                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Общая Сумма :
                        </span>


                        <b>

                            {
                                selectedServices.length > 0

                                    ? branchServices.find(
                                        (item) =>
                                            item.id ===
                                            selectedServices[0]
                                    )?.price

                                    : 0
                            } сом

                        </b>

                    </div>

                </div>


                {/* КНОПКА */}

                <button
                    className="createTicket2"
                    onClick={GetTicket}
                >

                    Получить талон

                </button>


                <button
                    className="backTicket2"

                    onClick={() => {

                        window.location.href =
                            "/timepage";

                    }}

                >

                    Назад

                </button>

            </div>

        </div>

    );

}

export default Servicespage;