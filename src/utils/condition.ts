export function checkCondition(
  input: number,
  checkValue: number,
  condition: string
): boolean {
  switch (condition) {
    case ">":
      return input > checkValue;
    case "<":
      return input < checkValue;
    case "=":
      return input === checkValue;
    default:
      return false;
  }
}
