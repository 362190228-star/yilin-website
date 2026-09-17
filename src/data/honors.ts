import type { Honor } from '../types'
import { asset } from '../utils/asset'

const honorFiles = [
  '152f6d8eb3e18091338636ea3b853f41',
  '2674d1fb5474de7bade546f322e5b2f3',
  '458b4e934f4e776df9e1f657cc39e71b',
  '4c357d753609d229cd968e9ed46d2693',
  '64355413a9cf629919440ea4e419a0ee',
  '7300378a912bbaa16015c261ae5d69ce',
  '8cc1721673051c6f352fbf4ce3cb84b2',
  '946b379988541996279ba81bde07e896',
  'a2de98ad7ee5f80f8fd76191f050ad5a',
  'deb20b50676e035377e95000556a1146',
]

export const featuredHonorIds = [
  '4c357d753609d229cd968e9ed46d2693',
  'deb20b50676e035377e95000556a1146',
]

export const honors: Honor[] = honorFiles.map((file, index) => ({
  id: file,
  name: `个人荣誉 ${index + 1}`,
  date: '',
  issuer: '',
  image: asset(`assets/honors/${file}.webp`),
}))
