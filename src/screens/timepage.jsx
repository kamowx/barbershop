import { useEffect, useState } from "react";
import { time } from "../data/time";
import { masters } from "../data/masters";
import { users } from "../data/users";

function Timepage() {

    // =========================
    // ПОЛЬЗОВАТЕЛЬ
    // =========================

    const localUser =
        localStorage.getItem("id");

    const userId =
        localUser ? JSON.parse(localUser) : null;


    // Находим пользователя

    const currentUser =
        users.find(
            (user) => user.id === userId
        );


    // Получаем его bookingId

    const bookingId =
        currentUser?.bookingId;


    // =========================
    // МАСТЕР
    // =========================

    const localMaster =
        localStorage.getItem("selectedMaster");

    const masterId =
        localMaster ? JSON.parse(localMaster) : null;


    // =========================
    // ФИЛИАЛ
    // =========================

    const localBranch =
        localStorage.getItem("branchId");

    const branchId =
        localBranch ? JSON.parse(localBranch) : null;


    // =========================
    // ДАТА
    // =========================

    const today =
        new Date();


    const minDate =
        today.toISOString().split("T")[0];


    const maxDateObj =
        new Date();

    maxDateObj.setDate(
        maxDateObj.getDate() + 5
    );


    const maxDate =
        maxDateObj.toISOString().split("T")[0];


    // =========================
    // КЛЮЧ ДЛЯ ДАТЫ
    // =========================

    /*
        У каждого пользователя
        своя дата.

        Алекс:

        selectedDate_1001_1_1

        Алекс2:

        selectedDate_1002_1_1
    */

    const dateKey =
        `selectedDate_${bookingId}_${masterId}_${branchId}`;


    // =========================
    // ВЫБРАННАЯ ДАТА
    // =========================

    const [selectedDate, setSelectedDate] =
        useState(
            localStorage.getItem(dateKey) || ""
        );


    // =========================
    // КЛЮЧ ДЛЯ ВРЕМЕНИ
    // =========================

    /*
        Время зависит от:

        bookingId
        masterId
        branchId
        date
    */

    const timeKey =
        selectedDate
            ? `selectedTime_${bookingId}_${masterId}_${branchId}_${selectedDate}`
            : "";


    // =========================
    // ВЫБРАННОЕ ВРЕМЯ
    // =========================

    const [selectedTime, setSelectedTime] =
        useState("");


    // =========================
    // ВСЕ ВЫБРАННЫЕ ВРЕМЕНА
    // =========================

    /*
        Например:

        [
            "10:00",
            "12:00"
        ]

        Поэтому 10:00 не исчезнет,
        когда выберем 12:00.
    */

    const [selectedTimes, setSelectedTimes] =
        useState([]);


    // =========================
    // НОВОЕ ОБЩЕЕ ХРАНИЛИЩЕ ВРЕМЕНИ
    // =========================

    /*
        Здесь время ОБЩЕЕ для всех пользователей.

        Например:

        [
            {
                time: "12:00",
                bookingId: 1001
            },
            {
                time: "13:00",
                bookingId: 1002
            }
        ]

        12:00 занял пользователь 1001.
        13:00 занял пользователь 1002.
    */

    const allTimeKey =
        selectedDate
            ? `allSelectedTime_${masterId}_${branchId}_${selectedDate}`
            : "";


    // =========================
    // ОБЩИЕ ЗАНЯТЫЕ ВРЕМЕНА
    // =========================

    const [allSelectedTimes, setAllSelectedTimes] =
        useState([]);


    // =========================
    // ЗАГРУЗКА СОХРАНЁННЫХ ДАННЫХ
    // =========================

    useEffect(() => {

        if (!bookingId) {

            setSelectedDate("");
            setSelectedTime("");
            setSelectedTimes([]);
            setAllSelectedTimes([]);

            return;
        }


        // Получаем дату

        const savedDate =
            localStorage.getItem(dateKey);


        setSelectedDate(
            savedDate || ""
        );


        // Если даты нет

        if (!savedDate) {

            setSelectedTime("");
            setSelectedTimes([]);
            setAllSelectedTimes([]);

            return;
        }


        // Ключ времени

        const savedTimeKey =
            `selectedTime_${bookingId}_${masterId}_${branchId}_${savedDate}`;


        // Получаем сохранённые времена

        let savedTimes = [];

        try {

            savedTimes =
                JSON.parse(
                    localStorage.getItem(savedTimeKey)
                ) || [];

        } catch {

            savedTimes = [];

        }


        // Сохраняем в state

        setSelectedTimes(
            savedTimes
        );


        // Последнее выбранное время

        if (savedTimes.length > 0) {

            setSelectedTime(
                savedTimes[savedTimes.length - 1]
            );

        } else {

            setSelectedTime("");

        }


        // =========================
        // ПОЛУЧАЕМ ОБЩИЕ ЗАНЯТЫЕ ВРЕМЕНА
        // =========================

        let savedAllTimes = [];

        try {

            savedAllTimes =
                JSON.parse(
                    localStorage.getItem(
                        `allSelectedTime_${masterId}_${branchId}_${savedDate}`
                    )
                ) || [];

        } catch {

            savedAllTimes = [];

        }


        setAllSelectedTimes(
            savedAllTimes
        );

    }, [
        bookingId,
        masterId,
        branchId,
        dateKey
    ]);


    // =========================
    // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА
    // =========================

    /*
        Когда страница открывается заново,
        ещё раз получаем общие занятые времена.
    */

    useEffect(() => {

        if (!selectedDate) {
            return;
        }


        let savedAllTimes = [];

        try {

            savedAllTimes =
                JSON.parse(
                    localStorage.getItem(
                        `allSelectedTime_${masterId}_${branchId}_${selectedDate}`
                    )
                ) || [];

        } catch {

            savedAllTimes = [];

        }


        setAllSelectedTimes(
            savedAllTimes
        );

    }, [
        selectedDate,
        masterId,
        branchId
    ]);


    // =========================
    // ПРОВЕРКА ВРЕМЕНИ
    // =========================

    function IsTimeAvailable(timeValue) {

        if (!selectedDate) {
            return true;
        }


        const todayDate =
            new Date().toISOString().split("T")[0];


        if (selectedDate !== todayDate) {
            return true;
        }


        const now =
            new Date();


        const currentHour =
            now.getHours();


        const currentMinute =
            now.getMinutes();


        const [hour, minute] =
            timeValue.split(":").map(Number);


        if (
            hour < currentHour ||
            (
                hour === currentHour &&
                minute <= currentMinute
            )
        ) {

            return false;

        }


        return true;
    }


    // =========================
    // НАХОДИМ МАСТЕРА
    // =========================

    const selectedMaster =
        masters.find(
            (item) =>
                item.id === masterId
        );


    // =========================
    // ВРЕМЯ МАСТЕРА
    // =========================

    const branchTime =
        time.filter(
            (item) =>
                item.masterId === masterId &&
                item.branchId === branchId
        );


    // =========================
    // ПРОВЕРКА ЗАНЯТО ЛИ ВРЕМЯ
    // =========================

    function IsTimeBusy(timeValue) {

        return allSelectedTimes.some(
            (item) =>
                item.time === timeValue
        );

    }


    // =========================
    // ПРОВЕРКА МОЁ ЛИ ЭТО ВРЕМЯ
    // =========================

    function IsMyTime(timeValue) {

        return allSelectedTimes.some(
            (item) =>
                item.time === timeValue &&
                item.bookingId === bookingId
        );

    }


    // =========================
    // ПРОВЕРКА
    // ОДНО БРОНИРОВАНИЕ В ДЕНЬ
    // =========================

    function IsAlreadyBookedToday() {

        if (!selectedDate) {
            return false;
        }


        return allSelectedTimes.some(
            (item) =>
                item.bookingId === bookingId
        );

    }


    // =========================
    // ВЫБОР ВРЕМЕНИ
    // =========================

    function SelectTime(selected) {


        // =========================
        // ПРОВЕРЯЕМ ОБЩУЮ ЗАНЯТОСТЬ
        // =========================

        const busy =
            IsTimeBusy(selected);


        const myTime =
            IsMyTime(selected);


        // Если время занял другой пользователь

        if (busy && !myTime) {

            return;

        }


        // =========================
        // ПРОВЕРКА
        // ОДНО БРОНИРОВАНИЕ В ДЕНЬ
        // =========================

        const alreadyBooked =
            IsAlreadyBookedToday();


        if (
            alreadyBooked &&
            !myTime
        ) {

            alert(
                "На этот день у вас уже есть бронирование"
            );

            return;

        }


        // =========================
        // ЕСЛИ МОЁ ВРЕМЯ УЖЕ ВЫБРАНО
        // =========================

        if (selectedTimes.includes(selected)) {


            // Удаляем это время

            {/*  const newTimes =
                selectedTimes.filter(
                    (item) => item !== selected
                );

*/}
            // Сохраняем новый список

            setSelectedTimes(
                newTimes
            );


            // Если мы удалили текущее выбранное время

            if (selectedTime === selected) {

                if (newTimes.length > 0) {

                    // Показываем последнее оставшееся время

                    setSelectedTime(
                        newTimes[newTimes.length - 1]
                    );

                } else {

                    // Если больше ничего нет

                    setSelectedTime("");

                }

            }


            // =========================
            // УДАЛЯЕМ ИЗ ОБЩИХ ЗАНЯТЫХ
            // =========================

            const newAllTimes =
                allSelectedTimes.filter(
                    (item) =>
                        !(
                            item.time === selected &&
                            item.bookingId === bookingId
                        )
                );


            setAllSelectedTimes(
                newAllTimes
            );


            return;
        }


        // =========================
        // ЕСЛИ ВРЕМЯ ЕЩЁ НЕ ВЫБРАНО
        // =========================

        const newTimes = [
            selected
        ];


        // Показываем выбранное время

        setSelectedTime(
            selected
        );


        // Добавляем в список

        setSelectedTimes(
            newTimes
        );


        // =========================
        // ДОБАВЛЯЕМ В ОБЩИЕ ЗАНЯТЫЕ
        // =========================

        const newAllTimes = [
            ...allSelectedTimes,
            {
                time: selected,
                bookingId: bookingId
            }
        ];


        setAllSelectedTimes(
            newAllTimes
        );

    }


    // =========================
    // ВЫБОР ДАТЫ
    // =========================

    function SelectDate(date) {

        // Показываем дату

        setSelectedDate(date);


        // Сохраняем дату

        localStorage.setItem(
            dateKey,
            date
        );


        // Новый ключ времени

        const newTimeKey =
            `selectedTime_${bookingId}_${masterId}_${branchId}_${date}`;


        // Получаем времена этой даты

        let savedTimes = [];

        try {

            savedTimes =
                JSON.parse(
                    localStorage.getItem(newTimeKey)
                ) || [];

        } catch {

            savedTimes = [];

        }


        // Показываем их

        setSelectedTimes(
            savedTimes
        );


        // Если уже есть времена

        if (savedTimes.length > 0) {

            setSelectedTime(
                savedTimes[savedTimes.length - 1]
            );

        } else {

            setSelectedTime("");

        }


        // =========================
        // ПОЛУЧАЕМ ОБЩИЕ ВРЕМЕНА
        // =========================

        const newAllTimeKey =
            `allSelectedTime_${masterId}_${branchId}_${date}`;


        let savedAllTimes = [];

        try {

            savedAllTimes =
                JSON.parse(
                    localStorage.getItem(newAllTimeKey)
                ) || [];

        } catch {

            savedAllTimes = [];

        }


        setAllSelectedTimes(
            savedAllTimes
        );

    }


    // =========================
    // ПОЛУЧИТЬ ТАЛОН
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
                "Выберите дату"
            );

            return;
        }


        if (!selectedTime) {

            alert(
                "Выберите время"
            );

            return;
        }


        // Сохраняем дату

        localStorage.setItem(
            dateKey,
            selectedDate
        );


        // =========================
        // ВОТ ЗДЕСЬ СОХРАНЯЕМ ВРЕМЯ
        // ТОЛЬКО ПОСЛЕ НАЖАТИЯ КНОПКИ
        // =========================

        localStorage.setItem(
            timeKey,
            JSON.stringify(selectedTimes)
        );


        // =========================
        // СОХРАНЯЕМ ОБЩИЕ ЗАНЯТЫЕ ВРЕМЕНА
        // =========================

        localStorage.setItem(
            allTimeKey,
            JSON.stringify(allSelectedTimes)
        );


        // Отдельно сохраняем
        // последнее выбранное время
        // для Servicespage

        localStorage.setItem(
            "selectedTime",
            selectedTime
        );


        // Отдельно сохраняем дату
        // для Servicespage

        localStorage.setItem(
            "selectedDate",
            selectedDate
        );


        alert(
            "Время и дата выбраны!"
        );


        window.location.href =
            "/servicespage";

    }


    // =========================
    // JSX
    // =========================

    return (

        <div className="body1">

            <div className="homePage fade1">

                <h2 className="getTitle2">
                    Выберите дату и время
                </h2>


                <p className="getSubtitle2">
                    Записаться можно только на ближайшие 5 дней
                </p>


                {/* =========================
                    ДАТА
                ========================= */}

                <div className="timeBlock2">

                    <label className="formLabel2">
                        Выберите дату
                    </label>


                    <input
                        type="date"

                        min={minDate}

                        max={maxDate}

                        value={selectedDate}

                        onKeyDown={(e) =>
                            e.preventDefault()
                        }

                        onFocus={(e) =>
                            e.target.showPicker?.()
                        }

                        onChange={(e) => {

                            SelectDate(
                                e.target.value
                            );

                        }}

                    />

                </div>


                {/* =========================
                    МАСТЕР
                ========================= */}

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


                {/* =========================
                    ВРЕМЯ
                ========================= */}

                <div className="timeBlock2">

                    <label className="formLabel2">
                        Выберите время
                    </label>


                    <div className="timeList2">

                        {branchTime.map((item) => {

                            const available =
                                IsTimeAvailable(
                                    item.time
                                );


                            const busy =
                                IsTimeBusy(
                                    item.time
                                );


                            const myTime =
                                IsMyTime(
                                    item.time
                                );


                            return (

                                <div
                                    key={item.id}

                                    className={

                                        /*
                                            Если время есть
                                            в selectedTimes,
                                            оно красное.
                                        */

                                        selectedTimes.includes(
                                            item.time
                                        )

                                            ? "timeCard2 selected"


                                            : busy

                                                ? "timeCard2 selected"


                                                : available

                                                    ? "timeCard2"


                                                    : "timeCard2 disabled"

                                    }


                                    onClick={() => {

                                        if (!available) {

                                            return;

                                        }


                                        /*
                                            Если время занял
                                            другой пользователь,
                                            ничего не делаем.

                                            Если время моё,
                                            можно нажать снова
                                            и отменить.
                                        */

                                        if (
                                            busy &&
                                            !myTime
                                        ) {

                                            return;

                                        }


                                        SelectTime(
                                            item.time
                                        );

                                    }}

                                >

                                    {item.time}

                                </div>

                            );

                        })}

                    </div>

                </div>


                {/* =========================
                    ПРЕДПРОСМОТР
                ========================= */}

                <div className="previewTicket2">

                    <h3>
                        Ваша запись
                    </h3>


                    <div className="previewRow2">

                        <span>
                            Номер записи
                        </span>


                        <b>
                            {bookingId ||
                                "Не найден"}
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Мастер
                        </span>


                        <b>
                            {selectedMaster?.name ||
                                "Не выбран"}
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Дата
                        </span>


                        <b>
                            {selectedDate ||
                                "Не выбрана"}
                        </b>

                    </div>


                    <div className="previewRow2">

                        <span>
                            Время
                        </span>


                        <b>
                            {selectedTime ||
                                "Не выбрано"}
                        </b>

                    </div>

                </div>


                {/* =========================
                    КНОПКА
                ========================= */}

                <button
                    className="createTicket2"
                    onClick={GetTicket}
                >

                    Выбрать время

                </button>


                <button
                    className="backTicket2"

                    onClick={() => {

                        window.location.href =
                            "/getqueue";

                    }}

                >

                    Назад

                </button>

            </div>

        </div>

    );

}

export default Timepage;