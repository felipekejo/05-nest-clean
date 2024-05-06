import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const account = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return account
  }
}