export interface TVideo {
  _id: string
  playlist: Playlist
  author: Author
  video: string
  thumbnail: string
  description: string
  contentMeta: ContentMeta
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  isLiked: boolean
}

export interface Playlist {
  _id: string
  title: string
  modelType: string
}

export interface Author {
  _id: string
  name: string
  photoUrl: string
}

export interface ContentMeta {
  _id: string
  like: number
  likeBy: string[]
  comment: number
  view: number
  share: number
}