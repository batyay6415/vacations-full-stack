import fsPromises from "fs/promises";

async function logger(msg: string): Promise<void> {
    const now = new Date();
    let message = now.toLocaleString() + "\n";
    message += msg + "\n";
    message += "-----------------------------\n";
    await fsPromises.appendFile("./src/1-assets/logs/logger.txt", message);
}

export default logger;
