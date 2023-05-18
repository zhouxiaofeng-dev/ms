import { GETARTICLE } from '../constant'

const initState = [];
export default function ArticleReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case GETARTICLE:
            preState = data
            return preState;
        default:
            return preState;
    }
}