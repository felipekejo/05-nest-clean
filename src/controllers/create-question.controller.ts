import { Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-use-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)
    return 'Hello World'
  }
}
