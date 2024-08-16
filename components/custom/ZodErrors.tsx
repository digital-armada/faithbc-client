export function ZodErrors({ error }: { error: string[] | undefined }) {
  console.log(error);
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div
      key={index}
      className="mt-1 py-2 text-xs italic text-red-700"
      aria-live="polite"
    >
      {err}
    </div>
  ));
}
