interface WidgetHeadingsProps {
  heading: string;
  icon?: React.ReactNode;
}

export default function WidgetHeadings({ heading, icon }: WidgetHeadingsProps) {
  return (
    <h2 className="flex items-center gap-2 pb-2 text-lg font-bold">
      {icon}
      {heading}
    </h2>
  );
}
