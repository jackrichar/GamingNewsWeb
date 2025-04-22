import React from "react";
import "./ProfileStyle.scss";

// Import Avatar
import UserImage from "../../../Assets/image/User.png";

const Profile = () =>{
    return(
        <div className="Bg-Profile">
            <div className="Profile">
                <div className="Profile-Image">
                    <img src={UserImage} className="SetProfileImage" alt="Avatar"/>
                </div>
            </div>
        </div>
    );
}

export default Profile;