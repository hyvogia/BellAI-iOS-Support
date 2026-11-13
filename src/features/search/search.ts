import { articles } from "../knowledge-base/content";
export function searchArticles(query: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return articles.filter((article) => {
    const text = [
      article.title,
      article.summary,
      ...article.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
      ]),
    ]
      .join(" ")
      .toLowerCase();
    return words.every((word) => text.includes(word));
  });
}
