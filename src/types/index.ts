export type AccentColor = 'sky' | 'clay' | 'moss' | 'brass'

export interface ProfileKeyword {
  label: string
  accent: AccentColor
}

export interface ProfilePhoto {
  src: string
  alt: string
  rotate: number
  caption?: string
}

export interface Profile {
  name: string
  role: string
  education: string
  keywords: ProfileKeyword[]
  intro: string
  photos: ProfilePhoto[]
  contactHint: string
}

export interface Experience {
  id: string
  company: string
  period: string
  direction: string
  description: string
  tags: string[]
  accent: AccentColor
  projects: {
    title: string
    background: string
    responsibilities: string[]
  }[]
}

export interface WorkImage {
  src: string
  alt: string
  label: string
}

export interface Work {
  id: string
  title: string
  tag: string
  summary: string
  detail: string
  cover: string
  images: WorkImage[]
  accent: AccentColor
}

export interface Hobby {
  id: string
  title: string
  note: string
  images: string[]
  locations?: string[]
  accent: AccentColor
}

export interface Honor {
  id: string
  name: string
  date: string
  issuer: string
  image: string
}

export interface ContactInfo {
  closingLine: string
  email: string
  phone: string
  wechat: string
}
