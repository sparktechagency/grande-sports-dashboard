const formatTransactionId = (id: string) => {
  // if (id.length < 6) return id;

  const divider = Math.floor(id.length / 3)

  const firstPart = id.slice(0, divider)
  const lastPart = id.slice(-divider)

  const middlePartInStars = id.slice(divider, -divider).replace(/./g, "*")

  return firstPart + middlePartInStars + lastPart
}

export const formatString = {
  formatTransactionId,
}
