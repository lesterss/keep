/**
 * Created by lester on 07.07.16.
 */

document.addEventListener('DOMContentLoaded', function () {
  var wrapContent = document.querySelector('.page-wrapper');
  var wrapContentChild = wrapContent.getElementsByTagName('*');
  //var wrapPanel = document.querySelector('.jsbursa-panel');
  var input = document.querySelector('.jsbursa-panel .selector');
  var buttonFind = document.querySelector('.selector-find');
  var buttonNext = document.querySelector('.selector-next');
  var buttonPrev = document.querySelector('.selector-prev');
  var total = '';
  var next = '';
  var next1 = '';
  var prev = '';
  var i = 0;
  var k = 1;

  buttonFind.addEventListener("click", inputText);
  buttonNext.addEventListener("click", nextItem);

  function nextItem(){
    k++;
    if (total.length == k){
      buttonNext.setAttribute("disabled", "disabled");
    }
    next = total[i].nextElementSibling;
    if(next != null){
      i++;
      console.log(i);
      prev = total[i].previousElementSibling;
      if ( prev != null){
        setStyle(prev, true);
      }
      setStyle(next);
      // console.log(prev);
    }else {
      console.log(i+' ----');
      prev = total[i];
      //console.log(prev);
      setStyle(prev, true);
      i++;
      next1 = total[i];
      setStyle(next1);
    }

  }
  function setStyle(item, status) {
    if (typeof item == 'object') {
      item.style.backgroundColor = '#ADD8E6';
      item.style.outline = 'solid red 5px';
      if (status) {
        item.style.backgroundColor = '';
        item.style.outline = '';
      }
    }
  }

  function myScript() {
    for (var key in wrapContentChild) {
      setStyle(wrapContentChild[key], true);
      i = 0;
      k = 1;
    }
  }

  function inputText() {
    if (input.value == '') {
      alert('А голову ты дома не забыл');
    } else {
      total = wrapContent.getElementsByTagName(input.value);
      if (total[0] === undefined) {
        alert('Спробуй ще');
      } else {
        input.addEventListener("change", myScript);
        setStyle(total[0]);
        next = total[0].nextElementSibling;
        if (next){
          if(total[0].nodeName == next.nodeName){
            buttonNext.removeAttribute("disabled");
          }else {
            buttonNext.setAttribute("disabled", "disabled");
          }
        }
      }
    }
  }
});

//косяки почему то при поиске тега а он ищет и abbr, какого хера.
//Очередность выборки дивов не понятна. И из-за этого ломается сброс рамки.