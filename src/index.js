
require('normalize.css/normalize.css');
require('./styles/index.scss');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import mockjax from '../node_modules/jquery-mockjax/dist/jquery.mockjax.js';

document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById('select'),
    textElement = document.getElementById('textElement'),
    addElement = document.getElementById('addElement'),
    saveElement = document.getElementById('saveElement'),
    deleteElement = document.getElementById('deleteElement'),
    undoElement = document.getElementById('undoElement');
    let prevOptions;

    console.log(mockjax)
    mockjax({
        url: `data.json`,
        response: function (data) {
          console.log(data)
        }
      });

    const showHideElements = (className, showItem) => {
        ([...document.getElementsByClassName(className)]).map(element => {
            element.classList[(showItem ? 'add' : 'remove')]("showItem");
        });
    };

    const deleteOption = index => {
        prevOptions = Object.assign([], selectElement.options);
        selectElement.options.remove(index);
    };

    addElement.onclick = () => {
        showHideElements('newItem', true);
    }

    saveElement.onclick = () => {
        if(!textElement.value || !textElement.value.length) return alert('El elemento debe de tener valor!')

        prevOptions = Object.assign([], selectElement.options);
        const index = selectElement.options.length;
        selectElement.options[index] = new Option(textElement.value, textElement.value.replace(/ /g, '_'));
        textElement.value =  null;
        showHideElements('newItem');
        selectElement.options[index].addEventListener("dblclick", () => deleteOption(index));
    }

    deleteElement.onclick = () => {
        ([...selectElement.options]).map((element, index) => {
            if(element.selected) deleteOption(index);
        });
    }

    undoElement.onclick = () => {
        selectElement.options.length = 0;
        ([...prevOptions]).map((option, index) => {
            selectElement.options[index] = option;
        });
    }
});
