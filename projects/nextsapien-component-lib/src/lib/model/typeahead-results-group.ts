import { ItemSummary } from './item-summary';

export class TypeaheadResultsGroup {
  public summaries: ItemSummary<any>[] = [];
  public groupName?: string;
}
