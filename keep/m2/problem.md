## Нет иконок и нет реакции в админке

```php
php bin/magento deploy:mode:set developer
php bin/magento setup:static-content:deploy
php bin/magento setup:static-content:deploy --theme=Vendor/mytheme
php bin/magento setup:static-content:deploy --exclude=Magento/luma,Magento/blank
php bin/magento setup:upgrade
```
## Кеш / Реиндекс

```php
php bin/magento cache:disable
php bin/magento cache:status
php bin/magento cache:flush
php bin/magento cache:clean
php bin/magento indexer:reindex
```
## Команда комиляции

```php
php bin/magento setup:di:compile
```
## Пас хинты (подсветка один из вариантов)

```sql
UPDATE `core_config_data` SET `value` = 1 WHERE `path` = "dev/debug/template_hints_storefront"
```
## Как добавить свой JS в requireJs

Create file requirejs-config.js at app/design/[vendor]/[theme]/ with this content

```js
var config = {

    // When load 'requirejs' always load the following files also
    deps: [
        "js/wim" //js file yang akan di load simpan di app/design/[vendor]/[theme]/web/js
    ]

};
```
## Пример подгрузки другой JS библиотеки

Create other.js file at app/design/[vendor]/[theme]/web/js/

```js
define([
    'underscore',
    'jquery'
], function(){
    "use strict";

    _.each(["Hello", "World", "!!!!!!!!!!!!!!!!!!" ], console.log);


});
```
## Grunt

```js
grunt exec:<your_theme>
grunt less:<your_theme>
grunt watch
```
## Less breakpoint variable

```css
 @screen__xxs: 320px;
 @screen__xs: 480px;
 @screen__s: 640px;
 @screen__m: 768px;
 @screen__l: 1024px;
 @screen__xl: 1440px;
```
## Добавить контейнер в xml layout

```xml
<container name="header.menu.wrapper" htmlClass="menu-wrapper" htmlTag="div" after="header.panel.wrapper2"><!-- parent container -->
	<container name="some.container" as="someContainer" label="Some Container" htmlTag="div" htmlClass="some-container"><!-- new container -->
		<block class="Magento\Framework\View\Element\Template" name="dropdown.menu" template="Magento_Theme::html/dropdown_nav.phtml" /> <!-- the content load from phtml -->
	</container>
</container> <!-- end of parent container -->
```
## Выбор в базе core.config base url

```sql
SELECT path,VALUE FROM core_config_data WHERE path LIKE 'web/secure/base%';
SELECT path,VALUE FROM core_config_data WHERE path LIKE 'web/unsecure/base%';
```
