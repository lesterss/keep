## Замена гранта галпом для LESS
```php 
https://github.com/subodha/magento-2-gulp  --- лучше
https://github.com/subodha/magento-2-gulp  ---- тоже вариант но не заработал

#Покажет более полное описание ошибки
grunt --verbose имя таска

```
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
Все лаяуты расшираются с конца, не перезаписывая родительский

<block -- > ниже это пример блока который не требует доп.функций и предназначен для статик контента.Если нужна привязка к другим блокам юзаем схему как в мадженте 1.

```xml
<container name="header.menu.wrapper" htmlClass="menu-wrapper" htmlTag="div" after="header.panel.wrapper2"><!-- parent container -->
	<container name="some.container" as="someContainer" label="Some Container" htmlTag="div" htmlClass="some-container"><!-- new container -->
		<block class="Magento\Framework\View\Element\Template" name="dropdown.menu" template="Magento_Theme::html/dropdown_nav.phtml" /> <!-- the content load from phtml -->
	</container>
</container> <!-- end of parent container -->
```
или

```xml
<container name="checkout.cart.container" htmlTag="div" htmlId="cart-container-id" htmlClass="cart-container" before="-">
</container>
```
в итоге получим

```html
<div class=”cart-container” id=”cart-container-id”></div>
```

**Синтаксис атрибута template**

> Magento_Checkout::html/breadcrumbs.phtml

Это сокращенный синтаксис для ссылки на каталог шаблонов в определенном модуле (в данном случае Magento_Checkout). 
Он вызывает breadcrumbs Phtml-файл по пути : app / design / frontend /// Magento_Checkout / templates / breadcrumbs.phtml

Если редактируемый XML-файл макета уже находится в том же модуле, что и шаблон, который вы вызываете, вы можете пропустить определение модуля.

> template="breadcrumbs.phtml"

**Блок в другом блоке или контейнере**

Если вы хотите разместить блок в другом блоке или контейнере, вы можете определить это в определении родительского блока или контейнера или вы можете использовать методы «referenceBlock» или «referenceContainer».

```xml
<referenceContainer name="main.content">
 <block class="Magento\Framework\View\Element\Template" name="product-recommended-list" template="Magento_Catalog::product/list/product-recommendedlist.phtml"/>
</referenceContainer>
```

## Перемещение блоков / контейнеров 

Если в контейнере есть блоки и тд, все они будут тоже перемещены с сохранением порядка parent / child 

```xml
<move element="name.of.container.or.block" destination="name.of.destination.block.or.container" />
```

## Выбор в базе core.config base url

```sql
SELECT path,VALUE FROM core_config_data WHERE path LIKE 'web/secure/base%';
SELECT path,VALUE FROM core_config_data WHERE path LIKE 'web/unsecure/base%';
```

## Добавить нового админа

```sql
php bin/magento admin:user:create --admin-user='new-admin' --admin-password='!admin123!' --admin-email='info@domain.com' --admin-firstname='Jon' --admin-lastname='Doe'
```
## Права на папки в М2

```php
cd <your Magento install dir> 
find . -type f -exec chmod 644 {} \;                        // 644 permission for files
find . -type d -exec chmod 755 {} \;                        // 755 permission for directory 
find ./var -type d -exec chmod 777 {} \;                // 777 permission for var folder    
find ./pub/media -type d -exec chmod 777 {} \;
find ./pub/static -type d -exec chmod 777 {} \;
chmod 777 ./app/etc
chmod 644 ./app/etc/*.xml
chown -R :<web server group> .
chmod u+x bin/magento
```
