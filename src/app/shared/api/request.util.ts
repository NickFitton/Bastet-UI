import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user/user.service';

export class RequestUtil {
  public static readonly UUID_REGEX = new RegExp('^[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}$');

  public static validUuid(givenId: string): boolean {
    return RequestUtil.UUID_REGEX.test(givenId);
  }

  public static generateAuthHeaders(userService: UserService): HttpHeaders {
    return new HttpHeaders({'authorization': 'Token ' + userService.getToken()});
  }
}
