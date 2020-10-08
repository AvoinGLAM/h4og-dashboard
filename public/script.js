var radios = document.getElementsByName('typeFilterRadio');
var timezones = document.getElementsByClassName('timezoneArea');
var languageItems = document.getElementsByClassName('languageItem');
var typeItems = document.getElementsByClassName('typeItem');
for (var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = selectTypeFilter;
}
for (var i = 0, max = timezones.length; i < max; i++) {
    timezones[i].onclick = selectTimezoneFilter;
}
for (var i = 0, max = languageItems.length; i < max; i++) {
    languageItems[i].onclick = selectLanguageFilter;
}
for (var i = 0, max = typeItems.length; i < max; i++) {
    typeItems[i].onclick = selectDescribeFilter;
}
let selectedType;

function selectTypeFilter(e) {
    if (e.target.checked) {
        if (selectedType != e.target.value) {
            //console.log(e.target.value);
            //grid.filter(e.target.value);
            selectedType = e.target.value;
        } else {
            console.log('Uncheck');
            //grid.filter('*');
            selectedType = undefined;
            e.target.checked = false;
        }
        if (selectedType != 'person') {
            // default timezone
            for (var i = 0, max = timezones.length; i < max; i++) {
                timezones[i].classList.remove('activeTimezone');
            }
            timezoneMapEl.classList.remove('activeMap');
            selectedTimezone = undefined;
            // default language
            document.body.classList.remove('activeLanguageBody');
            for (var i = 0, max = languageItems.length; i < max; i++) {
                languageItems[i].classList.remove('activeLanguage');
            }
            selectedLanguage = undefined;
            // default describe
            document.body.classList.remove('activeDescribeBody');
            for (var i = 0, max = typeItems.length; i < max; i++) {
                typeItems[i].classList.remove('activeDescribe');
            }
            selectedDescribe = undefined;
        }
        updateFilter();
    }
}

let selectedTimezone;
const timezoneMapEl = document.getElementById('timezoneMap');

function selectTimezoneFilter(e) {
    selectedType = 'person';
    document.getElementById('radio2').checked = true;

    for (var i = 0, max = timezones.length; i < max; i++) {
        timezones[i].classList.remove('activeTimezone');
    }
    if (selectedTimezone != e.target.parentElement.dataset.timezone) {
        timezoneMapEl.classList.add('activeMap');
        let target = e.target.parentElement;
        selectedTimezone = target.dataset.timezone;
        target.classList.add('activeTimezone');
        //grid.filter('[data-timezone="' + target.dataset.timezone + '"]');
    } else {
        timezoneMapEl.classList.remove('activeMap');
        selectedTimezone = undefined;
        //grid.filter('*');
    }
    updateFilter();

}

let selectedLanguage;
let selectedDescribe;

function selectLanguageFilter(e) {
    if (selectedLanguage != e.target.innerHTML) {
        selectedType = 'person';
        document.getElementById('radio2').checked = true;
        selectedLanguage = e.target.innerHTML;
        document.body.classList.add('activeLanguageBody');
        for (var i = 0, max = languageItems.length; i < max; i++) {
            if (languageItems[i].innerHTML == e.target.innerHTML) {
                languageItems[i].classList.add('activeLanguage');
            } else {
                languageItems[i].classList.remove('activeLanguage');
            }
        }
    } else {
        document.body.classList.remove('activeLanguageBody');
        for (var i = 0, max = languageItems.length; i < max; i++) {
            languageItems[i].classList.remove('activeLanguage');
        }
        selectedLanguage = undefined;
    }
    updateFilter();
}

function selectDescribeFilter(e) {
    if (selectedDescribe != e.target.innerHTML) {
        selectedType = 'person';
        document.getElementById('radio2').checked = true;
        selectedDescribe = e.target.innerHTML;
        document.body.classList.add('activeDescribeBody');
        for (var i = 0, max = typeItems.length; i < max; i++) {
            if (typeItems[i].innerHTML == e.target.innerHTML) {
                typeItems[i].classList.add('activeDescribe');
            } else {
                typeItems[i].classList.remove('activeDescribe');
            }
        }
    } else {
        document.body.classList.remove('activeDescribeBody');
        for (var i = 0, max = typeItems.length; i < max; i++) {
            typeItems[i].classList.remove('activeDescribe');
        }
        selectedDescribe = undefined;
    }
    updateFilter();
}

function updateFilter() {

    /*
    let filter = (selectedType ? selectedType : '') + (selectedTimezone ? '[data-timezone="' +
        selectedTimezone + '"]' : '');
    filter = (filter ? filter : '*');
    console.log('Apply filter ' + filter);
    grid.filter(filter);
    */
    // there are probably better ways to implement this logic
    grid.filter(function (item) {
        if (selectedType) {
            let el = item.getElement();
            if (el.classList.contains(selectedType)) {
                if (selectedType == 'person') {
                    let passTimezone = (selectedTimezone ? el.dataset.timezone == selectedTimezone : true);
                    let passLanguage = (selectedLanguage ? el.dataset.languages.split(', ').includes(selectedLanguage) : true);
                    let passDescribe = (selectedDescribe ? el.dataset.types.split(', ').includes(selectedDescribe) : true);
                    return (passTimezone && passLanguage && passDescribe);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }

    });
}

var grid = new Muuri('.grid', {
    //dragEnabled: true,
    sortData: {
        foo: function (item, element) {
            return 10000 - (parseInt(element.getAttribute('data-index')) + 1);
        }
    },
    layout: {
        fillGaps: true
    }
});
grid.refreshSortData();
grid.sort('foo');

grid.on("showEnd", function(items) {
    if (typeof visualizationReady === "function") { 
        visualizationReady();
    }
});
