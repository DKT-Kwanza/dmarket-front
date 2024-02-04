import {selector} from "recoil";
import {cartCountAtom} from "./atom";
import {userApi} from "../Api";
import axios from "axios";

export const cartCountState = selector({
    key: "cartCountState",
    get: async ({get}) => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        const url = `${userApi}/${userId}/cart-count`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.data.cartCount;
    },
})