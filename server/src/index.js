import app from './app.js';
import { config } from './config.js';

app.listen(config.PORT, () => console.log(`Azimute API rodando em http://localhost:${config.PORT}`));
