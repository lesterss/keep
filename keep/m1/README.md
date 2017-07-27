# Заметки по Мадженте 1

### Линки

[Гайд по созданию темы респонсив](http://devdocs.magento.com/guides/m1x/ce19-ee114/RWD_dev-guide.html)
[Responsive Email](http://devdocs.magento.com/guides/m1x/ce19-ee114/RWD_responsive_emails.html)

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

**Если из правок вы вносите только стили, то создавать тему в своем пакете в app/design/frontend/ и тд не нужно, создать надо только в skin/frontend**

Пример:

```php
Уже есть тема и как выше сказано обазательная тема default
app/design/frontend/Mypackage/default/

А для второго стора к примеру надо поменять цвета или шрифт, не надо создавать в этом же пакете еще 1 тему, как показано ниже
app/design/frontend/Mypackage/store2/

просто сразу создаем тему в нашем пакете но только в скинах здесь
skin/frontend/Mypackage/store2/
```

## Основное правило темы в пакете в том, что они должны быть схожими, иначе они должны быть разделены на разные пакеты.

> Тема default должны быть основой сайта, а дополнительные темы должны просто дополнять эту основу. Если вы радикально меняете каждый элемент  сайта в теме, то это может быть основанием для разделения на пакеты.


## Макет -  layout

[Здесь полная статья,вверху переключить на укр язык](https://code.tutsplus.com/articles/magento-theme-development-layout-files--cms-21037)

>  Здесь лежат xml модулей или вида, любого что может влияет на фронт часть сайта.

Например, модуль Magento app/code/core/Mage/Page/ имеет свой собственный XML файл app/design/frontend/base/default/layout/page.xml. **Но названия модуля и xml не всегда совпадают**

> Посмотреть какой xml привязан к модулю можно здесь app/code/local/<область_имен>/<имя_модуля>/etc/config.xml

Для не очень больших правок (создание блоков/ удаление, смена шаблона) существует local.xml (если надо создайте его), он как аналог functions.php для WordPress.

Но для больших изменений лучше использовать соответствующий модулю xml.

local.xml - начало

```xml
<?xml version="1.0"?>
<!--
/*
 * Store Name
 * Store URL
 *
 * @description  Layout modifications
 * @author       Author Name
 * @package      packagename_default
 *
 */
-->
<layout version="0.1.0">
    <!-- our modifications will go here -->
</layout>
```
Подключение блоков и прочего в xml можно делать 2 способами:

* Дескриптор <default> - это глобальный дескриптор, заденет все сттраницы.

* Дескриптор <cms_index_index> - это пример дескриптора, только для главной страницы (на самом деле их много).

**ПРИМЕР РАБОЧЕГО LOCAL.XML**

```xml
<?xml version="1.0"?>
<layout version="0.1.0">
    <default>
        <reference name="head">
            <!-- jQuery locally -->
            <action method="addItem"><type>skin_js</type><name>js/libs/jquery.min.js</name></action>
 
            <!-- jQuery CDN -->
            <block type="core/text" name="cdn.jquery">
                <action method="setText">
                    <text>
                        <![CDATA[
                        <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                        <script type="text/javascript">jQuery.noConflict();</script>
                        ]]>
                    </text>
                </action>
            </block>
 
            <!-- add some items (globally) -->
            <action method="addItem"><type>skin_js</type><name>js/libs/modernizr.min.js</name></action>
            <action method="addItem"><type>skin_js</type><name>js/libs/html5shiv.min.js</name><params/><if>lt IE 9</if></action>
 
            <!-- remove some items (globally) -->
            <action method="removeItem"><type>skin_css</type><name>css/widgets.css</name></action></action>
            <action method="removeItem"><type>skin_js</type><name>js/ie6.js</name><if>lt IE 7</if></action>
            <action method="removeItem"><type>js</type><name>lib/ds-sleight.js</name><params/><if>lt IE 7</if></action>
        </reference>
    </default>
 
    <cms_index_index>
        <reference name="head">
            <!-- add items just on the homepage -->
            <action method="addItem"><type>skin_js</type><name>js/libs/home.min.js</name></action>
            <action method="addItem"><type>skin_css</type><name>css/home.css</name></action>
        </reference>
    </cms_index_index>
</layout>
```
### Удаление блоков 

```xml
<?xml version="1.0"?>
<layout version="0.1.0">
    <default>
        <!-- remove a block -->
        <remove name="right.permanent.callout" />
     
        <!-- unset a block -->
        <reference name="right">
            <action method="unsetChild"><name>right.poll</name></action>
        </reference>
    </default>
</layout>
```
> \<remove\> -- удаляет блок полностью не зависимо от того, где он используется.

> \<unsetChild\> --- этот метод будет удалять блок только всередине конкретного дескриптора макета.

### Добавление структурного блока макета.

Пример для главной страницы.
```xml
<?xml version="1.0"?>
<layout version="0.1.0">
    <cms_index_index>
        <reference name="content">
            <block type="core/template" name="home.additional" after="-" template="/home/additional.phtml" />
        </reference>
    </cms_index_index>
</layout>
```

Мы ссылаемся на блок content и с помощью тега after указываем, что блок будет вызываться в самом конце основного контента (content).

### Добавление статик блока

Сначала в админке в  "cms/static block" его нужно создать он будет со своим уникальным "Identifier"
```xml
<?xml version="1.0"?>
<layout version="0.1.0">
    <cms_index_index>
        <reference name="content">
            <block type="cms/block" name="home.static.block" after="-">
                <action method="setBlockId"><block_id>home_static_block</block_id></action>
            </block>
        </reference>
    </cms_index_index>
</layout>
```
Этот "Identifier" нужно вписать в тег \<block_id\>


## Template -  шаблон
[Здесь полная статья,вверху переключить на укр язык](https://code.tutsplus.com/uk/articles/magento-theme-development-template-files--cms-21040)
Разбор будет на примере двух вопросов

* Рекомендованые товары на главной.
* И загрузка JavaScript в футере.

Шаблон - app/design/frontend/<имя_пакета>/<имя_темы>/template/ 

Локализация -app/design/frontend/<имя_пакета>/<имя_темы>/locale/

Файлы шаблона могу генерировать как целый страницы 1column.phtml так и конкретные блоки header.phtml в рамках страницы.

### Рекомендованые товары на главной.

* Создаем подкатегорию от рутовой в catalog > manage categories, называем как то "Home products"
 - Во вкладке "Category Products" отмечаем товары которые хотим добавить.
 - Сохраняем.
* Надо создать шаблон в котором напишем код, для этого хорошо подойдет шаблон из app/design/frontend/base/default/catalog/product/list.phtml  он очень похож на то, что нам надо сделать.
 - Копируем себе в тему app/design/frontend/<имя_пакета>/default/catalog/product/list-home-featured.phtml
 - Правим код как надо, пример кода по линке на полную статью выше.

И дальше нам надо создать xml-блок, который будет подгружать шаблон, который мы создали. Это мы делаем в нашем файле local.xml, например так:

```xml
<?xml version="1.0"?>
<layout version="0.1.0">
    <cms_index_index>
        <reference name="content">
            <!-- home featured products -->
            <block type="catalog/product_list" name="home.featured.products" after="-" template="catalog/product/list-home-featured.phtml" />
        </reference>
    </cms_index_index>
</layout>
```

И все он будет теперь виден на главной.

### JavaScript в футер

Изменить вызов скрипта в футер через добавление его local.xml как в примере выше с каким-то параметром не выйдет, в мадженте нет такого спец параметра. 

Нам необходимо создать xml-блок в нашем файле local.xmlи в ноде макета по умолчанию (default), например так:

```xml
<?xml version="1.0"?>
<layout version="0.1.0">
    <default>
        <reference name="root">
            <!-- adds ability to load js in the footer -->
            <block type="page/html_head" name="footer.js" as="footer.js" template="page/html/footer-js.phtml">
                <action method="addItem"><type>skin_js</type><name>js/build/jquery.min.js</name></action>
            </block>
        </reference>
    </default>
</layout>
```
* Создаем свой собственый файл шаблона app/design/frontend/<имя_пакета>/default/page/html/footer-js.phtml с текстом 
 \<?php echo $this-\>getCssJsHtml() ?\>
* Наконец, мы должны добавить строку кода в наши файлы шаблона перед закрытием тега  \<body\>.
 - Вот пример файлов шаблона стандартных
