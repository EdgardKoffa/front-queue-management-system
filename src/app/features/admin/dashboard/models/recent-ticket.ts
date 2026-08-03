import { TicketStatus } from "../../../../shared/enums/ticket-status-enum"

export interface RecentTicket{
    number:string
    service:string

    status:TicketStatus

    counter:string

    createdAt:Date
}