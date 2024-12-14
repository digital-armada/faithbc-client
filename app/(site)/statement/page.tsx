import PageHeader from "@/components/ui/PageHeader";
import { getStatements } from "@/data/doctrines";
import Link from "next/link";

export default async function Page() {
  const { data } = await getStatements();

  return (
    <section>
      <div className="container">
        <PageHeader heading="Statement of Faith" />
        <ul role="list" className="flex flex-col divide-y divide-gray-700/10">
          {data.map((statement: any) => {
            return (
              <Link
                key={statement.id}
                href={`statement/${statement?.attributes?.slug}`}
              >
                <li className="py-4">
                  <p className="text-gray-700">{statement.attributes.title}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
