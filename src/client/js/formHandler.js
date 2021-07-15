function handleSubmit(event) {
  event.preventDefault();

  const url = document.getElementById("name").value;

  // check what text was put into the form field
  const isValidUrl = Client.urlChecker(url);

  if (!isValidUrl) {
    alert("INVALID URL");
    return;
  }

  console.log("::: Form Submitted :::");
  analyzeURL(url);
}

function analyzeURL(url) {
  console.log("Posting Data")
  fetch("http://localhost:8080/getData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  }).then((data) => getData());
}

function getData() {
  console.log("Getting Data")
  fetch("http://localhost:8080/sendData")
    .then((res) => res.json())
    .then((data) => showData(data));
}

function showData(data) {
  console.log("ShowingData")
  document.getElementById("result").innerHTML = 
        `<ul>
            <li>Score tag: ${data.score_tag}</li>
            <li>Subjectivity: ${data.subjectivity}</li>
            <li>Agreement: ${data.agreement}</li>
            <li>Model: ${data.model}</li>
            <li>Irony: ${data.irony}</li>
            <li>Confidence: ${data.confidence}</li>
        </ul>`;
}

export { handleSubmit };
