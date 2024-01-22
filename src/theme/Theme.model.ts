
import { Color } from './color.model';

export type ThemeType = 'dark' | 'light';

export interface Theme {
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
  '--borders': Color;
  '--white': Color;
  '--gray': Color;
  '--graytr': Color;
  '--whitetr': Color;
}
