import type { FC, ReactNode } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useSelf } from "~/hooks/useSelf";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  const self = useSelf();
  if (self.status !== "loading" && self.status !== null) {
    return (
      <div className="font-mitr">
        <NavigationBar />
        {props.children}
      </div>
    );
  } else {
    //TODO: Add loading screen
    return <div>Loading...</div>;
  }
};

export default Layout;
