import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  InstituteCreateOrUpdate,
  InstituteList,
} from '../../../core/interfaces/institute.interface';
import { UpdateInstituteComponent } from '../update-institute/update-institute.component';
import { InstituteService } from './../../../core/services/institute.service';

@Component({
  selector: 'app-create-institute',
  templateUrl: './create-institute.component.html',
  styleUrls: ['./create-institute.component.scss'],
})
export class CreateInstituteComponent implements OnInit {
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
    this._instituteService.create(model).subscribe(
      (result: any) => {
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
