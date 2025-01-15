import ConfirmationSubmit from "@/app/(auth)/confirmation/submit/_components/ConfirmationSubmit";

type Props = {
  searchParams: Promise<{
    confirmation?: string;
  }>;
};

export default async function page(props: Props) {
  const searchParams = await props.searchParams;
  return <ConfirmationSubmit confirmationToken={searchParams?.confirmation} />;
}
