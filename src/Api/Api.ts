import axios from "axios";

const configOMB = {
    baseURL: 'https://shop-58b2f-default-rtdb.firebaseio.com/',
};


const axiosInstance = axios.create(configOMB);


export const API = {
    getShopList: () => {
        return axiosInstance.get('shopList.json')
    },
    sendMail: (data:any) => {
        return axiosInstance.post('https://gmailsendshop.herokuapp.com/sendMessage', data)
    }
}