import { useState } from "react";

function Welcome() {




    return (
        <div className="body1">
            {/* 2 страница */}
                <div className="phone1 fade1">

                    <img
                        className="barber"
                        src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800"
                        alt=""
                    />

                    <div className="bottom3">

                        <div className="text">

                            <h1>Добро Пожаловать</h1>

                            <p>
                                Найдите лучшие услуги по уходу за собой в вашем городе всего одним касанием!
                                Не упустите возможность получить стрижку или процедуру своей мечты.
                                Начнем прямо сейчас!
                            </p>

                        </div>


                       <a href="/login"><button className="button1">Начать</button></a> 

                        <div className="home3">
                            <div className="line3"></div>
                        </div>

                    </div>

                </div>
        </div>
    );
}

export default Welcome;