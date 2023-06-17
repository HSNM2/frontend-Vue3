export default function getStar(score: number | string, index: number) {
  const rate = Number(score)
  if (Number.isInteger(rate) === true) {
    if (index + 1 <= rate) {
      return 'star'
    } else {
      return 'star_border'
    }
  } else {
    if (index + 1 <= rate) {
      return 'star'
    } else if (index + 1 - rate <= 0.5) {
      return 'star_half'
    } else {
      return 'star_border'
    }
  }
}
