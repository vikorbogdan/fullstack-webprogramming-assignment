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
  const numberofPages = Math.ceil(children.length / itemsPerPage);
  return (
    <div className="flex flex-col items-center gap-2">
      {numberofPages > 1 && (
        <div className="flex flex-row gap-2">
          <button onClick={handlePrevPage}>⏴</button>
          <div className="flex flex-row gap-2">
            {Array.from({ length: numberofPages }).map((_, i) => (
              <button
                className={`${
                  i === currentPage - 1 ? "bg-lime-400" : "bg-lime-100"
                } h-10 w-10 rounded-md p-2`}
                key={i}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={handleNextPage}>⏵</button>
        </div>
      )}
      <div className={className}>{currentItems}</div>
    </div>
  );
};

export default Paginate;
