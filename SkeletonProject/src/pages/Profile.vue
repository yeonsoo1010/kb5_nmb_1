<template>
    <div class="profile-container">
        <div class="form-container-left">
            <br />

            <h4>프로필 입력</h4>
            <br />
            <form @submit.prevent="submitProfile">
                <div class="form-group">
                    <label for="name"> <i class="fas fa-user"></i>&nbsp; 이름 : </label>
                    <input type="text" id="name" v-model="name" required />
                </div>
                <div class="form-group">
                    <label for="email"> <i class="fas fa-envelope"></i>&nbsp; 이메일 : </label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <br />
                <div class="button-container">
                    <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> 저장</button>
                    &nbsp; &nbsp;
                    <button type="button" class="btn btn-danger" @click="clearProfile"><i class="fa-solid fa-delete-left"></i>초기화</button>
                </div>
            </form>
        </div>

        <div class="profile-info-right">
            <br />
            <div class="image-container">
                <img src="../assets/profile-image.png" alt="profile" />
            </div>
            <br />
            <h3>프로필 정보</h3>
            <div class="profile-info">
                <p><strong>이름 :</strong> {{ name }}</p>
                <p><strong>이메일 :</strong> {{ email }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            name: localStorage.getItem("profile_name") || "",
            email: localStorage.getItem("profile_email") || "",
        };
    },
    methods: {
        async submitProfile() {
            try {
                const response = await axios.post("http://localhost:3000/profile", {
                    name: this.name,
                    email: this.email,
                });

                alert("프로필 정보가 성공적으로 저장되었습니다.");

                localStorage.setItem("profile_name", this.name);
                localStorage.setItem("profile_email", this.email);
            } catch (error) {
                console.error("Error:", error);
                alert("프로필 정보를 저장하는 중에 오류가 발생했습니다.");
            }
        },
        clearProfile() {
            // 로컬 스토리지에서 값을 제거하고 입력 필드를 공백으로 설정
            localStorage.removeItem("profile_name");
            localStorage.removeItem("profile_email");
            this.name = "";
            this.email = "";
        },
    },
};
</script>

<style scoped>
.profile-container {
    display: flex;
    justify-content: space-between;
}

.form-container-left {
    width: 50%;
}

.form-container-left h1 {
    margin-bottom: 1rem;
}

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
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    height: 30px;
}

.button-container {
    display: flex;
    justify-content: center;
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

.profile-info-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-container {
    max-width: 250px;
    margin-bottom: 1rem;
}

.image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
}

.profile-info {
    text-align: left;
}

.profile-info h2 {
    margin-bottom: 0.5rem;
}

.profile-info p {
    margin-bottom: 0.5rem;
}
.button-container button {
    margin-right: 10px;
}
</style>
