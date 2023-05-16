import type { StaticImageData } from "next/image";
import SmallLogo from "../../assets/svg/small-logo.svg";
import CategoryList from "./CategoryList";
import Link from "next/link";
import PageTitle from "./PageTitle";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
const NavigationBar = () => {
  const { data: categoryData } = api.category.getAllCategories.useQuery();
  const router = useRouter();
  const mainPageTitle = "bitek";
  let pageTitle = "";
  if (router.pathname.split("/")[1] === "category") {
    const categoryName = categoryData?.find(
      (category) => category.slug === router.query.slug
    )?.name;
    if (typeof categoryName === "string") {
      pageTitle = categoryName;
    }
  }
  return (
    <div className="flex p-10">
      <Link className="relative flex flex-row items-center gap-1" href="/">
        <Image width="50" src={SmallLogo as StaticImageData} alt="Logo" />
        <PageTitle text={pageTitle || mainPageTitle} />
      </Link>
      <CategoryList categories={categoryData} />
      {/* Search bar */}
    </div>
  );
};

export default NavigationBar;
