<template>
  <div class="c-modal">
    <div class="c-container">
      <a @click="$emit('close')" class="float-right mb-3 text-white cursor-pointer">X</a>
      <p class="clear-right">add a comment</p>
      <form @submit.prevent>
        <textarea v-model.trim="comment"  class="border border-gray-400 w-full resize-none rounded h-20 outline-none"></textarea>
        <button @click="addComment()" :disabled="comment == ''" class="bg-white p-1  w-full rounded text-red-600">add comment</button>
      </form>
    </div>
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase'
export default {
  props: ['post'],
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    async addComment() {
      // create comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name
      })
      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1
      })
      // close modal
      this.$emit('close')
    }
  }
}
</script>