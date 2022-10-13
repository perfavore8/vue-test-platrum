import { ref, watch } from "vue";
import { useUsers } from "./users";

const { userList } = useUsers();

let sortValue = null;
const setSortValue = (value) => {
  if (sortValue === value) {
    sortValue = null;
  } else {
    sortValue = value;
  }
  sortOutArray(userList.value);
};

const sortedUserList = ref([]);

const sortOutArray = (array) => {
  if (sortValue == null) {
    sortedUserList.value = [...array];
  } else {
    const newArray = [...array];
    newArray.sort((a, b) => {
      if (a[sortValue] > b[sortValue]) return 1;
      if (a[sortValue] == b[sortValue]) return 0;
      if (a[sortValue] < b[sortValue]) return -1;
    });
    sortedUserList.value = newArray;
  }
};

watch(
  userList,
  () => {
    sortOutArray(userList.value);
  },
  { deep: true }
);

sortOutArray(userList.value);

export function useSort() {
  return { setSortValue, sortedUserList };
}
