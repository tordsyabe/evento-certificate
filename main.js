var inputtedNames = document.getElementById('fullname');
var nameList = document.getElementById('nameList');

inputtedNames.addEventListener('keyup', function() {
  document.getElementById(
    'valueName'
  ).innerHTML = inputtedNames.value.toUpperCase();
});

document
  .getElementById('form')
  .addEventListener('submit', function addNames(e) {
    e.preventDefault();

    if (inputtedNames.value === '') {
      alert('Please provide a name to be printed.');
    } else {
      var li = document.createElement('li');
      li.className = 'collection-items';
      li.appendChild(
        document.createTextNode(inputtedNames.value.toUpperCase())
      );
      var deleteName = document.createElement('a');
      deleteName.className = 'remove-name';
      deleteName.href = '#';
      deleteName.setAttribute('id', 'removeName');
      deleteName.appendChild(document.createTextNode('remove'));
      li.appendChild(deleteName);
      nameList.appendChild(li);

      printDiv('print');
      console.log(nameList);
      document.getElementById('fullname').value = '';
      window.location.href = 'index.html';
    }
  });

document
  .getElementById('attForm')
  .addEventListener('submit', function addAtt(e) {
    var getFontSize = document.getElementById('fontsize');
    var getMarginVal = document.getElementById('margin');
    storeFontValue(getFontSize.value);
    storeMarginValue(getMarginVal.value);
    e.preventDefault();
  });

function storeNameInLocalStorage(name) {
  let names;
  if (localStorage.getItem('names') === null) {
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }

  names.push(name);
  localStorage.setItem('names', JSON.stringify(names).toLowerCase());
}

function storeFontValue(font) {
  let setFont;
  if (localStorage.getItem('font') === null) {
    setFont = ['10'];
  } else {
    setFont = JSON.parse(localStorage.getItem('font'));
  }

  setFont.push(font);
  localStorage.setItem('font', JSON.stringify(setFont));
}

function storeMarginValue(marg) {
  let setMarg;
  if (localStorage.getItem('margin') === null) {
    setMarg = ['50'];
  } else {
    setMarg = JSON.parse(localStorage.getItem('margin'));
  }

  setMarg.push(marg);
  localStorage.setItem('margin', JSON.stringify(setMarg));
}

document.addEventListener('DOMContentLoaded', function getNames() {
  let names;
  if (localStorage.getItem('names') === null) {
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }

  names.forEach(function(name) {
    var li = document.createElement('li');
    li.className = 'collection-items';
    li.setAttribute('id', 'collectionName');
    li.appendChild(document.createTextNode(name.toUpperCase()));
    var deleteName = document.createElement('a');
    deleteName.className = 'remove-name';
    deleteName.href = '#';

    deleteName.onclick = function(e) {
      e.preventDefault();
      var nameToDelete = li.innerText
        .replace('remove', '')
        .toLowerCase()
        .toString()
        .trim();
      var namesFromStorage = JSON.parse(localStorage.getItem('names'));

      var index = namesFromStorage.indexOf(nameToDelete);
      if (index != -1) {
        namesFromStorage.splice(index, 1);
        if (confirm('Are you sure to delete?')) {
          localStorage.setItem('names', JSON.stringify(namesFromStorage));
          e.currentTarget.parentNode.remove();
        }
      }
    };

    deleteName.appendChild(document.createTextNode('remove'));
    li.appendChild(deleteName);
    nameList.appendChild(li);
  });
});

//DOMContenLoaded----------------------------------------------------------
document.addEventListener('DOMContentLoaded', function getFontValue() {
  let setFont;
  if (localStorage.getItem('font') === null) {
    setFont = ['20'];
  } else {
    setFont = JSON.parse(localStorage.getItem('font'));
  }

  var fontsize = document.getElementById('fontsize');
  if (fontsize.value === null) {
    fontsize.value = '20';
  } else {
    fontsize.value = setFont.slice(-1).pop();
  }
});

document.addEventListener('DOMContentLoaded', function getMarginVal() {
  let setMarg;
  if (localStorage.getItem('margin') === null) {
    setMarg = ['50'];
  } else {
    setMarg = JSON.parse(localStorage.getItem('margin'));
  }

  var marginToSet = document.getElementById('margin');
  marginToSet.value = setMarg.slice(-1).pop();
});

//printing the div section

function printDiv(divName) {
  var fontsize = document.getElementById('fontsize').value;
  var marginSize = document.getElementById('margin').value;
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  var span = document.getElementById('valueName');
  span.style.fontSize = `${fontsize}px`;
  span.style.marginTop = `${marginSize}%`;
  span.className = 'to-Print';

  window.print();
  document.body.innerHTML = originalContents;

  storeNameInLocalStorage(inputtedNames.value);
}
