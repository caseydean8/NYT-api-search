const apiGet = (search, resultNum, startDate, endDate) => {
  startDate ? (startDate = `&begin_date=${startDate}`) : (startDate = "");
  endDate ? (endDate = `&end_date=${endDate}`) : (endDate = "");
  const apiKey = "BkLkeT4lQuDfhKNLm9yIbUKXgjkL5auf";
  const queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=${search}${startDate}${endDate}&api-key=${apiKey}`;
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(res) {
    const result = res.response.docs;
    articleDisplay(result, resultNum);
  });
};

$("#search").on("click", function() {
  this.disabled = true;
  const search = $("#search-term").val();
  const startDate = $("#start")
    .val()
    .replace(/-/g, "");
  const endDate = $("#end")
    .val()
    .replace(/-/g, "");
  const resultNum = $("#records").val();
  resultNum > 10
    ? (this.disabled = false)
    : apiGet(search, resultNum, startDate, endDate);
});

const articleDisplay = (results, resultNum) => {
  if ($(window).width() < 415) {
    document.getElementsByTagName("h1")[0].style.display = "none";
  }
  document.getElementsByTagName("h2")[0].textContent =
    "Click an article to view";
  document.getElementById("form").style.display = "none";
  if (resultNum) results.length = resultNum;
  results.forEach(result => {
    const card = $("<div>").addClass("card");
    $(card).text(result.headline.main);
    $(card).val(result.web_url);
    $("#card-holder").append(card);
  });

  const clrBtn = $("<button>")
    .text("New Search")
    .attr("id", "clear");
  $("#card-holder").append(clrBtn);
};

$(document).on("click", ".card", function() {
  window.open($(this).val());
});

$(document).on("click", "#clear", function() {
  document.getElementById("card-holder").innerHTML = "";
  document.getElementById("form").style.display = "";
  document.getElementById("footer").innerHTML = "";
  document.getElementById("search").disabled = false;
  document.getElementsByTagName("h2")[0].textContent = "article search";
  document.getElementsByTagName("h1")[0].style.display = "";
  document.getElementById("form").reset();
});
