import React from "react";
import Link from "next/link";
import { SvgArrowRight } from "./svgs/SvgArrowRight";
import { SvgArrowLeft } from "./svgs/SvgArrowLeft";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const Pagination = ({ total_pages, page }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const handleBackTop = () => {
    window.scrollTo({ top: 0 });
  }
  const { asPath, query } = useRouter();
  const pathname = asPath.split("?")[0];
  let searchQuery = `?q=${query.q?.trim().toLowerCase().replace(/\s/g, "+")}`;
  
  if (pathname === "/search") {
    return (
      <div className="pagination">
        {page === 1 && (<button className="pagination__arrowPrev disabled"><SvgArrowLeft color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /><p className="dark:!text-slate-200">Trang trước</p></button>)}
        {page > 1 && (<Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page - 1}`}><button className="pagination__arrowPrev"><SvgArrowLeft color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /><p className="dark:!text-slate-200">Trang trước</p></button></Link>)}
        <ul className="pagination__pageNumbers">
          {page > 3 && total_pages > 4 ? (
            <>
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=1`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">1</li></Link>
            <li className="dots dark:!text-slate-300">...</li>
            </>
          ) : null}
    
          {page === total_pages && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page - 3}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 3}</li></Link>
          ) : null}
          {page === total_pages && total_pages > 2 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page - 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 2}</li></Link>
          ) : null}
          {page - 2 > 0 && page > 3 && page > total_pages-2 && page < total_pages ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page - 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 2}</li></Link>
          ) : null}
          {page - 2 > 0 && page < 4 && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page - 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 2}</li></Link>
          ) : null}
          {page - 1 > 0 && (<Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page - 1}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 1}</li></Link>)}
          {/* active */}
          <Link className="group active" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page}`}><li className="dark:!text-blue-900">{page}</li></Link>
          {/* end active */}
    
          {page + 1 < total_pages+1 && (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page + 1}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 1}</li></Link>
          )}
          {/* page != 3 only for total_pages = 5 */}
          {page + 2 < total_pages+1 && page > 2 && page > total_pages-3 && page !== 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page + 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 2}</li></Link>
          ) : null}
          {page < 2 && total_pages > 2 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page + 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 2}</li></Link>
          ) : null}
          {page === 1 && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page + 3}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 3}</li></Link>
          ) : null}
          {page === 2 && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page + 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 2}</li></Link>
          ) : null}
          
          {/* Only for total_pages = 5 */}
          {page === 3 && total_pages === 5 ? (
            <>
            <li className="dots dark:!text-slate-300">...</li>
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${total_pages}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{total_pages}</li></Link>
            </>
          ) : null}
    
          {page < total_pages-2 && total_pages > 4 ? (
            <>
            <li className="dots dark:!text-slate-300">...</li>
            <Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${total_pages}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{total_pages}</li></Link>
            </>
          ) : null}
        </ul>
        {page < total_pages && (<Link className="group" onClick={handleBackTop} href={`${pathname}${searchQuery}&page=${page + 1}`}><button className="pagination__arrowNext"><p className="dark:!text-slate-200">Trang tiếp theo</p><SvgArrowRight color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /></button></Link>)}
        {page === total_pages && (<button className="pagination__arrowNext disabled"><p className="dark:!text-slate-200">Trang tiếp theo</p><SvgArrowRight color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /></button>)}
      </div>
    );

  } else {
    return (
      <div className="pagination">
        {page === 1 && (<button className="pagination__arrowPrev disabled"><SvgArrowLeft color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /><p className="dark:!text-slate-200">Trang trước</p></button>)}
        {page > 1 && (<Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page - 1}`}><button className="pagination__arrowPrev"><SvgArrowLeft color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /><p className="dark:!text-slate-200">Trang trước</p></button></Link>)}
        <ul className="pagination__pageNumbers">
          {page > 3 && total_pages > 4 ? (
            <>
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=1`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">1</li></Link>
            <li className="dots dark:!text-slate-300">...</li>
            </>
          ) : null}
  
          {page === total_pages && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page - 3}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 3}</li></Link>
          ) : null}
          {page === total_pages && total_pages > 2 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page - 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 2}</li></Link>
          ) : null}
          {page - 2 > 0 && page > 3 && page > total_pages-2 && page < total_pages ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page - 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 2}</li></Link>
          ) : null}
          {page - 2 > 0 && page < 4 && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page - 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 2}</li></Link>
          ) : null}
          {page - 1 > 0 && (<Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page - 1}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page - 1}</li></Link>)}
          {/* active */}
          <Link className="group active" onClick={handleBackTop} href={`${pathname}?page=${page}`}><li className="dark:!text-blue-900">{page}</li></Link>
          {/* end active */}
  
          {page + 1 < total_pages+1 && (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page + 1}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 1}</li></Link>
          )}
          {/* page != 3 only for total_pages = 5 */}
          {page + 2 < total_pages+1 && page > 2 && page > total_pages-3 && page !== 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page + 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 2}</li></Link>
          ) : null}
          {page < 2 && total_pages > 2 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page + 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 2}</li></Link>
          ) : null}
          {page === 1 && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page + 3}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 3}</li></Link>
          ) : null}
          {page === 2 && total_pages > 3 ? (
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page + 2}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{page + 2}</li></Link>
          ) : null}
          
          {/* Only for total_pages = 5 */}
          {page === 3 && total_pages === 5 ? (
            <>
            <li className="dots dark:!text-slate-300">...</li>
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${total_pages}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{total_pages}</li></Link>
            </>
          ) : null}
  
          {page < total_pages-2 && total_pages > 4 ? (
            <>
            <li className="dots dark:!text-slate-300">...</li>
            <Link className="group" onClick={handleBackTop} href={`${pathname}?page=${total_pages}`}><li className="dark:!text-slate-300 dark:group-hover:!text-slate-50">{total_pages}</li></Link>
            </>
          ) : null}
        </ul>
        {page < total_pages && (<Link className="group" onClick={handleBackTop} href={`${pathname}?page=${page + 1}`}><button className="pagination__arrowNext"><p className="dark:!text-slate-200">Trang tiếp theo</p><SvgArrowRight color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /></button></Link>)}
        {page === total_pages && (<button className="pagination__arrowNext disabled"><p className="dark:!text-slate-200">Trang tiếp theo</p><SvgArrowRight color={currentTheme === "dark" ? "#E2F8F0" : "#0f2f7f"} /></button>)}
      </div>
    );
  }
};

export default Pagination;