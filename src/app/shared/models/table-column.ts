export type SeverityType = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
export type IconType = "pi pi-check" | "pi pi-ban" | "pi pi-wrench"
export interface TableColumn {

    field: string;

    header: string;

    sortable?: boolean;

    width?: string;
  //  icon?: IconType; // Ajout d'une propriété pour l'icône
  //  severity?: SeverityType; // Ajout d'une propriété pour la classe CSS
    isButton?: boolean; // Indique si la colonne contient un bouton
   // action?: (rowData: any) => void; // Fonction pour gérer l'action sur la ligne

}