import axios from "axios";

const baseUrl = "/api/imgUrls";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log('axios create newObject :>> ', newObject)
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};


export default { getAll, create };
