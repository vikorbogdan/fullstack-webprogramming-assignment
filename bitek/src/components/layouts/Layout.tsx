import type { FC, ReactNode } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useSelf } from "~/hooks/useSelf";
import { api } from "~/utils/api";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  const self = useSelf();
  const { data: categoryData, isLoading: categoryIsLoading } =
    api.category.getAllCategories.useQuery();
  if (!categoryIsLoading && self.status !== "loading" && self.status !== null) {
    return (
      <div className="font-mitr">
        <NavigationBar categoryData={categoryData} />
        {props.children}
      </div>
    );
  } else {
    //TODO: Add loading screen
    return <div>Loading...</div>;
  }
};

export default Layout;
