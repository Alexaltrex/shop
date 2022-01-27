export const hexToRGB = (hex: string, alpha: number) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
};

export const serializeSearchParams = (searchParams: URLSearchParams) => {
    const params:{[key:string]: string} = {};
    // @ts-ignore
    for(let [key, value] of searchParams) {
        params[key as string] = value
    }
    return params
};