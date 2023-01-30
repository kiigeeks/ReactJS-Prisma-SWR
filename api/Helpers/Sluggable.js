import { randomKey } from "./RandomKey.js";

//create slug
export const createSlug = (Slug) => {
    const keyId = randomKey().substring(0, 5);
    return Slug.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '-' +keyId;
}