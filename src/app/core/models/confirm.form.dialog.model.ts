// confirm-dialog.model.ts
export interface SelectOption<T = any> {
  label: string;
  value: T;
}

export interface ConfirmSelectConfig<T = any> {
  title?: string;
  message?: string;
  options: SelectOption<T>[];
  placeholder?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  confirmButtonSeverity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
  /** Fonction appelée lors de la confirmation en lui passant l'option sélectionnée */
  onConfirm: (selectedValue: T) => void;
  onCancel?: () => void;
}