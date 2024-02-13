import { atom } from 'recoil';

export const isLoginState = atom({
    key: "isLoginState",
    default: false
});

export const userIdState = atom({
    key: "userIdState",
    default: null
});