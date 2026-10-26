import config from "@payload-config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

type GenrePageProps = {
  params: Promise<{ genreSlug: string }>;
};

export default async function GenrePage({ params }: GenrePageProps) {
  const { genreSlug } = await params;
  const payload = await getPayload({ config });

  const genres = await payload.find({
    collection: "genres",
    where: { slug: { equals: genreSlug } },
    limit: 1,
  });
  const genre = genres.docs[0];

  if (!genre) notFound();

  const books = await payload.find({
    collection: "books",
    where: { genres: { equals: genre.id } },
    pagination: false,
    sort: "title",
    depth: 0,
  });

  return (
    <main>
      <h1>{genre.title}</h1>
      <h2>Bøker i sjangeren</h2>
      {books.docs.length === 0 ? (
        <p>Ingen bøker finnes i denne sjangeren.</p>
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
