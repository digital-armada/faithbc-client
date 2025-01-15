import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeadingTwo from "@/components/blocks/headingtwo";
import { getStatement } from "@/data/doctrines";
import Link from "next/link";
import Markdown from "react-markdown";

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await getStatement(params.slug);
  return (
    <section>
      <div className="markdown container" key={data.id}>
        <HeadingTwo heading={data?.title} />

        <Breadcrumbs
          labelsToUppercase={false}
          listClassName="flex gap-4"
          containerClassName="pt-4 pb-6 capitalize text-sm"
          separator="/"
        />

        <Markdown>{data?.content}</Markdown>
        <Link href={`/statement`}>
          <div className="mt-10 w-fit cursor-pointer rounded-md bg-fbc-dark px-4 py-1 text-white">
            &lt;&nbsp;back
          </div>
        </Link>
      </div>
    </section>
  );
}
