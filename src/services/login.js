import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const update = async (user) => {
  const response = await axios.post(`${baseUrl}/${user.id}`, { user });
  return response.data;
};

export default { login, update };
