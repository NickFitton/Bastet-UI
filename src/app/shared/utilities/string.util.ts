export class StringUtil {
  public static toNameCase(string: string): string {
    return string.substring(0, 1).toUpperCase() + string.substring(1, string.length).toLowerCase();
  }
}
