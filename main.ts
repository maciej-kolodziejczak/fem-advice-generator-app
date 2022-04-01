type Slip = {
  slip: {
    id: number;
    advice: string;
  }
};

async function loadAdvice(): Promise<Slip> {
  const res = await fetch('https://api.adviceslip.com/advice', { cache: 'no-store' });

  if (!res.ok) {
    return {
      slip: {
        id: 0,
        advice: 'There\'s been an error loading an advice. Please try again, hopefully it works',
      },
    };
  }

  return res.json();
}

window.addEventListener('load', async () => {
  const adviceId = document.getElementById('advice-id')
  const adviceText = document.getElementById('advice-text');
  const rerollButton = document.getElementById('reroll-button');

  async function renderAdvice() {
    const { slip: { id, advice } } = await loadAdvice();
  
    if (adviceId) adviceId.textContent = id.toString();
    if (adviceText) adviceText.textContent = advice;
  }

  renderAdvice();

  if (rerollButton) {
    rerollButton.addEventListener('click', async () => {
      rerollButton.classList.remove('animate-in')
      rerollButton.classList.add('animate-out');
      await renderAdvice();
      rerollButton.classList.remove('animate-out');
      rerollButton.classList.add('animate-in');
    });
  }
});