import React from "react";
import "./ProfileStyle.scss";

// Import Avatar
import UserImage from "../../../Assets/image/User.png";

const Profile = () =>{
    return(
        <div className="Bg-Profile">
            <div className="ProfileImage">
                <img src={UserImage} className="SetProfileImage" alt="Avatar"/>
            </div>
        </div>
    );
}

export default Profile;