import PageCardImage from "@/components/PageCardImage";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { fetchApi } from "@/helpers/fetch-api";
import { Post } from "@/interfaces/post";

const getPosts = async (page = 1, pageSize = 4) => {
  const path = "/posts";
  const urlParamsObject = {
    populate: "*",
    sort: {
      createdAt: "asc",
    },
    pagination: {
      page: page,
      pageSize: pageSize,
    },
  };

  const { data, meta } = await fetchApi(path, urlParamsObject);
  console.log(data);
  return { data: data, pagination: meta.pagination };
};

const Blog = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { page } = searchParams;
  let pageNumber = page ? parseInt(page) : 1;
  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
    console.log(
      "Valor no válido como parámetro de página. Se establece a 1. 🐤"
    );
  }

  const { data, pagination } = await getPosts(pageNumber);

  return (
    <div className="space-y-8">
      <PageHeader text="Latest Posts" />
      <Pagination pagination={pagination} />
      <section className="grid grid-cols-1 gap-4">
        {data.map((post: Post) => (
          <PageCardImage
            key={post.id}
            post={post}
          />
        ))}
      </section>
    </div>
  );
};
export default Blog;
