import { useState } from "react";

type PaginateProps = {
  children: React.ReactNode[];
  itemsPerPage: number;
  className?: string;
};

const Paginate: React.FC<PaginateProps> = ({
  className,
  children,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    if (currentPage * itemsPerPage >= children.length) return;
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  const currentItems = children.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <div>
        <button onClick={handlePrevPage}>previous</button>
        {Array.from({ length: Math.ceil(children.length / itemsPerPage) }).map(
          (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          )
        )}
        <button onClick={handleNextPage}>next</button>
      </div>
      <div className={className}>{currentItems}</div>
    </div>
  );
};

export default Paginate;
