import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers';
import { AuthEmployeeContext } from '../auth/auth.employee.context';
import { Customer, IdOf } from '@seminar/common';

@Injectable()
export class PermissionsService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  @Inject(AuthEmployeeContext)
  private readonly authEmployeeContext: AuthEmployeeContext;

  public async canCoachAccessCustomer(
    customerId: IdOf<Customer>,
  ): Promise<boolean> {
    if (!this.authEmployeeContext.employee) {
      return false;
    }

    const employeeId = this.authEmployeeContext.employee.id;
    const customer = await this.prismaService.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return false;
    }

    return customer.coachId === employeeId;
  }
}
