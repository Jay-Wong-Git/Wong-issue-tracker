import { IssueStatusBadge, Skeleton } from "@/app/components";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const LoadingIssueDetailPage = () => {
  return (
    <>
      <Skeleton width="4rem" />
      <Flex gap="3" my="2">
        <Skeleton width="3rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-5">
        <Skeleton count={5} />
      </Card>
    </>
  );
};

export default LoadingIssueDetailPage;
