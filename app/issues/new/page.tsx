import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const NewIssuePage = () => {
  const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  });
  return <IssueForm />;
};

export default NewIssuePage;
