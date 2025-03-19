
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, ChevronDown, Check, Play } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

interface ExerciseType {
  id: string;
  name: string;
  description: string;
}

interface Topic {
  id: string;
  name: string;
}

const exerciseTypes: ExerciseType[] = [
  { id: 'word', name: 'Most Suitable Word', description: 'Chọn từ thích hợp nhất' },
  { id: 'verb', name: 'Verb Conjugation', description: 'Chia động từ' },
  { id: 'conditional', name: 'Conditional Sentences', description: 'Câu điều kiện' },
  { id: 'indirect', name: 'Indirect Speech', description: 'Câu gián tiếp' },
  { id: 'preposition', name: 'Prepositions', description: 'Giới từ' },
];

const topicSuggestions: Topic[] = [
  { id: 'emotions', name: 'Basic emotions' },
  { id: 'school', name: 'School subjects' },
  { id: 'routine', name: 'My daily routine' },
  { id: 'clothes', name: 'Clothes I wear' },
  { id: 'colors', name: 'Colors around me' },
];

const Exercises = () => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const toggleExerciseType = (id: string) => {
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter(type => type !== id));
    } else {
      setSelectedTypes([...selectedTypes, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to generate exercises
    console.log({
      topic,
      questionCount,
      selectedTypes,
    });
  };

  const handleTopicClick = (topicName: string) => {
    setTopic(topicName);
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
          <div className="inline-flex items-center justify-center p-2 bg-exercises/10 rounded-lg mb-4">
            <GraduationCap className="w-6 h-6 text-exercises" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Bài tập</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Thiết lập bài tập phù hợp với nhu cầu học tập của bạn với các chủ đề và dạng bài tập đa dạng.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Topic Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Chủ đề bài tập
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập chủ đề bài tập..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Topic Suggestions */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-exercises" />
                      <span className="font-medium">Chủ đề gợi ý</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topicSuggestions.map((topicItem) => (
                        <button
                          key={topicItem.id}
                          type="button"
                          onClick={() => handleTopicClick(topicItem.name)}
                          className="px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80 transition-colors"
                        >
                          {topicItem.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Count */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Số lượng câu hỏi
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Exercise Types */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Chọn một hoặc nhiều dạng câu hỏi
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                        className="flex justify-between items-center w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-left"
                      >
                        <span>
                          {selectedTypes.length
                            ? `${selectedTypes.length} dạng bài tập đã chọn`
                            : "Chọn dạng bài tập"}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {showTypeDropdown && (
                        <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
                          <div className="py-1 max-h-60 overflow-auto">
                            {exerciseTypes.map((type) => (
                              <div
                                key={type.id}
                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center justify-between"
                                onClick={() => toggleExerciseType(type.id)}
                              >
                                <div>
                                  <p className="font-medium">{type.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {type.description}
                                  </p>
                                </div>
                                {selectedTypes.includes(type.id) && (
                                  <Check className="w-4 h-4 text-exercises" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Create Button */}
                  <button
                    type="submit"
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all",
                      "bg-gradient-to-r from-exercises/90 to-exercises hover:from-exercises hover:to-exercises/90"
                    )}
                  >
                    <Play className="w-4 h-4" />
                    <span>Tạo bài tập</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Exercises;
