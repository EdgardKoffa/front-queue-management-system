import { inject, Injectable, signal } from '@angular/core';

import { Client } from '@stomp/stompjs';

import SockJS from 'sockjs-client';
import { TokenService } from '../../features/auth/services/token.service';

@Injectable({
    providedIn:'root'
})
export class WebSocketService {

    private client!: Client;
    private readonly tokenService=inject(TokenService)
    readonly connected = signal(false);

    connect(
        branchId:number,//canal de connexion 
        callback:(message:any)=>void//fonction de traitement
    ){

        this.client = new Client({

            webSocketFactory:()=>{

                return new SockJS('/ws',);

            },// Connexion au point de contact "/ws" du serveur
             // Transmet le token JWT au serveur lors de la connexion STOMP
        connectHeaders: {
            Authorization: `Bearer ${this.tokenService.get()}`
        },
            reconnectDelay:3000//delais de reconnexion

        });//fin configuration client

        this.client.onConnect =()=>{

            this.connected.set(true);//renitialise le signal indiquant l'etat de connexion

            this.client.subscribe(

                `/topic/branch/${branchId}`,

                msg=>{ callback(
                        JSON.parse(msg.body)
                    );
                });

        };/* L'application s'abonne à un canal spécifique (un salon de discussion) basé sur l'identifiant de la branche : /topic/branch/{branchId}. */

        this.client.activate();

    }

    disconnect(){

        this.client.deactivate();

        this.connected.set(false);

    }

}