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
}

export interface Appointment {
  id: number
  treatment: string
  appointmentTime: Date
  createdAt: Date
  updatedAt: Date
  authorId: string
}
