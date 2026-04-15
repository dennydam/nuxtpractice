interface IProduct {
  id: number
  name: string
  price: number
  description: string
  image: string
}

export interface ProductData {
  id: number
  title: string
  content: string
  price:number
}

export interface TimeSlot {
  time: string
  status: number
}

export interface TimeSection {
  label: string
  times: TimeSlot[]
}

export interface Appointment {
  id: number
  treatment: string
  appointmentTime: Date
  createdAt: Date
  updatedAt: Date
  authorId: string
}
