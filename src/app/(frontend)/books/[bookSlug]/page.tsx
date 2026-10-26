import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";

export type BookPageProps = {
  params: Promise<{
    bookSlug: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { bookSlug } = await params;

  const payload = await getPayload({ config });

  const queryResults = await payload.find({
    collection: "books",
    where: {
      slug: {
        equals: bookSlug,
      },
    },
    limit: 1,
  });

  const book = queryResults.docs[0];

  if (!book) {
    notFound();
  }

  return (
    <main>
      <h1>{book.title}</h1>
      <p>{book.summary}</p>
      <p>Price: {book.price}</p>
    </main>
  );
}
