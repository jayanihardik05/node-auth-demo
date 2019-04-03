import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Common } from './common/common';
import { DisallowSpaceDirective, EightDecimalDigitDirective, NumberOnlyDirective, RandomColorDirective, SortDirective } from './directive';
import { DateFormatPipe, DynamicDigitPipe, DynamicYesNoPipe, FilterDataPipe, SplitStringPipe, TradeDatePipe } from './pipes';

const pipes = [DateFormatPipe, DynamicYesNoPipe, DynamicDigitPipe, FilterDataPipe,
  SplitStringPipe, TradeDatePipe];

const directives = [SortDirective, DisallowSpaceDirective, NumberOnlyDirective, RandomColorDirective,
  EightDecimalDigitDirective];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // 3rd party

  ],
  declarations: [...pipes, ...directives],
  exports: [
    ...pipes,
    ...directives,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [Common]
})

export class SharedModule { }
