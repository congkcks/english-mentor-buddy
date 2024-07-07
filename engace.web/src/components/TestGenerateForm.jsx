import { Grid, Button } from "@mui/material";
import { memo, useState } from "react";
import SuggestTopicInput from "./SuggestTopicInput";
import QuestionsQuantity from "./QuestionsQuantity";
import QuestionsTypeForm from "./QuestionsTypeForm";
import { useDispatch } from "react-redux";
import * as SagaActionTypes from "../redux/constants";

const MemoizedSuggestTopicInput = memo(SuggestTopicInput);
const MemoizedQuestionsQuantity = memo(QuestionsQuantity);
const MemoizedQuestionsTypeForm = memo(QuestionsTypeForm);

export default function TestGenerateForm() {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [types, setTypes] = useState({});
  const level = localStorage.getItem("level");
  const [errorTopic, setErrorTopic] = useState("");
  const [errorQuantity, setErrorQuantity] = useState("");
  const [errorTypes, setErrorTypes] = useState("");

  const generateQuiz = () => {
    const qTypes = Object.keys(types)
      .filter((key) => types[key])
      .map(Number);

    dispatch({
      type: SagaActionTypes.GENERATE_QUIZ,
      topic: topic,
      qTypes: qTypes,
      level: level,
      quantity: quantity,
      onLoading: () => {},
      onFinish: () => {},
    });
  };

  const handleGenerateQuiz = () => {
    let hasError = false;

    if (topic === "") {
      setErrorTopic("Vui lòng nhập chủ đề");
      hasError = true;
    } else {
      setErrorTopic("");
    }

    if (quantity < 5 || quantity > 40) {
      setErrorQuantity("Số lượng câu hỏi phải từ 5 ... 40");
      hasError = true;
    } else {
      setErrorQuantity("");
    }

    if (
      Object.keys(types).length === 0 ||
      Object.values(types).every((val) => !val)
    ) {
      setErrorTypes("Vui lòng chọn ít nhất một loại câu hỏi");
      hasError = true;
    } else {
      setErrorTypes("");
    }

    if (!hasError) {
      generateQuiz();
    }
  };

  return (
    <Grid container spacing={2} sx={{ overflow: "auto" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <MemoizedSuggestTopicInput
          topic={topic}
          setTopic={setTopic}
          error={errorTopic}
        />
        <MemoizedQuestionsQuantity
          quantity={quantity}
          setQuantity={setQuantity}
          error={errorQuantity}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <MemoizedQuestionsTypeForm
          types={types}
          setTypes={setTypes}
          error={errorTypes}
        />
      </Grid>
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Button variant="contained" onClick={handleGenerateQuiz}>
          Tạo câu hỏi
        </Button>
      </Grid>
    </Grid>
  );
}
