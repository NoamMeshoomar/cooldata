import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api"
});

axiosInstance.interceptors.response.use(null, async (err) => {
    if(err.response.status(401)) {
        const response = await axiosInstance.get("/users/refresh", {
            headers: {
                refreshToken: localStorage.getItem("refreshToken")
            }
        });

        console.log(response);

        localStorage.setItem("token", response.data.token);
    }
});

export default axiosInstance;