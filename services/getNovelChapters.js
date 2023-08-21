export default async function getNovelChapters(slug) {
  if (!slug) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/${slug}/chapters`
  );
  const { chapters } = await res.json();

  return chapters;
}
