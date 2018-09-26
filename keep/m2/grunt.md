## Grunt команды мадженто
[Оф дока мадженты](http://devdocs.magento.com/guides/v2.0/frontend-dev-guide/css-topics/css_debug.html)



grunt exec

grunt watch


 * grunt clean: удаляет статические файлы в pub/static связанные с темой
 * grunt exec: создаёт симлинки для файлов исходников (less) в папке pup/static
 * grunt less: компилирует less файлы из ранее созданных симлинков
 * grunt watch: следит за изменениями в less файлах и запускает компиляцию
 
 
 
Для начала работы вам потребуется набрать команду npm install -g grunt-cli - для установки grunt на свой компьютер

потом нужно "раскомментировать" три файла в корне проекта grunt-config.json.sample, Gruntfile.js.sample, package.json.sample т.е. переименовать или скопировать что-бы они были без sample (grunt-config.json, Gruntfile.js, package.json).

а также выполнить установку всех npm пакетов

npm install
npm update

потом в файле grunt-config.json нужно поменять строчку "themes": "dev/tools/grunt/configs/local-themes" на "themes": "dev/tools/grunt/configs/themes" или переименовать соответствующий файл

дальше, вам нужно найти файл dev/tools/grunt/configs/theme.js и добавить туда свою тему по аналогии с теми, что уже существуют:

module.exports = {
<theme>:

{ area: 'frontend', name: '<Vendor>/<theme>', locale: '<language>', files: [ '<path_to_file1>', //path to root source file '<path_to_file2>' ], dsl: 'less' }
