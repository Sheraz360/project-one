document.addEventListener('DOMContentLoaded', function () {
  var addButton = document.querySelector('.fa-plus');
  addButton.addEventListener('click', addNewRow);

  $("button.clear-button").click(function (event) {
    event.preventDefault();
    var poemContainer = $(".poem-cont");
    poemContainer.empty();
    poemContainer.css("background-color", "transparent");
  
    // Reset the form to its original state
    $(".topicsForm")[0].reset();
    poemContainer.css("background-color", "transparent");
  
    // Rest of the code...
  });
  
  var topicsSelect = document.getElementById('topicSelect');
  var topics = Array.from(topicsSelect.options).map(function (option) {
    return option.value;
  });

  function addNewRow(event) {
    event.preventDefault();
    var addButton = document.querySelector('.fa-plus');
    addButton.addEventListener('click', addNewRow);

    var newRow = document.createElement('div');
    newRow.classList.add('d-flex', 'align-items-center', 'mt-2', 'topic-row');

    var newSelect = document.createElement('select');
    newSelect.classList.add('form-control', 'topic-select');

    var selectedOptions = Array.from(document.querySelectorAll('.topic-select'))
      .map(function (select) {
        return select.value;
      });

    var remainingAuthors = topics.filter(function (author) {
      return !selectedOptions.includes(author);
    });

    if (selectedOptions.length === 0) {
      remainingAuthors = remainingAuthors.filter(function (author) {
        return author !== topicsSelect.value;
      });
    }

    remainingAuthors.forEach(function (author) {
      var option = document.createElement('option');
      option.text = author;
      newSelect.appendChild(option);
    });

    newRow.appendChild(newSelect);

    var newPlusButton = document.createElement('button');
    newPlusButton.classList.add('btn', 'btn-outline-primary', 'ml-2', 'fa', 'fa-plus', 'plus-button');
    newPlusButton.addEventListener('click', addNewRow);
    newRow.appendChild(newPlusButton);

    var newMinusButton = document.createElement('button');
    newMinusButton.classList.add('btn', 'btn-outline-danger', 'ml-2', 'fa', 'fa-minus');
    newMinusButton.addEventListener('click', deleteRow);
    newRow.appendChild(newMinusButton);

    var container = document.querySelector('.topicsForm .row');
    var topicSelectRow = document.querySelector('.topicsForm .row .form-group:nth-child(1)');
    topicSelectRow.parentNode.insertBefore(newRow, topicSelectRow.nextSibling);
  }

  function deleteRow(event) {
    var row = event.target.closest('.topic-row');
    row.remove();
  }

  var searchButton = document.querySelector('.search-button');
  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    var modal = document.getElementById('exampleModalCenter');
    var modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    var selectedAuthor = document.getElementById('topicSelect').value;
    var endpointURL = "https://poetrydb.org/author/" + selectedAuthor;
    var endpointURLTitle = "https://poetrydb.org/author/" + selectedAuthor +"/title";

    function fetchPoetry() {
      $.ajax({
        url: endpointURL,
        method: "GET",
        success: function (response) {
          var poems = response;
          var poemContainer = $(".poem-cont");
          poemContainer.empty();

          poemContainer.css("background-color", "rgba(153, 102, 255, 0.3)");

          poems.forEach(function (poem) {
            var poemTitle = $("<h3>")
              .text(poem.title)
              .hover(
                function () {
                  $(this).css("cursor", "pointer");
                },
                function () {
                  $(this).css("cursor", "auto");
                }
              )
              .click(function () {
                poemContainer.empty();
                var backButton = $("<button>")
                  .text("Back")
                  .addClass("btn btn-outline-secondary ml-auto")
                  .click(function () {
                    fetchPoetry();
                  });

                var titleWrapper = $("<div>").addClass("d-flex align-items-center justify-content-between");
                var titleColumn = $("<div>").addClass("col pl-0");
                var backButtonColumn = $("<div>").addClass("col-auto");

                titleColumn.append(poemTitle);
                backButtonColumn.append(backButton);
                titleWrapper.append(titleColumn, backButtonColumn);

                poemContainer.append(titleWrapper, poemAuthor, poemLineCount, poemContent);

              });
            var poemAuthor = $("<h4>").text(poem.author);
            var poemLineCount = $("<h6>").text(poem.linecount);
            var poemContent = $("<p>").html(poem.lines.join("<br>"));
            poemContainer.append(poemTitle, poemAuthor, poemLineCount);
          });
        },
        error: function (error) {
          console.log("Error fetching poetry:", error);
        }
      });
    }

    fetchPoetry();
  });

  function fetchAuthors() {
    $.ajax({
      url: "https://poetrydb.org/author",
      method: "GET",
      success: function (response) {
        var authors = response.authors;
        topics = authors;
        var selectElement = document.getElementById('topicSelect');
        selectElement.innerHTML = "";
        authors.forEach(function (author) {
          var option = document.createElement('option');
          option.text = author;
          selectElement.appendChild(option);
        });
      },
      error: function (error) {
        console.log("Error fetching authors:", error);
      }
      
    });
  }

  fetchAuthors();



//----------------------
  document.querySelector('.custom-left-container').addEventListener('click', async () => {
    try {
      const response = await fetch('https://poetrydb.org/random');
      const data = await response.json();
  
      if (data && data.length > 0) {
        const poemContainer = document.querySelector('.poem-cont');
        poemContainer.textContent = data[0].lines.join('\n');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });  
//--------------------



  var images = document.querySelectorAll('.image-container img');
  var currentIndex = 0;

  function showImage(index) {
    images.forEach(function (img) {
      img.classList.remove('active');
    });
    images[index].classList.add('active');
  }

  function navigate(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);
  }

  var leftArrow = document.querySelector('.left-arrow');
  var rightArrow = document.querySelector('.right-arrow');

  leftArrow.addEventListener('click', function (event) {
    event.preventDefault();
    navigate(-1);
  });

  rightArrow.addEventListener('click', function (event) {
    event.preventDefault();
    navigate(1);
  });

  showImage(currentIndex);
});
