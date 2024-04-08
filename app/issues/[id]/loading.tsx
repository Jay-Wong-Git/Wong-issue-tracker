import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton width="6rem" />
      <Flex gap="3" my="2">
        <Skeleton width="3rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-5">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
