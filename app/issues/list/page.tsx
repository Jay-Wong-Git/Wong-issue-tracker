import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

import { Link, IssueStatusBadge } from "../../components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const statuses = Object.values(Status);
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden sm:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issueCount = await prisma.issue.count({ where: { status } });
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Box>
      <IssueActions />
      <Table.Root variant="surface" my="3">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {searchParams.orderBy === column.value && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block sm:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Box>
  );
};

export const dynamic = "force-dynamic"; // disable server-side cache
// export const revalidate = 30;

export default IssuesPage;
