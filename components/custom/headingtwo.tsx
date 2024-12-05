interface HeadingTwoProps {
  heading: string;
  className?: string;
}

export default function HeadingTwo({ heading, className }: HeadingTwoProps) {
  return (
    <h2
      className={`font-display text-5xl font-bold text-gray-700 ${className}`}
    >
      {heading}
    </h2>
  );
}
