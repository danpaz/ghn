/**
 * Diff highlighting function.
 * Modified from https://github.com/isagalaev/highlight.js on 04/05/2016.
 */
var SEPARATOR = '\n';
var CHUNK_REGEXP = /^\-{3} [^\-]+ \-{4}$|^\*{3} [^\*]+ \*{4}$|^@@ [^@]+ @@$/;
var HEADER_REGEXP = /^Index\: |^[\+\-\*]{3}|^[\*\=]{5,}$/;

var PATCH_TYPES = {
  '+': 'addition',
  '-': 'deletion',
  '!': 'change'
};

/**
 * Add diff syntax highlighting to code. Wraps span elements around chunks of
 * the diff to allow styling additions & deletions.
 *
 * @param  {String} code
 * @return {String} Highlighted diff.
 */
export default function diffHighlight(code) {
  var sections = [];

  code.split(/\r?\n/g).forEach(function (line) {
    var type;

    if (CHUNK_REGEXP.test(line)) {
      type = 'chunk';
    } else if (HEADER_REGEXP.test(line)) {
      type = 'header';
    } else {
      type = PATCH_TYPES[line[0]] || 'null';
      line = line.replace(/^[\+\-\! ]/, '');
    }

    // Merge data with the previous section where possible.
    var previous = sections[sections.length - 1];

    if (!previous || previous.type !== type) {
      sections.push({
        type: type,
        lines: [line]
      });

      return;
    }

    previous.lines.push(line);
  });

  return sections
    .map(function (section) {
      var type = section.type;
      var value = section.lines.join(SEPARATOR);

      return '<span class="diff-' + type + '">' + value + '</span>';
    })
    .join(SEPARATOR);
}
