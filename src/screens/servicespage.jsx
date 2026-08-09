import { useState } from "react";
import { services } from "../data/services";
import { masters } from "../data/masters";

function Servicespage() {

      

    const [selectedServices, setSelectedServices] = useState([]);

    const localMaster = localStorage.getItem("selectedMaster");
    const selectedTime = localStorage.getItem("selectedTime");
    const masterId = JSON.parse(localMaster);

    const localBranch = localStorage.getItem("branchId");
    const branchId = JSON.parse(localBranch);

    // Находим тот который выбрал мастера
    const selectedMaster = masters.find(
        (item) => item.id === masterId
    );

    // Получаем услуги выбранного мастера
    const branchServices = services.filter(
        (item) => item.masterId === masterId
    );


    // Выбор / отмена ус
    function SelectService(serviceId) {

        if (selectedServices.includes(serviceId)) {

            // если выбрал услугу то отмен если нажать
            setSelectedServices(
                selectedServices.filter(
                    (id) => id !== serviceId
                )
            );

        } else {

            // Добав услугу
            setSelectedServices([
                ...selectedServices,
                serviceId
            ]);

        }
    }


    function GetTicket() {

        if (selectedServices.length === 0) {
            alert("Выберите услугу");
            return;
        }

        const localTickets = localStorage.getItem("tickets");

        const tickets = localTickets
            ? JSON.parse(localTickets)
            : [];

        const newTicket = {
            id: tickets.length + 1,
            masterId: masterId,
            time: selectedTime,
            services: selectedServices,
            branchId: branchId
        };

        tickets.push(newTicket);

        localStorage.setItem(
            "tickets",
            JSON.stringify(tickets)
        );

        alert("Талон успешно получен!");

        window.location.href = "/booking";
    }


    return (
        <div className="body1">

            <div className="homePage fade1">

                <h2 className="getTitle2">
                    Выберите услугу
                </h2>

                <p className="getSubtitle2">
                    Доступные услуги мастера
                </p>


                {/* ВЫБРАННЫЙ МАСТЕР */}

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

                        {branchServices.map((item) => (

                            <div
                                key={item.id}

                                className={
                                    selectedServices.includes(item.id)
                                        ? "timeCard2 selected"
                                        : "timeCard2"
                                }

                                onClick={() =>
                                    SelectService(item.id)
                                }
                            >

                                <span>
                                    {item.name}
                                </span>

                                <b>
                                    {item.price} сом
                                </b>

                            </div>

                        ))}

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
                            {selectedMaster?.name || "Не выбран"}
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Время
                        </span>

                        <b>
                            {selectedTime || "Не выбран"}
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Услуга
                        </span>

                        <b>

                            {selectedServices.length > 0

                                ? selectedServices
                                    .map((id) =>
                                        branchServices.find(
                                            (item) => item.id === id
                                        )?.name
                                    )
                                    .join(", ")

                                : "Не выбрано"
                            }

                        </b>

                    </div>

                    <div className="previewRow2">

                        <span>
                            Общая Сумма :
                        </span>

                        <b>
                            {selectedServices.reduce((total, id) => {
                                const service = services.find(
                                    (item) => item.id === id
                                );

                                return total + (service?.price || 0);
                            }, 0)} сом
                        </b>

                    </div>

                </div>


                {/* КНОПКА */}

                <button
                    className="createTicket2"
                    onClick={GetTicket}
                >
                    Выбрать услугу
                </button>


                <button
                    className="backTicket2"
                    onClick={() => {
                        window.location.href = "/timepage";
                    }}
                >
                    Назад
                </button>

            </div>

        </div>
    );
}

export default Servicespage;
