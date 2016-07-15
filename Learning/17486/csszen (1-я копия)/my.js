/**
 * Created by lester on 07.07.16.
 */

document.addEventListener('DOMContentLoaded', function () {
  var wrapContent = document.querySelector('.page-wrapper');
  var wrapContentChild = wrapContent.getElementsByTagName('*');
  var input = document.querySelector('.jsbursa-panel .selector');
  var buttonFind = document.querySelector('.selector-find');
  var buttonChild = document.querySelector('.nav-bottom');
  var buttonSosedL = document.querySelector('.nav-left');
  var buttonSosedR = document.querySelector('.nav-right');
  var buttonParent = document.querySelector('.nav-top');
  var buttonNext = document.querySelector('.selector-next');
  var buttonPrev = document.querySelector('.selector-prev');
  var total = '';
  var next = '';
  var prev = '';
  var elem = '';
  var i = 0;

  buttonFind.addEventListener("click", inputText);
  buttonNext.addEventListener("click", nextItem);
  buttonPrev.addEventListener("click", prevItem);
  buttonChild.addEventListener("click", setCollor);
  buttonChild.addEventListener("click", disable);
  buttonSosedR.addEventListener("click", setCollorSosed);
  buttonSosedL.addEventListener("click", setCollorSosed);
  buttonParent.addEventListener("click", hasParent);

  function nextItem(){
    setStyle(total[i], true);
    setStyle(total[i].children[0], true);
    setStyle(total[i].parentElement, true);
    hasChild(total[i], true);

    i++;
    setStyle(total[i]);
    if (i === total.length - 1){
      buttonNext.setAttribute("disabled", "disabled");
    }
    if (total[i].classList.contains("active") && i != 0){
      buttonPrev.removeAttribute("disabled");
    }
    hasChild(total[i]);
    hasNextSosed(total[i]);
    hasPrevSosed(total[i]);
    checkParent(total[i]);
  }
  function prevItem(){
    setStyle(total[i], true);
    setStyle(total[i].children[0], true);
    setStyle(total[i].parentElement, true);
    hasChild(total[i], true);
    i--;
    setStyle(total[i]);

    if (i === 0){
      buttonPrev.setAttribute("disabled", "disabled");
    }

    hasChild(total[i]);
    hasNextSosed(total[i]);
    hasPrevSosed(total[i]);
  }
  function checkParent(item){
    if(item.parentElement){
      buttonParent.removeAttribute("disabled");
    }else{
      buttonParent.setAttribute("disabled", "disabled");
    }
  }
  function hasNextSosed(sosed){
    if(sosed.nextElementSibling){
      setStyle(sosed);
      buttonSosedR.removeAttribute("disabled");
    }else {
      setStyle(sosed, true);
      buttonSosedR.setAttribute("disabled", "disabled");
    }
  }
  function hasPrevSosed(sosed){
    if(sosed.previousElementSibling){
      setStyle(sosed);
      buttonSosedL.removeAttribute("disabled");
    }else {
      setStyle(sosed, true);
      buttonSosedL.setAttribute("disabled", "disabled");
    }
  }
  function disable(){
    buttonNext.setAttribute("disabled", "disabled");
    buttonPrev.setAttribute("disabled", "disabled");
  }
  function setCollorSosed(sosed, status){
    if(this.classList.contains("nav-left")){
      sosed = total[i].previousElementSibling;
      buttonNext.setAttribute("disabled", "disabled");
      buttonPrev.setAttribute("disabled", "disabled");
    }else {
      sosed = total[i].nextElementSibling;
      buttonNext.setAttribute("disabled", "disabled");
      buttonPrev.setAttribute("disabled", "disabled");
    }
    setStyle(sosed);
    if(status){
      setStyle(sosed, true);
    }
  }
  function hasParent(parent) {
    parent = total[i].parentElement;
      setStyle(parent);
    buttonNext.setAttribute("disabled", "disabled");
    buttonPrev.setAttribute("disabled", "disabled");
  }

  function setCollor (item) {
    item = total[i].children[0];
    setStyle(item);
  }
  function hasChild (child, status){
    //console.log(child.children);
    if(child.children.length > 0 && status){
      child.children[0].classList.remove('child');
    } else if (child.children.length > 0){
      buttonChild.removeAttribute("disabled");
      child.children[0].classList.add('child');
    }else {
      buttonChild.setAttribute("disabled", "disabled");
    }
  }
  function setStyle(item, status) {
    if (typeof item == 'object') {
      item.style.backgroundColor = '#ADD8E6';
      item.style.outline = 'solid red 5px';
      item.classList.add('active');
      if (status) {
        item.style.backgroundColor = '';
        item.style.outline = '';
        item.classList.remove('active');
      }
    }
  }
function mychange(){
  for (var key in wrapContentChild) {
    setStyle(wrapContentChild[key], true);
    i = 0;
  }
}
  function inputText() {
    if (input.value == '') {
      alert('А голову ты дома не забыл');
    } else {
      total = [].slice.call(document.querySelectorAll('.page-wrapper ' + input.value));
      if (total[0] === undefined) {
        alert('Спробуй ще');
      } else {
        i = 0;
        hasChild(total[i]);
        hasNextSosed(total[i]);
        checkParent(total[i]);
        input.addEventListener("change", mychange);
        setStyle(total[i]);
        setStyle(total[i].children[0], true);
        setStyle(total[i].parentElement, true);
        elem = total[i].previousElementSibling;
        if(elem && elem.classList.contains("active")){
          setStyle(total[i].previousElementSibling, true);
          setStyle(total[i].nextElementSibling, true);
        }
        buttonNext.removeAttribute("disabled");
      }
    }
  }
});