const render = require('./render');

module.exports = function router(req, res) {
  const reqUrl = req.url;
  if (['/', '/index'].includes(reqUrl)) {
    render.renderIndex(res);
  } else if (reqUrl.startsWith('/static')) {
    render.renderStatic(req, res);
  } else if (reqUrl.startsWith('/add')) {
    render.renderAdd(res);
  } else if (reqUrl.startsWith('/publish') ) {
    render.renderPublish(req, res);
  } else if (reqUrl.startsWith('/delete') ) {
    render.renderDelete(req, res);
  } else if (reqUrl.startsWith('/edit') ) {
    render.renderEdit(req, res);
  } else if (reqUrl.startsWith('/update') ) {
    render.renderUpdate(req, res);
  } else {
    render.renderNotFound(res);
  }
}