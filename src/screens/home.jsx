import { useEffect, useState } from "react";
import { users } from "../data/users";
import { branches } from "../data/branches";
import Bottomnav from "../components/bottomnav";

function Home() {

    // =========================
    // ПОЛЬЗОВАТЕЛЬ
    // =========================

    const [user, setUser] = useState({});
    const [userBranches, setUserBranches] = useState([]);

    const local = localStorage.getItem("id");

    const id = local
        ? JSON.parse(local)
        : null;


    // =========================
    // ПОЛУЧАЕМ ПОЛЬЗОВАТЕЛЯ
    // =========================

    useEffect(() => {

        if (!id) {
            window.location.href = "/";
            return;
        }

        const currentUser = users.find(
            (user) => user.id === id
        );

        if (!currentUser) {
            localStorage.removeItem("id");
            window.location.href = "/";
            return;
        }

        setUser(currentUser);


        // =========================
        // ФИЛИАЛЫ ПОЛЬЗОВАТЕЛЯ
        // =========================

        const filteredBranches = branches.filter(
            (branch) => branch.city === currentUser.location
        );

        setUserBranches(filteredBranches);

    }, [id]);


    // =========================
    // ОТКРЫТЬ ФИЛИАЛ
    // =========================

    function OpenBranch(branch) {

        localStorage.setItem(
            "branchId",
            JSON.stringify(branch.id)
        );

        window.location.href = "/booking";
    }


    return (
        <div className="body1">

            {/* 4 страница */}

            <div className="homePage fade1">

                <div className="header21">

                    <div className="leftHeader">

                        <p className="location">

                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >

                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.99984 1.33325C5.05432 1.33325 2.6665 4.00164 2.6665 6.99992C2.6665 9.9747 4.36872 13.2082 7.02455 14.4495C7.64367 14.7389 8.35601 14.7389 8.97513 14.4495C11.631 13.2082 13.3332 9.9747 13.3332 6.99992C13.3332 4.00164 10.9454 1.33325 7.99984 1.33325ZM7.99984 7.99992C8.73622 7.99992 9.33317 7.40296 9.33317 6.66658C9.33317 5.93021 8.73622 5.33325 7.99984 5.33325C7.26346 5.33325 6.6665 5.93021 6.6665 6.66658C6.6665 7.40296 7.26346 7.99992 7.99984 7.99992Z"
                                    fill="#363062"
                                />

                            </svg>

                        </p>

                        <h2>
                            {user.location}
                        </h2>

                    </div>


                    <img
                        className="profile"
                        src={user.avatar}
                        alt={user.name}
                    />

                </div>


                {/* SEARCH */}

                <div className="searchRow">

                    <input
                        type="text"
                        placeholder="Искать барберов, услуги и стрижков"
                    />

                    <button>

                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path
                                d="M18.3335 5.41675H13.3335"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <path
                                d="M4.99984 5.41675H1.6665"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <path
                                d="M8.33317 8.33333C9.944 8.33333 11.2498 7.0275 11.2498 5.41667C11.2498 3.80584 9.944 2.5 8.33317 2.5C6.72234 2.5 5.4165 3.80584 5.4165 5.41667C5.4165 7.0275 6.72234 8.33333 8.33317 8.33333Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <path
                                d="M18.3333 14.5833H15"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <path
                                d="M6.6665 14.5833H1.6665"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <path
                                d="M11.6667 17.5001C13.2775 17.5001 14.5833 16.1942 14.5833 14.5834C14.5833 12.9726 13.2775 11.6667 11.6667 11.6667C10.0558 11.6667 8.75 12.9726 8.75 14.5834C8.75 16.1942 10.0558 17.5001 11.6667 17.5001Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                        </svg>

                    </button>

                </div>


                {/* ФИЛИАЛЫ */}

                <div className="mainCard">

                    {userBranches.map((item) => (

                        <div
                            onClick={() => OpenBranch(item)}
                            key={item.id}
                            className="branchCard"
                        >

                            <img
                                className="photo-branch"
                                src={item.avatar}
                                alt={item.branch}
                            />


                            <button className="bookingBtn">

                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >

                                    <g clipPath="url(#clip0_370_663)">

                                        <path
                                            d="M1.3335 8.00008C1.3335 5.48592 1.3335 4.22885 2.11454 3.4478C2.89559 2.66675 4.15267 2.66675 6.66683 2.66675H9.3335C11.8477 2.66675 13.1047 2.66675 13.8858 3.4478C14.6668 4.22885 14.6668 5.48592 14.6668 8.00008V9.33341C14.6668 11.8476 14.6668 13.1047 13.8858 13.8857C13.1047 14.6667 11.8477 14.6667 9.3335 14.6667H6.66683C4.15267 14.6667 2.89559 14.6667 2.11454 13.8857C1.3335 13.1047 1.3335 11.8476 1.3335 9.33341V8.00008Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                        />

                                        <path
                                            d="M4.6665 2.66675V1.66675"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />

                                        <path
                                            d="M11.3335 2.66675V1.66675"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />

                                        <circle
                                            cx="11"
                                            cy="11"
                                            r="1"
                                            stroke="white"
                                            strokeWidth="1.5"
                                        />

                                        <path
                                            d="M1.6665 6H14.3332"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />

                                    </g>

                                    <defs>

                                        <clipPath id="clip0_370_663">

                                            <rect
                                                width="16"
                                                height="16"
                                                rx="5"
                                                fill="white"
                                            />

                                        </clipPath>

                                    </defs>

                                </svg>

                                Booking

                            </button>


                            <div className="cardInfo">
                            </div>


                            <div className="cardInfo">

                                <h3>
                                    Мастер-класс по парикмахерскому искусству - стрижка и укладка волос.
                                </h3>


                                <b>

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.99984 1.33325C5.05432 1.33325 2.6665 4.00164 2.6665 6.99992C2.6665 9.9747 4.36872 13.2082 7.02455 14.4495C7.64367 14.7389 8.35601 14.7389 8.97513 14.4495C11.631 13.2082 13.3332 9.9747 13.3332 6.99992C13.3332 4.00164 10.9454 1.33325 7.99984 1.33325ZM7.99984 7.99992C8.73622 7.99992 9.33317 7.40296 9.33317 6.66658C9.33317 5.93021 8.73622 5.33325 7.99984 5.33325C7.26346 5.33325 6.6665 5.93021 6.6665 6.66658C6.6665 7.40296 7.26346 7.99992 7.99984 7.99992Z"
                                            fill="#363062"
                                        />

                                    </svg>

                                    <big>
                                        {item.branch}
                                    </big>

                                </b>


                                <b>

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path
                                            d="M6.10227 3.6055C6.94671 2.09067 7.36892 1.33325 8.00016 1.33325C8.6314 1.33325 9.05362 2.09067 9.89805 3.6055L10.1165 3.99741C10.3565 4.42788 10.4765 4.64311 10.6635 4.78512C10.8506 4.92714 11.0836 4.97985 11.5496 5.08528L11.9738 5.18127C13.6136 5.55229 14.4335 5.7378 14.6285 6.36507C14.8236 6.99235 14.2647 7.64597 13.1468 8.9532L12.8576 9.2914C12.5399 9.66288 12.381 9.84861 12.3096 10.0784C12.2381 10.3082 12.2621 10.556 12.3102 11.0516L12.3539 11.5028C12.5229 13.247 12.607 14.1191 12.0967 14.5067C11.586 14.8944 10.8184 14.5409 9.28305 13.834L8.88584 13.6511C8.44955 13.4503 8.2314 13.3498 8.00016 13.3498C7.76893 13.3498 7.55078 13.4503 7.11449 13.6511L6.71728 13.834C5.18195 14.5409 4.41428 14.8944 3.90359 14.5067C3.39291 14.1191 3.47742 13.247 3.64643 11.5029L3.69015 11.0516C3.73818 10.556 3.76219 10.3082 3.69074 10.0784C3.61928 9.84861 3.46045 9.66288 3.14278 9.2914L2.85356 8.9532C1.73566 7.64597 1.17671 6.99235 1.37178 6.36507C1.56684 5.7378 2.38673 5.55229 4.02652 5.18127L4.45075 5.08528C4.91673 4.97985 5.14972 4.92714 5.33679 4.78512C5.52387 4.64311 5.64385 4.42788 5.88381 3.99741L6.10227 3.6055Z"
                                            fill="#8683A1"
                                        />

                                    </svg>

                                    5.0

                                </b>

                                <br />

                            </div>

                        </div>

                    ))}

                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Bottomnav />

            </div>

        </div>
    );
}

export default Home;
