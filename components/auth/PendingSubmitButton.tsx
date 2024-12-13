import { useFormStatus } from "react-dom";

export default function PendingSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`rounded-md bg-blue-400 px-4 py-2 disabled:cursor-wait disabled:bg-sky-200 disabled:text-gray-400`}
      disabled={pending}
      aria-disabled={pending}
    >
      Send
    </button>
  );
}
