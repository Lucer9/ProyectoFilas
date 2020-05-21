function selectTab(tab) {
  let options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("active");
  }

  let inputs = document.getElementsByClassName("inputs");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("active");
  }

  let option = document.getElementsByClassName(tab);
  for (let i = 0; i < option.length; i++) {
    option[i].classList.add("active");
  }

  let input = document.getElementsByClassName(tab);
  for (let i = 0; i < input.length; i++) {
    input[i].classList.add("active");
  }
}
