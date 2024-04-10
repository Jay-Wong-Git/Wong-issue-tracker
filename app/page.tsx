"use client";

import { useSearchParams } from "next/navigation";
import Pagination from "./components/Pagination";

export default function Home() {
  const searchParams = useSearchParams();
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={parseInt(searchParams.get("page") || "1")}
    />
  );
}
