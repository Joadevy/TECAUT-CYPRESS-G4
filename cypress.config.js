const { defineConfig } = require("cypress");
const {Client} = require("pg");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
                // Tarea para obtener el último registro
                async fetchLogs() {
                    const client = new Client({
                        connectionString: config.env.SUPABASE_CONNECTION_STRING,
                    });

                    await client.connect();
                    try {
                        const result = await client.query(
                            'SELECT created_at, last_price, url, availability FROM "LOGS" ORDER BY created_at DESC LIMIT 1'
                        );
                        return result.rows[0]; // Devuelve el último registro
                    } finally {
                        await client.end();
                    }
                },

                // Tarea para insertar un nuevo registro en la base de datos
                async insertLog({ lastPrice, availability, url }) {
                    const client = new Client({
                        connectionString: config.env.SUPABASE_CONNECTION_STRING,
                    });

                    await client.connect();
                    try {
                        await client.query(
                            `INSERT INTO "LOGS" (last_price, url, availability) VALUES ($1, $2, $3)`,
                            [lastPrice, url, availability]
                        );

                        return "Registro insertado correctamente";
                    } finally {
                        await client.end();
                    }
                }
            });

            return config;
    },
  },
});
