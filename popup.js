document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('buttonStart');
    var hiddenSettings = document.getElementById('hiddenDiv');
    var settingsButton = document.getElementById('settings');
    var snakeHead = document.getElementById('head');
    var snakeBody = document.getElementById('body');
    var percentText = document.getElementById('percentText');
    var instructions = document.getElementById('infoIcon');
    var instructionsDiv = document.getElementById('instructions');

    chrome.storage.sync.get(['snakeHeadColor', 'snakeBodyColor', 'percentOfItems'], function (items) {
        if (items.snakeHeadColor) {
            snakeHead.value = items.snakeHeadColor;
        }
        if (items.snakeBodyColor) {
            snakeBody.value = items.snakeBodyColor;
        }
        if (items.percentOfItems) {
            percentText.value = items.percentOfItems;
        }
    });

    startButton.addEventListener('click', function () {
        chrome.storage.sync.set({
            snakeBodyColor: snakeBody.value,
            snakeHeadColor: snakeHead.value,
            percentOfItems: parseInt(percentText.value)
        });

        chrome.tabs.executeScript(null, { "file": "snake.js" })
        window.close();
    });
    document.getElementById("reset").onclick = function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
            window.close();
        });

    };
    settingsButton.addEventListener('click', function () {
        hiddenSettings.classList.toggle('hidden');
    });
    instructions.addEventListener('click', function() {
        instructionsDiv.classList.toggle('hidden');
    })
});
