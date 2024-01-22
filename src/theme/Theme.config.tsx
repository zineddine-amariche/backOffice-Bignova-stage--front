
import { Color } from './color.model';
import { ThemeType, Theme } from './Theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.PRIMARY,
    '--secondary': Color.SCONDARY,
    '--background': Color.WHITE,
    '--borders': Color.BORDERS,
    '--white': Color.WHITE,
    '--gray': Color.GRAY,
    '--graytr': Color.GRAYTRANSP,
    '--whitetr': Color.WHITETRANSP,
  },
  dark: {
    '--primary': Color.WHITE,
    '--secondary': Color.WHITE,
    '--background': Color.DARK,
    '--borders': Color.BORDERS,
    '--white': Color.WHITE,
    '--gray': Color.GRAY,
    '--graytr': Color.WHITETRANSP,
    '--whitetr': Color.GRAYTRANSP,

  }
};
