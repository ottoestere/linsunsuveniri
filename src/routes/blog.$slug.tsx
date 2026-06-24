import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPost } from "@/lib/wordpress.functions";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: "Journal — Linen & Souvenirs Riga" },
      { name: "description", content: "Stories from our linen and souvenir boutique in Riga's Old Town." },
      { property: "og:title", content: "Journal — Linen & Souvenirs" },
      { property: "og:description", content: "Stories from our linen and souvenir boutique in Riga's Old Town." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
  }),
  component: Post,
  errorComponent: ({ error }) => (
    <div className="p-12 text-center text-muted-foreground">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-12 text-center">Post not found.</div>
  ),
});

function Post() {
  const { slug } = Route.useParams();
  const fetchPost = useServerFn(getPost);
  const { data, isLoading, error } = useQuery({
    queryKey: ["wp-post", slug],
    queryFn: () => fetchPost({ data: { slug } }),
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl text-primary">
            Linen <span className="opacity-60">&</span> Souvenirs
          </Link>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
            ← All posts
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-20">
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-muted-foreground">{(error as Error).message}</p>}
        {data && (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
              {new Date(data.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-10"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
            {data.featured_image && (
              <img src={data.featured_image} alt="" className="w-full mb-10 object-cover" />
            )}
            <div
              className="prose prose-lg max-w-none text-foreground leading-relaxed font-serif"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </>
        )}
      </article>
    </div>
  );
}
