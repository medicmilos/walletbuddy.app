<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet min-height="80vh" rounded="lg" class="pa-0">
          <v-container class="boards-page pa-10">
            <p class="text-h6 font-weight-black mt-1 mb-1">Boards</p>
            <v-divider />
            <p class="text-h6 font-weight-black mt-5" v-if="getCurrentUser">
              User: {{ getCurrentUser.email }}
            </p>
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
              <v-col
                v-for="board in getMyBoards"
                :key="board.id"
                cols="3"
                xs="12"
              >
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
              <v-col
                v-for="board in getSharedBoards"
                :key="board.id"
                cols="3"
                xs="12"
              >
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
        </v-sheet>
      </v-col>
    </v-row>
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
  created() {
    if (this.getCurrentUser) {
      this.getMyBoardsData()
      this.getSharedBoardsData()
    }
  },
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
      this.$store.dispatch("boards/createNewBoard", data).then(() => {
        this.getMyBoardsData()
        this.boardTitle = ""
        this.loading = false
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

<style lang="scss">
.boards-page {
  background: rgb(252, 249, 252);
  background: linear-gradient(
    45deg,
    rgba(252, 249, 252, 1) 0%,
    rgba(248, 249, 253, 1) 100%
  );
}
</style>
