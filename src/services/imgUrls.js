import axios from "axios";

const baseUrl = "/api/imgUrls";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  // console.log("axios create newObject :>> ", newObject);
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const getSingle = (url) => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const remove = async (image) => {
  await axios.delete(image.url);
  const response = await axios.delete(`${baseUrl}/${image.id}`);
  return response.data;
};

export default { getAll, create, getSingle, remove };
