<template>
  <header class="bg-indigo-300">
    <section class="py-3 px-4 flex justify-between">
      <router-link to="/">
        <h3 class="text-white text-2xl pl-3 ">TEST</h3>
      </router-link>
      <div>
        <router-link to="/" class="text-white px-3">Dashboard</router-link>
         <router-link to="/settings"  class="text-white px-3">Settings</router-link>
         <a @click="logout()"  class="text-white px-3">logout</a>
      </div>
    </section>
      
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>