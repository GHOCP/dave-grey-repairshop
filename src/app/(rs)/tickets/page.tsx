import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketsSearchResults } from "@/lib/queries/getTicketsSearchResults";
import TicketTable from "@/app/(rs)/tickets/TicketTable";

export const metadata = {
  title: "Tickets Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    // query default results
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

  // query search results
  const results = await getTicketsSearchResults(searchText);
  // return search results
  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </>
  );
}
