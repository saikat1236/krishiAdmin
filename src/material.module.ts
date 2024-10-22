import { NgModule } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { MatNativeDateModule } from "@angular/material/core";

  const materialTheme= [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
  ];

  @NgModule({
    imports: [
      materialTheme
    ],
    exports: [
      materialTheme
    ],
    declarations: [
    ]
  })

  export class MaterialModule {}
