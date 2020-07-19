export function convertToCelsius(kelvinTemp: number): string {
  const difference = 273.15;
  const cels = kelvinTemp - difference;
  const celsRounded = Math.round(cels);
  const mark = kelvinTemp >= difference ? '+' : '-';
  return mark + celsRounded.toString() + '°';
}
