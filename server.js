//dependencies 
const app = require('./app');

//Server Initialization
app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port'));
  console.log('Environment: ', process.env.NODE_ENV);
});