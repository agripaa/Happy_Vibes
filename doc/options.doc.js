module.exports = options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Happy Vibes API documentation",
        version: "2.0.0",
        description:
          "Wellcome to hyv documentation coders! silahkan kalian bisa dilihat fungsi dari endpoint yang ditunjukan dan apa saja untuk request nya dari bisa dari parameter ataupun body dan semacamnya",
        contact: {
          name: "Happy Vibes",
          email: "happyvibesss23@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000/v2",
        },
      ],
    },
    apis: ["./doc/*.doc.js"],
};