import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/**
 * This module should imported in the core-module using `.forRoot()` static method.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
})
export class SharedModule {}
