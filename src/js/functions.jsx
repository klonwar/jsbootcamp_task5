import CryptoJS from "crypto-js";
import {inf} from "#src/js/logger";

const key = `secret-admin-key`;
export const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), key);
export const decrypt = (data) => JSON.parse(CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8));

export const StorageHelper = {
  userInfo: {
    set: (data) => localStorage.userInfo = encrypt(data),
    get: () => decrypt(localStorage.userInfo),
    del: () => delete localStorage.userInfo,
  },
  usersList: {
    set: (data) => localStorage.usersList = encrypt(data),
    get: () => decrypt(localStorage.usersList),
    del: () => delete localStorage.usersList
  },
  todoList: {
    set: (data) => localStorage.todoList = encrypt(data),
    get: () => decrypt(localStorage.todoList),
    del: () => delete localStorage.todoList,
    push: (data) => StorageHelper.todoList.set({...StorageHelper.todoList.get(), [data.id]: data}),
    delById: (id) => {
      const prev = {...StorageHelper.todoList.get()};
      delete prev[id];
      StorageHelper.todoList.set(prev);
    }
  },
  clear: () => {
    for (let itemKey of Object.keys(StorageHelper)) {
      let item = StorageHelper[itemKey];
      if (typeof item === `object`) {
        item.del();
      }
    }
  }
};
