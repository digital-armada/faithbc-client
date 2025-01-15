import ConfirmationSubmit from "@/app/(auth)/confirmation/submit/_components/ConfirmationSubmit";

type Props = {
  searchParams: {
    confirmation?: string;
  };
};

export default async function page({ searchParams }: Props) {
  return <ConfirmationSubmit confirmationToken={searchParams?.confirmation} />;
}
