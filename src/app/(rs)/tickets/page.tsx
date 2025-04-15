import TicketSearch from "@/app/(rs)/tickets/ticket-search";
import TicketTable from "@/app/(rs)/tickets/ticket-table";

import { getTicketSearchResults } from "@/lib/queries/get-ticket-search-result";
import { getOpenTickets } from "@/lib/queries/get-open-tickets";

export const metadata = {
  title: "Ticket Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No open tickets found</p>
        )}
      </>
    );
  }

  const results = await getTicketSearchResults(searchText);

  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No tickets found</p>
      )}
    </>
  );
}
