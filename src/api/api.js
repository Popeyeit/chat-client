import axios from 'axios';
axios.defaults.baseURL = 'https://popeye-chat.herokuapp.com/api';

const Api = {
  setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unsetToken() {
    axios.defaults.headers.common.Authorization = '';
  },

  async requestPost(url, data) {
    const res = await axios.post(url, data);
    return res;
  },
  async requestGet(url) {
    const res = await axios.get(url);

    return res;
  },

  async requestPath(url, data) {
    const res = await axios.patch(url, data);
    return res;
  },
};

export default Api;
