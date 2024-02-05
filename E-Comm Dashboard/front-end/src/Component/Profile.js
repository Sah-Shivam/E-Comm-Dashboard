import { useContext } from "react";
import { useStore } from "../context/Conext";

const Profile = ()=>{

    const {name,email} = useContext(useStore())
    return(
        <> 
        <div>
            <h1> <em>User Profile</em></h1>
        </div>
        <div>
            <h2>Name : {name}</h2>
            <h2>Email Id : {email}</h2>
        </div>
        </>
    )
}

export default Profile;