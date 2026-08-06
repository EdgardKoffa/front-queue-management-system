import { Component, inject, input, output, signal } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Branch } from '../../models/branch';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { Location } from '@angular/common';
import {
    effect
} from '@angular/core';
import { StatusEnum } from '../../../../../shared/enums/status.enum';
import { LookupService } from '../../../../../core/services/lookup.service';
import { Agency } from '../../../agencies/models/agency';

@Component({
  selector: 'app-branch-form',
  imports: [
    ReactiveFormsModule,
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './branch-form.html',
  styleUrl: './branch-form.css',
})
export class BranchForm {
    private location = inject(Location);
    readonly forms_labels=formsLabels
    readonly agencyLabel=headerLabels.agency.title
    private readonly fb = inject(FormBuilder);
     branch = input<Branch | null>(null);
    formTitle = input('Create Branch');
    save = output<any>();
    private readonly lookup =
        inject(LookupService);
    
        agencies = signal<Agency[]>([]);

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
        agencyId:[
            null,
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
            'ACTIVE',
            Validators.required
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
          this.lookup
            .getAgencies()
            .subscribe({

                next:reaponse=>{

                    this.agencies.set(reaponse.data);

                }

            });

    effect(() => {

        const branch = this.branch();

        if (!branch) {

            return;

        }

        this.form.patchValue({

            code: branch.code,

            name: branch.name,

            agencyId:branch.agencyId as any,

            phone: branch.phone,

            email: branch.email,

            city: branch.city,

            address: branch.address,

            status: branch.status

        });

    });

}
}
