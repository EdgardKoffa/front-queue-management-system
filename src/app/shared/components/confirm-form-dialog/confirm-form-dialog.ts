import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select'; // Utiliser DropdownModule si PrimeNG v17 ou antérieur
import { ConfirmDialogService } from '../../../core/services/confir.form.dialog.service';

interface Reason {
  label: string;
  value: string;
}

@Component({
  selector: 'app-confirm-form-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, SelectModule, FormsModule],
  templateUrl: './confirm-form-dialog.html',
  styleUrl: './confirm-form-dialog.css',
})
export class ConfirmFormDialog {
 protected dialogService = inject(ConfirmDialogService);
  
  // Élément sélectionné dans le SelectBox
  protected selectedValue = signal<any>(null);

  get config() {
    return this.dialogService.config();
  }

  get visible(): boolean {
    
    return this.dialogService.visible();
  }

  set visible(val: boolean) {
    if (!val) {
      this.dialogService.close();
    }
  }

  onConfirm(): void {
    const value = this.selectedValue();
    if (value !== null && value !== undefined && this.config?.onConfirm) {
      this.config.onConfirm(value);
      this.close();
    }
  }

  onCancel(): void {
    if (this.config?.onCancel) {
      this.config.onCancel();
    }
    this.close();
  }

  private close(): void {
    this.selectedValue.set(null);
    this.dialogService.close();
  }
}
