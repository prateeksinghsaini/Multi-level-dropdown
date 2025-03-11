import { useState } from "react";
import { Link } from "react-router-dom";

const Litems = ({ subs, level }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <ul
      className="absolute bg-white border border-b-0 border-black min-w-32 w-[15vw] shadow-xl transition duration-150 ease-in-out"
      style={{
        left: `${level != 0 ? 8 : 0}rem`,
        zIndex: level + 10,
      }}
    >
      {subs?.map((sub, index) => (
        <li
          key={index}
          className={`reletaive p-2 bg-white text-black hover:bg-[#fa882e] cursor-pointer border-b border-black`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button className="w-full text-left flex items-center group">
            <Link
              to={`/products?i-d-o-c=${sub?.id}&n-o-p=${sub?.name}`}
              className="flex-1 text-xs font-semibold"
            >
              {sub?.name}
            </Link>
            {sub?.subcategories && sub?.subcategories.length > 0 && (
              <span className="group-hover:rotate-180">
                <svg
                  className="fill-current h-4 w-4 transform transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            )}
          </button>
          {sub?.subcategories &&
            sub?.subcategories.length > 0 &&
            hoveredIndex === index && (
              <Litems subs={sub.subcategories} level={level + 1} />
            )}
        </li>
      ))}
    </ul>
  );
};

const Multileveldrop = ({ cat, subCats }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsOpen(false);
        }, 200)
      }
    >
      <button className="outline-none px-3 py-1 bg-black rounded-sm flex items-center min-w-32">
        <Link
          to={`/products?i-d-o-c=${cat.id}&n-o-c=${cat?.name}`}
          className="pr-1 font-semibold flex-1"
        >
          {cat?.name}
        </Link>
        <span>
          <svg
            className={`fill-current h-4 w-4 transform transition duration-150 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>
      {isOpen && <Litems subs={subCats} level={0} />}
    </div>
  );
};

export default Multileveldrop;
