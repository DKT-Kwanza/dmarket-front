import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const cartCountAtom = atom({
    key: "cartCountAtom",
    default: 0,
});

export const isLoggedInState = atom({
    key: "isLoggedInState",
    default: false,
    effects_UNSTABLE: [persistAtom]
});