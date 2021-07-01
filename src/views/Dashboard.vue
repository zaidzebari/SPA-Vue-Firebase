<template>
  <div class="h-full relative bg-indigo-100">
    <transition name="fade">
     <div class="">
          <CommentModal
          v-if="showCommentModal"
          :post="selectedPost"
          @close="toggleCommentModal()"
        class="absolute left-1/3 top-40  z-50 bg-blue-400 p-5 rounded "
        ></CommentModal>
     </div>
    </transition>
    <section class="grid sm:grid-cols-1 md:grid-cols-5">
      <div class="ml-4 my-8 p-3  sm:grid-cols-1 md:col-span-2">
        <div class="profile bg-white p-7 rounded">
          <h5 class="text-black text-xl">{{ userProfile.name }}</h5>
          <p class="text-gray-400">{{ userProfile.title }}</p>
          <div class="mt-2">
            <p class="text-gray-400">create a post</p>
            <form @submit.prevent>
              <textarea
                v-model.trim="post.content"
                class="border border-gray-400 w-full resize-none rounded h-52 outline-none"
              ></textarea>
              <button
                @click="createPost()"
                :disabled="post.content === ''"
                class="bg-blue-400 text-white w-full py-1 rounded"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="sm:grid-col-1 md:col-span-3">
        <div class="bg-white mt-11  roudned mx-2  p-6">
          <div v-if="posts.length">
            <div v-for="post in posts" :key="post.id" class="flex flex-col">
              <h5 class="text-black text-xl">{{ post.userName }}</h5>
              <span class="text-gray-400 text-sm italic">{{ post.createdOn | formatDate }}</span>
              <p class="text-gray-700 my-3" >{{ post.content | trimLength }}</p>
              <div class="border-b-2 ">
                <div class="mb-3 text-blue-400 text-sm">
                  <a @click="toggleCommentModal(post)" class="mr-3"
                    >comments {{ post.comments }}</a>
                    <a @click="likePost(post.id, post.likes)" class="mr-3"
                    >likes {{ post.likes }}</a >
                    <a @click="viewPost(post)"  class="mr-3">view full post</a>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="no-results">There are currently no posts</p>
          </div>
        </div>
      </div>
    </section>

    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <a>comments {{ fullPost.comments }}</a>
              </li>
              <li>
                <a>likes {{ fullPost.likes }}</a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div
              v-for="comment in postComments"
              :key="comment.id"
              class="comment"
            >
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { commentsCollection } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";
export default {
  components: {
    CommentModal,
  },
  data() {
    return {
      post: {
        content: "",
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      this.post.content = "";
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;
      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    async viewPost(post) {
      const docs = await commentsCollection
        .where("postId", "==", post.id)
        .get();
      docs.forEach((doc) => {
        let comment = doc.data();
        comment.id = doc.id;
        this.postComments.push(comment);
      });
      this.fullPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>