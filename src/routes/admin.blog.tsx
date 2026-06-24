import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { listPosts, savePost, deletePost, type WPPost } from "@/lib/wordpress.functions";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Dashboard — Linen & Souvenirs" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  const fetchPosts = useServerFn(listPosts);
  const saveFn = useServerFn(savePost);
  const deleteFn = useServerFn(deletePost);
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["wp-admin-posts"],
    queryFn: () => fetchPosts({ data: { number: 50, status: "any" } }),
  });

  const [editing, setEditing] = useState<Partial<WPPost> | null>(null);

  const saveMut = useMutation({
    mutationFn: (p: { id?: number; title: string; content: string; status?: string }) =>
      saveFn({ data: p }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wp-admin-posts"] });
      qc.invalidateQueries({ queryKey: ["wp-posts"] });
      setEditing(null);
    },
  });

  const delMut = useMutation({
    mutationFn: (id: number) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wp-admin-posts"] });
      qc.invalidateQueries({ queryKey: ["wp-posts"] });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div>
            <Link to="/" className="font-serif text-xl text-primary">
              Linen <span className="opacity-60">&</span> Souvenirs
            </Link>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">
              WordPress.com Dashboard
            </p>
          </div>
          <button
            onClick={() => setEditing({ title: "", content: "", status: "publish" })}
            className="bg-accent text-accent-foreground px-5 py-3 text-sm uppercase tracking-wider hover:bg-accent/90"
          >
            New post
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {editing && (
          <Editor
            initial={editing}
            saving={saveMut.isPending}
            saveError={saveMut.error as Error | null}
            onCancel={() => setEditing(null)}
            onSave={(p) => saveMut.mutate(p)}
          />
        )}

        <h2 className="font-serif text-3xl text-primary mb-6 mt-12">All posts</h2>

        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {error && (
          <div className="border border-border p-6 text-sm text-muted-foreground">
            <p className="font-medium text-primary mb-2">Couldn't load posts</p>
            <p className="break-words">{(error as Error).message}</p>
          </div>
        )}

        <div className="divide-y divide-border border-t border-b border-border">
          {data?.posts.map((p) => (
            <div key={p.ID} className="py-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p
                  className="font-serif text-lg text-primary truncate"
                  dangerouslySetInnerHTML={{ __html: p.title || "(untitled)" }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {p.status} · {new Date(p.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() =>
                    setEditing({ ID: p.ID, title: stripHtml(p.title), content: p.content, status: p.status })
                  }
                  className="text-sm border border-border px-4 py-2 hover:bg-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this post?")) delMut.mutate(p.ID);
                  }}
                  className="text-sm border border-border px-4 py-2 hover:bg-secondary text-destructive"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Editor({
  initial,
  onSave,
  onCancel,
  saving,
  saveError,
}: {
  initial: Partial<WPPost>;
  onSave: (p: { id?: number; title: string; content: string; status: string }) => void;
  onCancel: () => void;
  saving: boolean;
  saveError: Error | null;
}) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [content, setContent] = useState(initial.content ?? "");
  const [status, setStatus] = useState(initial.status ?? "publish");

  return (
    <div className="border border-border p-8 bg-card">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
        {initial.ID ? "Edit post" : "New post"}
      </p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full font-serif text-3xl text-primary bg-transparent border-b border-border pb-3 mb-6 focus:outline-none focus:border-accent"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post… HTML is supported."
        rows={14}
        className="w-full bg-transparent border border-border p-4 text-foreground leading-relaxed focus:outline-none focus:border-accent"
      />
      <div className="flex items-center gap-4 mt-6 flex-wrap">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
        </select>
        <button
          disabled={saving || !title}
          onClick={() => onSave({ id: initial.ID, title, content, status })}
          className="bg-accent text-accent-foreground px-6 py-3 text-sm uppercase tracking-wider hover:bg-accent/90 disabled:opacity-50"
        >
          {saving ? "Saving…" : initial.ID ? "Update" : "Publish"}
        </button>
        <button
          onClick={onCancel}
          className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          Cancel
        </button>
        {saveError && (
          <p className="text-sm text-destructive break-words w-full">{saveError.message}</p>
        )}
      </div>
    </div>
  );
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, "");
}
