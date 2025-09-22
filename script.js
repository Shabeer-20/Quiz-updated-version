const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Management Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["link", "a", "href", "hyper"],
    answer: "a"
  },
  {
    question: "Which HTML attribute specifies an image source?",
    options: ["href", "src", "alt", "path"],
    answer: "src"
  },
  {
    question: "Which property changes text color in CSS?",
    options: ["background-color", "font-color", "text-color", "color"],
    answer: "color"
  },
  {
    question: "Which symbol is used for comments in CSS?",
    options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
    answer: "/* comment */"
  }
];

const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const quizForm = document.getElementById("quizForm");

function renderQuiz() {
  quizData.forEach((q, index) => {
    const block = document.createElement("div");
    block.className = "question-block";
    block.id = `question-${index}`;

    const title = document.createElement("div");
    title.className = "question-title";
    title.textContent = `Q${index + 1}: ${q.question}`;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    q.options.forEach(opt => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = opt;
      input.onchange = () => {
        block.classList.add("answered");
      };
      label.appendChild(input);
      label.append(opt);
      optionsDiv.appendChild(label);
    });

    block.appendChild(title);
    block.appendChild(optionsDiv);
    quizContainer.appendChild(block);
  });
}

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let score = 0;
  let allAnswered = true;
  resultContainer.innerHTML = "<h3>Quiz Results</h3>";

  for (let index = 0; index < quizData.length; index++) {
    const q = quizData[index];
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const review = document.createElement("div");

    if (!selected) {
      allAnswered = false;

      review.className = "wrong";
      review.innerHTML = `<strong>Q${index + 1}:</strong> ❌ Not answered<br>✅ Correct answer: <b>${q.answer}</b>`;
      resultContainer.appendChild(review);
      continue;
    }

    if (selected.value === q.answer) {
      score++;
      review.className = "correct";
      review.innerHTML = `<strong>Q${index + 1}:</strong> ✅ Correct! Your answer: <b>${selected.value}</b>`;
    } else {
      review.className = "wrong";
      review.innerHTML = `<strong>Q${index + 1}:</strong> ❌ Your answer: <b>${selected.value}</b><br>✅ Correct answer: <b>${q.answer}</b>`;
    }

    resultContainer.appendChild(review);
  }

  if (!allAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }

  resultContainer.innerHTML = `<h3>🎯 You scored ${score} out of ${quizData.length}</h3>` + resultContainer.innerHTML;
});

renderQuiz();