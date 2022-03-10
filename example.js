const express = require("express");
const { postgraphile } = require("postgraphile");
const { OmitReadRootPlugin } = require('.')

const app = express();
app.use(
  postgraphile(
    "plugin_experimentation_db",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      appendPlugins: [OmitReadRootPlugin],
    }
  )
);

app.listen(3000);