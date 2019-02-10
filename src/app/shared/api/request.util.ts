export class RequestUtil {
  public static readonly UUID_REGEX = new RegExp('^[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}$');

  public static validUuid(givenId: string): boolean {
    return RequestUtil.UUID_REGEX.test(givenId);
  }
}
