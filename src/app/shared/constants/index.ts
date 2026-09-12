import { isLangFr } from "../utils";


export const MENU_LABELS = {
    DASHBOARD: isLangFr ? 'Tableau de bord' : 'Dashboard',
    ORGANISATION: isLangFr ? 'Organisation' : "Organization",
    AGENCY: isLangFr ? 'Agences' : "Agencies",
    BRANCH: isLangFr ? 'Sous agences' : "Bank Branches",
    COUNTER: isLangFr ? 'Guichets' : "Counters",
    BANK_SERVICE: isLangFr ? 'Services' : "Services",
    TICKET: isLangFr ? 'Tickets' : "Tickets",
    USERS: isLangFr ? 'Utilisateurs' : "Users",
    REPORT: isLangFr ? 'Rapports' : "Reports",
    SETTING: isLangFr ? 'Paramètres' : 'Settings',
    MY_PROFIL: isLangFr ? 'Mon profil' : "User Profile",
    CHANGE_PWD: isLangFr ? 'Changer le mot de passe' : "Change Password",
    LOGOUT: isLangFr ? "Déconnexion" : "LogOut",
    CALL_TICKET: isLangFr ? "Appel Ticket" : "Tcket Calling",
    HISTORY: isLangFr ? "Historique" : "History",
    CAMPAIGN: isLangFr ? "Campagnes" : "Advertising Campaigns"

}

export const headerLabels = {
    agency: {
        title: isLangFr ? ["Agence", "Agences"] : ["Agency", "Agencies"],
        subtitle: isLangFr ? "Gestion des agences de la banque" : "Bank agency Management",
        buttonlabel: isLangFr ? "Nouvelle agence" : "New agency",
        backLabel: isLangFr ? "Retour" : "Back",

        create_formTittle: isLangFr ? "Enregistrer une agence" : "Register an agency",
        edit_formTittle: isLangFr ? "Modifier une agence" : "Edit an agency",
        detail_formTittle: isLangFr ? "Détails d'une agence" : "Agency details"

    },
    branch: {
        title: isLangFr ? ["Sous agence", "Sous agences"] : ["Bank Branch", "Bank Branches"],
        subtitle: isLangFr ? "Gestion des sous agences de la banque" : "Bank Branch Management",
        buttonlabel: isLangFr ? "Nouvelle sous agence" : "New Bank Branch",
        backLabel: isLangFr ? "Retour" : "Back",

        create_formTittle: isLangFr ? "Enregistrer une sous agence" : "Register new bank branch",
        edit_formTittle: isLangFr ? "Modifier une sous agence" : "Edit bank branch",
        detail_formTittle: isLangFr ? "Détails d'une sous agence" : "Bank branch details"


    },
    ticket: {
        title: isLangFr ? ["Ticket", "Tickets"] : ["Ticket", "Tickets"],
        subtitle: isLangFr ? "Gestion des agences bancaires" : "Bank Branch Management",
        buttonlabel: isLangFr ? "Nouvelle agence" : "New branch",
        backLabel: isLangFr ? "Retour" : "Back",

         create_formTittle: isLangFr ? "Enregistrer une sous agence" : "Register new bank branch",
        edit_formTittle: isLangFr ? "Modifier une sous agence" : "Edit bank branch",
        detail_formTittle: isLangFr ? "Détails d'une sous agence" : "Bank branch details"

    },
    counter: {
        title: isLangFr ? ["Guichet", "Guichets"] : ["Counter", "Counters"],
        subtitle: isLangFr ? "Gestion des guichets de l'agence " : "Bank Branch's counters Management",
        buttonlabel: isLangFr ? "Ajourer un Guichet" : "Add New counter",
        backLabel: isLangFr ? "Retour" : "Back",
        Open_label:isLangFr ?"Ouvrir ":"Open",
        close_label:isLangFr ?"Fermer ":"Close",
        assign_label:isLangFr ?"Assigner un opérateur ":"Assign an operator",
        release_label:isLangFr ?"Retirer l'opérateur ":"Release oerator",
        
         create_formTittle: isLangFr ? "Formulair d'ajout d' un guichet" : "Add new counter Form",
        edit_formTittle: isLangFr ? "Modification d'un guichet" : "Counter edition",
        detail_formTittle: isLangFr ? "Détails d'un guichet" : "Counter details",

        counterStatus: {
            OPEN: isLangFr ? "Ouvert" : "Opened",//Disponible pour appeler un ticke
            CLOSED: isLangFr ? "Fermé" : "Closed",//Guichet fermé, ne reçoit aucun client
            BUSY: isLangFr ? "Occupé" : "Busy",//Traite actuellement un client
            PAUSED: isLangFr ? "En pause" : "Paused",//Pause temporaire de l'opérateur
            RESUME: isLangFr ? "Reprise" : "Resume",//reprendre apres une pause
            OUT_OF_SERVICE: isLangFr ? "Hors service" : "Out of service"//Guichet indisponible (maintenance, panne)
        }
    },
    bank_service:{
        title: isLangFr ? ["Service banquaire", "Services banquaires"] : ["Bank service", "Bank services"],
        subtitle: isLangFr ? "Gestion des services de la banque" : "Bank service Management",
        buttonlabel: isLangFr ? "Ajouter Service" : "Add Bank Service",
         
        backLabel: isLangFr ? "Retour" : "Back",

         create_formTittle: isLangFr ? "Enregistrer un nouveau service banquaire" : "Register new bank service",
        edit_formTittle: isLangFr ? "Modifier un service banquaire" : "Edit bank service",
        detail_formTittle: isLangFr ? "Détails d'un service banquaire" : "Bank service details"
    },
    users:{
        title: isLangFr ? ["Utilisateur", "Utilisateurs"] : ["User", "Users"],
        subtitle: isLangFr ? "Gestion des utilisateurs" : "Users Management",
        buttonlabel: isLangFr ? "Ajouter un utilisateur" : "Add new user",
         
        backLabel: isLangFr ? "Retour" : "Back",

        create_formTittle: isLangFr ? "Enregistrer un nouvel utilisateur" : "Register new bank user",
        edit_formTittle: isLangFr ? "Modifier un  utilisateur" : "Edit user",
        detail_formTittle: isLangFr ? "Détails d'un utilisateur" : "user's details"
    }
}

