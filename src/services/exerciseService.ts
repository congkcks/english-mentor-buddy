import { apiService } from './api';

export interface ExerciseGenerationParams {
  Topic: string;
  AssignmentTypes: number[];
  EnglishLevel: number;
  TotalQuestions: number;
}

export enum AssignmentType {
  MostSuitableWord = 1,
  VerbConjugation = 2,
  ConditionalSentences = 3,
  IndirectSpeech = 4
}

export interface Question {
  Question: string;
  Options: string[];
  RightOptionIndex: number;
  ExplanationInVietnamese: string;
}

export interface ExerciseSet {
  Topic: string;
  Questions: Question[];
  TimeLimit?: number;
}

export interface SubmissionResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  feedback: string;
}

export const exerciseService = {
  // Generate exercise
  generateExercise: async (params: ExerciseGenerationParams): Promise<ExerciseSet> => {
    try {
      // Format request to match the required structure
      const requestBody = {
        Topic: params.Topic,
        AssignmentTypes: params.AssignmentTypes,
        EnglishLevel: params.EnglishLevel,
        TotalQuestions: params.TotalQuestions
      };

      console.log('REQUEST - generateExercise:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${apiService.getBaseUrl()}/api/Assignment/Generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...apiService.getHeaders()
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        console.error('API Error - Status:', response.status);
        console.error('API Error - Status Text:', response.statusText);
        const errorText = await response.text();
        console.error('API Error - Response:', errorText);
        throw new Error('Failed to generate exercise');
      }

      const jsonData = await response.json();
      console.log('RESPONSE - Raw JSON:', jsonData);

      // Xử lý dữ liệu trả về để đảm bảo định dạng đúng
      let formattedData: ExerciseSet;

      // Kiểm tra nếu dữ liệu trả về là một mảng các câu hỏi
      if (Array.isArray(jsonData)) {
        formattedData = {
          Topic: params.Topic,
          Questions: jsonData.map(q => ({
            Question: q.Question,
            Options: q.Options,
            RightOptionIndex: q.RightOptionIndex,
            ExplanationInVietnamese: q.ExplanationInVietnamese
          }))
        };
      }
      // Kiểm tra nếu dữ liệu trả về có cấu trúc Questions
      else if (jsonData.Questions && Array.isArray(jsonData.Questions)) {
        formattedData = jsonData;
      }
      // Trường hợp dữ liệu trả về là một câu hỏi đơn lẻ
      else {
        formattedData = {
          Topic: params.Topic,
          Questions: [jsonData]
        };
      }

      console.log('RESPONSE - Formatted:', JSON.stringify(formattedData, null, 2));
      return formattedData;
    } catch (error) {
      console.error('Error generating exercise:', error);
      throw error;
    }
  },

  // Submit answers and get results
  submitAnswers: async (exerciseSet: ExerciseSet, answers: Record<number, string>): Promise<SubmissionResult> => {
    try {
      // Format the submission data
      console.log('SUBMISSION DATA:');
      console.log('Exercise Set:', JSON.stringify(exerciseSet, null, 2));
      console.log('User Answers:', JSON.stringify(answers, null, 2));

      // Tính toán kết quả dựa trên câu trả lời và đáp án đúng
      let correctAnswers = 0;

      Object.entries(answers).forEach(([questionIndex, answer]) => {
        const index = parseInt(questionIndex) - 1;
        if (index >= 0 && index < exerciseSet.Questions.length) {
          const question = exerciseSet.Questions[index];
          const correctAnswer = question.Options[question.RightOptionIndex];
          const isCorrect = correctAnswer === answer;

          console.log(`Question ${questionIndex}:`, {
            question: question.Question,
            userAnswer: answer,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect
          });

          if (isCorrect) {
            correctAnswers++;
          }
        }
      });

      const totalQuestions = exerciseSet.Questions.length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);

      // Tạo phản hồi dựa trên kết quả
      let feedback = '';
      if (score >= 90) {
        feedback = 'Xuất sắc! Bạn đã nắm vững kiến thức.';
      } else if (score >= 70) {
        feedback = 'Tốt! Bạn đã hiểu phần lớn nội dung.';
      } else if (score >= 50) {
        feedback = 'Khá! Bạn cần ôn tập thêm một số phần.';
      } else {
        feedback = 'Bạn cần ôn tập lại kiến thức cơ bản.';
      }

      const result = {
        score,
        totalQuestions,
        correctAnswers,
        feedback
      };

      console.log('RESULT - submitAnswers:', JSON.stringify(result, null, 2));

      // Expected result format for reference
      console.log('EXPECTED RESULT FORMAT:');
      console.log(JSON.stringify({
        "score": 80,
        "totalQuestions": 10,
        "correctAnswers": 8,
        "feedback": "Tốt! Bạn đã hiểu phần lớn nội dung."
      }, null, 2));

      return result;
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  }
};
