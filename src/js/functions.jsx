import CryptoJS from "crypto-js";

const key = `secret-admin-key`;
const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), key);
const decrypt = (data) => JSON.parse(CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8));

const logout = async (history) => {
  const serverURL = `/logout`;
  const resp = await fetch(serverURL, {
    credentials: `include`,
    method: `POST`,
    headers: {'accept': `application/json`}
  });

  if (resp.ok) {
    delete localStorage.currentUser;
    history.replace(`/login`);
  }
};

export {
  encrypt,
  decrypt
};
