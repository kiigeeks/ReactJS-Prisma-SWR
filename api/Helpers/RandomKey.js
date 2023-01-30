//random key
export const randomKey = () => {
    const key = '0123456789abcdefghijklmnopqrstuvwxyz';
    const arr = key.split(''); //convert string to array

    arr.sort(() => {
        return 0.5 - Math.random();
    });

    return arr.join(''); //convert array to string and return
}