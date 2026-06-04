const answerOutOfQuestion = document.querySelector('.answer-outOf-question');
const completedScore = document.querySelector('.completed-score');
const uncompletedScore = document.querySelector('.uncompleted-score');
const progressValueGreen = document.querySelector('.progress-value-green');
const userMessage = document.querySelector('.user-message');
const retryButton = document.querySelector('#return-retry');

retryButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});
// js for no of question attend out of 25
if (parseInt(localStorage.userResult) >= 9) {
  answerOutOfQuestion.textContent = `${parseInt(localStorage.userResult)}/25`;
} else {
  answerOutOfQuestion.textContent = `0${parseInt(localStorage.userResult)}/25`;
}

// js for completed result
completedScore.textContent = `${(100 / 25) * parseInt(localStorage.userResult)}%`;

//  js for uncompleted result

uncompletedScore.textContent = `${100 - (100 / 25) * parseInt(localStorage.userResult)}%`;

// circular progress
const radius = progressValueGreen.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressValueGreen.style.strokeDasharray = `${circumference}`;
progressValueGreen.style.strokeDashoffset = `${circumference}`;

const userScore = parseInt(localStorage.userResult) || 0;
const percentage = (100 / 25) * userScore;

// Animation circular Progress

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progressValueGreen.style.strokeDashoffset = offset;
}

function animationProgress(finalPercent) {
  let start = null;
  const duration = 1000;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(
      (progress / duration) * finalPercent,
      finalPercent
    );
    setProgress(percent);
    if (percent < finalPercent) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}
animationProgress(percentage);

if (parseInt(localStorage.userResult) <= 5) {
  userMessage.textContent = 'Not bad! Stay focused and aim higher.';
} else if (parseInt(localStorage.userResult) <= 10) {
  userMessage.textContent = "Great work! You're making serious progress.";
} else if (parseInt(localStorage.userResult) <= 15) {
  userMessage.textContent = "You're crushing it! Keep up the amazing work.";
} else if (parseInt(localStorage.userResult) <= 20) {
  userMessage.textContent = 'Keep learning, you have a great score!';
} else if (parseInt(localStorage.userResult) <= 25) {
  userMessage.textContent = "Congratulations! You're a true quiz master!🎉";
}
const score = parseInt(localStorage.userResult); // Replace with actual score variable
const resultURL = 'https://yourquizsite.com/result';
const shareMessage = `I scored ${score}% on this quiz! Try it now.`;

// LinkedIn
document.getElementById('linkedinShare').href =
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareMessage + 'Try it here: ' + resultURL)}`;

// Twitter (FIXED)
document.getElementById('twitterShare').href =
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage + ' Try it here: ' + resultURL)}`;

// Telegram
document.getElementById('telegramShare').href =
  `https://t.me/share/url?url=${encodeURIComponent(shareMessage + 'Try it here: ' + resultURL)}`;
