import { API_URL } from "@/app/constants/constats";
import BlogDetailSource from "@/app/modules/blogDetail/BlogDetailSource";
import { Blog } from "@/app/types/model";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // <-- await اینجا
  try {
    const res = await fetch(`${API_URL}/post/${id}`, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("Failed to fetch location metadata");
    const data = await res.json();
    const post: Blog = data.data;

    return {
      title: "لوک استار",
      description: post.description || "پلتفرم جامع لوکیشن های عکاسی",
      openGraph: {
        title: "لوک استار",
        description: post.description || "پلتفرم جامع لوکیشن های عکاسی",
        images: [{ url: post.cover_image, width: 800, height: 600 }],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "لوک استار - پست",
      description: "پلتفرم جامع لوکیشن های عکاسی",
    };
  }
}

export default async function BlogPostPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/post/${id}`, { next: { revalidate: 600 } });
  const data = await res.json();
  const post: Blog = data.data;

  if (!post) return null;

  return <BlogDetailSource post={post} />;
}
