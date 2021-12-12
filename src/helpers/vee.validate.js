import { extend } from "vee-validate"
import { email, numeric, required } from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "Field is required"
})

extend("email", {
  ...email,
  message: "E-mail must be valid format"
})

extend("numeric", {
  ...numeric,
  message: "Field must be number"
})
