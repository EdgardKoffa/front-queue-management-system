export type SeverityType = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
export type IconType = "pi pi-check" | "pi pi-ban" | "pi pi-wrench"|"pi pi-pause"|"pi pi-lock"|"pi pi-lock-open"|"pi pi-circle-off"|"pi pi-circle-on"|"pi pi-times"|"pi pi-minus-circle"
export interface TableColumn {

    field: string;

    header: string;

    sortable?: boolean;

    width?: string;
      isButton?: boolean; 
    
}

export interface ColumnConfig<T = any> {
  field: keyof T;                  // nom du champ dans la ligne
  header: string;                  // titre affiché
  isButton?: boolean;              // si la colonne doit être rendue en bouton
  iconFn?: (value: any, row?: T) => IconType;       // fonction pour l’icône
  severityFn?: (value: any, row?: T) => SeverityType;   // fonction pour la couleur
  tooltipFn?: (value: any, row?: T) => string;    // fonction pour le tooltip
  actionFn?: (row: T) => void;                   // fonction pour le clic
}

export interface FunctionIconSeverityTooltip {icon:IconType;severity:SeverityType,tooltip:string}