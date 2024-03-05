import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
  imports: [CommonModule, FormsModule],
})
export class SearchBarModule {}
