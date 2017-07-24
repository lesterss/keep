# Шпаргалка команд Magento2
* [Стили](#Стили)

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
