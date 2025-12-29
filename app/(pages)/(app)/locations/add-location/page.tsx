import { loadingString } from "@/app/constants/strings";
import AddLocationSource from "@/app/modules/addLocation/AddLocationSource";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const locationId = params.location;

  return (
    <Suspense fallback={<p>{loadingString}</p>}>
      <AddLocationSource id={locationId ? parseInt(locationId) : undefined} />
    </Suspense>
  );
};

export default Page;
