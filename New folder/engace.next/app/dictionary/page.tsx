"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Book,
  History,
  Sparkles,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { getUserPreferences } from "@/lib/localStorage";
import Navbar from "@/components/Navbar";

const VISITED_KEY = "has-visited-dictionary";
const RECENT_SEARCHES_KEY = "recent-dictionary-searches";

type RecentSearch = {
  keyword: string;
  context?: string;
  timestamp: Date;
};

const SAMPLE_SEARCHES = [
  "accomplish",
  "resilient",
  "endeavor",
  "persistent",
  "innovative",
  "efficient",
];

export default function DictionaryPage() {
  const [keyword, setKeyword] = useState("");
  const [context, setContext] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showContextInput, setShowContextInput] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showRecent, setShowRecent] = useState(true);
  const router = useRouter();
  const preferences = getUserPreferences();
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!preferences.hasCompletedOnboarding) {
      router.push("/");
      return;
    }

    const hasVisited = localStorage.getItem(VISITED_KEY);
    if (!hasVisited) {
      setShowGuide(true);
      localStorage.setItem(VISITED_KEY, "true");
    }

    // Load recent searches
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, [router, preferences.hasCompletedOnboarding]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Save to recent searches
    const newSearch: RecentSearch = {
      keyword: keyword.trim(),
      context: context.trim() || undefined,
      timestamp: new Date(),
    };

    const updatedSearches = [
      newSearch,
      ...recentSearches.filter((s) => s.keyword !== keyword).slice(0, 4),
    ];
    setRecentSearches(updatedSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));

    // Navigate to results page
    const searchParams = new URLSearchParams();
    searchParams.set("keyword", keyword.trim());
    if (context.trim()) {
      searchParams.set("context", context.trim());
    }
    router.push(`/dictionary/result?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 py-10 mt-4">
        <div className="mx-auto max-w-3xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
              <BookOpen className="h-10 w-10" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
              Từ điển thông minh
            </h1>
            <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
              Tra cứu từ vựng với định nghĩa chi tiết, ví dụ thực tế và gợi ý sử
              dụng trong nhiều ngữ cảnh khác nhau.
            </p>
          </div>

          {/* Search Form */}
          <div className="relative mb-8 space-y-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 pr-12 text-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
                  placeholder="Nhập từ hoặc cụm từ cần tra cứu..."
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowContextInput(!showContextInput)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  title="Thêm ngữ cảnh"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>

              {showContextInput && (
                <div className="animate-fadeIn">
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
                    placeholder="Thêm ngữ cảnh để nhận kết quả chính xác hơn..."
                    rows={3}
                  />
                </div>
              )}

              {/* Sample Searches */}
              <div className="rounded-xl bg-white p-4 shadow-md dark:bg-slate-800">
                <div className="mb-4 flex items-center space-x-2 text-slate-900 dark:text-white">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="font-semibold">Gợi ý tìm kiếm</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_SEARCHES.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const searchParams = new URLSearchParams();
                        searchParams.set("keyword", word);
                        router.push(
                          `/dictionary/result?${searchParams.toString()}`
                        );
                      }}
                      className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !keyword.trim()}
                className={`group relative w-full transform overflow-hidden rounded-xl px-6 py-4 text-lg font-medium text-white shadow-lg transition-all duration-200 ${
                  isSubmitting || !keyword.trim()
                    ? "cursor-not-allowed bg-slate-400"
                    : "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-blue-500/25 hover:translate-y-[-2px] hover:shadow-xl dark:shadow-blue-900/25"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  <span>Tra cứu</span>
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </form>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="rounded-xl bg-white shadow-md dark:bg-slate-800">
              <button
                onClick={() => setShowRecent(!showRecent)}
                className="flex w-full items-center justify-between p-4"
              >
                <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
                  <History className="h-5 w-5" />
                  <h2 className="font-semibold">Tìm kiếm gần đây</h2>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                    showRecent ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showRecent && (
                <div className="animate-fadeIn border-t border-slate-200 p-4 dark:border-slate-700">
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const searchParams = new URLSearchParams();
                          searchParams.set("keyword", search.keyword);
                          if (search.context) {
                            searchParams.set("context", search.context);
                          }
                          router.push(
                            `/dictionary/result?${searchParams.toString()}`
                          );
                        }}
                        className="w-full rounded-lg bg-slate-50 px-4 py-3 text-left hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700"
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {search.keyword}
                        </div>
                        {search.context && (
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {search.context}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* First Visit Guide Dialog */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg transform rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-800">
            <div className="mb-6">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <Book className="h-7 w-7 text-white" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Chào mừng đến với Từ điển!
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Từ điển thông minh của EngAce được thiết kế đặc biệt cho người
                  học tiếng Anh, cung cấp:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Định nghĩa chi tiết, thành ngữ và cụm động từ</li>
                  <li>Giải thích bằng tiếng Việt khi cần thiết</li>
                  <li>
                    Câu ví dụ minh họa giúp hiểu rõ nghĩa của từ trong ngữ cảnh
                  </li>
                  <li>Tìm kiếm từ dựa trên ngữ cảnh cụ thể</li>
                </ul>
                <p className="font-medium mt-4">Để sử dụng:</p>
                <ul className="list-decimal ml-6 space-y-2">
                  <li>Nhập từ hoặc cụm từ cần tra cứu vào ô tìm kiếm</li>
                  <li>
                    Nhấn vào biểu tượng ✨ để thêm ngữ cảnh (không bắt buộc)
                  </li>
                  <li>Nhấn "Tra cứu" hoặc Enter để xem kết quả chi tiết</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Bắt đầu tra cứu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
