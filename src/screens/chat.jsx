import { useState } from "react";

function Chat() {

    return (
        <div className="body1">



                <div className="chatPage2 fade1">

                    {/* Header */}
                    <div className="chatHeader2">

                        <span className="back" >←</span>

                        <img
                            className="avatar"
                            src="https://i.pravatar.cc/100"
                        />

                        <div className="userInfo">
                            <h3>Twinsky Monkey Барбер</h3>
                            <p>
                                <span className="online"></span>
                                Online
                            </p>
                        </div>

                        <button className="endBtn">
                            End
                        </button>

                    </div>


                    {/* Messages */}
                    <div className="messages">

                        <div className="date">
                            Today
                        </div>


                        {/* my message */}
                        <div className="myMessage">
                            <div className="bubble myBubble">
                                Good morning, I want to order a hair cutting service this afternoon

                                <div className="time">
                                    08.45 ✓✓
                                </div>
                            </div>
                        </div>


                        {/* admin */}
                        <div className="adminMessage">

                            <img
                                className="smallAvatar"
                                src="https://i.pravatar.cc/50"
                            />

                            <div className="bubble adminBubble">

                                <b>Admin Twinsky</b>

                                <p>
                                    of course we are very open to this afternoon
                                </p>

                                <span>
                                    09.15
                                </span>

                            </div>

                        </div>



                        <div className="adminMessage">

                            <img
                                className="smallAvatar"
                                src="https://i.pravatar.cc/50"
                            />

                            <div className="bubble adminBubble">

                                <b>Admin Twinsky</b>

                                <p>
                                    Please order via the Gobar application's booking menu
                                </p>

                                <span>
                                    09.17
                                </span>

                            </div>

                        </div>



                        {/* my last */}
                        <div className="myMessage">

                            <div className="bubble lastBubble">

                                OK, thanks for the information

                                <div className="time">
                                    09.20 ✓✓
                                </div>

                            </div>

                        </div>


                    </div>



                    {/* Input */}
                    <div className="chatInput">


                        <input className="inputBox" placeholder="Type message" type="text" name="" id="" />

                        <button className="send">
                            ➤
                        </button>

                    </div>


                </div>
            
        </div>
    );
}

export default Chat;