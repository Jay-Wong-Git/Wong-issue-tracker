"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const IssueStatusUpdater = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const router = useRouter();
  const updateIssueStatus = (status: Status) => {
    axios
      .patch(`/api/issues/${issue.id}`, { status })
      .then(() => {
        router.refresh();
        toast.success("Issue status updated successfully.");
      })
      .catch(() => toast.error("Issue status could not be updated."));
  };

  return (
    <Select.Root defaultValue={issue.status} onValueChange={updateIssueStatus}>
      <Select.Trigger placeholder="Update status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Current Status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusUpdater;
