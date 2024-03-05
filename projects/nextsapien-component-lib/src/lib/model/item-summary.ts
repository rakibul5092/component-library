import { SafeHtml, SafeUrl } from '@angular/platform-browser';
import { ItemActionHandler } from './item-action-handler';
import { ItemInfoLine } from './item-info-line';

/**
 * This model class contains basic info about a type as well as how to display
 * and interact with it.
 */
export class ItemSummary<T> {
  public header: ItemInfoLine;
  public subheaders: ItemInfoLine[];
  public details: ItemInfoLine[];
  public item: T;
  public abbreviation: string;
  public icon: SafeHtml;
  public iconBackgroundColor: string;
  public image: SafeUrl;
  public visualIcon: SafeHtml;
  public actionHandler: ItemActionHandler;
  public disabled: boolean;

  constructor(header: ItemInfoLine, subheaders: ItemInfoLine[], details: ItemInfoLine[], item: T) {
    this.header = header;
    this.subheaders = subheaders;
    this.details = details;
    this.item = item;
  }

  /**
   *
   * @param summary - summary to compare with.
   *
   * Determines if the summary matches this one based on the displayed text values.
   */
  public equals(summary: ItemSummary<any>): boolean {
    let match = true;
    match = match && this.header.label === summary.header.label;
    match = match && this.details.length === summary.details.length;
    match = match && this.subheaders.length === summary.subheaders.length;
    if (match) {
      this.details.forEach((detail, index) => {
        match = match && detail.label === summary.details[index].label;
      });
      this.subheaders.forEach((subheader, index) => {
        match = match && subheader.label === summary.subheaders[index].label;
      });
    }
    return match;
  }

  public clone(): ItemSummary<T> {
    const newSummary = new ItemSummary(this.header, this.subheaders, this.details, this.item);
    newSummary.abbreviation = this.abbreviation;
    newSummary.visualIcon = this.visualIcon;
    newSummary.actionHandler = this.actionHandler;
    newSummary.disabled = this.disabled;
    newSummary.icon = this.icon;
    newSummary.image = this.image;
    return newSummary;
  }
}
