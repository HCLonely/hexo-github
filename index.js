var fs = require('hexo-fs');
var path = require('path');
var nunjucks = require('nunjucks');
var less = require('less');

var assetBase = path.resolve(__dirname, "./static");

var files = [
  // 'style.css',
  'badge.js',
  'octicons/octicons.css',
  'octicons/octicons.eot',
  'octicons/octicons.svg',
  'octicons/octicons.ttf',
  'octicons/octicons.woff'
];

var styleLess = fs.readFileSync(path.resolve(assetBase, 'style.less'));

hexo.extend.generator.register('hexo-github', function(locals) {

  var routes = files.map(function(f) {
    var p = 'hexo-github/' + f;
    var filePath = path.resolve(assetBase, f);

    return {
      path: p,
      data: function () {
        return fs.createReadStream(filePath);
      }
    };
  });

  // Compile style.less on the fly
  routes.unshift({
    path: 'hexo-github/style.css',
    data: function() {
      return new Promise(function(resolve, reject) {
        less.render(styleLess)
        .then(function(output) { resolve(output.css); })
        .catch(function(e) { reject(e); });
      });
    }
  });

  return routes;


});

var repoUrlRegexp = /(?:http|https):\/\/github.com\/(.*)\/(.*)/;

function tryParseUrl(url) {
  var m = repoUrlRegexp.exec(url);
  if (m) {
    return {
      user: m[1],
      repo: m[2]
    };
  }
}

nunjucks.configure(__dirname, {watch: false});

hexo.extend.tag.register('commit', function(args) {
  var user = args[0],
    repo = args[1],
    commit = args[2],
    autoExpand = args[3] === 'true',
    id = "badge-container-" + user + "-" + repo + "-" + commit,
    width = args[4] ? args[4] : "100%";

  var payload = {
    user: user,
    repo: repo,
    commit: commit,
    autoExpand: autoExpand,
    id: id,
    width: width
  };

  return new Promise(function (resolve, reject) {
    nunjucks.render('tag.html', payload, function (err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}, {async: true});
