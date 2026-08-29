import { Location } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { formsLabels, headerLabels } from '../../../../../shared/constants';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Counter } from '../../models/counter';
import { LookupService } from '../../../../../core/services/lookup.service';
import { Branch } from '../../../branches/models/branch';
import { formedSelectOptions } from '../../../../../shared/utils/utils.functions';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';

@Component({
    selector: 'app-counter-form',
    imports: [ReactiveFormsModule,
        ...PRIMENG_IMPORTS],
    templateUrl: './counter-form.html',
    styleUrl: './counter-form.css',
})
export class CounterForm {
    private location = inject(Location);
    readonly forms_labels = formsLabels
    readonly brancheLabel = headerLabels.branch.title
    readonly counterLabels = headerLabels.counter

    readonly counterStatus = this.counterLabels.counterStatus
    private readonly fb = inject(FormBuilder);
    counter = input<Counter | null>(null);
    formTitle = input('Create Branch');
    save = output<any>();
    private readonly lookup =
        inject(LookupService);

    branches = signal<Branch[]>([]);

    readonly statusOptions = formedSelectOptions(Object.values(this.counterStatus), Object.keys(this.counterStatus))

    form = this.fb.group({
        number: [
            0,
            Validators.required
        ],
        code: [
            '',
            Validators.required
        ],

        name: [
            '',
            Validators.required
        ],
        branchId: [
            null,
            Validators.required
        ],


        active: [
            false
        ],

        status: [
            '',
            Validators.required
        ]

    });

    submit() {

        if (this.form.invalid) {

            this.form.markAllAsTouched();

            return;

        }

        this.save.emit(
            this.form.getRawValue()
        );

    }

    backToList() {
        this.location.back()
    }
    constructor() {
        this.lookup
            .getBranches()
            .subscribe({

                next: reaponse => {

                    this.branches.set(reaponse.data);

                }

            });

        effect(() => {

            const counter = this.counter();

            if (!counter) {

                return;

            }

            this.form.patchValue({
                number: counter.number,             
                code: counter.code,
                name: counter.name,
                branchId: counter.branchId as any,
                active: counter.active,
                status: counter.status

            });

        });

    }
}
