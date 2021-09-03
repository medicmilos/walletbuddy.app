import { extend } from "vee-validate"
import { email, numeric, required } from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "Polje je obavezno."
})

extend("email", {
  ...email,
  message: "Email mora biti u validnom formatu."
})

extend("numeric", {
  ...numeric,
  message: "Polje mora biti broj."
})
