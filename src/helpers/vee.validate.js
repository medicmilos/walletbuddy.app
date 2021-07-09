import { required, email, numeric } from "vee-validate/dist/rules"
import { extend } from "vee-validate"

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
