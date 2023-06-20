import type { StaticImageData } from "next/image";
import SmallLogo from "../../assets/svg/small-logo.svg";
import CategoryList from "./CategoryList";
import Link from "next/link";
import PageTitle from "./PageTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import UserProfile from "./UserProfile";
import type { Category } from "@prisma/client";

type NavigationBarProps = {
  categoryData?: Category[] | undefined;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ categoryData }) => {
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
    <div className="flex gap-4 p-5">
      <Link
        passHref
        className="relative flex flex-row items-center gap-1"
        href="/"
      >
        <Image width="50" src={SmallLogo as StaticImageData} alt="Logo" />
        <PageTitle text={pageTitle || mainPageTitle} />
      </Link>
      <CategoryList categories={categoryData} />
      {/* TODO: Add Search bar */}
      <UserProfile />
    </div>
  );
};

export default NavigationBar;
