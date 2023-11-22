// export async function get(url, config = {}) {
//     return await axiosApi
//       .get(url, { ...config })
//       .then((response) => response.data);
//   }

import axiosAuthInstance from "../axios/axiosAuthInstance";

export async function get(url, config = {})  {
    return await axiosAuthInstance.get(url, { ...config })
    .then((response) => response.data)
}

export async function post(url, data, config = {})  {
    return await axiosAuthInstance.post(url, data)
    .then((response) => response.data)
}
