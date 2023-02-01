import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { InstituteList } from '../../core/interfaces/institute.interface';
import { InstituteService } from '../../core/services/institute.service';
import { CreateInstituteComponent } from './create-institute/create-institute.component';
import { UpdateInstituteComponent } from './update-institute/update-institute.component';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss'],
})
export class InstitutesComponent implements OnInit {
  displayedColumns = ['name', 'city', 'province', 'sector', 'level', 'actions'];

  cityDrpDown = [
    {
      name: 'Warwick',
    },
    {
      name: 'Brampton',
    },
    {
      name: 'New Glasgow',
    },
    {
      name: 'Abbotsford',
    },
  ];

  provinceDrpDown = [
    {
      name: 'British Columbia',
    },
    {
      name: 'Ontario',
    },
    {
      name: 'Nova Scotia',
    },
  ];

  dataSource!: InstituteDataSource;
  selection = new SelectionModel<InstituteList>(true, []);

  instituteServiceToPass!: InstituteService | null;

  constructor(
    private _instituteService: InstituteService,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true })
  filter!: ElementRef;
  @ViewChild(MatSelect, { static: true })
  selectCity!: MatSelect;
  @ViewChild(MatSelect, { static: true })
  selectProvince!: MatSelect;

  ngOnInit(): void {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.instituteServiceToPass = new InstituteService(this.httpClient);

    this.dataSource = new InstituteDataSource(
      this.instituteServiceToPass,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  applyFilter(event: MatSelectChange) {
    console.log(event);
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = event.value.trim().toLowerCase();
  }

  updateInstituteModal(row: InstituteList) {
    const dialogRef = this.dialog.open(UpdateInstituteComponent, {
      data: {
        detail: row,
        instituteId: row._id,
      },
      height: '70%',
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refresh();
      }
    });
  }

  createInstituteModal() {
    const dialogRef = this.dialog.open(CreateInstituteComponent, {
      data: {},
      height: '70%',
      width: '20%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  deleteInstitute(id: string) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4758B8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this._instituteService.delete(id).subscribe(
          (data) => {
            const deletedInstituteIndex =
              this.instituteServiceToPass?.dataChange.value.findIndex(
                (x) => x._id === id
              );
            this.instituteServiceToPass?.dataChange.value.splice(
              deletedInstituteIndex == null ? 0 : deletedInstituteIndex,
              1
            );
            Swal.fire(
              'Deleted!',
              'Your institute has been deleted.',
              'success'
            );

            this.refresh();
          },
          (error) => {
            this.snackBar.open(error, 'x', {
              panelClass: 'sbError',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        );
      }
    });
  }
}

export class InstituteDataSource extends DataSource<InstituteList> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: InstituteList[] = [];
  renderedData: InstituteList[] = [];

  constructor(
    public _instituteService: InstituteService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => {
      this._paginator.pageIndex = 0;
    });
  }

  connect(): Observable<readonly InstituteList[]> {
    const displayDataChanges = [
      this._instituteService.dataChange,
      this._sort?.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    this._instituteService.getAll();

    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this._instituteService.data
          .slice()
          .filter((institute: InstituteList) => {
            const searchStr = (
              institute.name +
              institute.city +
              institute.province +
              institute.sector +
              institute.level
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  sortData(data: InstituteList[]): InstituteList[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'city':
          [propertyA, propertyB] = [a.city, b.city];
          break;
        case 'province':
          [propertyA, propertyB] = [a.province, b.province];
          break;
        case 'sector':
          [propertyA, propertyB] = [a.sector, b.sector];
          break;
        case 'level':
          [propertyA, propertyB] = [a.level, b.level];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  disconnect(): void {}
}
