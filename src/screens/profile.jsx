import { use, useEffect, useState } from "react";
import { users } from "../data/users";
import Bottomnav from "../components/bottomnav";

function Profile() {

    useEffect(() => {
        const id = localStorage.getItem("id");

        if (!id) {
            window.location.href = "/"
        }
    }, []);

    const local = localStorage.getItem('id');
    const id = JSON.parse(local);
    const [user, setUser] = useState({});

    function GetUser() {
        const user = users.find((user) => user.id === id);

        if (user === undefined || user === null) {
            window.location.href = '/';
        }
        console.log(user);
        setUser(user);
    }
    useEffect(() => {
        GetUser();
    }, []);

    const LogOut = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("branchId");
        localStorage.removeItem("selectedMaster");

        localStorage.removeItem("selectedServices");
        localStorage.removeItem("tickets");

        window.location.href = "/login";
    };

    return (
        <div className="body1">



            {/*PROFILE*/}

            <div className="profilePage fade1">


                <div className="profileTop">


                    <div className="userInfo">

                        <img
                            className="avatar"
                            src={user.avatar}
                            alt={user.name}
                        />


                        <div className="userText">

                            <div className="level">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00016 12.8333C9.57749 12.8333 11.6668 10.744 11.6668 8.16667C11.6668 5.58934 9.57749 3.5 7.00016 3.5C4.42283 3.5 2.3335 5.58934 2.3335 8.16667C2.3335 10.744 4.42283 12.8333 7.00016 12.8333ZM7.00016 6.41667C6.83446 6.41667 6.72363 6.61549 6.50197 7.01313L6.44462 7.11601C6.38163 7.22901 6.35013 7.2855 6.30103 7.32278C6.25192 7.36006 6.19076 7.3739 6.06844 7.40158L5.95708 7.42677C5.52664 7.52416 5.31142 7.57286 5.26021 7.73752C5.20901 7.90218 5.35573 8.07375 5.64918 8.4169L5.7251 8.50568C5.80849 8.60319 5.85018 8.65195 5.86894 8.71227C5.8877 8.77258 5.88139 8.83764 5.86879 8.96774L5.85731 9.08619C5.81294 9.54402 5.79076 9.77294 5.92481 9.8747C6.05887 9.97647 6.26038 9.88369 6.66341 9.69812L6.76767 9.65011C6.8822 9.59738 6.93946 9.57101 7.00016 9.57102C7.06086 9.57102 7.11813 9.59738 7.23265 9.65011L7.33692 9.69812C7.73994 9.88369 7.94146 9.97647 8.07551 9.8747C8.20957 9.77294 8.18738 9.54402 8.14302 9.08619L8.13154 8.96774C8.11894 8.83764 8.11263 8.77258 8.13139 8.71227C8.15014 8.65195 8.19184 8.60319 8.27522 8.50569L8.35115 8.4169C8.64459 8.07376 8.79132 7.90218 8.74011 7.73752C8.68891 7.57286 8.47369 7.52416 8.04324 7.42677L7.93188 7.40158C7.80956 7.3739 7.7484 7.36006 7.6993 7.32278C7.65019 7.2855 7.6187 7.22901 7.55571 7.11601L7.49836 7.01313C7.2767 6.61549 7.16586 6.41667 7.00016 6.41667Z" fill="white" />
                                    <path d="M6.41683 1.16699H7.5835C8.68344 1.16699 9.23341 1.16699 9.57512 1.5087C9.91201 1.84559 9.91676 2.3849 9.91683 3.45408C9.06965 2.92867 8.07033 2.62533 7.00016 2.62533C5.92999 2.62533 4.93067 2.92867 4.0835 3.45408C4.08356 2.3849 4.08832 1.84559 4.4252 1.5087C4.76691 1.16699 5.31688 1.16699 6.41683 1.16699Z" fill="white" />
                                </svg>{user.userstatuses}
                               
                            </div>

                            <h2></h2>

                        </div>

                    </div>


                    <div className="edit">

                    </div>


                </div>



                <div className="contact">

                    <p><big>
                        <big> <i class="fa-regular fa-user"></i></big>
                        {user.name}
                    </big> </p>


                    <p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.64281 4.30932C1.6665 5.28563 1.6665 6.85698 1.6665 9.99967C1.6665 13.1424 1.6665 14.7137 2.64281 15.69C3.61913 16.6663 5.19047 16.6663 8.33317 16.6663H11.6665C14.8092 16.6663 16.3805 16.6663 17.3569 15.69C18.3332 14.7137 18.3332 13.1424 18.3332 9.99967C18.3332 6.85698 18.3332 5.28563 17.3569 4.30932C16.3805 3.33301 14.8092 3.33301 11.6665 3.33301H8.33317C5.19047 3.33301 3.61913 3.33301 2.64281 4.30932ZM15.48 6.26623C15.701 6.5314 15.6651 6.9255 15.4 7.14648L13.5696 8.67181C12.8309 9.28736 12.2322 9.78627 11.7039 10.1261C11.1534 10.4801 10.6174 10.7037 9.99984 10.7037C9.38227 10.7037 8.84623 10.4801 8.29582 10.1261C7.76743 9.78628 7.16876 9.28737 6.43013 8.67182L4.59972 7.14648C4.33455 6.9255 4.29872 6.5314 4.5197 6.26623C4.74068 6.00105 5.13478 5.96522 5.39995 6.1862L7.19903 7.68544C7.9765 8.33332 8.51628 8.78169 8.97199 9.07478C9.41312 9.3585 9.71228 9.45374 9.99984 9.45374C10.2874 9.45374 10.5866 9.3585 11.0277 9.07478C11.4834 8.78169 12.0232 8.33332 12.8006 7.68543L14.5997 6.1862C14.8649 5.96522 15.259 6.00105 15.48 6.26623Z" fill="white" />
                        </svg>
                        {user.email}
                    </p>


                    <p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0002 1.66699C6.31826 1.66699 3.3335 5.00248 3.3335 8.75033C3.3335 12.4688 5.46127 16.5107 8.78105 18.0624C9.55495 18.4241 10.4454 18.4241 11.2193 18.0624C14.5391 16.5107 16.6668 12.4688 16.6668 8.75033C16.6668 5.00248 13.6821 1.66699 10.0002 1.66699ZM10.0002 10.0003C10.9206 10.0003 11.6668 9.25413 11.6668 8.33366C11.6668 7.41318 10.9206 6.66699 10.0002 6.66699C9.07969 6.66699 8.3335 7.41318 8.3335 8.33366C8.3335 9.25413 9.07969 10.0003 10.0002 10.0003Z" fill="white" />
                        </svg>
                        {user.location}
                    </p>


                </div>




                <div className="settingsBox">


                    <h4>Параметр</h4>







                    <div className="settingItem">

                        <span>
                            Учетная запись
                        </span>

                        <b>›</b>

                    </div>



                    <div className="settingItem">

                        <span>
                            Безопасность
                        </span>

                        <b>›</b>

                    </div>



                    <div className="settingItem">

                        <span>
                            Помощь
                        </span>

                        <b>›</b>

                    </div>






                    <button onClick={LogOut} className="logout">
                        Выход
                    </button>



                </div>
                <Bottomnav />


            </div>


        </div>
    );
}

export default Profile;