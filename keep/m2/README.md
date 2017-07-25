# Шпаргалка команд Magento2
* [Стили](#Стили)
* [Структура темы](#Структура-новой-темы)
* [Less](#less)
* [Фишки](#ФИШКИ)
* [Команды](#Команды)

### Реиндекс
Список всех возможных реиндексов 
``` bash
php bin/magento indexer:info
```

Использование реиндекса с указанием лимита памяти
```bash
-dmemory_limit=2G php bin/magento indexer:reindex
```

Статус реиндекса
```bash
php bin/magento indexer:status
```

Реиндекс всего
``` bash
php bin/magento indexer:reindex
```

или по нейму
```bash
php bin\magento indexer:reindex indexer_name.
```
### Регенерации картинок

```bash
После изменения размеров можно выполнить команду php (M2_root)/bin/magento catalog:images:resize 
для регенерации картинок.
```
### Кеш

> System — Cache Management

Очистка всего
```bash
Команда полностью очистит хранилище кэша.
php bin/magento cache:flush

php bin/magento cache:clean
```
### Стили
[Дока мадженты](http://devdocs.magento.com/guides/v2.0/frontend-dev-guide/css-guide/css_quick_guide_approach.html#simple_extend)

```bash
_extend.less # используется для добавление незначительных правок стилей темы.
```
**Пример**
 * подключаем свой стиль компонента батон @import '_buttons_extend.less' в _extend.less, который лежит там же в папке source
   - он расширит родительский _buttons.less
 * Если создать сразу в source _buttons.less то он уже перезапишет родительский _buttons.less.(Если оставить пустым, стилей не будет для _buttons вообще)
```bash 
_module.less # используется для добавление существенных стилей в модуль .
_theme.less # для написаний стилей своей темы (ниже путь, в него надо копировать все из родительского _theme.less, даже те которые не будут использоваться)- минус нужно вручную апдейтить этот файл, если обновляется родительский.
styles-m.less # Для basic and mobile-specific styles (Global lib + theme styles + theme extends)
styles-l.less # Desktop enhancements (768 и выше) ( Global lib + theme styles) как дополнение к мобильным
```

**Но правильно, если нужно перезаписать/расширить стили создавать .less для каждого компонента библиотеки Magento UI, который вы измените.**

```html
<theme_dir>/
│  ├── web/
│  │   ├── css/
│  │   │   ├── source/
│  │   │      ├──_theme.less
...
```
### Less

**Изменить тип компиляции можно в админ части по пути: Stores → Configuration → Advanced → Developer → Front-end development workflow → Workflow**

> Типы препроцессинга LESS в Magento 2

1. Серверная компиляция LESS. 
2. Клиентская компиляция LESS c помощью less.js. 

> 1. При серверной компиляции необходимо вручную каждый раз удалять содержимое папок pub/static и var/view_preprocessed. Эти действия можно оптимизировать с помощью таскраннера Grunt. Он будет отслеживать изменения в файлах, очищать указанные папки и компилировать less автоматически.

> 2. Клиентская компиляция чаще используется в режиме разработки, так как все изменения будут видны сразу.

### Структура новой темы

> Content — Design — Themes  -- смотрим есть ли тема

> Content → Design → Configuration -- применяем ее

[Статья на хабре](https://habrahabr.ru/post/311350/)

```html
app/design/frontend/Singree/walkbeyond/
├── web/
│ ├── css/
│ │ ├── source/ 
│ ├── fonts/
│ ├── images/
│ ├── js/
```
Где **Singree** – vendor, а **walkbeyond** – код темы. В коде можно использовать любые комбинации из букв и цифр.

**Объявление и регистрация**

Чтобы Magento 2 смогла увидеть созданную тему, необходимо создать файл:
```bash
/app/design/frontend/(vendor)/(theme codename)/theme.xml 
```
Для регистрации темы в системе необходимо создать файл **registration.php** в корне.

```html
app/design/frontend/Singree/walkbeyond/
├── web/
│ ├── css/
│ │ ├── source/ 
│ ├── fonts/
│ ├── images/
│ ├── js/
```
> В папке **сss/source**, согласно родительской теме blank, можно создать **_theme.less** файл c переопределением базовых переменных Magento UI. В **сss/source** можно задавать стили для модулей в файле _module.less и для виджетов в файле _widgets.less. Для небольших правок можно создавать файл _extend.less.

> В папке (M2_root)/lib/web/css/source/lib/variables/ в исходных файлах можно найти значения по умолчанию для тех переменных, которые можно переопределить.

### Конфигурация изображений

* Обязательным для темы является файл etc/view.xml (если он не определен в родительской теме)
  - который содержит значения свойств для изображений товаров, таких как высота, ширина, прозрачность, цвет фона и т.п.
  - Этот файл необходимо полностью скопировать с базовой темы (значения не наследуются).

### Использование макетов в теме

> В Magento 2 в определенной теме можно как расширять, так и переопределять макеты.

Например, чтобы расширить макет catalog_category_view модуля Catalog, который находится по пути (сatalog_module_dir)/view/frontend/layout/catalog_category_view.xml, необходимо создать файл по пути: (theme_dir)/Magento_Catalog/layout/catalog_category_view.xml

**Удалить какой-либо блок**

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"        xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="category.description" remove="true"/>
    </body>
</page>
```

**Если количество изменений крайне велико, лучше переопределить ОСНОВНОЙ БАЗОВЫЙ макет. Путем создания папки override/base в папке модуля темы:**

```html
<theme_dir>
  |__/<Namespace_Module>
    |__/layout
      |__/override
         |__/base
           |--<layout1>.xml
           |--<layout2>.xml
           
```
Эти файлы будут переопределять макеты:

```html
<module_dir>/view/frontend/layout/<layout1>.xml

<module_dir>/view/frontend/layout/<layout2>.xml
```

**Также можно переопределить макеты родительской ТЕМЫ, создав папку override/theme в папке модуля темы:**

```html
<theme_dir>
  |__/<Namespace_Module>
    |__/layout
      |__/override
         |__/theme
            |__/<Parent_Vendor>
               |__/<parent_theme>
                  |--<layout1>.xml
                  |--<layout2>.xml
```
Эти файлы будут переопределять макеты, которые находятся по таким путям:

```html
<parent_theme_dir>/<Namespace>_<Module>/layout/<layout1>.xml

<parent_theme_dir>/<Namespace>_<Module>/layout/<layout2>.xml
```

### Локализация темы

Словари с переводами ищутся в таких локациях:

* <parent_theme_dir>/i18n/ (идет просмотр во всех родительских темах)
* <current_theme_dir>/i18n/

> Папка i18n может находиться в каждом модуле или глобально в папке app. Словари с папками темы имеют более высокий приоритет в поиске переведенной строки.

Чтобы сгенерировать файл с переводами в папке темы можно использовать [i18n tool](http://devdocs.magento.com/guides/v2.0/config-guide/cli/config-cli-subcommands-i18n.html#config-cli-subcommands-xlate-dict).

**Можно запустить такую команду в корневом каталоге magento 2:**

`php bin/magento i18n:collect-phrases --output="app/design/frontend/(vendor)/(theme codename)/i18n/en_US.csv" app/design/frontend/(vendor)/(theme codename)`

> Она соберет все строки в словарь. Далее файл словаря: app/design/frontend/(vendor)/(theme codename)/i18n/en_US.csv. Его можно открыть любым редактором таблиц и изменить перевод любых строк в правой колонке. Переведённые строки, вместо основных, можно будет увидеть после применения темы.

### Удаление темы

Если тема является Composer пакетом, ее можно удалить командой (с корневого каталога):

`php bin/magento theme:uninstall [-c|--clear-static-content] {theme path} ... {theme path}`

> {theme path} – относительный путь к теме, начиная с имя area (frontend). В нашем случае: frontend/Singree/walkbeyond.

> --clear-static-content – удаляет статические файлы (для которых не нужна автоматическая генерация: css, js, images).

В случае, если тема не является Сomposer пакетом, для ее удаления необходимо выполнить такие шаги:

* Удалить папку темы app/design/frontend/(Vendor);
* Удалить содержимое var/view_preprocessed;
* Удалить содержимое of pub/static/frontend/;
* Открыть базу данных мадженто 2, найти theme таблицу и удалить строку с названием темы;
* Удалить кеш командой php bin/magento cache:flush.


### ФИШКИ

**Добавить новый CSS в начало всех ваших страниц шаблонов.**

> Создать app/design/frontend/(vendor)/(theme codename)/Magento_Theme/layout/default_head_blocks.xml

> И вносить правки в /web/css/myStyle.less

```xml
<?xml version="1.0"?>
    <page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
        <head>
            <css src="css/myStyle.css" />
        </head>
    </page>
    
```

**В styles-m.less вы увидите пару прокомментированных строк:**

> //@magento_import 'source/_module.less';   и тд

На самом деле они не закоментированы, мадженто хитро обрабатывает строки **//@magento_import**

**Эти строки могут быть подключены только в файлы в <theme-dir>/web/css**

#### Логотип

> Если Ваш логотип в другом формате, необходимо его объявить:

> Для объявления логотипа необходимо добавить файл <theme>/Magento_Theme/layout/default.xml (и в нем писать код) - расширит дефолтный

### Разница между _variables.less и _theme.less

[Здесь внизу](https://github.com/magento/magento2/blob/2.0/lib/web/css/docs/source/README.md)

_variables  ---- Если переменные являются общими для тем они должны быть расположены в глобальной библиотеке в файле _variables.less

_theme  ----- Если переменные являются общими для модулей.

### Моды работы мадженто

> bin/magento deploy:mode:set developer

> bin/magento deploy:mode:set production

> bin/magento deploy:mode:set default   - если никакой другой не установлен

> **В developer-режиме все ошибки будут сразу выводиться в окне браузера, а статичные файлы в папке pub/static будут создаваться в виде символических ссылок на файлы, лежащие в папке с модулем, less-файлы будут компилироваться в css "на лету".**
 
> **Также можно отключить некоторые типы кэша , в нашем случае это config и layout.Может долго грузить страницы**

> php bin/magento cache:disable config layout

> php bin/magento cache:clean config layout   ---->  Будет просто очищать кеш
## Команды

```php
magento --list ->  список команд

magento setup:upgrade    ->  Если вкл/выкл модули, нужно апдейтить жанные в базе

magento module:status -> статус модулей

magento module:disable Magento_Weee  -> Выключение модуля

magento module:enable [-c|--clear-static-content] [-f|--force] [--all] <module-list> --- Полная строка вкл модуля.

   - <module-list> -> список модулей через пробел.
   - --all -> Для включения или отключения всех модулей одновременно.
   -  -f|--force -> Чтобы включить или отключить модуль, несмотря на зависимости.
   - -c|--clear-static-content -> Удаляет статик файлы.
   
magento info:adminuri   ---> Узнать админ урл(Который в etc/env.php)
magento setup:config:set [--<parameter>=<value>]   --> Для изменения параметра. (Не только адмир урл а всего конфига)
```

### Режим обслуживание (красная подсветка)

Если есть этот файл var/.maintenance.flag значит режим вкл.
var/.maintenance.ip - содержит ип кому виден режим.

```php
magento maintenance:status
magento maintenance:enable [--ip=<ip address>] -> можно несколько ип через пробел. Или если для всех ип тогда --ip=none.

Если юзать команду --ip=<ip address> с выключеным ред-режимом, он сохранит ип для следующего включения режима.
maintenance:enable --ip=none    ->  очистит список ип.
```
