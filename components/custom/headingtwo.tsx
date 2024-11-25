export default function HeadingTwo({ heading, className }) {
  return (
    <h2
      className={`font-display text-5xl font-bold text-gray-700 ${className}`}
    >
      {heading}
    </h2>
  );
}
