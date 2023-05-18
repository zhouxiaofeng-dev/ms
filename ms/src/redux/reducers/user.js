import { ADDUSERIMF } from "../constant";

const initState = {};
export default function UserReducer(preState=initState, action) {
    const { type, data } = action;
    switch (type) { 
        case ADDUSERIMF:
            return preState = { ...data }
        default:
            return preState
    }
}