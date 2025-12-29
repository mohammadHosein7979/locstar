import { useBlogList } from "@/app/repository/blogService";
import PostCard from "../postCard/PostCard";

// const fakePosts: Blog[] = [
  
//   {
//     id: 2,
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
//     cover_image:
//       "https://storage.axeto.net/public/31ef2ca7334e439cafa754891c1cc3b6.jpg",
//   },
  
//   {
//     id: 4,
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
//     cover_image:
//       "https://storage.axetostagingserver.ir/public/7d21cad3642f4ed5a7fd2058661e1340.jpg",
//   },
//   {
//     id: 5,
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
//     cover_image:
//       "https://storage.axetostagingserver.ir/public/05e869d7cf8442b5ad85d1aad3e6cfbc.jpg",
//   },
//   {
//     id: 6,
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
//     cover_image:
//       "https://storage.axetostagingserver.ir/public/1f6a2dad618f4327b9a9b7548ed9740a.jpg",
//   },
//   {
//     id: 7,
//     description:
//       "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
//     cover_image:
//       "https://storage.axetostagingserver.ir/public/14b85cfef6ce4e53aea2eb8364b8088e.jpg",
//   },
// ];

const DesktopLastBlogList = () => {
  const { data, isError, isLoading } = useBlogList({page: 1, per_page: 5})

  if (isLoading) return null;
  if (isError) return null;
  if (!data) return null;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {data.data.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default DesktopLastBlogList;
