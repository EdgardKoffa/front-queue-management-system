import { isLangFr } from "../utils";


export const MENU_LABELS={
    DASHBOARD:isLangFr?'Tableau de bord':'Dashboard',
    ORGANISATION:isLangFr?'Organisation':"Organization",
    AGENCY:isLangFr?'Agences':"Agencies",
    BRANCH:isLangFr?'Sous agences':"Bank Branches",
    COUNTER:isLangFr?'Guichets':"Counters",
   BANK_SERVICE:isLangFr?'Services':"Services",
   TICKET:isLangFr?'Tickets':"Tickets",
   USERS:isLangFr?'Utilisateurs':"Users",
    REPORT:isLangFr?'Rapports':"Reports",
   SETTING: isLangFr?'Paramètres':'Settings',
   MY_PROFIL:isLangFr?'Mon profil':"User Profile",
   CHANGE_PWD:isLangFr?'Changer le mot de passe':"Change Password",
   LOGOUT:isLangFr?"Déconnexion":"LogOut",
   CALL_TICKET:isLangFr?"Appel Ticket":"Tcket Calling",
   HISTORY:isLangFr?"Historique":"History",
   CAMPAIGN:isLangFr?"Campagnes":"Advertising Campaigns"

}

export const headerLabels={
    agency:{
        title:isLangFr?["Agence","Agences"]:["Agency","Agencies"],
        subtitle:isLangFr?"Gestion des agences de la banque":"Bank agency Management",
         buttonlabel:isLangFr?"Nouvelle agence":"New agency",
         backLabel:isLangFr?"Retour":"Back",
         create_formTittle:isLangFr?"Enregistrer une agence":"Register an agency",
edit_formTittle:isLangFr?"Modifier une agence":"Edit an agency",
detail_formTittle:isLangFr?"Détails d'une agence":"Agency details"

    },
     branch:{
        title:isLangFr?["Sous agence","Sous agences"]:["Bank Branch","Bank Branches"],
        subtitle:isLangFr?"Gestion des sous agences de la banque":"Bank Branch Management",
         buttonlabel:isLangFr?"Nouvelle sous agence":"New Bank Branch",
         backLabel:isLangFr?"Retour":"Back"
    },
   ticket :{
     title:isLangFr?["Ticket","Tickets"]:["Ticket","Tickets"],
        subtitle:isLangFr?"Gestion des agences bancaires":"Bank Branch Management",
         buttonlabel:isLangFr?"Nouvelle agence":"New branch",
         backLabel:isLangFr?"Retour":"Back"
        },
   counter :{
        title:isLangFr?["Guichet","Guichets"]:["Counter","Counters"],
        subtitle:isLangFr?"Gestion des agences bancaires":"Bank Branch Management",
         buttonlabel:isLangFr?"Nouvelle agence":"New branch",
         backLabel:isLangFr?"Retour":"Back"
    }
}

export const formsLabels={
    name:isLangFr?"Nom":"Name",
    city:isLangFr?"Ville":"City",
    country:isLangFr?"Pays":"Country",
    address:isLangFr?"Adresse":"Address",
    phone:isLangFr?"Téléphone":"Phone",
    status:isLangFr?"Statut":"Status",
    save:isLangFr?"Enregistrer":"Save",
    toUpdate:isLangFr?"Mettre à jour":"To Update",
F_NAME: isLangFr?"Prénoms":"Firstname",

L_NAME: isLangFr?"Nom":"Lastname",

EMAIL:isLangFr?"Email":"Email",

TICKET_NUMBER:isLangFr?"Numéro du ticket":"Ticket's number",
 back:isLangFr?"Retour":"Back",
 close:isLangFr?"Fermer":"Close",
 open:isLangFr?"Ouvrir":"Open",
 active:isLangFr?"Activer":"Enable",
 disable:isLangFr?"Désactiver":"Disable",
 maintenance:isLangFr?"En traveaux de maintenance":"Under maintenance",
 cancel:isLangFr?"Annuler":"Cancel",
 validate:isLangFr?"Valider":"Validate",
 select_reason:isLangFr?"Veuillez sélectionner.":"Please select.",

 view:isLangFr?"Voir":"View",
 edit:isLangFr?"Modifier":"Edit",
 delete:isLangFr?"Supprimer":"Delete",
 details:isLangFr?"Détails":"Details",



}