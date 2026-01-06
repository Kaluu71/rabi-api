document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");

  const btnNext1 = document.getElementById("btn-next-1");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const btnConfirmYes = document.getElementById("btn-confirm-yes");
  const btnForceLove = document.getElementById("btn-force-love");

  const modalBank = document.getElementById("modal-bank");
  const modalNoChoice = document.getElementById("modal-no-choice");
  const closeModal = document.querySelector(".close-modal");

  const btnCopy = document.getElementById("btn-copy");
  const accountNumber = document.getElementById("account-number");
  const copyFeedback = document.getElementById("copy-feedback");

  // Transitions
  function switchSection(current, next) {
    current.classList.remove("active");
    current.style.opacity = "0";
    setTimeout(() => {
      current.classList.add("hidden");
      next.classList.remove("hidden");
      setTimeout(() => {
        next.classList.add("active");
      }, 50);
    }, 500);
  }

  // Step 1 -> Step 2
  btnNext1.addEventListener("click", () => {
    switchSection(step1, step2);
  });

  // Step 2: Yes -> Step 3
  btnYes.addEventListener("click", () => {
    switchSection(step2, step3);
  });

  // Step 2: No -> Modal No Choice
  btnNo.addEventListener("click", () => {
    modalNoChoice.classList.remove("hidden");
  });

  // Modal No Choice: Okay -> Close and proceed to "Bank" logic effectively (forcing love)
  btnForceLove.addEventListener("click", () => {
    modalNoChoice.classList.add("hidden");
    // Treat it as if they said yes eventually, or straight to bank?
    // User request: "you dont have a choice... then move to the same account nuber part"
    // So we can transition to Step 3 or straight to Bank.
    // Let's transition to Step 3 so they HAVE to click "Yes I love you my prettiest baby sister"
    switchSection(step2, step3);
  });

  // Step 3: Yes (Confirmed) -> Bank Modal + Confetti
  btnConfirmYes.addEventListener("click", () => {
    triggerConfetti();
    setTimeout(() => {
      modalBank.classList.remove("hidden");
    }, 800);
  });

  // Close Bank Modal
  closeModal.addEventListener("click", () => {
    modalBank.classList.add("hidden");
  });

  // Copy to Clipboard
  btnCopy.addEventListener("click", () => {
    const text = accountNumber.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        copyFeedback.classList.remove("hidden");
        setTimeout(() => {
          copyFeedback.classList.add("hidden");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });

  // Confetti Effect
  function triggerConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff6b6b", "#feca57", "#54a0ff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff6b6b", "#feca57", "#54a0ff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
});
