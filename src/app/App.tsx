import { useEffect, useState } from "react";
import { articles, categories } from "../features/knowledge-base/content";
import { ArticleView } from "../features/knowledge-base/ArticleView";
import { SearchBox } from "../features/search/SearchBox";
import { searchArticles } from "../features/search/search";
import { BrandIcon } from "../shared/ui/Icons";

export function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "/");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const change = () => {
      setRoute(window.location.hash.slice(1) || "/");
      setQuery("");
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const article = route.startsWith("/articles/")
    ? articles.find((article) => article.id === route.split("/")[2])
    : undefined;
  const category = route.startsWith("/categories/")
    ? categories.find((category) => category.id === route.split("/")[2])
    : undefined;
  const isHome = route === "/";
  const results = searchArticles(query);
  useEffect(() => {
    document.title = `${article?.title ?? category?.title ?? "Help Center"} | BellAI Support`;
  }, [article, category]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#/" aria-label="BellAI Support home">
            <BrandIcon />
            <span>
              BellAI <strong>Support</strong>
            </span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu <span>☰</span>
          </button>
          <nav
            id="navigation"
            className={menuOpen ? "open" : ""}
            aria-label="Main navigation"
          >
            <a href="#/articles/home-and-profile">About BellAI</a>
            <a href="#/categories/getting-started">Get started</a>
            <a href="#/categories/troubleshooting">Get help</a>
            <span className="language" lang="en">
              English (United States)
            </span>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className={`hero ${!isHome ? "hero-compact" : ""}`}>
          <div className="hero-inner">
            {isHome && <h1>How can we help?</h1>}
            <SearchBox query={query} onChange={setQuery} />
          </div>
        </section>
        <div className="container main-content">
          {query.trim() ? (
            <section className="results">
              <a className="back-link" href="#/" onClick={() => setQuery("")}>
                ← Support home
              </a>
              <h1>Search results</h1>
              <p className="result-count" role="status">
                {results.length} {results.length === 1 ? "article" : "articles"}{" "}
                for “{query.trim()}”
              </p>
              {results.length ? (
                <div className="result-list">
                  {results.map((item) => (
                    <a key={item.id} href={`#/articles/${item.id}`}>
                      <span className="eyebrow">
                        {
                          categories.find(
                            (category) => category.id === item.category,
                          )?.title
                        }
                      </span>
                      <h2>
                        {item.title}
                        <span aria-hidden="true">↗</span>
                      </h2>
                      <p>{item.summary}</p>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h2>No articles found</h2>
                  <p>
                    Try a different phrase, such as “server”, “voice”, or “Apple
                    Health”.
                  </p>
                  <button onClick={() => setQuery("")}>
                    Browse all topics
                  </button>
                </div>
              )}
            </section>
          ) : isHome ? (
            <>
              <section
                className="category-grid"
                aria-label="Browse support topics"
              >
                {categories.map((item, index) => (
                  <a
                    className={`category-card ${index > 2 ? "compact-card" : ""}`}
                    key={item.id}
                    href={`#/categories/${item.id}`}
                  >
                    <h2>{item.title}</h2>
                    {index < 3 && <p>{item.description}</p>}
                  </a>
                ))}
              </section>
            </>
          ) : article ? (
            <ArticleView key={article.id} article={article} />
          ) : category ? (
            <section className="category-page">
              <a href="#/" className="back-link">
                ← Support home
              </a>
              <h1>{category.title}</h1>
              <p className="article-summary">{category.description}</p>
              <div className="result-list">
                {articles
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <a key={item.id} href={`#/articles/${item.id}`}>
                      <h2>
                        {item.title}
                        <span aria-hidden="true">→</span>
                      </h2>
                      <p>{item.summary}</p>
                    </a>
                  ))}
              </div>
            </section>
          ) : (
            <div className="empty-state">
              <h1>Page not found</h1>
              <p>This support page doesn’t exist.</p>
              <a href="#/">Return to Support home</a>
            </div>
          )}
        </div>
      </main>
      <footer>
        <div className="container footer-inner">
          <p>
            Your assistant. Your devices. Your data.
            <span>
              {" "}
              BellAI is built to keep personal assistance close to home.
            </span>
          </p>
          <a href="#/articles/privacy">Privacy & security ↗</a>
        </div>
      </footer>
    </>
  );
}
