import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // دریافت شماره صفحه جاری از searchParams
  const currentPage = Number(searchParams.get("page")) || 1;

  // اگر فقط یک صفحه وجود دارد، چیزی نمایش نده
  if (totalPages <= 1) {
    return null;
  }

  // تابع برای تغییر صفحه
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // محاسبه شماره صفحات برای نمایش
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // حداکثر تعداد دکمه‌های قابل مشاهده

    if (totalPages <= maxVisible) {
      // اگر صفحات کم هستند، همه را نمایش بده
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // منطق نمایش صفحات با ...
      if (currentPage <= 4) {
        // ابتدای لیست
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // انتهای لیست
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // وسط لیست
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8" dir="rtl">
      {/* دکمه صفحه قبل */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 cursor-pointer"
        }`}
        aria-label="صفحه قبل"
      >
        قبلی
      </button>

      {/* شماره صفحات */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 cursor-pointer"
              }`}
              aria-label={`صفحه ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* دکمه صفحه بعد */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 cursor-pointer"
        }`}
        aria-label="صفحه بعد"
      >
        بعدی
      </button>
    </div>
  );
}
