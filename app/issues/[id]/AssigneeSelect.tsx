"use client";

import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = ({
  issue: { id: issueId, assignedToUserId },
}: {
  issue: Issue;
}) => {
  const { isLoading, error, data: users } = useUsers();
  if (error) return null;
  if (isLoading) return <Skeleton />;

  const assignIssue = (userId: string) =>
    axios
      .patch(`/api/issues/${issueId}`, {
        assignedToUserId: userId || null,
      })
      .then(() => toast.success("Changes saved successfully."))
      .catch(() => toast.error("Changes could not be saved."));

  return (
    <>
      <Select.Root
        onValueChange={assignIssue}
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
      <Toaster toastOptions={{ duration: 2000 }} />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000, // 60s
  });

export default AssigneeSelect;
