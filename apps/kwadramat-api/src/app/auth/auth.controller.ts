import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService, IncorrectPasswordError } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/sign-in')
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const { token } = await this.authService.login((req as any).user);
    response.cookie('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/who-am-i')
  async getProfile(@Req() req: Request) {
    const reqUser = req.user as { userId: number; username: string };
    const user = await this.userService.findOneByUsername(reqUser.username);
    return {
      id: user?.id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };
  }

  @Post('auth/sign-out')
  async signOut(@Res() response: Response) {
    response
      .clearCookie('token', {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: true,
      })
      .json({
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
      });
  }

  @Post('auth/change-password')
  async changePassword(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      await this.authService.changePassword({
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
        username: req.body.username,
      });
      response
        .clearCookie('token', {
          httpOnly: true,
          path: '/',
          sameSite: 'none',
          secure: true,
        })
        .json({
          statusCode: HttpStatus.NO_CONTENT,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      if (error instanceof IncorrectPasswordError) {
        response.json({
          statusCode: HttpStatus.UNAUTHORIZED,
          timestamp: new Date().toISOString(),
        });
        return;
      }
      throw error;
    }
  }

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}
}
