const mcqs = [
  {
    category: "Inattention / Distractibility",
    questions: [
      "A short attention span, especially for low-interest activities.",
      "Difficulty completing tasks.",
      "Daydreaming.",
      "Easily distracted.",
      "Nicknames such as: 'spacey' or 'dreamer'.",
      "Engages in much activity but accomplishes little.",
      "Enthusiastic beginnings but poor endings."
    ]
  },
  {
    category: "Impulsivity",
    questions: [
      "Excitability.",
      "Low frustration tolerance.",
      "Acts before thinking.",
      "Disorganization.",
      "Poor planning ability.",
      "Excessively shifts from one activity to another.",
      "Difficulty in group situations which require patience and taking turns.",
      "Interrupts frequently."
    ]
  },
  {
    category: "Activity Level Problems",
    questions: [
      "Restlessness - either fidgeting or being constantly on the go.",
      "Diminished need for sleep.",
      "Excessive talking.",
      "Difficulty listening.",
      "Restlessness during sleep (kicks covers off, moves constantly).",
      "Dislike of situations which require attention and being still."
    ]
  },
  {
    category: "Noncompliance",
    questions: [
      "Does not cooperate; determined to do things own way.",
      "Argumentative.",
      "Disregards socially-accepted behavioral expectations.",
      "'Forgets' unintentionally.",
      "'Forgets' intentionally as an excuse."
    ]
  },
  {
    category: "Underachievement / Disorganization / Learning Problems",
    questions: [
      "Underachievement in relation to ability.",
      "Frequent job changes.",
      "Loses things like keys, wallet, lists, belongings, etc.",
      "Auditory memory and auditory processing problems.",
      "Learning disabilities or learning problems.",
      "Poor handwriting.",
      "'Messy' or 'sloppy' work.",
      "Work assignments are often not completed satisfactorily.",
      "Rushes through work.",
      "Works too slowly.",
      "Procrastinates; bills, taxes, etc., put off until the last minute."
    ]
  }
];

const form = document.getElementById('mcq-form');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

function renderMCQs() {
  mcqs.forEach((section, sectionIndex) => {
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = `${section.category}`;
    form.appendChild(sectionTitle);
    
    section.questions.forEach((question, questionIndex) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      
      const questionTitle = document.createElement('p');
      questionTitle.textContent = `${questionIndex + 1}. ${question}`;
      questionDiv.appendChild(questionTitle);
      
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('options');
      
      ['Not at all', 'Just a little', 'Pretty much', 'Very much'].forEach((option, optionIndex) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `section${sectionIndex}-question${questionIndex}`;
        input.value = optionIndex;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
      });
      
      questionDiv.appendChild(optionsDiv);
      form.appendChild(questionDiv);
    });
  });
}

function calculateScore() {
  const results = mcqs.map((section, sectionIndex) => {
    let sectionScore = 0;
    section.questions.forEach((_, questionIndex) => {
      const selected = document.querySelector(`input[name="section${sectionIndex}-question${questionIndex}"]:checked`);
      if (selected) {
        sectionScore += parseInt(selected.value);
      }
    });
    const possibleScore = section.questions.length * 3;
    const percentage = Math.round((sectionScore / possibleScore) * 100);
    return {
      category: section.category,
      score: sectionScore,
      possibleScore,
      percentage
    };
  });
  return results;
}

function handleSubmit() {
  const scores = calculateScore();
  resultDiv.innerHTML = `<h2>Results</h2>`;
  scores.forEach(score => {
    resultDiv.innerHTML += `
      <h3>${score.category}</h3>
      <p>Score: ${score.score} / ${score.possibleScore}</p>
      <p>Percentage: ${score.percentage}%</p>
      <p>Interpretation: ${
        score.percentage < 50 
          ? "Mild to Moderate Difficulties" 
          : score.percentage < 70 
            ? "Moderate to Severe Difficulties" 
            : "Major Interference"
      }</p>
    `;
  });
}

renderMCQs();

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  handleSubmit();
});
