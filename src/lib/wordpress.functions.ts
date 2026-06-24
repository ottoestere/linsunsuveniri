import { createServerFn } from "@tanstack/react-start";

export type WPPost = {
  ID: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
  URL: string;
  status: string;
  featured_image?: string;
  author?: { name: string };
};

export const listPosts = createServerFn({ method: "GET" })
  .inputValidator((d: { status?: string; number?: number } | undefined) => d ?? {})
  .handler(async ({ data }) => {
    const { wpGet } = await import("./wordpress.server");
    const res = await wpGet("/posts", {
      number: data.number ?? 20,
      status: data.status ?? "publish",
      fields: "ID,title,content,excerpt,date,slug,URL,status,featured_image,author",
    });
    return { posts: (res.posts ?? []) as WPPost[] };
  });

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const { wpGet } = await import("./wordpress.server");
    return (await wpGet(`/posts/slug:${encodeURIComponent(data.slug)}`)) as WPPost;
  });

export const savePost = createServerFn({ method: "POST" })
  .inputValidator((d: { id?: number; title: string; content: string; status?: string }) => d)
  .handler(async ({ data }) => {
    const { wpPost } = await import("./wordpress.server");
    const path = data.id ? `/posts/${data.id}` : "/posts/new";
    return (await wpPost(path, {
      title: data.title,
      content: data.content,
      status: data.status ?? "publish",
    })) as WPPost;
  });

export const deletePost = createServerFn({ method: "POST" })
  .inputValidator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    const { wpPost } = await import("./wordpress.server");
    return await wpPost(`/posts/${data.id}/delete`, {});
  });
