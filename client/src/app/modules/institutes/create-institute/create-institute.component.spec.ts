import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreateInstituteComponent } from './create-institute.component';

describe('CreateInstituteComponent', () => {
  let component: CreateInstituteComponent;
  let fixture: ComponentFixture<CreateInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInstituteComponent],
      imports: [BrowserAnimationsModule, CommonModule, MatDialogModule, MatSelectModule, ReactiveFormsModule, FormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatDividerModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call createForm Method', () => {
      const spy = jest.spyOn(component, 'createForm');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('createForm', () => {
    it('should create the form', () => {
      component.createForm();
      expect(component.instituteForm).toBeDefined();
      expect(Object.keys(component.instituteForm.controls).length).toBe(5);
    });
  });

  describe('onSubmit', () => {
    it('should call the create the method if form is valid', (done) => {
      component.instituteForm.setValue({
        name: "John",
        city: "Paris",
        province: "P1",
        sector: "P2",
        level: "0",
      });

      const dialogRef: any = { close: jest.fn() };
      component.dialogRef = dialogRef;

      jest.spyOn(component['_instituteService'], 'create').mockReturnValue(of([]) as any);

      const spy = jest.spyOn(component['_instituteService'], 'create');
      const model: any = {};
      component.onSubmit(model);
      expect(component.instituteForm.valid).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalled();
      done();
    });
  });
});
