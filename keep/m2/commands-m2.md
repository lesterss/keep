### Options:

* --help (-h) Display this help message
* --quiet (-q) Do not output any message
* --verbose (-v|vv|vvv) Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
* --version (-V) Display this application version
* --ansi Force ANSI output
* --no-ansi Disable ANSI output
* --no-interaction (-n) Do not ask any interactive question

### Available commands:

* help -- Displays help for a command
* list -- Lists commands

### admin

* admin:user:create Creates an administrator
* admin:user:unlock Unlock Admin Account

### cache

* cache:clean Cleans cache type(s)
* cache:disable Disables cache type(s)
* cache:enable Enables cache type(s)
* cache:flush Flushes cache storage used by cache type(s)
* cache:status Checks cache status

### catalog

* catalog:images:resize Creates resized product images
* catalog:product:attributes:cleanup Removes unused product attributes.

### cron

* cron:run Runs jobs by schedule

### customer

* ```cmd customer:hash:upgrade Upgrade customer's hash according to the latest algorithm```

### deploy

* deploy:mode:set Set application mode.
* deploy:mode:show Displays current application mode.

### dev

* dev:source-theme:deploy Collects and publishes source files for theme.
* dev:tests:run Runs tests
* dev:urn-catalog:generate Generates the catalog of URNs to *.xsd mappings for the IDE to highlight xml.
* dev:xml:convert Converts XML file using XSL style sheets

### i18n

* i18n:collect-phrases Discovers phrases in the codebase
* i18n:pack Saves language package
* i18n:uninstallUninstalls language packages

### indexer

* indexer:info Shows allowed Indexers
* indexer:reindex Reindexes Data
* indexer:reset Resets indexer status to invalid
* indexer:set-mode Sets index mode type
* indexer:show-mode Shows Index Mode
* indexer:statusShows status of Indexer

### info

* info:adminuri Displays the Magento Admin URI
* info:backups:list Prints list of available backup files
* info:currency:list Displays the list of available currencies
* info:dependencies:show-framework Shows number of dependencies on Magento framework
* info:dependencies:show-modules Shows number of dependencies between modules
* info:dependencies:show-modules-circular Shows number of circular dependencies between modules
* info:language:list Displays the list of available language locales
* info:timezone:list Displays the list of available timezones

### maintenance

* maintenance:allow-ips Sets maintenance mode exempt IPs
* maintenance:disable Disables maintenance mode
* maintenance:enable Enables maintenance mode
* maintenance:status Displays maintenance mode status

### module

* module:disableDisables specified modules
* module:enable Enables specified modules
* module:status Displays status of modules
* module:uninstall Uninstalls modules installed by composer

### sampledata

* sampledata:deploy Deploy sample data modules
* sampledata:remove Remove all sample data packages from composer.json
* sampledata:reset Reset all sample data modules for re-installation

### setup

* setup:backup Takes backup of Magento Application code base, media and database
* setup:config:set Creates or modifies the deployment configuration
* setup:cron:runRuns cron job scheduled for setup application
* setup:db-data:upgrade Installs and upgrades data in the DB
* setup:db-schema:upgrade Installs and upgrades the DB schema
* setup:db:status Checks if DB schema or data requires upgrade
* setup:di:compile Generates DI configuration and all missing classes that can be auto-generated
* setup:install Installs the Magento application
* setup:performance:generate-fixtures Generates fixtures
* setup:rollbackRolls back Magento Application codebase, media and database
* setup:static-content:deploy Deploys static view files
  - [Здесь больше](http://devdocs.magento.com/guides/v2.1/config-guide/cli/config-cli-subcommands-static-view.html)
  - php bin/magento setup:static-content:deploy en_US      ---> Для конкретного языка
  - php bin/magento setup:static-content:deploy --theme Magento/luma --theme Magento/second_theme   ---> Для спец темы
  - php bin/magento setup:static-content:deploy --theme="Magento/backend"    ---->Для бекенд темы
  - php bin/magento setup:static-content:deploy en_US --exclude-theme Magento/luma --no-html-minify    -----> Исключить тему из статик контент деплоя и не минифицировать html
* setup:store-config:set Installs the store configuration
* setup:uninstall Uninstalls the Magento application
* setup:upgrade Upgrades the Magento application, DB data, and schema

### theme

* theme:uninstall Uninstalls theme
