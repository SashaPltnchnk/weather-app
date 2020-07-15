export function convertToCelsius(kelvinTemp: number): string {
  const cels = kelvinTemp - 273.15;
  const celsRounded = Math.round(cels);
  return celsRounded.toString();
}
