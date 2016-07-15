/**
 * Created by vor on 14.10.2014.
 */
window.onload = function () {
    var button = document.querySelector('.selector-find');
    var buttont = document.querySelector('.nav-top');
    var buttonb = document.querySelector('.nav-bottom');
    var buttonpl = document.querySelector('.prev-left');
    var buttonnl = document.querySelector('.next-left');
    var count = 0;
    button.addEventListener('click', function (event) {
        var value_input = document.querySelector('.jsbursa-panel input.selector').value;
        //console.log(value_input);
        document.querySelector('.nav-top').removeAttribute('disabled');
        document.querySelector('.nav-bottom').removeAttribute('disabled');
        document.querySelector('.prev-left').removeAttribute('disabled');
        document.querySelector('.next-left').removeAttribute('disabled');
        var snext = document.querySelector('.selector-next');
        var sprev = document.querySelector('.selector-prev');
        snext.removeAttribute('disabled');
        sprev.removeAttribute('disabled');
        if (count++ > 0) {
            return false;
        }
        if (value_input.length == '') {
            alert('Запрос не может быть пустым');
        } else {
            var result = [].slice.call(document.querySelectorAll('.page-wrapper ' + value_input));
            if (result.length == 0) {
                alert('Данный селектор не найден или введен с ошибкой.');
            }
            var item = result[0];

            function checkcls() {
                if (document.querySelector('.alert')) {
                    document.querySelector('.alert').classList.remove('alert');

                }
            };
            checkcls();
            item.classList.add('alert');
            if (result.length > 1) {
                //console.log(result);

                if (snext.hasAttribute('disabled')) {
                    snext.removeAttribute('disabled');
                    sprev.removeAttribute('disabled');
                }
                var n = 1;
                var current;
                var cur_count;
                var current_new;
                snext.addEventListener('click', function () {
                    window.current = n;
                    if (window.current !== undefined) {
                        n = window.current;
                    }

                    var nclass = result[n++];
                    checkcls();
                    nclass.classList.add('alert');
                    if (cur_count != window.current && cur_count != undefined) {
                        n = cur_count++;
                        console.log(n);
                    }
                    if (n === result.length) {
                        snext.setAttribute('disabled', 'disabled');
                    } else {
                        snext.removeAttribute('disabled');
                    }
                    sprev.removeAttribute('disabled');
                });

                sprev.addEventListener('click', function () {
                    window.current = window.current - 1;
                    current_new = window.current;
                    var pclass = result[current_new];
                    checkcls();
                    pclass.classList.add('alert');
                    window.current = current_new;
                    if (current_new == 0) {
                        sprev.setAttribute('disabled', 'disabled');
                    } else {
                        snext.removeAttribute('disabled');
                    }
                    cur_count = current_new;
                });

            } else {
                var sall = document.querySelector('.selector-next, .selector-prev');
                sall.setAttribute('disabled', 'disabled');
            }
        }
    });
    buttont.addEventListener('click', function(){
        document.querySelector('.selector-next').setAttribute('disabled', 'disabled');
        document.querySelector('.selector-prev').setAttribute('disabled', 'disabled');
        var value_input = document.querySelector('.jsbursa-panel input.selector').value;
        var result = [].slice.call(document.querySelectorAll('.page-wrapper ' + value_input));
        if(window.current == undefined){
            var parent = result[0].parentNode;
            console.log(parent);
        }else{
            var parent = result[window.current].parentNode;
            console.log(parent);
        }

    });
    buttonb.addEventListener('click', function(){
        document.querySelector('.selector-next').setAttribute('disabled', 'disabled');
        document.querySelector('.selector-prev').setAttribute('disabled', 'disabled');
        var value_input = document.querySelector('.jsbursa-panel input.selector').value;
        var result = [].slice.call(document.querySelectorAll('.page-wrapper ' + value_input));
        if(window.current == undefined){
            var parent = result[0].childNodes[0];
            console.log(parent);
        }else{
            var parent = result[window.current].childNodes[0];
            console.log(parent);
        }

    });
    buttonpl.addEventListener('click', function(){
        document.querySelector('.selector-next').setAttribute('disabled', 'disabled');
        document.querySelector('.selector-prev').setAttribute('disabled', 'disabled');
        var value_input = document.querySelector('.jsbursa-panel input.selector').value;
        var result = [].slice.call(document.querySelectorAll('.page-wrapper ' + value_input));
        function previousTag(node) {
            var node = node.previousSibling;
            return (node && node.nodeType!=1) ? previousTag(node) : node;
        }
        if(window.current == undefined){
            var prev = previousTag(result[0]);
            console.log(prev);
        }else{
            var prev = previousTag(result[window.current]);
            console.log(prev);
            if(prev === null){
                alert('Нет соседа');
            }
        }

    });
    buttonnl.addEventListener('click', function(){
        document.querySelector('.selector-next').setAttribute('disabled', 'disabled');
        document.querySelector('.selector-prev').setAttribute('disabled', 'disabled');
        var value_input = document.querySelector('.jsbursa-panel input.selector').value;
        var result = [].slice.call(document.querySelectorAll('.page-wrapper ' + value_input));
        function nextTag(node) {
            var node = node.nextSibling;
            return (node && node.nodeType!=1) ? nextTag(node) : node;
        }
        if(window.current == undefined){
            var next = nextTag(result[0]);
            console.log(next);
        }else{
            var next = nextTag(result[window.current]);
            console.log(next);
            if(next === null){
                alert('Нет соседа');
            }
        }

    });
}