import { watch } from "vue";
import { useUsers } from "./users";
export function useUsersLocalStorage() {
  const { users } = useUsers();
  watch(
    users,
    () => {
      saveUsersLocalStorage();
    },
    { deep: true }
  );

  const saveUsersLocalStorage = () =>
    (localStorage.users = JSON.stringify(users));
  const getUsersLocalStorage = () =>
    localStorage.users === "undefined" || localStorage.users === undefined
      ? null
      : JSON.parse(localStorage.users);

  return { getUsersLocalStorage };
}
