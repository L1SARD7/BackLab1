import { app } from './app';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 1235;

const StartAPI = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Data Source initialized (PostgreSQL)");
        
        app.listen(PORT, () => {
            console.log(`✅ Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
    }
};

StartAPI();
