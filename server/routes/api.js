__path = process.cwd();
require(__path + '/config.js');
require(__path + '/message.js');

var express = require('express');
var axios = require('axios');
var fs = require('fs');
var { promisify } = require('util');
var {
  screenshotWebsite,
  styleText,
  base64Encode,
  base64Decode,
  base32Encode,
  base32Decode
} = require(__path + '/server/scraper/tools.js');
var scrape = require(__path + '/server/scraper/downloader.js');
var scai = require(__path + '/server/scraper/openai.js');
var {
	Configuration,
	OpenAIApi
} = require('@saipulanuar/openai');
var simsimi = require('simsimi-api');
var sdf = require('stable-diffusion-cjs');
var wibusoft = require('wibusoft');
var BitlyClient = require('bitly').BitlyClient;
var TinyURL = require('tinyurl');
var soundoftext = require('soundoftext-js');
var bochil = require("@bochilteam/scraper");
var dylux = require('api-dylux');

// Db
var db = require(__path + '/server/controller/mysql.js');

var router = express.Router();

// Downloader
router.get('/downloader/ytmp3', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.ytmp3(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/ytmp4', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.ytmp4(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/play-audio', (req, res) => {
  var title = req.query.title;
  var key = req.query.key;

  if (!title) throw res.json(msg.paramtext);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.playaudio(title)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/play-video', (req, res) => {
  var title = req.query.title;
  var key = req.query.key;

  if (!title) throw res.json(msg.paramtext);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.playvideo(title)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/facebook', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.facebook(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/instagram', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.igdl(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/twitter', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.twitter(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/tiktok', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.tiktok(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/savefrom', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          bochil.savefrom(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/mediafire', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.mediafire(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/sfilemobi', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.sfilemobi(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/downloader/soundcloud', (req, res) => {
  var url = req.query.url;
  var key = req.query.key;

  if (!url) throw res.json(msg.paramurl);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scrape.soundcloud(url)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

// Searcher

// Artifical Intelligence
router.get('/artifical-intelligence/txt2img', (req, res) => {
  var prompt = req.query.prompt;
  var key = req.query.key;

  if (!prompt) throw res.json(msg.paramtext);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scai.txt2img(prompt)
            .then(data => {
              var image = data[0].images
              var info = data.info
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: {
                    image: image,
                    info: info
                  }
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

router.get('/artifical-intelligence/chatgpt-3', (req, res) => {
  var text = req.query.text;
  var key = req.query.key;

  if (!text) throw res.json(msg.paramtext);
  if (!key) throw res.json(msg.paramkey);

  db.query('SELECT * FROM users WHERE user_keys = ?', [key], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      var user = result[0];

      if (user.limit <= 0) {
        res.send(msg.limit);
      } else {
        db.query('UPDATE users SET `limit` = `limit` - 1 WHERE user_keys = ?', [key], (err) => {
          if (err) {
            console.log(err);
          }

          scai.GPT(text)
            .then(data => {
              if (!data) {
                res.json(msg.nodata);
              } else {
                res.json({
                  status: "Success",
                  code: 200,
                  author: author,
                  data: data
                });
              }
            })
            .catch(err => {
              res.status(500).json(msg.error);
              console.log(err);
            });
        });
      }
    } else {
      res.status(404).json(msg.paramkey);
    }
  });
});

module.exports = router;