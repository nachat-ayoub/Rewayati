import { publicRuntimeConfig } from '../next.config';

export default async function getNovelChapters(slug) {
  if (!slug) return [];

  const res = await fetch(
    `${publicRuntimeConfig.BASE_API_URL}/${slug}/chapters`
  );
  const { chapters } = await res.json();

  return chapters;
}
