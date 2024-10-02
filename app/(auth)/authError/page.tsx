type Props = {
  searchParams: {
    error?: string;
  };
};

export default function AuthErrorPage({ searchParams }: Props) {
  return (
    <div className="mb-8 rounded-sm bg-zinc-100 px-4 py-8">
      AuthError: {searchParams.error}
    </div>
  );
}
