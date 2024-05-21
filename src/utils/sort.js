const defaultSort = (a, b) => {
  if (a.done === b.done) {
    if (a.dateCreated > b.dateCreated) {
      return 1
    } else if (a.dateCreated < b.dateCreated) {
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