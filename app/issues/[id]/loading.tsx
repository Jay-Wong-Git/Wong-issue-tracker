import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

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
