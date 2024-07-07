import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants";
import { quizActions } from "../reducer/QuizReducer";
import { AppService } from "../../services/api";

function* actGetTopics(action) {
  const { level, onLoading, onFinish } = action;
  try {
    onLoading();
    const res = yield call(() => AppService.getSuggestTopics(level));
    const { status, data } = res;
    console.log(res);
    if (status === 200 || status === 201) {
      yield put(quizActions.getTopicsSuccess({ topics: data }));
    } else {
      console.log(data.error);
    }
  } catch (err) {
    console.log(err);
  } finally {
    onFinish();
  }
}

function* actGetQuizTypes(action) {
  const { onLoading, onFinish } = action;
  try {
    onLoading();
    const res = yield call(() => AppService.getQuizTypes());
    const { status, data } = res;
    console.log(res);
    if (status === 200) {
      yield put(quizActions.getQuizTypesSuccess({ qTypes: data }));
    } else {
      console.log(data.error);
    }
  } catch (err) {
    console.log(err);
  } finally {
    onFinish();
  }
}

function* actGenerateQuiz(action) {
  const { topic, qTypes, level, quantity, onLoading, onFinish } = action;
  try {
    onLoading();
    const res = yield call(() =>
      AppService.generateQuiz(topic, qTypes, level, quantity)
    );
    const { status, data } = res;
    console.log(res);
    if (status === 200 || status === 201) {
      yield put(quizActions.createQuizzesSuccess({ qaList: data }));
    } else {
      console.log(data.error);
    }
  } catch (err) {
    console.log(err);
  } finally {
    onFinish();
  }
}

export function* followActGetTopics() {
  yield takeLatest(SagaActionTypes.GET_SUGGEST_TOPICS, actGetTopics);
}

export function* followActGetQuizTypes() {
  yield takeLatest(SagaActionTypes.GET_QUIZ_TYPES, actGetQuizTypes);
}

export function* followActGenerateQuiz() {
  yield takeLatest(SagaActionTypes.GENERATE_QUIZ, actGenerateQuiz);
}
