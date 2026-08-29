import { Component, effect, inject, input, output, signal } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { BankService } from '../../models/bank-service';
import { LookupService } from '../../../../../core/services/lookup.service';
import { Branch } from '../../../branches/models/branch';

@Component({
  selector: 'app-service-form',
  imports: [ ReactiveFormsModule,...PRIMENG_IMPORTS],
  templateUrl: './service-form.html',
  styleUrl: './service-form.css',
})
export class ServiceForm {
    private location = inject(Location);
      readonly forms_labels=formsLabels
      readonly branchLabel=headerLabels.branch.title
      private readonly fb = inject(FormBuilder);
       bankService = input<BankService | null>(null);
      formTitle = input('Create Branch');
      save = output<any>();
      private readonly lookup =
          inject(LookupService);
      
          branches = signal<Branch[]>([]);

  
      form = this.fb.group({
  
          code:[
              '',
              Validators.required
          ],
  
          name:[
              '',
              Validators.required
          ],
          branchId:[
              null,
              Validators.required
          ],
  estimatedDurationMinutes:[
    0
  ],
  priority:[
    0
  ],
   description:[
              '',
           //   Validators.
          ],
          prefix:[
              '',
            //  Validators.maxLength(2),
              Validators.required
          ],
          active:[
              false,
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
              .getBranches()
              .subscribe({
  
                  next:reaponse=>{
  
                      this.branches.set(reaponse.data);
  
                  }
  
              });
  
      effect(() => {
  
          const bankService = this.bankService();
  
          if (!bankService) {
  
              return;
  
          }
  
          this.form.patchValue({
  
              code: bankService.code,
  
              name: bankService.name,
  
              branchId:bankService.branchId as any,
  
              estimatedDurationMinutes: bankService.estimatedDurationMinutes,
  
              priority: bankService.priority,
  
            prefix: bankService.prefix,
  
              description: bankService.description,
  
              active: bankService.active
  
          });
  
      });
  
  }
}
