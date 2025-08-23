import React, { useState } from 'react';
import { BookText, Search, Star } from 'lucide-react';
import Header from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { dictionaryService } from '@/services/dictionaryService';
import { useApi } from '@/hooks/use-api';

const Dictionary: React.FC = () => {
  const navigate = useNavigate();
  const { error } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading, request } = useApi();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!searchTerm.trim()) {
      error('Vui lòng nhập từ cần tra cứu', 'Bạn chưa nhập từ hoặc cụm từ để tra cứu');
      return;
    }

    try {
      // Attempt to fetch the word definition
      const wordResult = await request(
        () => dictionaryService.searchWord(searchTerm.trim()),
        {
          skipToast: true,
        }
      );

      if (wordResult) {
        // If successful, navigate to the result page
        navigate(`/dictionary-result?keyword=${encodeURIComponent(searchTerm.trim())}`);
      } else {
        error('Không tìm thấy từ', 'Từ này không có trong từ điển của chúng tôi');
      }
    } catch (err) {
      console.error('Error searching word:', err);
      error('Không thể tra cứu từ', 'Đã xảy ra lỗi khi tra cứu. Vui lòng thử lại sau.');
    }
  };

  const handleAddToFavorites = async (word: string) => {
    try {
      if (!word.trim()) {
        return;
      }

      await request(
        () => dictionaryService.addToFavorites(word),
        {
          successMessage: 'Đã thêm vào danh sách yêu thích',
          errorMessage: 'Không thể thêm vào danh sách yêu thích'
        }
      );
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-white dark:bg-gray-900">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200/50">
            <BookText size={48} color="white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2 dark:text-white">TỪ ĐIỂN</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Tra cứu từ vựng với định nghĩa chi tiết, ví dụ thực tế và gợi ý sử dụng trong nhiều ngữ
          cảnh khác nhau.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              placeholder="Nhập từ hoặc cụm từ cần tra cứu..."
              className="pl-4 pr-10 py-6 rounded-xl text-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
            <Star
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"
              size={20}
              onClick={() => handleAddToFavorites(searchTerm)}
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent dark:text-gray-300"
              disabled={isLoading}
            >
              <Search className="text-gray-500 dark:text-gray-300" size={20} />
            </Button>
          </div>
        </form>

        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleSearch}
            className="w-full py-6 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl flex items-center justify-center gap-2 text-lg shadow-lg shadow-pink-200/50 transition-all"
            disabled={isLoading}
          >
            <Search size={20} />
            {isLoading ? 'Đang tra cứu...' : 'Tra cứu'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dictionary;