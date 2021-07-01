<template>
<div class=" bg-indigo-200 m-20 rounded" >

  <section id="settings" >
    <div class="mx-14 px-10 py-5">
      <h3 class="text-black text-2xl">Settings</h3>
      <p class="text-gray-700 mb-10">Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name" class="block font-bold py-1">Name</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name"   class=" p-2  w-full rounded border focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-100 "/>

        <label for="title" class="block font-bold py-1">Job Title</label>
        <input v-model.trim="title" type="text" :placeholder="userProfile.title" id="title"   class=" p-2  w-full rounded border focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-100 "/>

        <button @click="updateProfile()" class=" py-1 px-2  mr-5   px-3bg-white  mt-4 rounded bg-white text-red-500 inline font-bold ">Update Profile</button>
      </form>
    </div>
  </section>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: '',
      title: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        title: this.title !== '' ? this.title : this.userProfile.title
      })
      this.name = ''
      this.title = ''
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>