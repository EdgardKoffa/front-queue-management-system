import { isLangFr } from "../utils";

export const validationMessages = {
     USERNAME_REQUIRED: isLangFr?"Nom d'utilisateur est requis.":"Username is requiered.",

    PASSWORD_REQUIRED: isLangFr?"Mot de passe est requis.":"Pasword is requiered.",

    EMAIL_REQUIRED:isLangFr?"Email est invalide":"Invalid email",

    UNKNOWN_ERROR:isLangFr?"Une erreur est survenue; contacter l'administrateur":"An error has occurred; please contact the administrator.",
    agency_success_created:isLangFr?"Ressource créée avec succès.":"Resource created successfully",
    agency_success_deleted:isLangFr?"Ressource supprimée avec succès.":"Resource deleted successfully",
    agency_success_updated:isLangFr?"Ressource modifiée avec succès.":"Resource updated successfully",
    toast_succes_summary:isLangFr?"Succès":"Success",
     toast_error_summary:isLangFr?"Ereur":"Error",
      toast_warn_summary:isLangFr?"Attention":"Warning",
      toast_info_summary:isLangFr?"Information":"Information",
      toast_success_detail:isLangFr?"Opération effectuée avec succès.":"Operation completed successfully.",
      toast_agency404_detail:isLangFr?"Aucune agence trouvée.":"No bank branch found.",
      toast_warn_detail:isLangFr?"Opération annulée.":"Operation canceled.",
      toast_info_detail:isLangFr?"Opération en cours de traitement.":"Operation in progress.",
      toast_error401:isLangFr?"Votre session a été expiré. Veuilles vous reconnectez ":"Your session has expired. Please log in again.",
      toast_error403:isLangFr?'Vous n\'êtes pas autorisé à accéder à cette ressource.':'You are not authorized to access this resource.',
      toast_error404:isLangFr?"Ressource introuvable.":"Resource not found.",
      confirmDG_question:isLangFr?"Êtes-vous sûr de vouloir continuer ?":"Are you sure you want to continue?",
      confirmDG_accept:isLangFr?"Oui":"Yes",
      confirmDG_reject:isLangFr?"Non":"No",
     close:isLangFr?"Fermer":"Close",
 open:isLangFr?"Ouvrir":"Open",
 active:isLangFr?"Activer":"Enable",
 disable:isLangFr?"Désactiver":"Disable",
 cancel:isLangFr?"Annuler":"Cancel",
 validate:isLangFr?"Valider":"Validate",
 select_reason:isLangFr?"Veuillez sélectionner.":"Please select.",
 maintenance:isLangFr?"En traveaux de maintenance":"Under maintenance",
 view:isLangFr?"Voir":"View",
 edit:isLangFr?"Modifier":"Edit",
 delete:isLangFr?"Supprimer":"Delete",
 details:isLangFr?"Détails":"Details",
 agency_edit_warning:isLangFr?"Vous ne pouvez pas modifier cette ressource; elle n'est pas active.":"You cannot edit this resource; it is not enabled.",
 agency_detail_warning:isLangFr?"Vous ne pouvez pas voir les détails de cette ressource; elle n'est pas active.":"You cannot view the details of this resource; it is not enabled."
}
