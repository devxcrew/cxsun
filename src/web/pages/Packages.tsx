import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import {
  useLegacyTable,
  getCoreRowModel,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy";
import { packagesSchema } from "../../contracts/platform";
import { readApi } from "../lib/api";
import { PageHeading } from "../components/PageHeading";
type Package = { name: string; version: string; scope: string };
const columns: LegacyColumnDef<Package>[] = [
  { accessorKey: "name", header: "Package" },
  { accessorKey: "version", header: "Version range" },
  { accessorKey: "scope", header: "Scope" },
];
export function Packages() {
  const [search, setSearch] = useState("");
  const query = useQuery({
    queryKey: ["packages"],
    queryFn: ({ signal }) => readApi("/api/packages", packagesSchema, signal),
  });
  const data = useMemo(
    () =>
      (query.data ?? []).filter((entry) => entry.name.toLowerCase().includes(search.toLowerCase())),
    [query.data, search],
  );
  const table = useLegacyTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <>
      <PageHeading
        title="Technology inventory"
        description="The complete installed dependency set, with pinned lockfile versions."
      />
      <label className="search-label">
        Search packages
        <input
          className="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Fastify, Tiptap, Redis…"
        />
      </label>
      {query.isError && <p role="alert">{query.error.message}</p>}
      {query.isPending && <p role="status">Loading packages…</p>}
      <div className="table-scroll">
        <table>
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {data.length} packages shown. Installed packages do not imply configured external services.
      </p>
    </>
  );
}
