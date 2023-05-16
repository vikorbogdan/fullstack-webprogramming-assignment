type PageTitleProps = {
  text: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return <h1 className="font-mitr text-3xl font-bold uppercase">{text}</h1>;
};

export default PageTitle;
