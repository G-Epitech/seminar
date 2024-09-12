import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { BadRequest } from '../../classes/responses';
import { InPostAuthLogInDto, OutPostAuthLogInDto } from '@seminar/common';

@Controller('/auth')
export class AuthController {
  @Inject(AuthService)
  private _authService: AuthService;

  @Public()
  @Post('login')
  async authEmployee(
    @Body() dto: InPostAuthLogInDto,
  ): Promise<OutPostAuthLogInDto> {
    const result = await this._authService.login(dto.email, dto.password);

    if (!result) {
      throw new BadRequest({ message: 'Invalid email or password' });
    }
    return {
      tokens: {
        access: await this._authService.generateAccessToken(result),
      },
    };
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() dto: { email: string }) {
    await this._authService.forgotPassword(dto.email);
  }
}
