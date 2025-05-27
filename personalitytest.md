personality-test/
├── index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Personality Test</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      padding: 20px;
      max-width: 700px;
      margin: auto;
    }
    h1 {
      text-align: center;
    }
    .question {
      margin-bottom: 20px;
    }
    .result {
      margin-top: 30px;
      padding: 15px;
      background-color: #d3f8e2;
      border: 1px solid #b2dfdb;
      display: none;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
    }
  </style>
</head>
<body>

  <h1>Discover Your Personality Type</h1>
  
  <form id="personality-form">
    <div class="question">
      <p>1. How do you prefer to spend your weekend?</p>
      <label><input type="radio" name="q1" value="introvert"> Reading a book at home</label><br>
      <label><input type="radio" name="q1" value="extrovert"> Going out with friends</label>
    </div>

    <div class="question">
      <p>2. What best describes you at work or school?</p>
      <label><input type="radio" name="q2" value="introvert"> Quiet and focused</label><br>
      <label><input type="radio" name="q2" value="extrovert"> Talkative and energetic</label>
    </div>

    <div class="question">
      <p>3. How do you recharge after a long day?</p>
      <label><input type="radio" name="q3" value="introvert"> Alone time in a peaceful place</label><br>
      <label><input type="radio" name="q3" value="extrovert"> Socializing with others</label>
    </div>

    <button type="button" onclick="calculatePersonality()">Submit</button>
  </form>

  <div class="result" id="result-box"></div>

  <script>
    function calculatePersonality() {
      const answers = document.querySelectorAll('input[type="radio"]:checked');
      let score = { introvert: 0, extrovert: 0 };

      answers.forEach(answer => {
        score[answer.value]++;
      });

      const resultBox = document.getElementById('result-box');
      if (answers.length < 3) {
        resultBox.style.display = 'block';
        resultBox.textContent = 'Please answer all questions.';
        return;
      }

      let result = '';
      if (score.introvert > score.extrovert) {
        result = 'You are more of an Introvert: You enjoy calm environments and meaningful one-on-one conversations.';
      } else if (score.extrovert > score.introvert) {
        result = 'You are more of an Extrovert: You thrive in social settings and love engaging with people.';
      } else {
        result = 'You have a balanced personality: You enjoy both quiet time and social interaction.';
      }

      resultBox.style.display = 'block';
      resultBox.textContent = result;
    }
  </script>

</body>
</html>

