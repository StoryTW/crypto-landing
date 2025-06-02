export type User = {
  id: string
  email: string
  name: string
  password: string
  role: "USER" | "ADMIN"
}

export const users: User[] = [] 