type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AuthErrorPage(props: Props) {
  const searchParams = await props.searchParams;
  return (
    <div className="mb-8 rounded-sm bg-zinc-100 px-4 py-8">
      AuthError: {searchParams.error}
    </div>
  );
}
