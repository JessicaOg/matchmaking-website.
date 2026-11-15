// Where form submissions are sent.
// Leave this empty until a form service is chosen (for example Formspree, Basin or Getform).
// While it is empty, the forms send nothing and tell the visitor so.
const FORM_ENDPOINT = "";

function ageOn(dateString) {
  const born = new Date(dateString);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  const beforeBirthday =
    now.getMonth() < born.getMonth() ||
    (now.getMonth() === born.getMonth() && now.getDate() < born.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

document.querySelectorAll("form[data-site-form]").forEach((form) => {
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  const say = (message) => {
    status.textContent = message;
    status.hidden = false;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      say("Some required answers are missing. Fill in the highlighted fields and send again.");
      return;
    }

    const minAge = Number(form.dataset.minAge || 0);
    const dob = form.querySelector('input[name="date_of_birth"]');
    if (minAge && dob) {
      const age = ageOn(dob.value);
      if (age === null || age < minAge) {
        say(`Membership is open to people aged ${minAge} and over.`);
        dob.focus();
        return;
      }
    }

    if (!FORM_ENDPOINT) {
      say("This form is not connected yet, so nothing was sent. Applications open soon.");
      return;
    }

    const data = new FormData(form);
    data.append("form", form.dataset.formName || "Website form");
    button.disabled = true;
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      say("Sent. Thank you. I read every application myself and will reply by email.");
    } catch (error) {
      say("Your answers could not be sent. Check your connection and send again.");
    } finally {
      button.disabled = false;
    }
  });
});
