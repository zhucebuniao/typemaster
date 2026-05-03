export type PromptItem = {
  id: string
  title: string
  prompt: string
  tags: string[]
  note?: string
  imageUrl: string
  lastCopiedAt?: string
  copyCount: number
}

export type TabKey = 'gallery' | 'favorites' | 'recent' | 'settings'
