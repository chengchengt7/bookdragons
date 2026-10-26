import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Image from "next/image";

export type BookPageProps = {
  params: Promise<{ bookSlug: string; }>;
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
    depth: 2,
  });

  const book = queryResults.docs[0];

  if (!book) {
    notFound();
  }

  const author = book.author && typeof book.author === "object" ? book.author : null;
  const photo = author?.photo && typeof author.photo === "object" ? author.photo : null;

  return (
    <main className="container">
      <h1>{book.title}</h1>
      <p>{book.summary}</p>
      <p>Price: {book.price}</p>
      {author && (
        <section aria-labelledby="author-heading">
          <h2 id="author-heading">Author</h2>
          {photo?.url && (
            <Image
              src={photo.url}
              alt=""
              width={photo.width || 200}
              height={photo.height || 200}
              style={{ width: "200px", maxWidth: "100%", height: "auto" }}
            />
          )}
          <h3>
            {author.firstName} {author.lastName}
          </h3>
          <p>{author.about}</p>
        </section>
      )}
    </main>
  );
}
