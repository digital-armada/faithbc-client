interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  console.log(error);
  if (!error) return null;
  return <div className="text-md py-2 italic text-pink-500">{error}</div>;
}
