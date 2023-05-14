document.addEventListener('DOMContentLoaded', function () {
    // Get the initial "fa-plus" button and register a click event listener
    var addButton = document.querySelector('.fa-plus');
    addButton.addEventListener('click', addNewRow);
});

var topicsSelect = document.getElementById('topicSelect');
var topics = Array.from(topicsSelect.options).map(function (option) {
    return option.value;
});


function addNewRow(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new row element
    var newRow = document.createElement('div');
    newRow.classList.add('d-flex', 'align-items-center', 'mt-2', 'topic-row');

    // Create a new select dropdown element
    var newSelect = document.createElement('select');
    newSelect.classList.add('form-control', 'topic-select');

    // Populate the new dropdown with options
    for (var i = 0; i < topics.length; i++) {
        var option = document.createElement('option');
        option.text = topics[i];
        newSelect.appendChild(option);
    }

    newRow.appendChild(newSelect);

    // Create a new "fa-plus" button element
    var newPlusButton = document.createElement('button');
    newPlusButton.classList.add('btn', 'btn-outline-primary', 'ml-2', 'fa', 'fa-plus', 'plus-button');
    newPlusButton.addEventListener('click', addNewRow); // Attach event listener to the new plus button
    newRow.appendChild(newPlusButton);

    // Create a new "fa-minus" button element
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
    // Get the search button and register a click event listener
    var searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form submission

        // Open the modal manually
        var modal = document.getElementById('exampleModalCenter');
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });
});


// Modal arrow buttons
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

