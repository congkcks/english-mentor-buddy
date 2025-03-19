
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Bookmark, Volume2, Star } from 'lucide-react';
import SearchInput from '@/components/SearchInput';
import MainLayout from '@/layouts/MainLayout';

interface WordDefinition {
  word: string;
  phonetic: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
  examples: string[];
}

const dictionarySuggestions = [
  'blessing in disguise',
  'spill the beans',
  'incentivize',
  'persistent',
  'innovative',
];

// Mock data for demonstration
const mockWord: WordDefinition = {
  word: 'innovative',
  phonetic: '/ˈɪnəveɪtɪv/',
  meanings: [
    {
      partOfSpeech: 'adjective',
      definitions: [
        {
          definition: 'Introducing new ideas; original and creative in thinking.',
          example: 'Innovative approaches to teaching',
        },
        {
          definition: 'Featuring new methods; advanced and original.',
          example: 'Innovative designs',
        },
      ],
    },
  ],
  examples: [
    'The company is known for its innovative products.',
    'She has an innovative approach to problem-solving.',
    'The team developed an innovative solution to the challenge.',
  ],
};

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState<WordDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setWordData(mockWord);
      setIsLoading(false);
    }, 800);
  };

  return (
    <MainLayout>
      <div className="container px-4 py-10 md:py-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-2 bg-dictionary/10 rounded-lg mb-4">
            <Book className="w-6 h-6 text-dictionary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Từ điển</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Tra cứu từ vựng với định nghĩa chi tiết, ví dụ thực tế và gợi ý sử dụng trong nhiều ngữ cảnh khác nhau.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <SearchInput
            placeholder="Nhập từ hoặc cụm từ cần tra cứu..."
            suggestions={dictionarySuggestions}
            onSearch={handleSearch}
            iconColor="text-dictionary"
          />
        </motion.div>

        {isLoading && (
          <div className="flex justify-center mt-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-dictionary"></div>
          </div>
        )}

        {wordData && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{wordData.word}</h2>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <span>{wordData.phonetic}</span>
                      <button className="p-1 hover:text-dictionary transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button className="p-2 hover:text-dictionary transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 space-y-6">
                  {wordData.meanings.map((meaning, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium px-2.5 py-0.5 rounded-md bg-muted">
                          {meaning.partOfSpeech}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {meaning.definitions.map((def, idx) => (
                          <div key={idx} className="pl-4 border-l-2 border-border">
                            <p className="text-sm md:text-base">{def.definition}</p>
                            {def.example && (
                              <p className="text-sm text-muted-foreground mt-1 italic">
                                "{def.example}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {wordData.examples.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500" />
                      Ví dụ
                    </h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      {wordData.examples.map((example, index) => (
                        <p key={index} className="text-sm">
                          • {example}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {!isLoading && !wordData && searchTerm && (
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Không tìm thấy từ "{searchTerm}". Vui lòng kiểm tra lại từ khóa hoặc thử một từ khác.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dictionary;
