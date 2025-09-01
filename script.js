const quizData = [
      {question: "What does HTML stand for?",
       options: ["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyperlinks Text Management Language"],
       answer: "Hyper Text Markup Language"},
      {question: "Which HTML tag is used to create a hyperlink?",
       options: ["<link>", "<a>", "<href>", "<hyper>"],
       answer: "<a>"},
      {question: "Which HTML attribute specifies an image source?",
       options: ["href", "src", "alt", "path"],
       answer: "src"},
      {question: "Which property changes text color in CSS?",
       options: ["background-color","font-color","text-color","color"],
       answer: "color"},
      {question: "Which symbol is used for comments in CSS?",
       options: ["// comment","/* comment */","# comment","<!-- comment -->"],
       answer: "/* comment */"},
      {question: "Inside which HTML element do we put JavaScript?",
       options: ["<js>","<script>","<javascript>","<scripting>"],
       answer: "<script>"},
      {question: "Which company developed JavaScript?",
       options: ["Google","Microsoft","Netscape","Apple"],
       answer: "Netscape"},
      {question: "Which method is used to write content into the HTML page using JS?",
       options: ["document.write()","console.log()","alert()","innerHTML()"],
       answer: "document.write()"},
      {question: "Which CSS property is used to change the background color?",
       options: ["bgcolor","background-color","color-background","bg-color"],
       answer: "background-color"},
      {question: "Which JavaScript keyword is used to declare a variable?",
       options: ["var","let","const","All of these"],
       answer: "All of these"}
    ];

    let currentQuestion = 0;
    let selectedAnswers = {};

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const resultEl = document.getElementById("result");
    const progressEl = document.getElementById("progress");

    function loadQuestion() {
      const q = quizData[currentQuestion];
      questionEl.textContent = q.question;
      progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
      optionsEl.innerHTML = "";
      q.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = option;
        if (selectedAnswers[currentQuestion] === option) {
          input.checked = true;
        }
        label.appendChild(input);
        label.append(option);
        optionsEl.appendChild(label);
      });
    }

    function nextQuestion() {
      const selected = document.querySelector('input[name="option"]:checked');
      if (selected) {
        selectedAnswers[currentQuestion] = selected.value;
      }
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
      } else {
        calculateScore();
      }
    }

    function prevQuestion() {
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
      }
    }

    function calculateScore() {
      let score = 0;
      resultEl.innerHTML = `<h3>🎉 You finished the quiz!</h3>`;
      quizData.forEach((q, index) => {
        const userAnswer = selectedAnswers[index];
        const div = document.createElement("div");
        div.classList.add("answer-review");

        if (userAnswer === q.answer) {
          score++;
          div.classList.add("correct");
          div.innerHTML = `
            <p><b>Q${index + 1}:</b> ${q.question}</p>
            ✅ Correct! Your Answer: <b>${userAnswer}</b>
          `;
        } else {
          div.classList.add("wrong");
          div.innerHTML = `
            <p><b>Q${index + 1}:</b> ${q.question}</p>
            ❌ Your Answer: <b>${userAnswer || "Not Attempted"}</b><br>
            ✅ Correct Answer: <span class="correct-answer">${q.answer}</span>
          `;
        }
        resultEl.appendChild(div);
      });
      resultEl.innerHTML = `<h3>🎯 You scored ${score} out of ${quizData.length}</h3>` + resultEl.innerHTML;

      document.getElementById("quiz").style.display = "none";
      document.querySelector(".btn-container").style.display = "none";
      resultEl.style.display = "block";
    }

    loadQuestion();