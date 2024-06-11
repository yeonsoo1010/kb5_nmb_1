<template>
  <div>
    <h1>프로필 입력</h1>
    <form @submit.prevent="submitProfile">
      <div class="form-group">
        <label for="name"> <i class="fas fa-user"></i> 이름: </label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email"> <i class="fas fa-envelope"></i> 이메일: </label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit" class="btn btn-warning">
        <i class="fas fa-save"></i> 저장
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    submitProfile() {
      console.log("저장되었습니다:", this.name, this.email);
    },
  },
};
</script>

<style scoped>
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

label {
  width: 6rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
}

input {
  width: 50%;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

button i {
  margin-right: 0.5rem;
}
</style>
