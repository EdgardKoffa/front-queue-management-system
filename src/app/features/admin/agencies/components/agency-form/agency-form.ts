import { Component, inject, input, output } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Agency } from '../../models/agency';
import { formsLabels } from '../../../../../shared/constants';
import { Location } from '@angular/common';
import {
    effect
} from '@angular/core';
import { StatusEnum } from '../../../../../shared/enums/status.enum';

@Component({
  selector: 'app-agency-form',
  imports: [
    ReactiveFormsModule,
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './agency-form.html',
  styleUrl: './agency-form.css',
})
export class AgencyForm {
    private location = inject(Location);
    readonly forms_labels=formsLabels
    private readonly fb = inject(FormBuilder);
     agency = input<Agency | null>(null);
    formTitle = input('Create Agency');
    save = output<any>();

readonly statusOptions = [

        {
            label:this.forms_labels.active,
            value:StatusEnum.ACTIVE
        },

        {
            label:this.forms_labels.disable,
            value:StatusEnum.INACTIVE
        },
        {
            label:this.forms_labels.maintenance,
            value:StatusEnum.MAINTENANCE
        }

    ];

    form = this.fb.group({

        code:[
            '',
            Validators.required
        ],

        name:[
            '',
            Validators.required
        ],

        phone:[
            ''
        ],

        email:[
            '',
            Validators.email
        ],

        city:[
            '',
            Validators.required
        ],

        address:[
            ''
        ],

        status:[
            'ACTIVE'
        ]

    });

     submit(){

        if(this.form.invalid){

            this.form.markAllAsTouched();

            return;

        }

        this.save.emit(
            this.form.getRawValue()
        );

    }

    backToList(){
      this.location.back()
    }
    constructor() {

    effect(() => {

        const agency = this.agency();

        if (!agency) {

            return;

        }

        this.form.patchValue({

            code: agency.code,

            name: agency.name,

            phone: agency.phone,

            email: agency.email,

            city: agency.city,

            address: agency.address,

            status: agency.status

        });

    });

}
}
