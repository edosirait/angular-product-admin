import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-table-common',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatColumnDef,
    MatHeaderCellDef,
    NgForOf,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './table-common.component.html',
  styleUrl: './table-common.component.scss'
})
export class TableCommonComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Output() page = new EventEmitter<PageEvent>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();


  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  currentPage: number = 0;

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.displayedColumns = this.columns.map(column => column.key);
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }

  onPageChange(event: PageEvent) {
    this.page.emit(event); // Emit event untuk perubahan halaman
  }

  onEdit(element: any) {
    this.edit.emit(element);
  }

  onDelete(element: any) {
    this.delete.emit(element);
  }
}
