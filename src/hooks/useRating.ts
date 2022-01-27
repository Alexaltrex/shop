import {RatingType} from "../types/types";

export const useRating = (rating: RatingType) => {
    let summa = 0;
    Object.values(rating).forEach((value, index) => {
        summa += value * Number(Object.keys(rating)[index])
    });
    const count = Object.values(rating).reduce((prev, curr) => prev + curr);
    const rate = (summa / count).toFixed(2);
    return {rate, count}
}