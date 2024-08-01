export type Percentage = `${number}%`;
export type CustomPropType = `var(--${string})`;

export type RmUnitType =
  | CustomPropType
  | '0'
  | `${number}${'px' | 'rem' | 'ch' | 'em' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%' | 'svh' | 'lvh' | 'dvh'}`;

export type JustifyContentTypes =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'baseline';
export type AlignItemsTypes =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';
