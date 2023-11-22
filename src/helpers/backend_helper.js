import { post , get } from "./axios_api"

export const getItems = async () => await get('TblItem/getPage');

