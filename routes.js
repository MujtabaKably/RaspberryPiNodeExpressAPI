const path = require('path');
const router = require('express').Router();
const { exec } = require('child_process');

const appObject = require.cache.userObject.app;
//prining the details of any requests being made to the application.
appObject.use('/', (req, res, next) => {
  console.info(`METHOD: ${req.method} URL: ${req.url}, Body:`, req.body);
  next();
});

router.get('/shutdown', (req,res,next) => {
  new Promise((resolve, reject) => {
    exec('say "Unmounting Drive"', (err, out, error) => {
      resolve();
    })
  }).then(() => {
    return new Promise((resolve, rej) => {
      exec('umount /media/pi', (err, out, error) => {
        resolve();
      })
    })
  }).then(() => {
      exec('say "Drive unmounted, proceeding to shutdown"', (err, out, error) => {

        setTimeout(() => {
          exec('shutdown now', () => {
            console.info('shutting down')
          });
        }, 5000);

        res.send({
          message: "complete"
        });

      })
  }).catch((err) => {
    console.error(err);
  })
});

//error
appObject.use('/', (err, req, res, next) => {
  res.send('404');
  console.error(err);
});

module.exports = router;
