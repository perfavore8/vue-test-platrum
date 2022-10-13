<template>
  <div class="container">
    <button @click="openModal()" class="addBtn">Добавить</button>
    <div class="grid">
      <div class="titles">
        <label
          v-for="title in titles"
          :key="title"
          class="grid-cell title"
          @click="setSortValue(title.value)"
        >
          {{ title.name }}
        </label>
      </div>
      <ul class="list">
        <li class="item" v-for="user in sortedUserList" :key="user">
          <lable class="grid-cell name" :style="{ width: user.width }">
            {{ user.name }}
          </lable>
          <lable class="grid-cell phone">{{ user.phoneNumber }}</lable>
        </li>
      </ul>
    </div>
  </div>
  <Teleport to="body">
    <AddUserModal
      :userList="userList"
      @close="closeModal"
      @addNewUser="addNewUser"
      v-if="showModal"
    />
  </Teleport>
</template>

<script>
import AddUserModal from "./AddUserModal.vue";
import { useUsers } from "../composables/users";
import { useSort } from "../composables/sort";
import { useModalControl } from "../composables/modalControl";
export default {
  components: {
    AddUserModal,
  },

  setup() {
    const titles = [
      {
        name: "Имя",
        value: "name",
      },
      {
        name: "Телефон",
        value: "phoneNumber",
      },
    ];

    return {
      titles,
      ...useUsers(),
      ...useModalControl(),
      ...useSort(),
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 30rem;
  margin-top: 4rem;
  .addBtn {
    width: 10rem;
    height: 2rem;
    border-radius: 1rem;
    outline: none;
    border: 1px solid #aeaeae;
    margin-bottom: 0.5rem;
  }
  .grid {
    display: flex;
    flex-direction: column;
    // border: 1px solid #c4c4c4;
    .grid-cell {
      border: 1px solid #c4c4c4;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      padding: 10px;
    }
    .titles {
      display: grid;
      grid-template-columns: 1fr 2fr;
      place-items: center;
      .title {
      }
    }
    .list {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      .item {
        display: grid;
        grid-template-columns: 1fr 2fr;
        place-items: end;
      }
    }
  }
}
</style>
