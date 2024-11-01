import More from "../../../components/ui/more";

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, (m: string) => map[m]);
}

export default function HomeHero() {
  return (
    <section>
      <div className="container mt-10 block w-full space-y-6 rounded-md font-display">
        <div className="text-fbc-dark">Welcome to</div>
        <div className="text-7xl font-bold text-gray-700">
          <span>Faith Baptist</span>
          <br />
          <span>Church</span>
        </div>
        <div className="flex flex-col gap-4 font-body text-sm">
          <p>
            We are an Independent Baptist church built upon the firm foundation
            of God&apos;s inerrant Word and believe the KJV is the most faithful
            English translation, and it is our sole source for truth and wisdom.
          </p>
          <p>
            At our church, we worship the Lord through biblical preaching,
            teaching, hymns, and vibrant ministries for all ages - children,
            teens, and adults. Our services, available in both English and
            Arabic, are reverent and God-honoring as we seek to glorify Him in
            all we do.
          </p>
          <p>
            Whether you are a lifelong believer or simply seeking answers about
            the Christian faith, we invite you to join us for worship and bible
            study. Our church family is committed to proclaiming the truth of
            Scripture and sharing the life-changing gospel of Jesus Christ.
          </p>
          <p>We look forward to welcoming you in person soon!</p>
        </div>
        <More title="Statement of Faith" link="/statement" />
      </div>
    </section>
  );
}
