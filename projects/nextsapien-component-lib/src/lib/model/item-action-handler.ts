import { SafeHtml } from '@angular/platform-browser';

/**
 * This model class can be used in conjunction with an ItemSummary to provide
 * an icon representing some action that can be executed on the ItemSummary
 * and a function to define said action.
 *
 * Typical usage is for the calling ItemSummary to pass itself as an argument to the
 * action so that it can be updated pending completion of the action. For example,
 * the ActionHandler might initially be defined with a '+' icon and an action which
 * adds the ItemSummary to a list. Then, once the addition is completed, since the
 * consumer has a handle on the ItemSummary, they can update the ActionHandler to
 * contain a '-' icon and change the action to remove the ItemSummary from the list.
 */
export class ItemActionHandler {
  public displayHtml: SafeHtml;
  public action: (arg: any) => any;
  public toolTip: SafeHtml;

  constructor(displayHtml: SafeHtml, action: (arg: any) => any, toolTip?: SafeHtml) {
    this.displayHtml = displayHtml;
    this.action = action;
    this.toolTip = toolTip;
  }
}
