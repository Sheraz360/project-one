// Wait for the DOM to be fully loaded
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
    newPlusButton.classList.add('btn', 'btn-outline-primary', 'ml-2', 'fa', 'fa-plus');
    newPlusButton.addEventListener('click', addNewRow); // Attach event listener to the new plus button
    
    // Add the gradient background and hover effect
    newPlusButton.style.background = 'var(--lghtTrm)';
    newPlusButton.style.backgroundImage = 'linear-gradient(to bottom , var(--lghtTrm), var(--drkTrm))';
    newPlusButton.style.transition = 'background 0.3s';
    newPlusButton.style.border = 'none';
    newPlusButton.style.color = 'var(--plsTxt)';

    // Add the hover effect
    newPlusButton.addEventListener('mouseover', function () {
        newPlusButton.style.background = 'var(--drkTrm)';
        newPlusButton.style.backgroundImage = 'linear-gradient(to bottom, var(--drkTrm), var(--lghtTrm))';
        newPlusButton.style.color = 'var(--plsTxt)';
    });

    newPlusButton.addEventListener('mouseout', function () {
        newPlusButton.style.background = 'var(--lghtTrm)';
        newPlusButton.style.backgroundImage = 'linear-gradient(to bottom, var(--lghtTrm), var(--drkTrm))';
        newPlusButton.style.color = 'var(--plsTxt)';
    });

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
    // Get the parent row element
    var row = event.target.closest('.topic-row');

    // Remove the row from the DOM
    row.remove();
}
