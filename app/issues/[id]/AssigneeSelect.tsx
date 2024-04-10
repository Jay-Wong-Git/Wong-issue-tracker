"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = ({
  issue: { id: issueId, assignedToUserId },
}: {
  issue: Issue;
}) => {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000, // 60s
  });

  if (error) return null;
  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      onValueChange={(userId) =>
        axios.patch(`/api/issues/${issueId}`, {
          assignedToUserId: userId || null,
        })
      }
      defaultValue={assignedToUserId ? assignedToUserId : ""}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
