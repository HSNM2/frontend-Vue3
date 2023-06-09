export function getStar(score: number | string, index: number) {
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

export function getAvatar(imagePath: string) {
  if (imagePath === null) {
    return 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
  } else {
    const str = imagePath.slice(-4)
    if (str === 'null') {
      return 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
    } else {
      return imagePath
    }
  }
}
