function startQuiz() {
  const nar = [
    "As you stroll down Sundae Street, the sweet scent of waffle cones and creamy delights draws you into the coziest ice cream parlor in town. Inside, you see a rainbow of flavors and toppings on display, calling out to your senses.",
    "Leaving the parlor, the city buzzes with energy. The sun shines brightly as people laugh, chat, and enjoy their ice cream cones on the sidewalk. The world feels full of possibilities.",
    "Back home after a delightful day, you curl up on the couch, reflecting on the flavors you sampled and the memories made.",
    "As the evening settles in, you savor the lingering sweetness, wondering which flavor best captures the essence of *you*."
  ];

  const ep = [
    [
      "You gaze at the freezer, torn between classic vanilla or adventurous bubblegum.",
      "Cone in hand, you're offered a chance to add extra toppings: sprinkles, fudge, or maybe even a cherry on top?",
      "On your way home, you pass a sign for an upcoming ice cream making workshop."
    ],
    [
      "You spot a street artist crafting colorful chalk murals of ice cream cones and sundaes.",
      "As you wander through the park, you stumble upon a pop-up stand offering samples of rare and exotic ice cream flavors.",
      "A nearby café has a limited-edition ice cream latte that catches your eye."
    ],
    [
      "Looking at your kitchen, you see your own stash of ice cream flavors and toppings, inspiring you to make a new creation.",
      "You hear a soft jingle from the neighborhood ice cream truck and feel a wave of nostalgia.",
      "Your mind drifts to a memory of a summer festival where you first tasted your favorite flavor."
    ],
    [
      "Flipping through a recipe book, you consider making your own homemade ice cream this weekend.",
      "You notice an unopened pint in your freezer and debate whether to save it for later or indulge now.",
      "As the night winds down, you wonder if there's an undiscovered flavor waiting for you tomorrow."
    ]
  ];

  const options = [
    [
      ["Ask the employee for a sample recommendation", "Go with your gut and pick the one that catches your eye"],
      ["Pile on the toppings and embrace the fun", "Keep it simple and enjoy the pure flavor"],
      ["Sign up for the workshop", "Snap a photo of the flyer and think about it later"]
    ],
    [
      ["Pause to admire the artist’s work and take a photo", "Smile and continue on your way, enjoying the vibe"],
      ["Dive in and try every sample they have", "Politely thank them and stick with what you know"],
      ["Order the limited-edition ice cream latte", "Stick with your usual go-to treat"]
    ],
    [
      ["Whip up a new sundae creation from your stash", "Reminisce about past ice cream adventures"],
      ["Dance a little to the ice cream truck jingle", "Let the memories wash over you while you relax"],
      ["Sketch a new ice cream idea inspired by your memory", "Dream about a future adventure involving new flavors"]
    ],
    [
      ["Make a detailed plan for your weekend recipe", "Leave it as a fun idea for later"],
      ["Savor the pint now as a reward", "Save it for a special occasion"],
      ["Set an alarm to catch the ice cream truck tomorrow", "Trust that you'll stumble upon new flavors when the time is right"]
    ]
  ];

  let currEp = 0;
  let currQuest = 0;
  let ans = { E: 0, S: 0, T: 0, J: 0, I: 0, N: 0, F: 0, P: 0 };
  let choicesMade = 0; 
  let currOpt = 0;

  const totalEpisodes = ep.flat().length;

  function updateProgressBar(){
    const currProgress = currQuest * ep[0].length + currEp;
    const progPercent = (currProgress/totalEpisodes)*100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progPercent + '%';
  }

  function dispQuest() {
    const quizCont = document.getElementById('quiz');
    quizCont.innerHTML = ''; // Clear the quiz container

    updateProgressBar();

    if(currEp == 0){
      const questDiv = document.createElement('div');
      questDiv.classList.add('question', 'nar-style');
      questDiv.textContent = nar[currQuest];
      quizCont.appendChild(questDiv);
    }
    
    const epDiv = document.createElement('div');
    epDiv.classList.add('episode', 'ep-style');
    epDiv.textContent = ep[currQuest][currEp];
    quizCont.appendChild(epDiv);

    const optionsForCurrentEpisode = options[currQuest][currEp];
    for (let i = 0; i < optionsForCurrentEpisode.length; i++) {
      const optDiv = document.createElement('div');
      optDiv.classList.add('option');

      const optTxt = document.createElement('p');
      optTxt.classList.add('ep-style');

      optDiv.appendChild(optTxt);

      const optA = document.createElement('button');
      optA.textContent = optionsForCurrentEpisode[i];
      optA.addEventListener('click', function () {
        recChoice(true, i);
      });
      optDiv.appendChild(optA);

      quizCont.appendChild(optDiv);
    }
  }

  function recChoice(choice, opt) {
    const questionType = currQuest % 4;
    const optionType = opt;
    const properties = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];
    ans[properties[questionType][optionType]] += choice ? 1 : -1;

    if (opt != currOpt){
      currOpt = opt;
      choicesMade++;
    } else{
      choicesMade++;
    }

    if(choicesMade === 1){
      currEp++;
      choicesMade = 0; 
    }

    if (currEp === ep[currQuest].length) {
      currQuest++;
      currEp = 0;
    }

    if (currQuest < nar.length) {
      dispQuest();
    } else {
      rsltPg();
    }
  }

  function calcRslt() {
    let mbti = '';
    mbti += ans.E > ans.I ? 'E' : 'I';
    mbti += ans.S > ans.N ? 'S' : 'N';
    mbti += ans.T > ans.F ? 'T' : 'F';
    mbti += ans.J > ans.P ? 'J' : 'P';
    return mbti;
  }

  function rsltPg() {
    const mbti = calcRslt();
    window.location.href = `result.html?mbti=${mbti}`;
  }

  dispQuest();
}

startQuiz();
