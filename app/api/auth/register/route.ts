import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { email, name, password } = await req.json()

  // Простая валидация
  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Некорректный email" }, { status: 400 })
  }
  if (!password || password.length < 6) {
    return NextResponse.json({ message: "Пароль должен быть не менее 6 символов" }, { status: 400 })
  }
  if (!name || name.length < 2) {
    return NextResponse.json({ message: "Имя должно быть не менее 2 символов" }, { status: 400 })
  }

  // Проверка на существование пользователя
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ message: "Пользователь с таким email уже существует" }, { status: 400 })
  }

  // Создание пользователя (роль всегда USER)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password, // В реальном проекте пароль нужно хешировать!
      role: "USER"
    }
  })

  return NextResponse.json({ message: "Пользователь успешно зарегистрирован", user: { id: user.id, email: user.email, name: user.name, role: user.role } }, { status: 201 })
} 