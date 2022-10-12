<template>
  <div class="modal">
    <div class="row header">
      <span>Добавление пользователя</span>
      <button @click="close">x</button>
    </div>
    <div class="row">
      <span>Имя</span>
      <input type="text" v-model="name" />
    </div>
    <div class="row">
      <span>Телефон</span>
      <input type="text" v-model="phone" />
    </div>
    <div class="row">
      <span>Начальник</span>
      <select v-model="chief">
        <option :value="null" selected></option>
        <option :value="user.id" v-for="user in userList" :key="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <button @click="save()" class="saveBtn">Сохранить</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  emits: { close: null, save: null },

  setup(props, emits) {
    const name = ref(null);
    const phone = ref(null);
    const chief = ref(null);

    const close = () => {
      emits.emit("close");
    };

    const save = () => {
      if (name.value != null && phone != null) {
        emits.emit("addNewUser", name, phone, chief);
        close();
      }
    };

    return { name, phone, chief, close, save };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 5;
  position: absolute;
  top: 4rem;
  $width: 32rem;
  left: calc(50% - $width / 2);
  width: $width;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: #fff;
  border: 2px solid #c4c4c4;
  border-radius: 6px;
  padding: 1rem 2rem;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;

    input,
    select {
      width: 20rem;
      height: 2rem;
      padding: 6px;
    }
  }

  .saveBtn {
    width: 10rem;
    height: 2rem;
    border-radius: 1rem;
    outline: none;
    border: 1px solid #aeaeae;
  }

  .header {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      width: 1rem;
      height: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
}
</style>
