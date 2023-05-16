import type { Category } from "@prisma/client";
import { api } from "~/utils/api";
import Link from "next/link";

type CategoryListProps = {
  categories?: Category[];
};

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const rotations: string[] = Array.from(
    { length: categories?.length || 0 },
    () => {
      const isNegative = Math.random() < 0.5;
      return `${isNegative ? "-" : ""}rotate-[${Math.floor(
        Math.random() * 5 + 1
      )}deg]`;
    }
  );
  return (
    <ul className="ml-auto flex gap-5 ">
      {categories?.map((category: Category, idx) => {
        return (
          <li key={category.id}>
            <Link
              className={`${
                rotations[idx] ?? ""
              } block h-7 cursor-pointer items-center justify-center border-[1px] border-black bg-lime-500 px-3 text-center transition hover:shadow-nav`}
              href={`/category/${category.slug}`}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
