import { Component, input } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../../../shared/primeNG/primeng.imports';
import { RecentTicket } from '../../models/recent-ticket';
import { TicketStatus } from '../../../../../shared/enums/ticket-status-enum';
import { LABELS } from '../../../../auth/pages/login/login-labels';

@Component({
  selector: 'app-recent-tickets',
  imports: [
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './recent-tickets.html',
  styleUrl: './recent-tickets.css',
  standalone:true
})
export class RecentTickets {

  readonly labels=LABELS
   tickets = input<RecentTicket[]>([]);
  getSeverity(status: TicketStatus) {

    switch (status) {

      case TicketStatus.WAITING:
        return 'warn';

      case TicketStatus.CALLED:
        return 'info';

      case TicketStatus.COMPLETED:
        return 'success';

      case TicketStatus.CANCELLED:
        return 'danger';
      
        /* case TicketStatus.IN_PROGRESS:
        return 'primary'; */

      default:
        return 'secondary';
    }

  }


}
