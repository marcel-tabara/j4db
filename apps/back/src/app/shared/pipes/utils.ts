export const sortByTitle = (a, b) => {
  const aa = a.title.toLowerCase()
  const bb = b.title.toLowerCase()
  if (aa > bb) {
    return 1
  } else if (aa < bb) {
    return -1
  } else {
    return 0
  }
}
