import { computed, nextTick, reactive } from "vue";
import { useUsersLocalStorage } from "./usersLocalStorage";

const users = reactive([
  {
    id: 1,
    name: "Марина",
    phoneNumber: "+7 900 123 45 67",
    childs: [],
  },
  {
    id: 2,
    name: "Петр",
    phoneNumber: "+7 900 123 45 68",
    childs: [],
  },
  {
    id: 3,
    name: "Иван",
    phoneNumber: "+7 900 123 45 67",
    childs: [
      {
        id: 5,
        name: "Катя",
        phoneNumber: "+7 900 123 45 67",
        childs: [],
      },
    ],
  },
  {
    id: 4,
    name: "Ирина",
    phoneNumber: "+7 900 123 45 67",
    childs: [],
  },
]);

const addNewUser = (name, phone, chief) => {
  const newUser = {
    id: Math.round(Math.random() * Date.now()),
    name: name.value,
    phoneNumber: phone.value,
    childs: [],
  };
  if (chief.value == null) {
    users.push(newUser);
  } else {
    addNewChildByID(users, chief.value, newUser);
  }
};

const addNewChildByID = (array, id, newChild) => {
  nextTick(() => {
    array.forEach((item) => {
      if (item.id == id) {
        item.childs.push(newChild);
        return;
      }
      if (item.childs.length) {
        addNewChildByID(item.childs, id, newChild);
      }
    });
  });
};

let list = [];

const joinAllUsers = (array, width) => {
  const newWidth = width * 0.95;
  array.forEach((item) => {
    list.push({
      id: item.id,
      name: item.name,
      phoneNumber: item.phoneNumber,
      width: `${newWidth}%`,
    });
    if (item.childs.length) joinAllUsers(item.childs, newWidth);
  });
};

const userList = computed(() => {
  list = [];
  joinAllUsers(users, 100 / 0.95);
  return list;
});

const { getUsersLocalStorage } = useUsersLocalStorage();
Object.assign(users, getUsersLocalStorage());

export function useUsers() {
  return {
    users,
    addNewUser,
    userList,
  };
}
