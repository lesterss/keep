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
### Кеш
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
