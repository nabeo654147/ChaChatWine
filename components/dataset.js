const defaultDataset = {
  "init": {
    answers: [
      { content: "種類から選ぶ", nextId: "wineType" },
      { content: "気分で選ぶ", nextId: "feeling" },
      { content: "料理から選ぶ", nextId: "foodMenu" },
      { content: "ソムリエさんについて知りたい", nextId: "character" },
      ],
    question: "やあ！ こんにちは！　今日はどんな風にワインを選びたいんだい？🍷",
  },
  //ワインの種類で選ぶ
  "wineType": {
    answers: [
      { content: "赤ワイン", nextId: "redWine" },
      { content: "白ワイン", nextId: "whiteWine" },
      { content: "スパークリングワイン", nextId: "sparklingWine" },
      { content: "ロゼワイン", nextId: "roseWine" }
      ],
    question: "どんな種類が好みかな？",
  },
  "redWine": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "赤ワインだね！まかせな！　タイプはどうしたい？",
  },
  "whiteWine": {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "白ワインだね！　僕も好きだよ！　君はどんなタイプが良い？",
  },
  "sparklingWine": {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "最高だね！どれだけでも飲みたいね！",
  },
  "roseWine": {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "おしゃれさんだね！ ロゼワインは見ているだけでウキウキしちゃうよ！",
  },
  //気分で選ぶ
  "feeling": {
    answers: [
      { content: "楽しく飲みたい気分", nextId: "happy" },
      { content: "しっかり飲みたい！", nextId: "tightly" },
      { content: "リラックスしたい気分", nextId: "relax" },
      { content: "疲れている", nextId: "tired" }
    ],
    question: "よーし、一緒に今日の気分にぴったりのワインを選ぼう！",
  },
  "happy": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "tightly": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "relax": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "tired": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  //料理と選ぶ
  "foodMenu": {
    answers: [
      { content: "和食", nextId: "japanese" },
      { content: "西洋料理", nextId: "western" },
      { content: "中華", nextId: "chinese" },
      { content: "エスニック", nextId: "ethnic"}
    ],
    question: "今日のご飯に合うワインを選ぼう！",
  },
  "japanese": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" }
    ],
    question: "意外と和食に合うワインもいろいろあるんだよ！",
  },
  "western": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "chinese": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "ethnic": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  //ソムリエについて
  "character": {
    answers: [
      { content: "DMする", nextId: "https://twitter.com/nabeo654147" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "ワタシのことを知りたいのかい？ 君は不思議な人だね！",
  },
  "": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  },
  "": {
    answers: [
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      { content: "", nextId: "" },
      ],
    question: "",
  }
}

export default defaultDataset
