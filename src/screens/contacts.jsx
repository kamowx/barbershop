import { useState } from "react";
import Bottomnav from "../components/bottomnav";

function Contacts() {

    return (
        <div className="body1">



            {/*CHat */}
            <div className="chatPage fade1">

                {/* HEADER */}
                <div className="chatHeader">
                    <h3>Чаты</h3>
                </div>


                {/* CONTENT */}
                <div className="chatContainer">






                    {/* PROFILE */}
                    <div className="profiles">

                        <div className="addProfile">
                            +
                        </div>

                        <img src="https://i.pravatar.cc/100?1" />
                        <img src="https://i.pravatar.cc/100?2" />
                        <img src="https://i.pravatar.cc/100?3" />
                        <img src="https://i.pravatar.cc/100?4" />

                    </div>



                    {/* SEARCH */}
                    <div className="searchBox">

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.58317 17.5003C13.9554 17.5003 17.4998 13.9559 17.4998 9.58366C17.4998 5.2114 13.9554 1.66699 9.58317 1.66699C5.21092 1.66699 1.6665 5.2114 1.6665 9.58366C1.6665 13.9559 5.21092 17.5003 9.58317 17.5003Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.3332 18.3337L16.6665 16.667" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <input
                            placeholder="Поиск чата"
                        />

                    </div>



                    {/* CHAT LIST */}

                    <div className="chatList">


                        <div className="chatItem" onClick={() => setPage("chats")}>

                            <div className="avatar">
                                <img src="https://i.pravatar.cc/100?5" />
                                <span></span>
                            </div>


                            <div className="chatText">
                                <h4>Adam Steff</h4>
                                <p>I want to consult on the latest hair styles</p>
                            </div>


                            <div className="time">
                                16:30
                                <b>✓✓</b>
                            </div>

                        </div>














                        <div className="chatItem">

                            <div className="avatar">
                                <img src="https://i.pravatar.cc/100?8" />
                            </div>


                            <div className="chatText">
                                <h4>Adam Steff</h4>
                                <p>
                                    We recommend this hairstyle for you
                                </p>
                            </div>


                            <div className="time">
                                12:00
                                <strong>1</strong>
                            </div>

                        </div>



                    </div>


                </div>



                <Bottomnav />


            </div>

        </div>
    );
}

export default Contacts;