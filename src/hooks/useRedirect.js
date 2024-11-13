import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router"

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // if user is authenticated, redirect to home page
                if (userAuthStatus === 'loggedIn') {
                    history.push("/");
                }
            } catch (err) {
                // if user is not authenticated, redirect to home page
                // console.log(err)
                if (userAuthStatus === 'loggedOut') {
                    history.push("/");
                }
            }
        }
        handleMount();
    }, [history, userAuthStatus]);
}