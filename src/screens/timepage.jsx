import { useState } from "react";
import { time } from "../data/time";
import { masters } from "../data/masters";

function Timepage() {

 
    const [selectedTime, setSelectedTime] = useState("");

    // Получ выбр мастер
    const localMaster = localStorage.getItem("selectedMaster");
    const masterId = JSON.parse(localMaster);

    // Пол выб филиал
    const localBranch = localStorage.getItem("branchId");
    const branchId = JSON.parse(localBranch);

    // Находим мастера
    const selectedMaster = masters.find(
        (item) => item.id === masterId
    );

    // время мастера получ
    const branchTime = time.filter(
        (item) =>
            item.masterId === masterId &&
            item.branchId === branchId
    );

    function SelectTime(selected) {
        setSelectedTime(selected);
    }

    function GetTicket() {

        if (!selectedTime) {
            alert("Выберите время");
            return;
        }

        localStorage.setItem(
            "selectedTime",
            selectedTime
        );

        alert("Талон успешно получен!");

        window.location.href = "/servicespage";
    }

    return (
        <div className="body1">

            <div className="homePage fade1">

                <h2 className="getTitle2">
                    Выберите время
                </h2>

                <p className="getSubtitle2">
                    Доступное время для записи
                </p>


                {/* РЕЗ выбранного МАСтера */}

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


                {/* ВРЕМЯ */}

                <div className="timeBlock2">

                    <label className="formLabel2">
                        Выберите время
                    </label>

                    <div className="timeList2">

                        {branchTime.map((item) => (

                            <div
                                key={item.id}
                                className={
                                    selectedTime === item.time
                                        ? "timeCard2 selected"
                                        : "timeCard2"
                                }
                                onClick={() => SelectTime(item.time)}
                            >
                                {item.time}
                            </div>

                        ))}

                    </div>

                </div>



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
                            {selectedTime || "Не выбрано"}
                        </b>

                    </div>

                </div>



                <button
                    className="createTicket2"
                    onClick={GetTicket}
                >
                    Получить талон
                </button>


                <button
                    className="backTicket2"
                    onClick={() => {
                        window.location.href = "/getqueue";
                    }}
                >
                    Назад
                </button>

            </div>

        </div>
    );
}

export default Timepage;

