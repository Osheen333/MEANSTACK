import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { InstituteService } from '../../core/services/institute.service';
import { CreateInstituteComponent } from './create-institute/create-institute.component';

import { InstitutesComponent } from './institutes.component';
import { UpdateInstituteComponent } from './update-institute/update-institute.component';
import Swal from 'sweetalert2';

// jest.mock("sweetalert2", () => ({
//   fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
// }));

describe('InstitutesComponent', () => {
  let component: InstitutesComponent;
  let service: InstituteService;
  let fixture: ComponentFixture<InstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutesComponent],
      imports: [BrowserAnimationsModule, HttpClientModule, MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule, MatOptionModule, MatPaginatorModule
        , MatTableModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load data', () => {
      const spy = jest.spyOn(component, 'loadData');
      component.loadData();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('should load data', () => {
      const spy = jest.spyOn(component, 'loadData');
      component.refresh();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('loadData', () => {
    it('should set the params', () => {
      component.loadData();
      expect(component.instituteServiceToPass).toBeDefined();
      expect(component.dataSource).toBeDefined();
    });
  });

  describe('applyFilter', () => {
    it('should apply filter', () => {
      component.applyFilter({ value: "Test" } as any);
      expect(component.dataSource.filter).toBe("Test".toLowerCase())
    });
  });

  describe('updateInstituteModal', () => {
    it('should update institute modal', (done) => {
      const fnOpen = jest.spyOn(component['dialog'], 'open');
      const fnRefresh = jest.spyOn(component, 'refresh');

      jest.spyOn(component['dialog'], 'open').mockReturnValue({ afterClosed: () => of({}) } as any)

      const row = { _id: "147" };
      component.updateInstituteModal(row as any);
      done();
      expect(fnOpen).toHaveBeenCalledWith(UpdateInstituteComponent, {
        data: {
          detail: row,
          instituteId: row._id,
        },
        height: '70%',
        width: '20%',
      });
      expect(fnRefresh).toHaveBeenCalled();
    });
  });

  describe('createInstituteModal', () => {
    it('should create institute modal', (done) => {
      const fnOpen = jest.spyOn(component['dialog'], 'open');
      const fnRefresh = jest.spyOn(component, 'refresh');

      jest.spyOn(component['dialog'], 'open').mockReturnValue({ afterClosed: () => of({}) } as any)

      component.createInstituteModal();
      done();
      expect(fnOpen).toHaveBeenCalledWith(CreateInstituteComponent, {
        data: {},
        height: '70%',
        width: '20%',
      });
      expect(fnRefresh).toHaveBeenCalled();
    });
  });

  describe('deleteInstitute', () => {
    it('should ', (done) => {
      const value = { value: true }
      jest.spyOn(Swal, "fire").mockReturnValue(Promise.resolve(value as any));
      component.deleteInstitute("147");
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4758B8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      done();
    });
  });
});
