import { APP_BRAND } from "../../../../branding/app.brand"
import { lang } from "../../../../shared/utils"
const isFR=lang==="fr"
export const LABELS={
    loginTitle:{name:APP_BRAND.name,subtitle:APP_BRAND.title},
    username:isFR?"Nom d'utilisateur":"User name",
    pwd:isFR?"Mot de passe":"Password",
    rememberme:isFR?"Se souvenir de moi":"Remember me",
    btnTitle:isFR?"Se connecter":"Login",
    invalid_username:isFR?"Le nom d'utilisateur est obligatoire.":"Username is required.",
    invalid_pwd:isFR?"Le mot de passe est obligatoire.":"Password is required.",
    dashboard:isFR?"Taleau de bord":"Dashboard",
    statCardTicket:{
        titleInWaitTicket:isFR?"Tickets en attente":"Waiting tickets",
        titleServedTicket:isFR?"Tickets servis":"Completed Tickets",
        openedCounter:isFR?"Guichets ouverts":"Opened counters",
        closedCounter:isFR?"Guichets fermés":"Closed counters",
        avgTime:isFR?"Temps moyen":"Average time"
    },
    hour:isFR?"Heure":"Hour",
    hours:isFR?"Heures":"Hours",
    status:isFR?"Statut":"Status",
    counter:isFR?"Guichet":"Counter"

}