import './styles.css';
import countryCardTmpl from './country-card-template.hbs';
import countryListTmpl from './country-list-template.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

const inputRef = document.querySelector('.input');
const outputRef = document.querySelector('.output');
const mainContainerRef = document.querySelector('.container');
const btnRef = document.querySelector('.btn')

inputRef.addEventListener('input', debounce(e => onInputChange(e.target.value), 500));

function onInputChange(e) {
    fetchCoutry(e)
};
function fetchCoutry(country) {
    if (country === '') {
      return resetPage();
    }
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(r => { return r.json() }).then(countryArr => { return countryArr }).then(country => {
        resetPage();
        if (country.length === 1) { makeCountryCard(country[0]) }
        else if(country.length >=2 && country.length <= 10) {
            makeCountryList(country)
        } else {
            error({
                title: 'To many matches found.',
                text: 'Please enter a more specific query.'
                });
        }
    })
};
function makeCountryCard(country) {
    mainContainerRef.insertAdjacentHTML('beforeend', countryCardTmpl(country))
};
function makeCountryList(list) {
    mainContainerRef.insertAdjacentHTML('beforeend', countryListTmpl(list))
};
function resetPage() {
    mainContainerRef.innerHTML = '';
};


