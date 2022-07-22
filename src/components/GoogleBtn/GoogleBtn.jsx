import s from "./GoogleBtn.module.scss";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGoogleLoginMutation } from "redux/api/bookAPI";
import { useDispatch } from "react-redux";
import { loggedIn } from "redux/auth";


const GoogleBtn = () => {
    const dispatch = useDispatch();
    const [googleLoginUser] = useGoogleLoginMutation();

    function handleCallback(resp) {
        
        const googleToken = resp.credential;
        console.log("google Token:", googleToken)
        
        const googleObj = {
            googleToken
        }
        googleLoginUser(googleObj).unwrap().then((response) => dispatch(loggedIn({
            token: response.token,
            refreshToken: response.refreshToken
        }))).catch(error => {
            if (error.status === 409) {
                toast.error("Account with this email was ceated with a different signup method!");
            }
        })
    }
    

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallback 
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInBtn"),
            { theme: "outline", size: "large" }
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div >
        <div id="signInBtn" className={s.signInBtn}></div>
        
        </div>
    )
}

export default GoogleBtn;
