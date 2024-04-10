import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const NewIssuePage = () => {
  const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  });
  return <IssueForm />;
};

export default NewIssuePage;

export const metadata: Metadata = {
  title: "Wong Issue Tracker - New",
  description: "Create a new project issue.",
};
