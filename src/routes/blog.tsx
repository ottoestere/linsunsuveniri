import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { listPosts, type WPPost } from "@/lib/wordpress.functions";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Linen & Souvenirs Riga" },
      { name: "description", content: "Notes from our shop on Mazā Pils — new arrivals, the makers behind our linen and wool, and life in Riga's Old Town." },
      { property: "og:title", content: "Journal — Linen & Souvenirs" },
      { property: "og:description", content: "Stories from a small linen and souvenir boutique in Riga." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
  errorComponent: ({ error }) => <ErrorView message={error.message} />,
  notFoundComponent: () => <ErrorView message="Not found" />,
});

function Blog() {
  const { t } = useI18n();
  const fetchPosts = useServerFn(listPosts);
  const { data, isLoading, error } = useQuery({
    queryKey: ["wp-posts"],
    queryFn: () => fetchPosts({ data: { number: 20, status: "publish" } }),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl text-primary">
            Linen <span className="opacity-60">&</span> Souvenirs
          </Link>
          <nav className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">{t("blog.home")}</Link>
            <Link to="/blog" className="text-primary">{t("blog.label")}</Link>
            <LanguageSwitcher className="text-muted-foreground" />
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">{t("blog.label")}</p>
        <h1 className="font-serif text-5xl md:text-6xl text-primary mb-16 leading-tight">
          {t("blog.title")}
        </h1>

        {isLoading && <p className="text-muted-foreground">{t("blog.loading")}</p>}
        {error && <ErrorView message={(error as Error).message} t={t} />}

        {data && data.posts.length === 0 && (
          <p className="text-muted-foreground">{t("blog.empty")}</p>
        )}

        <div className="space-y-16">
          {data?.posts.map((p) => <PostCard key={p.ID} post={p} t={t} />)}
        </div>
      </section>
    </div>
  );
}

function PostCard({ post, t }: { post: WPPost; t: (key: string) => string }) {
  return (
    <article className="grid md:grid-cols-[1fr_2fr] gap-8 border-b border-border pb-16 last:border-0">
      {post.featured_image ? (
        <img
          src={post.featured_image}
          alt={stripHtml(post.title)}
          className="w-full h-60 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-60 bg-secondary" />
      )}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h2 className="font-serif text-3xl text-primary mb-4 leading-tight">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-accent transition">
            <span dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
        </h2>
        <div
          className="text-muted-foreground leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-block mt-6 text-sm uppercase tracking-wider text-accent hover:underline"
        >
          {t("blog.readMore")}
        </Link>
      </div>
    </article>
  );
}

function ErrorView({ message, t }: { message: string; t?: (key: string) => string }) {
  return (
    <div className="border border-border p-8 text-sm text-muted-foreground">
      <p className="font-serif text-primary text-lg mb-2">{t ? t("blog.error") : "Couldn't load posts"}</p>
      <p className="break-words">{message}</p>
    </div>
  );
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, "");
}
