import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const CategoryPage = () => {
  const router = useRouter();
  const { data: categoryData } = api.category.getCategoryBySlug.useQuery({
    slug: router.query.slug as string,
  });

  return <div>{categoryData?.name}</div>;
};

export default CategoryPage;
