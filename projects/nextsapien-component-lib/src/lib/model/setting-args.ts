import { SafeHtml } from '@angular/platform-browser';

/**
 * This model class contains basic info about a setting
 */
export class SettingArgs {
  public disabled: boolean;
  public on: boolean;
  public changeFunction: (arg: boolean) => void;
  public header: string;
  public body: SafeHtml;

  constructor(disabled: boolean, on: boolean, changeFunction: (arg: boolean) => void, header: string, body: SafeHtml) {
    this.disabled = disabled;
    this.on = on;
    this.changeFunction = changeFunction;
    this.header = header;
    this.body = body;
  }
}
