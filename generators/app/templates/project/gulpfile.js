var requireDir = require('require-dir');

// Require all tasks src gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });