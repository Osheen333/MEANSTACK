import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  InstituteCreateOrUpdate,
  InstituteList,
} from '../../../core/interfaces/institute.interface';
import { InstituteService } from '../../../core/services/institute.service';

@Component({
  selector: 'app-update-institute',
  templateUrl: './update-institute.component.html',
  styleUrls: ['./update-institute.component.scss'],
})
export class UpdateInstituteComponent implements OnInit {
  instituteForm!: FormGroup;
  _id!: string;
  returnedData!: InstituteList;

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

  sectorDrpDown = [
    {
      name: 'non-profit',
    },
    {
      name: 'for-profile',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<UpdateInstituteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this._instituteService
      .getById(this.data.instituteId)
      .subscribe((result: any) => {
        this.returnedData = result.data.data;
        this._id = this.returnedData._id ? this.returnedData._id : '';
        this.instituteForm.patchValue({
          _id: this._id,
          name: this.returnedData.name,
          city: this.returnedData.city,
          province: this.returnedData.province,
          sector: this.returnedData.sector,
          level: this.returnedData.level,
        });
      });
  }

  createForm() {
    this.instituteForm = this.fb.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });
  }

  onSubmit(model: InstituteCreateOrUpdate) {
    if (!this.instituteForm.valid) return;
    this._instituteService.update(this._id, model).subscribe(
      (result: any) => {
        this.dialogRef.close(result.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
