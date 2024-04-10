"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const IssueStatusUpdater = ({ issue }: { issue: Issue }) => {
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
      <Select.Trigger placeholder="Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Current Status</Select.Label>
          <Select.Item value={Status.OPEN}>Open</Select.Item>
          <Select.Item value={Status.IN_PROGRESS}>In Progress</Select.Item>
          <Select.Item value={Status.CLOSED}>Closed</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusUpdater;
