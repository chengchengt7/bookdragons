import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

type AuthorPageProps = {
  params: Promise<{ authorSlug: string }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { authorSlug } = await params;
  const payload = await getPayload({ config });

  const authors = await payload.find({
    collection: "authors",
    where: { slug: { equals: authorSlug } },
    limit: 1,
    depth: 1,
  });
  const author = authors.docs[0];

  if (!author) notFound();

  const books = await payload.find({
    collection: "books",
    where: { author: { equals: author.id } },
    pagination: false,
    sort: "title",
    depth: 0,
  });
  const photo = author.photo && typeof author.photo === "object" ? author.photo : null;

  return (
    <main>
      <h1>{author.firstName} {author.lastName}</h1>
      {photo?.url && (
        <Image
          src={photo.url}
          alt={photo.alt || `${author.firstName} ${author.lastName}`}
          width={photo.width || 200}
          height={photo.height || 200}
          style={{ width: "200px", maxWidth: "100%", height: "auto" }}
        />
      )}
      <p>{author.about}</p>

      <h2>Bøker av forfatteren</h2>
      {books.docs.length === 0 ? (
        <p>Ingen bøker er knyttet til denne forfatteren.</p>
      ) : (
        <ul>
          {books.docs.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.slug}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
