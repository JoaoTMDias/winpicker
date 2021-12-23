/* eslint-disable @typescript-eslint/ban-ts-comment */
type ColorType = 'foreground' | 'background';

const CSS_NAME_SCHEMA = '--color-';

export function getColorValueofCSSVariable(type: ColorType = 'foreground') {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`${CSS_NAME_SCHEMA}${type}`)
    .trim();

  return value || undefined;
}

export function setColorValueAsCSSVariable(
  type: ColorType = 'foreground',
  newValue: string
) {
  document.documentElement.style.setProperty(
    `${CSS_NAME_SCHEMA}${type}`,
    newValue
  );
}
