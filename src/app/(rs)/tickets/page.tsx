import TicketSearch from "@/app/(rs)/tickets/ticket-search";

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
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }

  const results = await getTicketSearchResults(searchText);

  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
