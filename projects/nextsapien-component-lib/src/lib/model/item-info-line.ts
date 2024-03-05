import { ItemActionHandler } from './item-action-handler';

/**
 * This model class contains strings for a label and tooltip as well as
 * a function that can be executed e.g. when a user clicks a UI element
 * associated with the ItemInfoLine. Additionally, icons can be attached
 * to the ItemInfoLine, optionally with actions.
 */
export interface ItemInfoLine {
  label: string;
  tooltipText: string;
  action: (...args: any[]) => any;
  iconTray: ItemActionHandler[];
  inlineStyles: Object;
}
