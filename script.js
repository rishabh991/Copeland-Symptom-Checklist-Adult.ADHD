// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const { jsPDF } = window.jspdf;

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
      const maxScore = section.questions.length * 3;
      const percentage = ((score / maxScore) * 100).toFixed(2);
      let interpretation = '';

      if (percentage >= 35 && percentage < 50) {
        interpretation = 'Mild to Moderate Difficulties';
      } else if (percentage >= 50 && percentage < 70) {
        interpretation = 'Moderate to Severe Difficulties';
      } else if (percentage >= 70) {
        interpretation = 'Major Interference';
      } else {
        interpretation = 'Minimal Difficulties';
      }

      return {
        category: section.category,
        score: score,
        maxScore: maxScore,
        percentage: percentage,
        interpretation: interpretation
      };
    });

    // Calculate overall score
    const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
    const totalMaxScore = mcqs.reduce((acc, curr) => acc + (curr.questions.length * 3), 0);
    const overallPercentage = ((totalScore / totalMaxScore) * 100).toFixed(2);
    let overallInterpretation = '';

    if (overallPercentage >= 35 && overallPercentage < 50) {
      overallInterpretation = 'Mild to Moderate Difficulties';
    } else if (overallPercentage >= 50 && overallPercentage < 70) {
      overallInterpretation = 'Moderate to Severe Difficulties';
    } else if (overallPercentage >= 70) {
      overallInterpretation = 'Major Interference';
    } else {
      overallInterpretation = 'Minimal Difficulties';
    }

    return { results, overall: { score: totalScore, maxScore: totalMaxScore, percentage: overallPercentage, interpretation: overallInterpretation } };
  }

  function validateForm() {
    let allAnswered = true;
    mcqs.forEach((section, sectionIndex) => {
      section.questions.forEach((_, questionIndex) => {
        const selected = document.querySelector(`input[name="section${sectionIndex}-question${questionIndex}"]:checked`);
        if (!selected) {
          allAnswered = false;
        }
      });
    });
    return allAnswered;
  }

  function displayResults(name, date, scores) {
    const { results, overall } = scores;
    resultDiv.innerHTML = ''; // Clear previous results

    const namePara = document.createElement('p');
    namePara.innerHTML = `<strong>Name:</strong> ${name}`;
    resultDiv.appendChild(namePara);

    const datePara = document.createElement('p');
    datePara.innerHTML = `<strong>Date Completed:</strong> ${date}`;
    resultDiv.appendChild(datePara);

    // Per-category results table
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    ['Category', 'Score', 'Max Score', 'Percentage', 'Interpretation'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    results.forEach(result => {
      const row = document.createElement('tr');

      [result.category, result.score, result.maxScore, `${result.percentage}%`, result.interpretation].forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        row.appendChild(td);
      });

      table.appendChild(row);
    });

    resultDiv.appendChild(table);

    // Overall result
    const overallDiv = document.createElement('div');
    overallDiv.classList.add('overall-result');

    const overallTitle = document.createElement('h3');
    overallTitle.textContent = 'Overall Assessment';
    overallDiv.appendChild(overallTitle);

    const overallDetails = document.createElement('p');
    overallDetails.innerHTML = `<strong>Overall Score:</strong> ${overall.score} / ${overall.maxScore}<br>
                                <strong>Overall Percentage:</strong> ${overall.percentage}%<br>
                                <strong>Interpretation:</strong> ${overall.interpretation}`;
    overallDiv.appendChild(overallDetails);

    resultDiv.appendChild(overallDiv);

    // Add PDF download button
    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'download-pdf';
    downloadBtn.textContent = 'Download PDF';
    resultDiv.appendChild(downloadBtn);

    downloadBtn.addEventListener('click', () => {
      generatePDF(name, date, results, overall);
    });
  }

  function generatePDF(name, date, results, overall) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Copeland Symptom Checklist', 105, 20, null, null, 'center');
    doc.setFontSize(14);
    doc.text('Adult ADHD Assessment', 105, 30, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 45);
    doc.text(`Date Completed: ${date}`, 20, 52);

    // Per-category table
    const categoryHeaders = [['Category', 'Score', 'Max Score', 'Percentage', 'Interpretation']];
    const categoryData = results.map(r => [r.category, r.score.toString(), r.maxScore.toString(), `${r.percentage}%`, r.interpretation]);

    doc.autoTable({
      head: categoryHeaders,
      body: categoryData,
      startY: 60,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [242, 242, 242] },
      theme: 'grid'
    });

    // Overall result
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Overall Assessment', 20, finalY);
    doc.setFontSize(12);
    doc.text(`Overall Score: ${overall.score} / ${overall.maxScore}`, 20, finalY + 10);
    doc.text(`Overall Percentage: ${overall.percentage}%`, 20, finalY + 17);
    doc.text(`Interpretation: ${overall.interpretation}`, 20, finalY + 24);

    doc.save('Copeland_Symptom_Checklist_Results.pdf');
  }

  renderMCQs();

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;

    if (name === '' || date === '') {
      alert('Please provide your name and the date completed.');
      return;
    }

    const scores = calculateScore();
    displayResults(name, date, scores);
  });
});
