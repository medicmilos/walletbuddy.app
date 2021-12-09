<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">send reminder</v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">Send message reminder</v-card-title>
      <v-card-subtitle class="mt-1" v-if="data">
        To user: {{ data.userEmail }}
      </v-card-subtitle>
      <v-card-text>
        <v-textarea v-model="message"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="dialog = false"
          :disabled="loading"
        >
          Close
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="sendEmail"
          :disabled="loading"
        >
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UserReminderModal",
  props: { data: Object },
  data() {
    return {
      dialog: false,
      message: "",
      loading: false
    }
  },
  watch: {},
  methods: {
    sendEmail() {
      const data = {
        ...this.data,
        message: this.message
      }
      this.loading = true
      this.$store.dispatch("boards/sendEmailReminder", data).then(() => {
        this.loading = false
        this.message = ""
        this.dialog = false
        this.$root.$emit("actionResponse", 1, "Message sent")
      })
      console.log(data)
    }
  }
}
</script>
