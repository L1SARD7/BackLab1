import { app } from './app';

const PORT = process.env.PORT || 1235;

const StartAPI = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

StartAPI();
