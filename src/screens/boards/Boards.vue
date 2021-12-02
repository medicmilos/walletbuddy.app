<template>
  <v-container>
    <p class="text-h5 font-weight-black mt-10">Create new board</p>
    <v-divider />
    <v-row class="pt-5 d-flex align-center">
      <v-text-field
        class="col-4"
        @keydown.enter.native="createBoard"
        v-model="boardTitle"
        label="Board title"
      />
      <v-btn @click="createBoard" :disabled="loading" color="primary">
        create
      </v-btn>
    </v-row>
    <p class="text-h5 font-weight-black mt-5">My boards</p>
    <v-divider />
    <v-row class="pt-5" v-if="getMyBoards.length">
      <v-col v-for="board in getMyBoards" :key="board.id" cols="3" xs="12">
        <v-card shaped>
          <v-card-text>
            <p class="text-h6 text--primary">{{ board.title }}</p>
          </v-card-text>
          <v-card-actions>
            <router-link
              :to="{
                name: 'board',
                params: { uid: board._id }
              }"
            >
              <v-btn text color="deep-purple accent-4">VISIT</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <p v-else class="mt-1">No boards to show.</p>
    <p class="text-h5 font-weight-black mt-10">Boards shared with me</p>
    <v-divider />
    <v-row class="pt-5" v-if="getSharedBoards.length">
      <v-col v-for="board in getSharedBoards" :key="board.id" cols="3" xs="12">
        <v-card shaped>
          <v-card-text>
            <p class="text-h6 text--primary">{{ board.title }}</p>
          </v-card-text>
          <v-card-actions>
            <router-link
              :to="{
                name: 'board',
                params: { uid: board._id }
              }"
            >
              <v-btn text color="deep-purple accent-4">VISIT</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <p v-else class="mt-1">No boards to show.</p>
  </v-container>
</template>

<script>
export default {
  name: "Boards",
  computed: {
    getMyBoards() {
      return this.$store.getters["boards/getMyBoards"]
    },
    getSharedBoards() {
      return this.$store.getters["boards/getSharedBoards"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    }
  },
  data() {
    return { boardTitle: "", loading: false }
  },
  created() {},
  watch: {
    getCurrentUser() {
      this.getMyBoardsData()
      this.getSharedBoardsData()
    }
  },
  methods: {
    createBoard() {
      this.loading = true
      const data = {
        title: this.boardTitle,
        ownerUID: this.getCurrentUser._id,
        ballance: 0,
        users: [this.getCurrentUser.email]
      }
      this.$store.dispatch("boards/createNewBoard", data).then(response => {
        this.getMyBoardsData()
        this.boardTitle = ""
        this.loading = false
        if (response.status) {
          //console.log("response success app: ", response.data)
        } else {
          //console.log("response error app: ", response.data)
        }
      })
    },
    getMyBoardsData() {
      this.$store.dispatch("boards/getMyBoards", this.getCurrentUser._id)
    },
    getSharedBoardsData() {
      this.$store.dispatch("boards/getSharedBoards", this.getCurrentUser.email)
    }
  }
}
</script>

<style lang="scss"></style>
