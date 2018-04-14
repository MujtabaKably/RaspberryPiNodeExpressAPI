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
  exec('umount /media/pi/Back\\ UP\\ of\\ DATA\\ BACKUP\\ 2', (err, out, error) => {

    setTimeout(() => {
      exec('shutdown now', () => {
        console.info('shutting down')
      });
    }, 5000);

    res.send({
      message: "complete"
    });

  })
});

//error
appObject.use('/', (err, req, res, next) => {
  res.send('404');
  console.error(err);
});

module.exports = router;