export const formsLabels = {
    name: isLangFr ? "Nom" : "Name",
    city: isLangFr ? "Ville" : "City",
    country: isLangFr ? "Pays" : "Country",
    address: isLangFr ? "Adresse" : "Address",
    phone: isLangFr ? "Téléphone" : "Phone",
    status: isLangFr ? "Statut" : "Status",
    save: isLangFr ? "Enregistrer" : "Save",
    toUpdate: isLangFr ? "Mettre à jour" : "To Update",
    F_NAME: isLangFr ? "Prénoms" : "Firstname",

    backLabel: isLangFr ? "Retour" : "Back",
    L_NAME: isLangFr ? "Nom" : "Lastname",
    username: isLangFr ? "Nom d'utilisateur" : "UserName",
    EMAIL: isLangFr ? "Email" : "Email",


    TICKET_NUMBER: isLangFr ? "Numéro du ticket" : "Ticket's number",
    back: isLangFr ? "Retour" : "Back",
    close: isLangFr ? "Fermer" : "Close",
    open: isLangFr ? "Ouvrir" : "Open",
    active: isLangFr ? "Activer" : "Enable",
    isActif:isLangFr?["Actif","Active"]:["Enabled","Enabled"],
    isDesactif:isLangFr?["Inactif","Inactive"]:["Disabled","Disabled"],
    disable: isLangFr ? "Désactiver" : "Disable",
    maintenance: isLangFr ? "En traveaux de maintenance" : "Under maintenance",
    cancel: isLangFr ? "Annuler" : "Cancel",
    validate: isLangFr ? "Valider" : "Validate",
    select_reason: isLangFr ? "Veuillez sélectionner." : "Please select.",
    yes_no:isLangFr?["Oui","Non"]:["Yes","No"],
    tue_false:isLangFr?["Vrai","Faux"]:["True","False"],
    isLocked: isLangFr ? "Bloqué" : "Locked",
    view: isLangFr ? "Voir" : "View",
    edit: isLangFr ? "Modifier" : "Edit",
    delete: isLangFr ? "Supprimer" : "Delete",
    details: isLangFr ? "Détails" : "Details",

    operator:isLangFr?"Op™érateur":"Operator",
    counter_number:isLangFr?"N° Guichet":"N°",
    prefix:isLangFr?"Péfix":"Prefix",
    estimate_time:isLangFr?"Durée estimée":"Estimate time",
    priority:isLangFr?"Priorité":"Priority"

}