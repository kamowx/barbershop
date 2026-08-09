
import { useState } from "react";
import { masters } from "../data/masters";

function GetQueue() {

    const [master, setMaster] = useState("");

    const local = localStorage.getItem("branchId");
    const branchId = JSON.parse(local);

    const branchMasters = masters.filter(
        (item) => item.branchId === branchId

    );
 


    return (
        <div className="body1">

            <div className="homePage fade1">

                <h2 className="getTitle2">
                    Получить очередь
                </h2>

                <p className="getSubtitle2">
                    Выберите мастера и удобное время
                </p>


                {/* МАСТЕРА */}

                <div className="masterBlock2">

                    <label className="formLabel2">
                        Выберите мастера
                    </label>


                    <div className="masterList2">

                        {branchMasters.map((item) => (

                            <div
                                key={item.id}
                                className={
                                    master === item.id
                                        ? "masterCard2 selected"
                                        : "masterCard2"
                                }
                                onClick={() => setMaster(item.id)}
                            >

                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                />

                                <div className="masterInfo2">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        {item.role}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>





                <div className="previewTicket2">

                    <h3>
                        Ваша Мастер
                    </h3>

                    <div className="previewRow2">

                        <span>
                            Мастер
                        </span>

                        <b>
                            {
                                master
                                    ? branchMasters.find(
                                        (item) => item.id === master
                                    )?.name
                                    : "Не выбран"
                            }
                        </b>

                    </div>



                </div>


                {/* КНОПКА */}

                <button
                    className="createTicket2"
                    onClick={() => {

                        if (!master) {
                            alert("Выберите мастера");
                            return;
                        }

                        localStorage.setItem(
                            "selectedMaster",
                            JSON.stringify(master)
                        );

                        alert("Мастер выбран!");

                        window.location.href = "/timepage";
                    }}
                >
                    Получить талон
                </button>



                <button
                    className="backTicket2"
                    onClick={() => {
                        window.location.href = "/booking";
                    }}
                >
                    Назад
                </button>

            </div>

        </div>
    );
}

export default GetQueue;

