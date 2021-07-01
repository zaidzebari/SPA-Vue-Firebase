<template>
  <div class="container bg-blue-400">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
    <section class="flex h-screen w-screen justify-center items-center">
      <div
        :class="{ 'signup-form': !showLoginForm }"
        class="m-auto bg-blue-700 p-5 rounded-md"
      >
        <img src="../assets/logo.png" alt="" srcset="" class="w-4/12 m-auto" />
        <form v-if="showLoginForm" @submit.prevent>
          <h1 class="font-bold text-3xl py-5 text-yellow-400">Welcome Back!</h1>
          <div>
            <label for="email1" class="block font-bold py-1">Email</label>
            <input
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
              class="
                p-2
                w-full
                rounded
                border
                focus:border-blue-600
                focus:outline-none
                focus:ring focus:ring-blue-100
              "
            />
          </div>
          <div>
            <label for="password1" class="block font-bold py-1">Password</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
              class="
                p-2
                w-full
                rounded
                border
                focus:border-blue-600
                focus:outline-none
                focus:ring focus:ring-blue-100
              "
            />
          </div>

          <div>
            <!-- <a @click="togglePasswordReset()">Forgot Password</a> -->
            <button
              @click="login()"
              class="
                py-1
                px-3bg-white
                mt-2
                px-2 mr-5
                rounded
                bg-white
                text-red-500
                font-bold
              "
            >
              Log In
            </button>
            <a @click="toggleForm()" class="text-white underline cursor-pointer">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1 class="font-bold text-3xl py-5 text-yellow-400">Get Started</h1>
          <div>
            <label for="name" class="block font-bold py-1">Name</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              placeholder="Savvy Apps"
              id="name"
              class="
                p-2
                w-full
                rounded
                border
                focus:border-blue-600
                focus:outline-none
                focus:ring focus:ring-blue-100
              "
            />
          </div>
          <div>
            <label for="title" class="block font-bold py-1">Title</label>
            <input
              v-model.trim="signupForm.title"
              type="text"
              placeholder="Company"
              id="title"
              class=" p-2  w-full rounded border focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-100 "
            />
          </div>
          <div>
            <label for="email2" class="block font-bold py-1">Email</label>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="you@email.com"
              id="email2"
              class="
                p-2
                w-full
                rounded
                border
                focus:border-blue-600
                focus:outline-none
                focus:ring focus:ring-blue-100
              "
            />
          </div>
          <div>
            <label for="password2" class="block font-bold py-1">Password</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password2"
              class="
                p-2
                w-full
                rounded
                border
                focus:border-blue-600
                focus:outline-none
                focus:ring focus:ring-blue-100
              "
            />
          </div>
          <div class="">
            <button
              @click="signup()"
              class=" py-1 px-2  mr-5  px-3bg-white  mt-2 rounded bg-white text-red-500 inline font-bold "
            >
              Sign Up
            </button>
            <a @click="toggleForm()" class="text-white underline cursor-pointer"
              >Back to Log In</a
            >
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
export default {
  components: {
    PasswordReset,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title,
      });
    },
  },
};
</script>