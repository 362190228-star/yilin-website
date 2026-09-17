import type { Hobby } from '../types'
import { asset } from '../utils/asset'

export const hobbies: Hobby[] = [
  {
    id: 'photography',
    title: '摄影',
    note: '喜欢用胶片质感记录光线和瞬间的情绪。',
    images: [
      asset('assets/hobbies/photography/5354e84c89ca449083c637ace0814890.webp'),
      asset('assets/hobbies/photography/5a7b56bbf914fedb59a10c9e8d0e022f.webp'),
      asset('assets/hobbies/photography/6693964468a4aa134b1d45224472c699.webp'),
      asset('assets/hobbies/photography/e036f065217731c6fcbfe25b5b887a08.webp'),
    ],
    accent: 'sky',
  },
  {
    id: 'travel',
    title: '旅行',
    note: '每次旅行都会带回一些奇怪的门票和地图。',
    images: [
      asset('assets/hobbies/travel/天津.webp'),
      asset('assets/hobbies/travel/澳门.webp'),
      asset('assets/hobbies/travel/贵阳.webp'),
      asset('assets/hobbies/travel/重庆.webp'),
      asset('assets/hobbies/travel/香港.webp'),
    ],
    locations: ['天津', '澳门', '贵阳', '重庆', '香港'],
    accent: 'clay',
  },
  {
    id: 'food',
    title: '美食',
    note: '用味道记住城市，也收集每一次认真吃饭的快乐。',
    images: [
      asset('assets/hobbies/food/444ea5f311b787e1d02472ab6beef4c0.webp'),
      asset('assets/hobbies/food/bd436ebc9382de17805912fb84277f48.webp'),
      asset('assets/hobbies/food/c9b4bd11951e5aa5b1c0120c2fdb535b.webp'),
    ],
    accent: 'clay',
  },
]
