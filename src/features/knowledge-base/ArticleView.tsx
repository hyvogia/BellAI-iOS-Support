import { useState } from "react";
import { articles, categories } from "./content";
import type { Article } from "./content";
export function ArticleView({ article }: { article: Article }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const category = categories.find(
    (category) => category.id === article.category,
  )!;
  return (
    <div className="article-layout">
      <aside>
        <p className="eyebrow">IN THIS CATEGORY</p>
        {articles
          .filter((item) => item.category === article.category)
          .map((item) => (
            <a
              className={item.id === article.id ? "current" : ""}
              key={item.id}
              href={`#/articles/${item.id}`}
            >
              {item.title}
            </a>
          ))}
      </aside>
      <article className="article">
        <a className="back-link" href={`#/categories/${category.id}`}>
          ← {category.title}
        </a>
        <h1>{article.title}</h1>
        <p className="article-summary">{article.summary}</p>
        <div className="article-meta">BellAI for iOS · v1.0</div>
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <div className="feedback">
          <span>
            {feedback
              ? "Thanks — your feedback is noted for this session."
              : "Was this article helpful?"}
          </span>
          {!feedback && (
            <div>
              <button onClick={() => setFeedback("yes")}>Yes</button>
              <button onClick={() => setFeedback("no")}>No</button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
