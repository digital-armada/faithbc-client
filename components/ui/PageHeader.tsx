import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeadingTwo from "@/components/custom/headingtwo";

export default function PageHeader({ heading }: { heading: string }) {
  return (
    <div className="mb-4">
      <HeadingTwo heading={heading} />
      <Breadcrumbs
        labelsToUppercase={false}
        listClassName="flex gap-4"
        containerClassName="pt-4 pb-6 capitalize"
        separator="/"
      />
    </div>
  );
}
