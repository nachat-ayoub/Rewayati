export default async function getNovelChapters(slug) {
  if (!slug) return [];

  const res = await fetch(
    `https://ar-novels-api.herokuapp.com/api/novels/${slug}/chapters`
  );
  const { chapters } = await res.json();

  return chapters;
}
