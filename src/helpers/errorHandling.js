class errorHandler {
  extractErrors(error) {
    let errorData = []
    errorData.push(error.response.data)

    let errMessage = ""

    errorData.forEach(error => {
      iterator(error)
    })

    function iterator(error) {
      let entry = Object.values(error)
      entry.forEach(entryItem => {
        if (typeof entryItem === "string") {
          if (entryItem !== "The given data was invalid.")
            errMessage += entryItem
        } else {
          iterator(entryItem)
        }
      })
    }

    errMessage.includes("The given data was invalid.")

    return errMessage
  }
}

export default new errorHandler()
