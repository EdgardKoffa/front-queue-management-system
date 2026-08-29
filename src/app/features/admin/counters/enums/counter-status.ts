export enum CounterStatus {
	OPEN="OPEN",//Disponible pour appeler un ticke

	CLOSED="CLOSED",//Guichet fermé, ne reçoit aucun client

	BUSY="BUSY",//Traite actuellement un client

	PAUSED="PAUSED",//Pause temporaire de l'opérateur
	
	RESUME="RESUME",//reprendre apres une pause

	OUT_OF_SERVICE="OUT_OF_SERVICE"//Guichet indisponible (maintenance, panne)

}