# Шпаргалка команд Magento2
* [ccc](#стили)

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
(#ccc)
