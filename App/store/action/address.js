import { NAME_ADD } from "../constant"

export const nameAdd = (payload) => {
    return { type: NAME_ADD, payload }
}
export const yogaSort = (payload) => {
    return { type: YOGA_SORT, payload }
}
export const conSort = (payload) => {
    return { type: CON_SORT, payload }
}
export const getExSort = (payload) => {
    return { type: EXERCISE_SORT, payload }
}