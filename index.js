"use strict"

import './style.css';

var intervalID = null;
var URL = 'https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}';
let currentPage = 1;
var limit = 10;
let totalItems = 0;

function displayQuotes(quotes){
  var quotesDiv = document.querySelector('.quotes');
  quotes.forEach(function(elem){
    var block = document.createElement('blockquote');
    block.classList.add('quote');
    var html = '<span>' + elem.id + '</span>';
    html += elem.quote;
    html += '<footer>' + elem.author + '</footer>';
    block.innerHTML = html;
    quotesDiv.appendChild(block);
  });
}

function loadQuotes(){
  console.log('calling loadQuotes');
  var url = URL.replace('${page}', currentPage).replace('${limit}', limit);
  console.log('url', url);
  var oReq = new XMLHttpRequest();
  var that = this;
  oReq.addEventListener('load', function () {
    console.log('returning', this.responseText);
    var json = JSON.parse(this.responseText);
    displayQuotes(json.data);  
    totalItems = json.total;  
    currentPage++;
    intervalID = null;
  });
  oReq.addEventListener('error', function () {
    console.error('API not working!');
    intervalID = null;
  });
  oReq.open('GET', url);
  oReq.send();
};

function handleScroll(){   
  /* 
  console.log('handleScroll currentPage', currentPage);
  console.log('handleScroll totalItems', totalItems);
  console.log('handleScroll(currentPage - 1) * 10', (currentPage - 1) * 10);
  console.log('intervalID', intervalID);
  */
  if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 5 && (currentPage - 1) * 10 < totalItems){    
    if (intervalID === null){
      intervalID = setTimeout(loadQuotes, 500);
    }
  }
}

window.addEventListener('scroll', handleScroll);
loadQuotes();
