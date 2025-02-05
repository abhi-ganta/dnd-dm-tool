export interface Sound {
  id: string
  name: string
  file: string
  timestamps: Timestamp[]
}

export interface Timestamp {
  id: string
  start: number
  end: number | null
  label: string
} 