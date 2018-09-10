// IMPORTS /////////////////////////////////////////////////////////////////////
let gulp = require("gulp");
let mocha = require("gulp-mocha");
let eslint = require("gulp-eslint");
var istanbul = require("gulp-istanbul");
var fs = require("fs");
var fsExtra = require("fs-extra");

// TASKS ///////////////////////////////////////////////////////////////////////
/**
 * Tarefa: Verifica sintaxe e erros em javascript em todos os arquivos.
 */
gulp.task("lint", () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(["src/**/*.js", "./*.js", "bin/**/*.js", "test/**/*.js"])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format(checkstyle) outputs the lint results to a 
        // checkstyle xml file, to be used by CI jobs.
        .pipe(eslint.format("checkstyle", function(result) {
            fsExtra.ensureDirSync("reports/lint");
            fs.writeFileSync("reports/lint/results.xml", result);
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

/**
 * Realiza todas as atividades de construção. *Não* testa.
 */
gulp.task("build", function () {

});



/**
 * Executa tests. Must be built.
 */
gulp.task("test", ["build"], function () {
    return gulp.src("./test/**/*.spec.js", { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
            ui: "bdd", 
            reporter: "mocha-multi", // another reporter is nyan
            reporterOptions: {
                spec: "-",
                xunit: "reports/unit-tests/test-results.xml"
            }
            //require: ["mocha-clean"]//./mocha-harmonize.js'] // turn on the harmonization settings for mocha
        }))
      
});

/**
 * @desc Default task. Cleans the output and builds the program.
 */
gulp.task("default", ["clean", "build", "test"], function () {

});