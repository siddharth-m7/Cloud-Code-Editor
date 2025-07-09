export async function pingCheck(req, res) {
    try {
        return res.status(200).json({ message: 'pong' });
    }
    catch (error) {
        console.error('Error in pingController:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}