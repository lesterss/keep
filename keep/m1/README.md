# Заметки по Мадженте 1


**Пути к своей теме.**

app/design/frontend/<package_name>/<theme_name>/

skin/frontend/<package_name>/<theme_name>/


 > В кажом пакете темы должна быть тема й именем "default"
 
 **app/design/frontend/base/  это образец, никогда здесь ничего не менять, если надо копировать как с образца.**
 
 > Пакет default содержит темы "default blank iphone modern" это все тоже чисто дял примера, их не редактируем.
 
 ### Фолбек в мадженте
 
 Если чего то  не хватает, маджента будет искать это выше по иерархии, ниже пример поиска 1column.phtml.

```php
app/design/frontend/our_package/our_theme/template/page/1column.phtml
app/design/frontend/our_package/default/template/page/1column.phtml
app/design/frontend/base/default/template/page/1column.phtml

skin/frontend/our_package/our_theme/css/styles.css
skin/frontend/our_package/default/css/styles.css
skin/frontend/base/default/css/styles.css
```

**Если из правок вы вносите только стили, то создавать пакет и тему в app/design/frontend/ и тд не нужно, создать надо только в skin/frontend**
