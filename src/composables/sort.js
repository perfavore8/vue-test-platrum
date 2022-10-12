import { ref, watch } from "vue";

export function useSort() {
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

  const userList = ref([]);
  const copyUserList = (value) => {
    userList.value = value;
    // console.log(userList.value);
  };
  watch(
    userList,
    () => {
      console.log("asd", sortedUserList.value);
      sortOutArray(userList.value);
      console.log(sortedUserList.value);
    },
    { deep: true }
  );

  sortOutArray(userList.value);

  return { setSortValue, sortOutArray, sortedUserList, copyUserList };
}
