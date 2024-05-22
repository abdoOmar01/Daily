const defaultSort = (a, b) => {
  const dateA = new Date(a.dateCreated)
  const dateB = new Date(b.dateCreated)

  if (a.done === b.done) {
    if (dateA > dateB) {
      return 1
    } else if (dateA < dateB) {
      return -1
    } else {
      return 0
    }
  } else if (a.done) {
    return 1
  }

  return -1
}

export default defaultSort