// confirm-dialog.service.ts
import { Injectable, signal } from '@angular/core';
import { ConfirmSelectConfig } from '../models/confirm.form.dialog.model';
import { validationMessages } from '../../shared/constants/validation.message';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService<T = any> {
    private readonly messageLabels=validationMessages
  // Signal de la configuration actuelle
  private configSignal = signal<ConfirmSelectConfig<T> | null>(null);
  
  // Signal de visibilité
  private visibleSignal = signal<boolean>(false);

  // Expositions en lecture seule
  readonly config = this.configSignal.asReadonly();
  readonly visible = this.visibleSignal.asReadonly();

  /**
   * Ouvre la modale avec les paramètres spécifiés
   */
  open(config: ConfirmSelectConfig<T>): void {
    this.configSignal.set({
      title: 'Confirmation',
      placeholder: this.messageLabels.select_reason,
      confirmButtonLabel: this.messageLabels.validate,
      cancelButtonLabel: this.messageLabels.cancel,
      confirmButtonSeverity: 'primary',
      ...config
    });
    this.visibleSignal.set(true);
  }

  close(): void {
    this.visibleSignal.set(false);
  }
}