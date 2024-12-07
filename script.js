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
    category: "Activity Level Problems - Overactivity / Hyperactivity",
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
    category: "Activity Level Problems - Underactivity",
    questions: [
      "Lethargic.",
      "Daydreaming, spiciness.",
      "Failure to complete tasks.",
      "Inattention.",
      "Lacking in leadership.",
      "Difficulty in getting things done."
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
  },
  {
    category: "Emotional Difficulties",
    questions: [
      "Frequent and unpredictable mood swings.",
      "Irritability.",
      "Underreactive to pain / insensitive to danger.",
      "Easily overstimulated; hard to stop once 'revved' up.",
      "Low frustration tolerance; excessive emotional reaction.",
      "Angry outbursts.",
      "Moodiness / lack of energy.",
      "Low self-esteem.",
      "Immaturity."
    ]
  },
  {
    category: "Poor Peer Relations",
    questions: [
      "Difficulty following the rules of social interactions.",
      "Rejected or avoided by peers.",
      "Avoids group activity; a loner.",
      "'Bosses' other people; wants to be a leader.",
      "Critical of others."
    ]
  },
  {
    category: "Impaired Family Relations",
    questions: [
      "Easily frustrated with spouse or children; overreacts.",
      "Sees things from own point of view; does not negotiate differences well.",
      "Underdeveloped sense of responsibility.",
      "Poor manager of money.",
      "Unreasonable; demanding.",
      "Spends excessive amount of time at work because of inefficiency, leaving little time for family."
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
    let score = 0;
    section.questions.forEach((_, questionIndex) => {
      const selected = document.querySelector(`input[name="section${sectionIndex}-question${questionIndex}"]:checked`);
      score += parseInt(selected?.value || 0);
    });
    return score;
  });
}

renderMCQs();

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  calculateScore();
});
