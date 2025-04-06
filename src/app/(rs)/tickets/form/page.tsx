import { BackButton } from "@/components/back-button";

import { getCustomer } from "@/lib/queries/getCustomers";
import { getTickets } from "@/lib/queries/getTicket";

import * as Sentry from "@sentry/nextjs";

import TicketForm from "@/app/(rs)/tickets/form/ticket-form";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton variant="default" title="Go Back" />
        </>
      );
    }
    // New Ticket Form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton variant="default" title="Go Back" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active.
            </h2>
            <BackButton variant="default" title="Go Back" />
          </>
        );
      }
      // return ticket form
      console.log(customer);
      return <TicketForm customer={customer} />;
    }
    // Edit ticket form
    if (ticketId) {
      const ticket = await getTickets(parseInt(ticketId));
      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton variant="default" title="Go Back" />
          </>
        );
      }
      const customer = await getCustomer(ticket.customerId);

      //return ticket form
      console.log("ticket :", ticket);
      console.log("customer :", customer);
      return <TicketForm customer={customer} ticket={ticket} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
