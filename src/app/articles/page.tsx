import ArticlesPreview from "../components/Articles";

export default function ArticlesPage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">All Articles</h1>

      {/* Show all articles */}
      <ArticlesPreview  /> 
    </main>
  );
}
