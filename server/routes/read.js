const read = async (app, client) => {

  app.get('/', (req, res) => {
      res.send('Hello, World!');
    });
}

export {read}