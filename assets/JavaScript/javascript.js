document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to the plus button
    var addButton = document.querySelector('.fa-plus');
    addButton.addEventListener('click', addNewRow);
});

var topicsSelect = document.getElementById('topicSelect');
var topics = Array.from(topicsSelect.options).map(function (option) {
    return option.value;
});

function addNewRow(event) {
    event.preventDefault();
  
    // Create a new row element with bootstrap classes
    var newRow = document.createElement('div');
    newRow.classList.add('d-flex', 'align-items-center', 'mt-2', 'topic-row');
  
    // Create a new select dropdown element with bootstrap classes
    var newSelect = document.createElement('select');
    newSelect.classList.add('form-control', 'topic-select');
  
    // Get all selected options from all dropdowns
    var selectedOptions = Array.from(document.querySelectorAll('.topic-select'))
      .map(function (select) {
        return select.value;
      });
  
    // Assign the new dropdown with the remaining authors
    var remainingAuthors = topics.filter(function (author) {
      return !selectedOptions.includes(author);
    });
  
    // Exclude the selected choice from the original topicSelect dropdown in the first duplicate
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
  
    // Create a new plus button with bootstrap & font awesome classes & event listener to execute the same add new row function again
    var newPlusButton = document.createElement('button');
    newPlusButton.classList.add('btn', 'btn-outline-primary', 'ml-2', 'fa', 'fa-plus', 'plus-button');
    newPlusButton.addEventListener('click', addNewRow);
    newRow.appendChild(newPlusButton);
  
    // Create a new minus button with bootstrap & font awesome classes
    var newMinusButton = document.createElement('button');
    newMinusButton.classList.add('btn', 'btn-outline-danger', 'ml-2', 'fa', 'fa-minus');
    newMinusButton.addEventListener('click', deleteRow);
    newRow.appendChild(newMinusButton);
  
    // Get the container for the rows
    var container = document.querySelector('.topicsForm .row');
  
    // Get the row containing #topicSelect
    var topicSelectRow = document.querySelector('.topicsForm .row .form-group:nth-child(1)');
  
    // Insert the new row after the row containing #topicSelect
    topicSelectRow.parentNode.insertBefore(newRow, topicSelectRow.nextSibling);
  }
  

function deleteRow(event) {
    var row = event.target.closest('.topic-row');

    row.remove();
}

// Search button
document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener to the search button
    var searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form submission

        // Open the modal
        var modal = document.getElementById('exampleModalCenter');
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        $(document).ready(function() {
            // Function to fetch poetry data from PoetryDB API
            function fetchPoetry() {
              $.ajax({
                url: "https://poetrydb.org/author,title/Shakespeare;Sonnet 18",
                method: "GET",
                success: function(response) {
                  // Handle the API response here
                  // Assuming the response contains an array of poems
                  var poems = response;
                  
                  // Update the content of the custom-container
                  var poemContainer = $(".custom-container");
                  poemContainer.empty(); // Clear previous content
                  
                  // Assuming the response contains a single poem at index 0
                  var poem = poems[0];
                  
                  // Create HTML elements to display the poem
                  var poemTitle = $("<h3>").text(poem.title);
                  var poemAuthor = $("<p>").text(poem.author);
                  var poemContent = $("<p>").text(poem.lines.join(" "));
                  
                  poemContainer.append(poemTitle, poemAuthor, poemContent);
                },
                error: function(error) {
                  console.log("Error fetching poetry:", error);
                }
              });
            }
            
            // Call the fetchPoetry function to retrieve and display poetry data
            fetchPoetry();
          });
          
    });
});

    //https://poetrydb.org/author,title/Shakespeare;Sonnet
    //https://poetrydb.org/author/Emily Dickinson/title
    //https://poetrydb.org/author

    document.addEventListener('DOMContentLoaded', function() {
        // Function to fetch all authors from PoetryDB API
        function fetchAuthors() {
          $.ajax({
            url: "https://poetrydb.org/author",
            method: "GET",
            success: function(response) {
              // Handle the API response here
              var authors = response.authors;
              
              // Update the topics array with authors
              topics = authors;
              
              // Update the dropdown list with authors
              var selectElement = document.getElementById('topicSelect');
              
              // Clear previous options
              selectElement.innerHTML = "";
              
              // Add each author as an option in the dropdown list
              authors.forEach(function(author) {
                var option = document.createElement('option');
                option.text = author;
                selectElement.appendChild(option);
              });
            },
            error: function(error) {
              console.log("Error fetching authors:", error);
            }
          });
        }
        
        // Call the fetchAuthors function to retrieve and populate the authors dropdown list
        fetchAuthors();
        
        // Rest of your code...
        
        // Add a click event listener to the plus button
        var addButton = document.querySelector('.fa-plus');
        addButton.addEventListener('click', addNewRow);
        
        // Rest of your code...
      });
      

// Modal arrow buttons function which changes the "active" classto the selection of images
document.addEventListener('DOMContentLoaded', function () {
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
